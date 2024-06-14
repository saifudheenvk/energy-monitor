import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Select, Button, message } from 'antd';
import StatusUpdateSelector from './StatusUpdateSelector';
import HistoryTimeline from './HistoryTimeline';
import { setAlertActions } from '../../../api/AlertsApi';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const KeyContainer = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #848c94;
  padding-bottom: 10px;
`;
const ValueContainer = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: ${props => (props.theme == 'dark' ? '#ffffff' : '#49538c')};
  padding-bottom: 20px;
`;

const requiredKeys = {
  BuildingName: 'Building Name',
  CompanyName: 'Company Name',
  equipment_name: 'Equipment',
  CurrentStatus: 'Status',
  Remedies: 'Remedies',
  AssignedTo: 'Assigned to',
  history: 'History',
};

const AlertDrawerBody = ({ selectedAlert, fetchAlertsList }) => {
  const themeState = useSelector(state => state.themeReducer);
  const [status, setStatus] = useState('');
  const { t } = useTranslation();
  const handleStatusChange = val => {
    setStatus(val);
  };
  const updateStatus = id => {
    console.log(id);
    const params = {
      btnSubmit: 'Save',
      ServiceStatus: status,
      AlertId: id,
    };
    console.log(status);
    setAlertActions(params).then(res => {
      console.log('AlertAction', res.data);
      if (res.data) {
        message.success(res.data.message);
      }
      fetchAlertsList();
    });
  };
  useEffect(() => {
    setStatus(selectedAlert.CurrentStatus);
    console.log(selectedAlert);
  }, [selectedAlert]);
  return (
    <>
      {Object.entries(requiredKeys).map(([key, value]) => {
        return (
          Object.keys(selectedAlert).includes(key) && (
            <Row>
              <Col span={24}>
                <KeyContainer>{t(requiredKeys[key])}</KeyContainer>
              </Col>
              <Col span={24}>
                {key === 'CurrentStatus' && (
                  <StatusUpdateSelector
                    currentStatus={status}
                    handleStatusChange={handleStatusChange}
                    updateStatus={updateStatus}
                    statusID={selectedAlert.Id}
                  />
                )}
                {key !== 'CurrentStatus' && key !== 'history' && (
                  <ValueContainer theme={themeState}>
                    {selectedAlert[key]}
                  </ValueContainer>
                )}
                {key === 'history' && (
                  <HistoryTimeline histories={selectedAlert[key]} />
                )}
              </Col>
            </Row>
          )
        );
      })}
    </>
  );
};
export default AlertDrawerBody;
