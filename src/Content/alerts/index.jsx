import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Layout, List, message } from 'antd';
import { useTranslation } from 'react-i18next';
import ContentHeader from '../ContentHeader';
import AlertsCard from './Card/index';
import { fetchAlerts } from '../../api/AlertsApi';
import AlertDetailDrawer from './alertdetailpage';

const AlertsPageLayout = styled(Layout)`
  margin-top: 28px;
  margin-left: 30px;
  margin-right: 30px;
`;

const AlertList = styled(List)`
  & .ant-spin-container::after {
    background: none;
  }
  & .ant-spin-nested-loading {
    min-height: calc(100vh - 280px);
  }
`;

const AlertListItem = styled(List.Item)`
  padding: 8px 12px !important;
`;

const Alerts = () => {
  const alertFilter = useSelector(state => state.alertFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsData, setAlertsData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filter, setFilter] = useState(alertFilter);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState({});
  const [loading, setLoading] = useState(false);

  const onAlertDetailsDrawerClose = () => {
    setDrawerVisible(false);
  };
  // const showAlertDetailsDrawer = () => {
  //   setDrawerVisible(true);
  // };

  const fetchAlertsList = () => {
    setLoading(true);
    fetchAlerts({
      per_page: 12,
      offset: currentPage - 1,
      search_term: searchTerm,
      filter_option: JSON.stringify({
        companyName: alertFilter.company && alertFilter.company.CompanyName,
        buildingName: alertFilter.building && alertFilter.building.BuildingName,
        equipmentName:
          alertFilter.equipment && alertFilter.equipment.applianceName,
        status: alertFilter.status,
        filter_date: alertFilter.filter_date,
      }),
    }).then(res => {
      if (res.data.data) {
        setAlertsData(res.data.data);
        setTotalRecords(res.data.totalRecord);
      } else {
        message.error(res.data.message);
        setAlertsData([]);
        setTotalRecords(0);
      }
      setLoading(false);
    });
  };

  const changePage = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAlertsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, alertFilter]);

  const { t } = useTranslation();

  return (
    <>
      <ContentHeader
        title={t('Alerts')}
        filter={filter}
        setFilter={setFilter}
        fetchItems={fetchAlertsList}
        setSearchTerm={setSearchTerm}
      />
      <AlertsPageLayout>
        <AlertList
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={alertsData}
          loading={loading}
          renderItem={item => {
            const details = {
              AlertTypeName: item.AlertTypeName,
              BuildingName: item.BuildingName,
              equipment_name: item.equipment_name,
              DateLastChecked: item.DateLastChecked,
              CurrentStatus: item.CurrentStatus,
              assignedTo: item.assignedTo,
            };

            return (
              <AlertListItem
                onClick={() => {
                  setSelectedAlert(item);
                  setDrawerVisible(true);
                }}
              >
                <AlertsCard item={details}>AlertsCard content</AlertsCard>
              </AlertListItem>
            );
          }}
          pagination={{
            onChange: changePage,
            size: 'small',
            pageSize: 12,
            current: currentPage,
            total: totalRecords,
            position: 'bottom',
          }}
        />
      </AlertsPageLayout>
      <AlertDetailDrawer
        drawerVisible={drawerVisible}
        onAlertDetailsDrawerClose={onAlertDetailsDrawerClose}
        selectedAlert={selectedAlert}
        fetchAlertsList={fetchAlertsList}
      />
    </>
  );
};

export default Alerts;
