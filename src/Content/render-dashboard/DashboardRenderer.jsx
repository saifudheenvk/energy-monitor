import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spin, message } from 'antd';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddWidgetModal from '../addWidget/AddWidgetModal';
import DraggableContainer from './widgetContainer';
import { fetchDashboard } from '../../api/DashboardApis';
import dashboardDummyData from './dummy';
import RenderGraph from './RenderGraph';
import DashboardHeader from './DashboardDetailsHeader';
import DashboardContentHeader from './dashboardHeader';

const SpinContainer = styled.div`
  // text-align: center;
  margin: 2rem 0;
  height: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DashboardContainer = styled.div`
  background: ${props =>
    props.themeState === 'dark' ? '#34363e' : 'transparent'};
  border-radius: 5px;
  min-height: 200px;
`;

const DashboardBody = styled.div`
  background: ${props =>
    props.themeState === 'dark' ? 'transparent' : '#ffff'};
  margin-left: 40px;
  margin-right: 40px;
`;

const DashboardRenderer = () => {
  const themeState = useSelector(state => state.themeReducer);
  const { id } = useParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [widgetState, setWidgetState] = useState('selectGraph');
  const [widgetToEdit, setWidgetToEdit] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setWindowWidth(window.innerWidth);

    // set resize listener
    window.addEventListener('resize', resizeHandler);
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const dashboardFetch = () => {
    setLoading(true);
    fetchDashboard({ dashboard_id: id })
      .then(res => {
        if (res.data && res.data.data && res.data.data[0]) {
          setDashboardData(res.data.data);
        }
        setLoading(false);
        if (!res.data.data) {
          const result = dashboardDummyData.filter(obj => obj.id === id);
          setDashboardData(result);
        }
      })
      .catch(err => {
        message.error(`Network Error: ${err.message}`);
        setLoading(false);
      });
  };
  useEffect(() => {
    dashboardFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <AddWidgetModal
        setWidgetState={setWidgetState}
        widgetState={widgetState}
        widgetToEdit={widgetToEdit}
        visible={visible}
        setVisible={setVisible}
        dashboardFetch={dashboardFetch}
      />
      <DashboardContainer themeState={themeState}>
        <DashboardContentHeader
          itemName={dashboardData[0] ? dashboardData[0].dash_name : ''}
          title="Dashboards"
        />
        <DashboardHeader
          dbName={dashboardData[0] ? dashboardData[0].dash_name : ''}
          setVisible={setVisible}
          dbId={dashboardData[0] ? dashboardData[0].id : ''}
          favorited={dashboardData[0] ? dashboardData[0].favorited : ''}
          updateDashboard={dashboardFetch}
          windowWidth={windowWidth}
        />
        {loading ? (
          <SpinContainer>
            <Spin spinning={loading} />
          </SpinContainer>
        ) : (
          <DashboardBody themeState={themeState}>
            <DraggableContainer
              dbId={id}
              setDashboardData={setDashboardData}
              dashboardData={dashboardData}
            >
              {dashboardData[0] &&
                dashboardData[0].widgets.map(item =>
                  RenderGraph(
                    item,
                    setWidgetState,
                    setVisible,
                    setWidgetToEdit,
                    dashboardFetch,
                    themeState,
                    t,
                    windowWidth
                  )
                )}
            </DraggableContainer>
          </DashboardBody>
        )}
      </DashboardContainer>
    </div>
  );
};
export default DashboardRenderer;
