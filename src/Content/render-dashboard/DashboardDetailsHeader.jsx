import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageHeader, Button, Dropdown, Menu, message, Modal } from 'antd';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';
import NewWidgetModal from './NewWidgetModal';
import {
  addDashboards,
  deleteDashboard,
  fetchDashboardWidgetList,
} from '../../api/DashboardApis';
import DashboardName from './dahboardRenameModal';
import AssignDashboardModal from './AssignDashboardModal';
import AssignDashboardDropDown from './AssignDashboardDropDown';

const { confirm } = Modal;

const HeaderContainer = styled.div`
  // width: 100%;
  min-height: 45px;
  background: ${props => (props.themeState === 'dark' ? '#3b3e48' : '#E1E6ED')};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-left: 40px;
  margin-right: 40px;
`;
const HeaderButtonContainer = styled.div`
  display: flex;
`;
const HeaderButton = styled(Button)`
  background: ${props =>
    props.themeState === 'dark' ? '#32343c' : '#fff'} !important;
  border: 1px solid #848c94 !important ;
  box-sizing: border-box !important;
  border-radius: 5px !important;
  width: 116px;
  height: 32px;
  font-size: 12px;
  margin: 0 5px;
  @media (max-width: 700px) {
    margin: 8px 5px;
    align-self: flex-start;
    width: 100%;
  }
`;
const DashboardPageHeader = styled(PageHeader)`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  align-items: center;
  .ant-page-header-heading-extra {
    display: flex;
    @media (max-width: 694px) {
      flex-direction: column;
    }
  }
  .ant-page-header-heading-title {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    width: ${props => (props.windowWidth < 600 ? '100% !important' : '')};
  }
`;

const WidgetMoreMenu = styled(Menu)`
  &.ant-dropdown-menu {
    background-color: ${props =>
      props.themeState === 'dark' ? '#32343c' : '#fff'} !important;
    border: 1px solid #848c94;
  }
`;
const WidgetMoreMenuItem = styled(Menu.Item)`
  color: #848c94 !important;
`;
const ActionIcon = styled(Icon)`
  float: right;
  margin-top: 2px;
`;
const DashboardHeader = ({
  dbName,
  favorited,
  updateDashboard,
  setVisible,
  windowWidth,
}) => {
  const { t } = useTranslation();
  const themeState = useSelector(state => state.themeReducer);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [assignedTo, setAssignedTo] = useState({});
  const [showAssignModal, setAssignModalDisplay] = useState(false);
  const { id } = useParams();

  const handleCancel = () => {
    setShowRenameModal(false);
  };
  const handleUpdate = values => {
    addDashboards({ ...values, id, btnSubmit: 'Save' }).then(res => {
      message.success(`Update Dashboard Name : ${res.data.msg}`);
      updateDashboard();
    });
  };

  const favoriteDashboard = (updateId, updatefavorited, action) => {
    addDashboards({
      favorited: updatefavorited,
      id: updateId,
      btnSubmit: 'Save',
    }).then(res => {
      const status = {
        true: 'success',
        false: 'warning',
      };
      message[status[res.data.result]](`${action} : ${res.data.msg}`);
      if (res.data.result) {
        updateDashboard();
      }
    });
  };
  const handleDashboardDelete = dashboardId => {
    const params = {
      dashboard_id: dashboardId,
    };
    deleteDashboard(params).then(res => {
      if (res.data.status === 200) {
        message.success(res.data.msg);
        history.push('/dashboards');
      } else {
        message.error(res.data.msg);
      }
    });
  };

  const showConfirm = dashboardId => {
    confirm({
      content: `Do you want to delete ${dbName} dashboard ?`,
      onOk() {
        handleDashboardDelete(dashboardId);
      },
      onCancel() {},
    });
  };

  const getDashboardWidgetList = () => {
    const reqParam = {
      dashboard_id: id,
    };
    fetchDashboardWidgetList(reqParam).then(res => {
      if (res.data && res.data.data && res.data.data.length) {
        const assignedOptions = res.data.data[0].assigned_to;
        if (assignedOptions) {
          setAssignedTo(assignedOptions);
        }
      }
    });
  };

  const assignDashboard = assignedValue => {
    const reqParams = {
      btnSubmit: 'Save',
      id,
      dash_name: dbName,
      assign_to: JSON.stringify(assignedValue),
    };
    addDashboards(reqParams).then(res => {
      if (res.data.status === 200) {
        message.success(res.data.msg);
        setAssignModalDisplay(false);
        setAssignedTo(assignedValue);
      } else {
        message.warning(res.data.msg);
      }
    });
  };

  useEffect(() => {
    getDashboardWidgetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionMenu = (
    <WidgetMoreMenu themeState={themeState}>
      <WidgetMoreMenuItem
        onClick={() => {
          setShowRenameModal(true);
        }}
      >
        {t('Rename Dashboard')}
      </WidgetMoreMenuItem>
      <WidgetMoreMenuItem
        onClick={() => {
          favoriteDashboard(
            id,
            !favorited,
            favorited ? 'Unfavorite Dashboard' : 'Favorite Dashboard'
          );
        }}
      >
        {t(favorited ? 'Unfavorite Dashboard' : 'Favorite Dashboard')}
      </WidgetMoreMenuItem>
      <WidgetMoreMenuItem
        onClick={() => {
          showConfirm(id);
        }}
      >
        {t('Delete')}
      </WidgetMoreMenuItem>
    </WidgetMoreMenu>
  );
  return (
    <HeaderContainer themeState={themeState}>
      <DashboardPageHeader
        windowWidth={windowWidth}
        // onBack={() => window.history.back()}
        title={dbName}
        extra={[
          <AssignDashboardDropDown
            assignedTo={assignedTo}
            onAssignedToClick={setAssignModalDisplay}
          />,
          <HeaderButtonContainer>
            {windowWidth >= 1200 && (
              <HeaderButton
                themeState={themeState}
                key="2"
                size="small"
                onClick={() => setVisible(true)}
              >
                {t('Add Widget')}
              </HeaderButton>
            )}
            <Dropdown overlay={actionMenu} placement="bottomRight">
              <HeaderButton themeState={themeState}>
                {t('Action')}
                <ActionIcon type="caret-down" />
              </HeaderButton>
            </Dropdown>
          </HeaderButtonContainer>,
        ]}
      />
      <AssignDashboardModal
        visible={showAssignModal}
        assignedTo={assignedTo}
        setVisible={setAssignModalDisplay}
        assignDashboard={assignDashboard}
        dbId={id}
      />
      <NewWidgetModal visible={showModal} setVisible={setShowModal} dbId={id} />
      <DashboardName
        title="Rename Dashboard"
        handleCancel={handleCancel}
        handleCreate={handleUpdate}
        showModal={showRenameModal}
        dashboardName={dbName}
        setShowModal={setShowRenameModal}
      />
    </HeaderContainer>
  );
};

DashboardHeader.propTypes = {
  dbName: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  updateDashboard: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
};
export default DashboardHeader;
