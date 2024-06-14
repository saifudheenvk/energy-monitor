import React, { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Col,
  Row,
  Layout,
  Collapse,
  Form,
  message,
  Spin,
} from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import AssignedDashboardContainer from '../../buildings/building-details/AssignedDashboardContainer';
import { fetchEquipmentDetails } from '../../../api/EquipmentsApi';
import { fetchDashboard } from '../../../api/DashboardApis';
import DashboardContentHeader from '../../render-dashboard/dashboardHeader';

const { Panel } = Collapse;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
    lg: { span: 10 },
    xl: { span: 10 },
    xxl: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 16 },
    lg: { span: 14 },
    xl: { span: 14 },
    xxl: { span: 12 },
  },
};

const EquipmentInfoLayout = styled(Layout)`
  && {
    margin: 30px 40px 10px;
  }

  @media (max-width: 991px) {
    && {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
`;

const InfoCard = styled(Card)`
  && {
    // border-top-left-radius: 10px;
    // border-top-right-radius: 10px;
    border: none;
    background: ${props =>
      props.themeState === 'dark' ? '#393b43' : '#ffffff'};
  }
`;

const InfoCollapse = styled(Collapse)`
  && {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &.ant-collapse > .ant-collapse-item:last-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  & .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
  }

  & .ant-collapse-header {
    height: 60px;
    display: flex;
    align-items: center;
  }
`;

const EquipmentTitlePanel = styled(Panel)`
  && {
    background: ${props =>
      props.themeState === 'dark' ? '#3b3e48' : '#EBEEF2'} !important;
    font-size: 20px;
    font-weight: 600;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const FormItem = styled(Form.Item)`
  && {
    margin: 0 15px 24px;
    padding: 0 10px;
  }
  &.ant-form-item label {
    color: #848c94;
    font-size: 14px;
    font-weight: 300;
  }
  &.ant-form-item label {
    color: #848c94;
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    width: 100%;
  }
`;

const InfoInput = styled(Input)`
  background: ${props => (props.themeState === 'dark' ? '#32343c' : '#F6F7F9')};
  font-size: 12px;
  height: 40px;
  color: ${props => (props.themeState === 'dark' ? '#a1a1a1' : '#848C94')};
  font-weight: 300;
  &.ant-input[disabled] {
    background: ${props =>
      props.themeState === 'dark' ? '#32343c' : '#F6F7F9'};
    color: ${props => (props.themeState === 'dark' ? '#a1a1a1' : '#848C94')};
  }
`;

const Container = styled.div`
  margin-top: 2em;
`;

const SpinContainer = styled.div`
  margin: 2rem 0;
  height: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EquipmentInfo = () => {
  const equipmentIds = useParams();
  const themeState = useSelector(state => state.themeReducer);
  const [equipmentInfo, setEquipmentInfo] = useState({});
  const [dashboardList, setDashboardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const language = useSelector(state => state.lang);
  const { t: i18n } = useTranslation();
  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getAssignedDashboards = assignedIds => {
    setLoading(true);
    const params = assignedIds;
    // eslint-disable-next-line no-unused-expressions
    params &&
      // eslint-disable-next-line array-callback-return
      params.map(param => {
        const requestParams = {
          dashboard_id: param,
        };
        fetchDashboard(requestParams).then(res => {
          if (res.data.data) {
            setDashboardList(prevState => [...prevState, res.data.data]);
            setLoading(false);
          }
        });
      });
  };

  const getEquipmentInfo = () => {
    setLoading(true);
    const requestParams = {
      appliance_type: equipmentIds.typeId,
      appliance_id: equipmentIds.id,
    };
    fetchEquipmentDetails(requestParams)
      .then(res => {
        if (res.data.data) {
          const assignedIds = res.data.data.assigned_dashboard_id;
          setEquipmentInfo(res.data.data);
          getAssignedDashboards(assignedIds);
          setLoading(false);
        } else {
          setLoading(false);
          message.error(res.data.message);
        }
      })
      .catch(() => message.error('Unable to fetch Equipment Details'));
  };

  useEffect(() => {
    getEquipmentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DashboardContentHeader
        itemName={equipmentInfo && equipmentInfo.applianceName}
        title="Equipments"
      />
      <EquipmentInfoLayout>
        <InfoCollapse
          defaultActiveKey={['1']}
          expandIconPosition={language === 'ar' ? 'left' : 'right'}
          key={Object.entries(equipmentInfo).length}
        >
          <EquipmentTitlePanel
            header={i18n('Equipment Info')}
            key="1"
            themeState={themeState}
          >
            <InfoCard>
              {loading && (
                <SpinContainer>
                  <Spin spinning={loading} />
                </SpinContainer>
              )}
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Form
                layout="horizontal"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...formItemLayout}
                initialValues={equipmentInfo}
              >
                <Row gutter={24}>
                  {Object.entries(equipmentInfo).map(([key]) => {
                    const keyValue = capitalize(
                      key.split(/(?=[/A-Z])/).join(' ')
                    );
                    return (
                      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        {key !== 'assigned_dashboard_id' && (
                          <FormItem label={i18n(keyValue)} name={key}>
                            <InfoInput themeState={themeState} disabled />
                          </FormItem>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              </Form>
            </InfoCard>
          </EquipmentTitlePanel>
        </InfoCollapse>
        <Container>
          {dashboardList.map(item => (
            <AssignedDashboardContainer
              dashboardDetail={item}
              itemName={equipmentInfo && equipmentInfo.applianceName}
            />
          ))}
        </Container>
      </EquipmentInfoLayout>
    </>
  );
};

EquipmentInfo.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};

export default EquipmentInfo;
