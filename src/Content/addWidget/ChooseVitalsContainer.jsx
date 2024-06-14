/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useContext } from 'react';
import { Row, Input, Spin, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardList from '../../utils/CardList';
import getListProps from '../../utils/CardList/listUtlis';
import getDataSource from './listItem';
import setFilterOptionHandler from './filterOption';
import ChooseVitalFooter from './ChooseVitalFooter';
import AggregatedVitalSelector from './AggregatedVitalSelector';
import RawVitalSelector from './RawVitalSelector';
import EmptyMessage from '../../utils/EmptyMessage';
import ChooseVitalBreadCrumb from './ChooseVitalBreadCrumb';
import { ThemeContext } from './AddWidgetModal';
import { useTranslation } from 'react-i18next';

const { Search } = Input;
const ChooseVitalSectionContainer = styled.div`
  height: 50vh;
  width: 100%;
  outline: none;
`;
const VitalContainer = styled.div`
  background: ${props => props.theme.inputBg};
  width: 100%;
  height: 77%;
  padding: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.scrolTrack}; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius:2px;
    background: ${props => props.theme.scrollThumb}; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.scrollThumbHover}; }
`;
const ListContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const VitalSearch = styled(Search)`
  && {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    margin: 0 0px;
    background-color: ${props => props.theme.inputBg}!important;
    align-items: center;
  }
  & span.ant-input-suffix {
    margin: auto;
  }
  @media (max-width: 700px) {
    && {
      width: 70%;
    }
  }
`;
const ChooseVitalHeaderContainer = styled.div`
  height: 42px;
  margin: 15px 0px;
  display: flex;
  align-items: center;
`;

const SpinContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChooseVitalsContainer = props => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState([]);
  const [blist, setBreadCrumblist] = useState(['companies']);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [vitalSearchTerm, setVitalsSearchTerm] = useState('');
  const {
    listType,
    setFilterOptions,
    filterOptions,
    request,
    setListType,
  } = props;
  const handleClick = item => {
    setFilterOptionHandler(listType, item, filterOptions, setFilterOptions);
  };
  useEffect(() => {
    setSearchTerm('');
    getDataSource(listType, setDataSource, filterOptions, setLoading);
  }, [listType]);

  const handleSearch = searchTermValue => {
    if (listType === 'vitals') {
      setVitalsSearchTerm(searchTermValue);
    } else {
      getDataSource(
        listType,
        setDataSource,
        filterOptions,
        setLoading,
        searchTermValue
      );
    }
  };

  const handleSearchTermChange = searchEvent => {
    setSearchTerm(searchEvent.target.value);
  };
  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <ChooseVitalSectionContainer>
      <Row justify="space-between">
        <Col span={8}>
          <ChooseVitalHeaderContainer>
            <VitalSearch
              theme={theme}
              defaultValue=""
              placeholder={t(
                `Search By ${capitalize(
                  listType.split(/(?=[/A-Z])/).join(' ')
                )}`
              )}
              value={searchTerm}
              onChange={handleSearchTermChange}
              onSearch={handleSearch}
              allowClear
            />
          </ChooseVitalHeaderContainer>
        </Col>
        <Col>
          {/* < /Col> */}
          <ChooseVitalFooter setBreadCrumblist={setBreadCrumblist} {...props} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChooseVitalBreadCrumb
            setListType={setListType}
            blist={blist}
            listType={listType}
          />
        </Col>
      </Row>
      {loading ? (
        <SpinContainer>
          <Spin spinning={loading} />
        </SpinContainer>
      ) : (
        <VitalContainer theme={theme}>
          {listType !== 'vitals' && (
            <ListContainer>
              {dataSource && dataSource.length ? (
                <CardList
                  headKey={getListProps(listType).headKey}
                  keyset={getListProps(listType).keySet}
                  itemList={dataSource}
                  selectedItems={filterOptions[listType]}
                  selectedItemKey={getListProps(listType).selectedItemKey}
                  onCardClick={handleClick}
                />
              ) : (
                <EmptyMessage
                  message={t(
                    `No items to list in ${capitalize(
                      listType.split(/(?=[/A-Z])/).join(' ')
                    )}`
                  )}
                />
              )}
            </ListContainer>
          )}
          {listType === 'vitals' && (
            <>
              {request.mode === 'aggregated' && (
                <AggregatedVitalSelector
                  {...props}
                  searchTerm={vitalSearchTerm}
                />
              )}
              {request.mode === 'live' && (
                <RawVitalSelector {...props} searchTerm={vitalSearchTerm} />
              )}
            </>
          )}
        </VitalContainer>
      )}
    </ChooseVitalSectionContainer>
  );
};

ChooseVitalsContainer.propTypes = {
  setListType: PropTypes.func.isRequired,
  listType: PropTypes.string.isRequired,
  setFilterOptions: PropTypes.func.isRequired,
  filterOptions: PropTypes.instanceOf({}).isRequired,
  request: PropTypes.shape({
    mode: PropTypes.bool.isRequired,
  }).isRequired,
};
export default ChooseVitalsContainer;
