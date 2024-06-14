import React from 'react';
import styled from 'styled-components';
import { Menu, Modal, message } from 'antd';
import WidgetItem from './WidgetItem';
import { deleteWidget } from '../../api/widget-apis';
import WidgetApiWrapper from './WidgetApiWraper';

const { confirm } = Modal;

const WidgetMoreMenu = styled(Menu)`
  &.ant-dropdown-menu {
    background-color: ${props =>
      props.themeState === 'dark' ? '#32343c' : '#E8ECEF'} !important;
    border: 1px solid #848c94;
  }
`;
const WidgetMoreMenuItem = styled(Menu.Item)`
  color: #848c94 !important;
`;

const defaultLayout = i => {
  if (i.layout === '')
    return {
      x: 0,
      y: Infinity,
      w: 4,
      h: 2,
      minH: 2,
      maxH: 4,
      minW: 3,
    };
  return {
    x: i.layout.x,
    y: i.layout.y !== null ? i.layout.y : Infinity,
    w: i.layout.w,
    h: i.layout.h,
    minH: 2,
    maxH: 4,
    minW: 3,
  };
};

const RenderGraph = (
  item,
  setWidgetState,
  setVisible,
  setWidgetToEdit,
  updateDashboard,
  themeState,
  t,
  windowWidth
) => {
  const { Id, widget_name: widgetName } = item;
  const handleWidgetDelete = widgetId => {
    const data = {
      widget_id: widgetId,
    };
    deleteWidget(data).then(res => {
      if (res.data.status === 200) {
        message.success('Deleted Widget successfully');
        updateDashboard();
      } else {
        message.error('Unable to Delete widget!. Please try again later');
      }
    });
  };
  const showConfirm = (widgetId, name) => {
    confirm({
      content: `Do you want to delete ${name} widget?`,
      onOk() {
        handleWidgetDelete(widgetId);
      },
      onCancel() {},
    });
  };
  const menu = (
    <WidgetMoreMenu themeState={themeState}>
      {windowWidth >= 1200 && (
        <WidgetMoreMenuItem
          onClick={() => {
            setWidgetState('edit');
            setVisible(true);
            setWidgetToEdit(item);
          }}
        >
          {t('Edit')}
        </WidgetMoreMenuItem>
      )}
      <WidgetMoreMenuItem
        onClick={() => {
          showConfirm(Id, widgetName);
        }}
      >
        {t('Delete')}
      </WidgetMoreMenuItem>
    </WidgetMoreMenu>
  );
  return (
    <div key={item.Id} data-grid={defaultLayout(item)} style={{ zIndex: '0' }}>
      <WidgetItem
        item={item}
        key={item.Id}
        title={item.widget_name}
        menu={menu}
      >
        <WidgetApiWrapper mode={item.mode} itemId={item.Id} />
      </WidgetItem>
    </div>
  );
};

export default RenderGraph;
