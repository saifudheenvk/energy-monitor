import React, { useCallback } from "react";

import {
  AlertOutlined,
  ApartmentOutlined,
  DashboardOutlined,
  HomeOutlined,
  ToolOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';


const { Sider } = Layout;

const SiderMenuItem = styled(Menu.Item)`
`;

const MenuText = styled.span`
  font-size: 16px;
`;

const SideBar = styled(Sider)``;



const sideBarConfig = [
  { name: "Home", key: "home", icon: <HomeOutlined /> },
  { name: "Dashboard", key: "dashboard", icon: <DashboardOutlined /> },
  { name: "Building", key: "building", icon: <ApartmentOutlined /> },
  { name: "Alerts", key: "alerts", icon: <AlertOutlined /> },
  { name: "Equipments", key: "equipments", icon: <ToolOutlined /> }
];
const Aside = ({ location, history, collapsed }) => {
  const { t, i18n } = useTranslation();

  const pathname = location.pathname.split("/").slice(1).reverse();

  const changeRoute = useCallback(({ key, keyPath }) => {
    console.log("history", history, pathname);
    history.push(`/${keyPath}`);
  }, []);

  return (
    <SideBar
      collapsed={collapsed}
      collapsible
      trigger={null}
      style={{ height: "100vh" }}
    >
      <div className="logo" />
      <Menu onClick={changeRoute} defaultOpenKeys={pathname}>
        {sideBarConfig.map(menuItem => (
          <SiderMenuItem key={menuItem.key}>
            {menuItem.icon}
            <MenuText>{t(menuItem.name)}</MenuText>
          </SiderMenuItem>
        ))}
      </Menu>
    </SideBar>
  );
};
export default withRouter(Aside);
