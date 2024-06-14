import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import {
  Card,
  Input,
  Col,
  Row,
  Layout,
  Collapse,
  Spin,
  message,
  Form,
} from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import AssignedDashboardContainer from './AssignedDashboardContainer';
import MapContainer from '../../../utils/Map';
import { fetchBuildingDetails } from '../../../api/BuildingApis';
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

const BuildingInfoLayout = styled(Layout)`
  && {
    margin: 30px 40px 10px;
  }

  @media (max-width: 991px) {
    && {
      // margin-left: 20px;
      // margin-right: 20px;
    }
  }
`;

const InfoCard = styled(Card)`
  && {
    // border-top-left-radius: 10px;
    // border-top-right-radius: 10px;
    border: none;
    background-color: ${props =>
      props.theme === 'dark' ? '#393b43' : '#ffffff'} !important;
  }
`;

const InfoCollapse = styled(Collapse)`
  && {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &.ant-collapse > .ant-collapse-item:last-child {
    border-top-left-radius: 10px;
    color: #848c94;
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    width: 100%;
    border-top-right-radius: 10px;
  }

  & .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
  }

  & .ant-collapse-header {
    color: #848c94;
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
  }
`;

const BuildingTitlePanel = styled(Panel)`
  && {
    background: ${props =>
      props.theme === 'dark' ? '#3b3e48' : '#E1E6ED'};
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
    // text-align: left;
    // width: 100%;
  }
`;

const InfoInput = styled(Input)`
  background:  ${props => props.theme === 'dark' ?  '#32343c' : '#E8ECEF' };
  font-size: 12px;
  height: 40px;
  color: #a1a1a1;
  font-weight: 300;
  &.ant-input[disabled] {
    background:  ${props => props.theme === 'dark' ?  '#32343c' : '#E8ECEF' };
    color: #a1a1a1;
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

const BuildingInfo = () => {
  const { t } = useTranslation();
  const buildingId = useParams();
  const [buildingInfo, setBuildingInfo] = useState({});
  const [dashboardList, setDashboardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const language = useSelector(state => state.lang);
  const themeState = useSelector(state => state.themeReducer);

  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getAssignedDashboards = assignedIds => {
    setLoading(true);
    const params = assignedIds;
    // eslint-disable-next-line no-unused-expressions
    params &&
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

  const getBuildingInfo = () => {
    setLoading(true);
    console.log('buildingId', buildingId.id);
    const requestParams = {
      building_id: JSON.stringify({
        building_id: buildingId.id,
      }),
    };
    console.log('requestParams', requestParams);
    fetchBuildingDetails(requestParams).then(res => {
      if (res.data.data) {
        const assignedIds = res.data.data.assigned_dashboard_id;
        setBuildingInfo(res.data.data);
        getAssignedDashboards(assignedIds);
        setLoading(false);
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    });
  };

  useEffect(() => {
    getBuildingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DashboardContentHeader
        itemName={buildingInfo && buildingInfo.BuildingName}
        title="Buildings"
      />
      <BuildingInfoLayout>
        <InfoCollapse defaultActiveKey={['1']} expandIconPosition="right">
          <BuildingTitlePanel header={t('Building Info')} key="1" theme={themeState} >
            <InfoCard theme={themeState} >
              {loading && (
                <SpinContainer>
                  <Spin spinning={loading} />
                </SpinContainer>
              )}
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Form
                labelAlign="left"
                layout="horizontal"
                {...formItemLayout}
                initialValues={buildingInfo}
                key={Object.entries(buildingInfo).length}
              >
                <Row gutter={24}>
                  {Object.entries(buildingInfo).map(([key, value]) => {
                    const keyValue = capitalize(
                      key.split(/(?=[/A-Z])/).join(' ')
                    );
                    // eslint-disable-next-line no-nested-ternary
                    const detailValue =
                      // eslint-disable-next-line no-nested-ternary
                      key === 'IsHeadOffice'
                        ? value === 1
                          ? 'Yes'
                          : 'No'
                        : value;
                    return (
                      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        {key !== 'assigned_dashboard_id' && (
                          <FormItem label={keyValue} name={key}>
                            <InfoInput disabled theme={themeState} />
                          </FormItem>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              </Form>
              {!loading && (
                <MapContainer
                  latitude={buildingInfo && buildingInfo.Latitude}
                  longitude={buildingInfo && buildingInfo.Longitude}
                  name={buildingInfo && buildingInfo.BuildingName}
                  language={language}
                />
              )}
            </InfoCard>
          </BuildingTitlePanel>
        </InfoCollapse>
        <Container>
          {dashboardList.map(item => (
            <AssignedDashboardContainer
              dashboardDetail={item}
              itemName={buildingInfo && buildingInfo.BuildingName}
            />
          ))}
        </Container>
      </BuildingInfoLayout>
    </>
  );
};

BuildingInfo.propTypes = {};

export default BuildingInfo;
