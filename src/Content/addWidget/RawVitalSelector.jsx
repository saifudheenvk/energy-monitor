import React, { useEffect, useState } from 'react';
import { List, Col, Checkbox, message, Spin, Row } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFilteredVitals } from '../../api/EquipmentsApi';
import EmptyMessage from '../../utils/EmptyMessage';

const VitalsList = styled(List)`
  && {
    padding: 1em;
  }
  & .ant-list-header {
    padding-top: 6px;
    padding-bottom: 10px;
    font-weight: 600;
  }
`;

const VitalSelectionColumn = styled(Col)`
  padding: 0 16px;
`;

const VitalsSelectionCheckbox = styled(Checkbox)`
  & .ant-checkbox-inner {
    background-color: ${props =>
      props.themeState === 'dark' ? '#32343c' : '#ffff'};
    border-color: ${props =>
      props.themeState === 'dark' ? '#fffff' : '#848C94'};
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${props =>
      props.themeState === 'dark' ? '#fffff' : '#49548d'};
  }

  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${props =>
      props.themeState === 'dark' ? '#ffc107' : '#49548d'};
    border-color: ${props =>
      props.themeState === 'dark' ? '#ffc107' : '#49548d'};
  }
`;

const SpinContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyMessageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const RawVitalSelector = props => {
  const {
    setFilterOptions,
    filterOptions,
    request,
    additionalInfo,
    searchTerm,
  } = props;
  const themeState = useSelector(state => state.themeReducer);
  const [listOfVitals, setListOfVitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchVitals = filteredList => {
    setLoading(true);
    const equipmentDetailsList = filteredList.map(eachEntity => ({
      company_id: eachEntity.CompanyId,
      building_id: eachEntity.BuildingId,
      floor_id: eachEntity.FloorId,
      appliance_type_id: eachEntity.ApplianceTypeId,
      appliance_id: eachEntity.ApplianceId,
    }));

    fetchFilteredVitals({
      search_term: searchTerm,
      aggregation_level: additionalInfo.aggregation_level,
      data: JSON.stringify({
        equipments: equipmentDetailsList,
        mode: request.mode,
        chart_type: request.widgetType,
      }),
    })
      .then(response => {
        const {
          data: { data },
        } = response;
        if (data && data.length) {
          const alteredData = data.map(eachEntity => {
            const description = `${eachEntity.company_name} > ${eachEntity.building_name} > ${eachEntity.floor_name} > ${eachEntity.applianceType} > ${eachEntity.applianceName}`;
            const endResult = eachEntity.vitals.map(eachVital => ({
              ...eachEntity,
              description: `${description} > ${eachVital}`,
              vital: eachVital,
            }));
            return endResult;
          });
          let vitalList = [];
          alteredData.forEach(eachVitalListGroup => {
            vitalList = [...vitalList, ...eachVitalListGroup];
          });
          setListOfVitals([...vitalList]);
        } else {
          setListOfVitals([]);
        }
        setLoading(false);
      })
      .catch(() => {
        message.error('Unable to fetch Vitals list');
        setListOfVitals([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVitals(filterOptions[additionalInfo.aggregation_level]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const checkVitalsExistence = item => {
    const { vitals } = filterOptions;
    const itemIndex = vitals.findIndex(
      eachVital =>
        eachVital.company_id === item.company_id &&
        eachVital.building_id === item.building_id &&
        eachVital.floor_id === item.floor_id &&
        eachVital.appliance_type_id === item.appliance_type_id &&
        eachVital.appliance_id === item.appliance_id &&
        eachVital.vital === item.vital
    );
    return itemIndex;
  };

  const onVitalsCheckboxChange = (event, item) => {
    const { vitals } = filterOptions;
    const clonnedVitals = vitals.slice(0);
    if (event.target.checked) {
      clonnedVitals.push(item);
    } else {
      const itemIndex = checkVitalsExistence(item);
      if (itemIndex >= 0) {
        clonnedVitals.splice(itemIndex, 1);
      }
    }
    setFilterOptions({ ...filterOptions, vitals: clonnedVitals });
  };

  return (
    <>
      {loading ? (
        <SpinContainer>
          <Spin spinning={loading} />
        </SpinContainer>
      ) : (
        <>
          {listOfVitals && listOfVitals.length ? (
            <VitalsList
              dataSource={listOfVitals}
              header="Vital Description"
              renderItem={item => (
                <List.Item>
                  <Row>
                    <VitalSelectionColumn>
                      <VitalsSelectionCheckbox
                        themeState={themeState}
                        checked={checkVitalsExistence(item) >= 0}
                        onChange={event => {
                          onVitalsCheckboxChange(event, item);
                        }}
                      />
                    </VitalSelectionColumn>
                    <Col>{item.description}</Col>
                  </Row>
                </List.Item>
              )}
            />
          ) : (
            <EmptyMessageWrapper>
              <EmptyMessage message="No Vitals to list" />
            </EmptyMessageWrapper>
          )}
        </>
      )}
    </>
  );
};

RawVitalSelector.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  setFilterOptions: PropTypes.func.isRequired,
  request: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    widgetType: PropTypes.string.isRequired,
  }).isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  searchTerm: PropTypes.string,
};

RawVitalSelector.defaultProps = {
  searchTerm: '',
};

export default RawVitalSelector;
