import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Icon, { HomeOutlined, WarningOutlined } from '@ant-design/icons';
import { Menu, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import BuildingIcon from '../assets/icons/BuildingIcon';
import DashboardIcon from '../assets/icons/DashboardIcon';
import EquipmentIcon from '../assets/icons/EquipmentIcon';

const MenuHeader = styled.div`
  width: 100% !important;
  height: 60px;
  background: ${props =>
    props.themeState === 'dark' ? '#2a2d34' : '#49548D'} !important;
  display: flex;
  align-items: center;
`;
const TopMenuItem = styled(Menu.Item)`
  line-height: 39px !important;
  && {
    border-bottom: ${props => {
      if (props.themeState !== 'dark')
        return props.isActive
          ? '3px solid #fff !important'
          : '3px solid transparent !important';
      return 'none !important';
    }};
  }
  @media (max-width: 414px) {
    &.ant-menu-item,
    .ant-menu-submenu-title {
      padding: 0 15px;
    }
  }
`;
const HomeIcon = styled(HomeOutlined)`
  color: ${props => {
    if (props.themeState === 'dark')
      return props.activePath === 'home' ? '#fff' : '#848C94';
    return '#fff';
  }} !important;
`;
const AlertIcon = styled(WarningOutlined)`
  color: ${props => {
    if (props.themeState === 'dark')
      return props.activePath === 'alerts' ? '#fff' : '#848C94';
    return '#fff';
  }} !important;
`;
const MenuContainer = styled(Menu)`
  // width: 50% !important;
  background: none !important;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto !important;
  &:hover,
  &:active {
    color: '#fff' !important;
  }
`;
const MenuText = styled.span`
  @media (max-width: 639px) {
    display: none;
  }
  display: inline-block;
  font-weight: ${props => {
    if (props.themeState === 'dark') return props.isActive ? 600 : 300;
    return props.isActive ? 600 : 'normal';
  }};
  font-size: 12px;
  color: ${props => {
    if (props.themeState === 'dark')
      return props.isActive ? '#ffffff' : '#848C94';
    return '#ffffff';
  }};
`;

const NavMenuHeader = ({ location, history }) => {
  const themeState = useSelector(state => state.themeReducer);
  const changeRoute = useCallback(
    ({ keyPath }) => {
      history.push(`/${keyPath}`);
    },
    [history]
  );
  const { t } = useTranslation();
  const pathname = location.pathname.split('/').slice(1);
  const menuConfig = [
    {
      name: 'Home',
      key: 'home',
      icon: <HomeIcon activePath={pathname[0]} themeState={themeState} />,
    },
    {
      name: 'Dashboards',
      key: 'dashboards',
      icon: (
        <Icon
          component={() => (
            <DashboardIcon activePath={pathname[0]} themeState={themeState} />
          )}
        />
      ),
    },
    {
      name: 'Buildings',
      key: 'buildings',
      icon: (
        <Icon
          component={() => (
            <BuildingIcon activePath={pathname[0]} themeState={themeState} />
          )}
        />
      ),
    },
    {
      name: 'Equipments',
      key: 'equipments',
      icon: (
        <Icon
          component={() => (
            <EquipmentIcon activePath={pathname[0]} themeState={themeState} />
          )}
        />
      ),
    },
    {
      name: 'Alerts',
      key: 'alerts',
      icon: <AlertIcon activePath={pathname[0]} themeState={themeState} />,
    },
  ];
  return (
    <MenuHeader themeState={themeState}>
      <MenuContainer
        mode="horizontal"
        onClick={changeRoute}
        defaultOpenKeys={pathname[0]}
      >
        {menuConfig.map(menuItem => (
          <TopMenuItem
            themeState={themeState}
            key={menuItem.key}
            isActive={pathname[0] === menuItem.key}
          >
            <Row>
              <Col>{menuItem.icon}</Col>
              <Col>
                <MenuText
                  isActive={pathname[0] === menuItem.key}
                  themeState={themeState}
                >
                  {t(menuItem.name)}
                </MenuText>
              </Col>
            </Row>
          </TopMenuItem>
        ))}
      </MenuContainer>
    </MenuHeader>
  );
};
NavMenuHeader.propTypes = {
  location: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
};
export default withRouter(NavMenuHeader);
