import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import AlertDrawerBody from './AlertDrawerBody';
import { useSelector } from 'react-redux';

const AlertDrawer = styled(Drawer)`
  .ant-drawer-content {
    background-color: ${props =>
      props.theme === 'dark' ? '#2A2D34' : '#ffffff'} !important;
  }
  .ant-drawer-header {
    background-color: ${props =>
      props.theme === 'dark' ? '#2A2D34' : '#e8ecef'} !important;
  }
  .ant-drawer-content-wrapper {
    min-width: 300px;
  }
`;

const AlertDetailDrawer = ({
  drawerVisible,
  onAlertDetailsDrawerClose,
  selectedAlert,
  fetchAlertsList,
}) => {
  const lang = useSelector(state => state.lang);
  const themeState = useSelector(state => state.themeReducer);

  return (
    <AlertDrawer
      theme={themeState}
      title={<b>{selectedAlert.AlertTypeName}</b>}
      placement={lang === 'ar' ? 'left' : 'right'}
      closable={true}
      onClose={onAlertDetailsDrawerClose}
      visible={drawerVisible}
      getContainer={false}
      width={'30%'}
    >
      <AlertDrawerBody
        selectedAlert={selectedAlert}
        fetchAlertsList={fetchAlertsList}
      />
    </AlertDrawer>
  );
};

export default AlertDetailDrawer;
