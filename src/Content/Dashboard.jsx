import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Layout, Pagination, Spin, message } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { fetchAllDashboards, addDashboards } from '../api/DashboardApis';
import DashboardCard from '../utils/DashboardCard/index';
import DashboardContentHeader from './render-dashboard/dashboardHeader';
import { device } from '../utils/responsiveHelper';
import EmptyMessage from '../utils/EmptyMessage';

const { Footer } = Layout;

const DashboardPageLayout = styled(Layout)`
  margin-top: 28px;
  margin-left: 30px;
  margin-right: 30px;
  && {
    min-height: calc(100vh - 280px);
  }
  @media (${device.mobileL}) {
    margin-left: 18px;
    margin-right: 18px;
    padding-bottom: 10px;
  }
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

const Column = styled(Col)`
  padding: 8px 12px;
`;

const PageFooter = styled(Footer)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  width: 100%;
  @media (${device.mobileL}) {
    & .ant-layout-footer {
      padding: 10px 20px;
    }
  }
`;

const DashboardList = ({ dashboards, fetchDashboardItems }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const favoriteDashboard = (updateId, updatefavorited, action) => {
    addDashboards({
      favorited: updatefavorited,
      id: updateId,
      btnSubmit: 'Save',
    }).then(res => {
      const status = {
        true: 'success',
        false: 'warning',
      };
      message[status[res.data.result]](`${action} : ${res.data.msg}`);
      if (res.data.result) {
        fetchDashboardItems();
      }
    });
  };

  const dashboardDetailsPageRedirection = (dashboardId, itemName) => {
    history.push(`dashboards/${dashboardId}/${itemName}`);
  };

  const getTagContent = assignedToValue => {
    let tagValue = '';
    if (
      (assignedToValue.buildings && assignedToValue.buildings.length) ||
      (assignedToValue.equipments && assignedToValue.equipments.length)
    ) {
      if (!assignedToValue.type || assignedToValue.type === 'buildings') {
        if (assignedToValue.buildings && assignedToValue.buildings.length) {
          tagValue = `${assignedToValue.buildings[0].CompanyName ||
            assignedToValue.buildings[0].company_name} / ${assignedToValue
            .buildings[0].buildingName ||
            assignedToValue.buildings[0].building_name}`;
        }
      } else if (
        assignedToValue.type &&
        assignedToValue.type === 'equipments'
      ) {
        if (assignedToValue.equipments && assignedToValue.equipments.length) {
          tagValue = `${assignedToValue.equipments[0].company_name} / ${assignedToValue.equipments[0].building_name} / ${assignedToValue.equipments[0].floor_name} / ${assignedToValue.equipments[0].appliance_type_name} / ${assignedToValue.equipments[0].appliance_name}`;
        }
      }
    }
    return tagValue;
  };

  return (
    <>
      {dashboards && dashboards.length ? (
        <Row>
          {dashboards &&
            dashboards.map(eachDashboard => {
              const item = {
                name: eachDashboard.dash_name,
                icon: eachDashboard.favorited,
                Id: eachDashboard.Id,
                userId: eachDashboard.user_id,
                createdUserFirstName: eachDashboard.FirstName,
                createdUserLastName: eachDashboard.LastName,
                createdBy: eachDashboard.Username,
                createDate: eachDashboard.create_date,
                lastUpdatedDate: eachDashboard.last_updated_date,
                dateFormat: 'YYYY-MM-DD',
                tag: getTagContent(eachDashboard.assign_to),
              };

              return (
                <Column xs={24} sm={12} md={12} lg={8} xl={6}>
                  <DashboardCard
                    item={item}
                    onFavoriteClick={favoriteDashboard}
                    onCardClick={dashboardDetailsPageRedirection}
                  />
                </Column>
              );
            })}
        </Row>
      ) : (
        <EmptyMessage message={t('No dashboards to list')} />
      )}
    </>
  );
};

DashboardList.propTypes = {
  dashboards: PropTypes.arrayOf(PropTypes.instanceOf({})).isRequired,
  fetchDashboardItems: PropTypes.func.isRequired,
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [dashboards, setDashBoards] = useState([]);
  const [filter, setFilter] = useState({});

  const fetchDashboardItems = (searchTerm = '') => {
    let selectedValues = {};
    let assignedValues = {};
    if (filter) {
      if (filter.type) {
        assignedValues = {
          assigned_to:
            filter.type === 'buildings'
              ? {
                  type: filter.type,
                  buildings: [
                    {
                      company_id: filter.company && filter.company.Id,
                      building_id: filter.building && filter.building.Id,
                    },
                  ],
                }
              : filter.type === 'equipments'
              ? {
                  type: filter.type,
                  equipments: [
                    {
                      building_id: filter.building && filter.building.Id,
                      company_id: filter.company && filter.company.Id,
                      floor_id: filter.floor && filter.floor.Id,
                      appliance_type_id:
                        filter.equipment && filter.equipment.ApplianceTypeId,
                      appliance_id:
                        filter.equipment && filter.equipment.ApplianceId,
                    },
                  ],
                }
              : {},
        };
        selectedValues = {
          created_date: filter.created_date,
          last_updated_date: filter.last_updated_date,
          ...assignedValues,
        };
      } else {
        selectedValues = {
          created_date: filter.created_date,
          last_updated_date: filter.last_updated_date,
        };
      }
    }
    setLoading(true);
    fetchAllDashboards({
      search_term: searchTerm,
      per_page: 12,
      offset: currentPage - 1,
      filter_options: JSON.stringify(selectedValues),
    })
      .then(res => {
        if (res.data && res.data.data && res.data.data.length) {
          setDashBoards(res.data.data);
          setTotalPage(res.data.totalRecord);
        } else {
          setDashBoards([]);
          setTotalPage(0);
        }
        setLoading(false);
      })
      .catch(() => {
        setDashBoards([]);
        setTotalPage(0);
        setLoading(false);
      });
  };
  //   [currentPage, filter]
  // );
  useEffect(() => {
    fetchDashboardItems();
  }, [currentPage, filter]);

  const changePage = page => {
    setCurrentPage(page);
  };

  return (
    <>
      <DashboardContentHeader
        fetchDashboardItems={fetchDashboardItems}
        filter={filter}
        setFilter={setFilter}
        title="Dashboards"
      />
      <DashboardPageLayout>
        {loading ? (
          <SpinContainer>
            <Spin />
          </SpinContainer>
        ) : (
          <DashboardList
            dashboards={dashboards}
            fetchDashboardItems={fetchDashboardItems}
          />
        )}
      </DashboardPageLayout>
      {/* <PageFooter> */}
      <Row justify="end">
        <Col>
          <Pagination
            defaultCurrent={1}
            total={totalPage}
            onChange={page => changePage(page)}
            size="small"
            pageSize={12}
            responsive={true}
          />
        </Col>
      </Row>
      {/* </PageFooter> */}
    </>
  );
};

export default Dashboard;
