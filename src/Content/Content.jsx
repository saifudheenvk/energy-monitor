import React, { useState } from 'react';
import { Layout } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import Building from './buildings/index';
import Alerts from './alerts/index';
import Equipments from './equipments/index';
import DashboardRender from './render-dashboard/index';
import Header from '../Layout/Header';
import Profile from './profile';
import Home from './home/index';
import BuildingInfo from './buildings/building-details';
import EquipmentInfo from './equipments/equipment-details';

const { Content: AntdContent } = Layout;

const ContainerLayout = styled(Layout)`
  && {
    height: 100vh;
  }

  & ::-webkit-scrollbar {
    background-color: ${props =>
      props.theme === 'dark' ? '#2f323b' : '#ffffff'};
    width: 6px;
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  & ::-webkit-scrollbar-thumb {
    background-color: ${props =>
      props.theme === 'dark' ? '#3b3e48' : '#ffffff'};
    -webkit-border-radius: 1ex;
  }
`;

const Container = styled(AntdContent)`
  padding: 15px 18px;
  min-height: 280px;
  overflow-y: auto;
  height: calc(100% - ${props => props.theme.header.height});
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Content = () => {
  const [collapsed, setCollapsed] = useState(false);
  const lang = useSelector(state => state.lang);
  const themeRedux = useSelector(state => state.themeReducer);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ContainerLayout theme={themeRedux}>
      <Header collapsed={collapsed} toggle={toggle} />
      <Layout>
        <Container>
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboards" component={Dashboard} />
          <Route exact path="/buildings" component={Building} />
          <Route path="/alerts" component={Alerts} />
          <Route exact path="/equipments" component={Equipments} />
          <Route
            path={[
              '/dashboards/:id/:dashName',
              '/home/:id/:dashName',
              '/buildings/:buildingId/:itemName/:id/:dashName',
              '/equipments/:equipmenId/:typeId/:itemName/:id/:dashName',
            ]}
            component={DashboardRender}
          />
          <Route path="/profile" component={Profile} key={lang + themeRedux} />
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route
            exact
            path="/buildings/:id/:itemName"
            component={BuildingInfo}
          />
          <Route
            exact
            path="/equipments/:id/:typeId/:itemName"
            component={EquipmentInfo}
          />
        </Container>
      </Layout>
    </ContainerLayout>
  );
};
export default Content;
