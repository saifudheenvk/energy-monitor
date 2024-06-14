import React, { useState, useEffect } from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { Card, Col, Row, Pagination, Layout, Spin, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import enUS from 'antd/es/locale/en_US';
import ContentHeader from '../ContentHeader';
import { fetchBuildings } from '../../api/BuildingApis';
import { filterAlertsForBuilding } from '../../redux/actions/alertFilterAction';
import { useTranslation } from 'react-i18next';
//  import "./utils/antd.rtl.css"

const CardListContainer = styled.div`
  min-height: calc(100vh - 260px);
`;
const { Footer } = Layout;
const PageFooter = styled(Footer)`
  // position: absolute;
  // bottom: 0;
  // right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  width: 100%;
`;
const BuildingStyle = styled(Layout)`
  margin-top: 28px;
  margin-left: 30px;
  margin-right: 30px;
`;
const SpinContainer = styled.div`
  // text-align: center;
  margin: 2rem 0;
  height: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardStyle = styled(Card)`
  cursor: pointer;
  border-radius: 10px !important;
  &:hover {
    box-shadow: 3px 3px 10px 7px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  border: ${props =>
    props.themeState === 'dark' ? '' : '1px solid #E1E6ED'} !important;

  ${props =>
    props.lang !== 'ar'
      ? `border-left: 8px solid ${props.Priority === 6 ? '#9DCE4E' : '#F36133'}`
      : `border-right: 8px solid ${
          props.Priority === 6 ? '#9DCE4E' : '#F36133'
        }`} !important;
`;
const CardContentsP = styled.p`
  margin-bottom: 6px;
  font-size: 11px;
  line-height: 15px;
`;
const CardSpan = styled.p`
  margin-bottom: 6px !important;
  font-weight: bold;
  line-height: 15px;
  width: 100%;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Column = styled(Col)`
  padding: 8px 12px !important;
`;

const StyledPagination = styled(Pagination)`
  // float: right;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 35px;
`;

const CardAlertButton = styled(Button)`
  // border: 1px solid #848c94;
  // color: #ffc34a;
  background: #2a2d34;
  // border-color: #ffc34a;
  height: 28px;
  width: 55px;
  border-radius: 27px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  &.ant-btn > .anticon + span {
    margin-left: ${props => (props.lang !== 'ar' ? '8px' : '0')};
    margin-right: ${props => (props.lang === 'ar' ? '8px' : '0')};
  }
`;

const CardColumn = styled(Col)`
  float: ${props => (props.lang !== 'ar' ? 'left' : 'right')};
`;

const MapBuildings = ({ buildings, lang }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const themeState = useSelector(state => state.themeReducer);

  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleAlertClick = details => {
    dispatch(
      filterAlertsForBuilding({
        building: { BuildingName: details.BuildingName },
        company: { CompanyName: details.CompanyName },
      })
    );
    history.push(`/alerts`);
  };

  const gotoBuildingDetails = (id, BuildingName) => {
    history.push(`/buildings/${id}/${BuildingName}`);
  };
  return (
    <>
      {buildings.message === 'success' &&
        buildings.data.map(buildingDetails => {
          const item = {
            CompanyName: buildingDetails.CompanyName,
            Id: buildingDetails.Id,
            CityName: buildingDetails.CityName,
            HostName: buildingDetails.HostName,
            Priority: buildingDetails.Priority,
          };
          return (
            <Column
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={6}
              style={{ padding: '10px 1px' }}
            >
              <div>
                <CardStyle
                  themeState={themeState}
                  lang={lang}
                  Priority={buildingDetails.Priority}
                  bodyStyle={{ padding: '10px 24px' }}
                  bordered
                  onClick={() =>
                    gotoBuildingDetails(
                      buildingDetails.Id,
                      buildingDetails.BuildingName
                    )
                  }
                >
                  <CardTitleContainer>
                    <h3>{buildingDetails.BuildingName || ' '}</h3>
                    {buildingDetails.alert_count !== '0' && (
                      <CardAlertButton
                        onClick={e => {
                          e.stopPropagation();
                          handleAlertClick(buildingDetails);
                        }}
                      >
                        <WarningOutlined style={{ color: '#ffc34a' }} />
                        {buildingDetails.alert_count}
                      </CardAlertButton>
                    )}
                  </CardTitleContainer>
                  {Object.entries(item).map(([key, value]) => {
                    return (
                      <Row gutter={6}>
                        <CardColumn span={8} lang={lang}>
                          <CardContentsP>
                            {t(capitalize(key.split(/(?=[/A-Z])/).join(' ')))}
                          </CardContentsP>
                        </CardColumn>
                        <Col span={1} style={{ color: '#848c94' }}>
                          :
                        </Col>
                        <CardColumn span={15} lang={lang}>
                          <CardSpan>{value || ' '}</CardSpan>
                        </CardColumn>
                      </Row>
                    );
                  })}{' '}
                </CardStyle>
              </div>
            </Column>
          );
        })}
    </>
  );
};

MapBuildings.propTypes = {
  buildings: PropTypes.instanceOf({}).isRequired,
  lang: PropTypes.string.isRequired,
};

const Building = () => {
  const { t } = useTranslation();
  const lang = useSelector(state => state.lang);
  const [currentPage, setCurrentPage] = useState(1);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [locale, setLocale] = useState(enUS);
  const [dir, setDir] = useState('ltr');

  const fetchBuilding = () => {
    fetchBuildings({
      per_page: 12,
      offset: currentPage - 1,
      search_term: searchTerm,
      filter_option: JSON.stringify({
        companyName: filter.company && filter.company.CompanyName,
        cityName: filter.cityName,
      }),
    }).then(res => {
      setBuildings(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBuilding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter]);

  const changePage = page => {
    setCurrentPage(page);
  };

  const changeLocale = e => {
    const localeValue = e.target.value;
    setLocale(localeValue);
    setDir(e.target.value);
  };

  return (
    <>
      <ContentHeader
        fetchItems={fetchBuilding}
        filter={filter}
        setFilter={setFilter}
        title={t('Buildings')}
        setSearchTerm={setSearchTerm}
      />
      <CardListContainer>
        <BuildingStyle>
          {loading && (
            <SpinContainer>
              <Spin spinning={loading} />
            </SpinContainer>
          )}
          <div>
            <Row>
              <MapBuildings buildings={buildings} lang={lang} />
            </Row>
          </div>
        </BuildingStyle>
      </CardListContainer>
      <Row justify="end">
        <Col>
          <StyledPagination
            defaultCurrent={currentPage}
            total={buildings.totalRecord}
            onChange={changePage}
            pageSize={12}
            size="small"
          />
        </Col>
      </Row>
    </>
  );
};

export default Building;
