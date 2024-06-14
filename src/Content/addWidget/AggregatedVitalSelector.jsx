/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Radio, Col, message, PageHeader, Spin } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fetchVitals from '../../api/vitalApis';
import EmptyMessage from '../../utils/EmptyMessage';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const AggregatedVitalContainer = styled.div`
  // border: 1px solid #6b7279;
  height: 100%;
`;

const VitalTitle = styled(PageHeader)`
  && {
    font-weight: 600;
    padding: 8px 12px;
  }
`;

const VitalSelectorRow = styled(Row)`
  && {
    padding: 0.5em;
    margin: 0.5em !important;
  }
`;

const VitalSelectorRadioButton = styled(Radio)`
  & .ant-radio-inner {
    border-color: ${props =>
      props.themeState === 'dark' ? 'rgba(255, 255, 255, 0.65)' : '#49548D'};
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

const requsetKeys = {
  companies: { Id: 'company_id' },
  buildings: { Id: 'building_id', CompanyId: 'company_id' },
  floors: {
    Id: 'floor_id',
    BuildingId: 'building_id',
    CompanyId: 'company_id',
  },
  equipmentTypes: {
    EquipmentTypeId: 'equipment_type_id',
    floor_id: 'floor_id',
    building_id: 'building_id',
    company_id: 'company_id',
  },
  equipments: {
    FloorId: 'floor_id',
    BuildingId: 'building_id',
    CompanyId: 'company_id',
    ApplianceTypeId: 'appliance_type_id',
    ApplianceId: 'appliance_id',
  },
};
const getEntities = (aggregation_level, filterOptions) => {
  return {
    [aggregation_level]: filterOptions[aggregation_level].map(item => {
      const obj = {};
      Object.keys(requsetKeys[aggregation_level]).forEach(key => {
        obj[requsetKeys[aggregation_level][key]] = item[key];
      });
      return obj;
    }),
  };
};
const AggregatedVitalSelector = props => {
  const {
    request,
    filterOptions,
    setFilterOptions,
    additionalInfo,
    vital,
    searchTerm,
  } = props;
  const { t } = useTranslation();
  const themeState = useSelector(state => state.themeReducer);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const onVitalChange = e => {
    setFilterOptions({
      ...filterOptions,
      vitals: [e.target.value],
    });
  };
  const fetchVitalsList = () => {
    setLoading(true);
    fetchVitals({
      search_term: searchTerm,
      aggregation_level: additionalInfo.aggregation_level,
      data: JSON.stringify({
        ...getEntities(additionalInfo.aggregation_level, filterOptions),
        mode: request.mode,
        chart_type: request.widgetType,
      }),
    })
      .then(res => {
        setLoading(false);
        const { data } = res;
        if (data.data && data.data.constructor !== Object) {
          setVitals(data.data);
          if (!filterOptions.vitals.length)
            setFilterOptions({ ...filterOptions, vitals: [data.data[0]] });
        } else {
          setVitals([]);
        }
      })
      .catch(() => {
        setVitals([]);
        message.error('Unable to fetch Vitals list');
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchVitalsList();
  }, [searchTerm]);
  return (
    <>
      {loading ? (
        <SpinContainer>
          <Spin spinning={loading} />
        </SpinContainer>
      ) : (
        <AggregatedVitalContainer>
          {/* <VitalTitle>Vitals</VitalTitle> */}
          {vital !== '' ? (
            <span>
              * On changing already selected vital `{vital}` , it will affect
              previously selected {additionalInfo.aggregation_level}{' '}
            </span>
          ) : (
            ''
          )}
          {vitals.length !== 0 ? (
            <>
              {/* <VitalTitle subTitle={t("Vitals")} /> */}
              <VitalSelectorRow gutter={[24, 24]}>
                {vitals.length !== 0 && (
                  <Radio.Group
                    style={{ marginBottom: '40px' }}
                    value={filterOptions.vitals[0]}
                    onChange={onVitalChange}
                  >
                    {vitals.map(item => (
                      <Col span={24}>
                        <VitalSelectorRadioButton
                          themeState={themeState}
                          value={item}
                        >
                          {item}
                        </VitalSelectorRadioButton>
                      </Col>
                    ))}
                  </Radio.Group>
                )}
              </VitalSelectorRow>
            </>
          ) : (
            <EmptyMessageWrapper>
              <EmptyMessage message={t('No Vitals to list')} />
            </EmptyMessageWrapper>
          )}
        </AggregatedVitalContainer>
      )}
    </>
  );
};
AggregatedVitalSelector.propTypes = {
  request: PropTypes.instanceOf({}).isRequired,
  filterOptions: PropTypes.instanceOf({}).isRequired,
  setFilterOptions: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  vital: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
};

AggregatedVitalSelector.defaultProps = {
  searchTerm: '',
};
export default AggregatedVitalSelector;
