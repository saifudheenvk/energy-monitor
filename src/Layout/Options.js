import React from 'react';

import styled from 'styled-components';
import { Menu, Dropdown, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { logout } from '../api/LogoutApi';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_SUCCESS, changeTheme } from '../redux/actions';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import theme2 from '../theme2';

const UserOptionsMenu = styled(Menu)`
  &.ant-dropdown-menu {
    background-color: ${props =>
      props.themeState === 'dark' ? '#2f323b' : '#E8ECEF'};
  }
`;
const UserDropDown = styled(Menu.Item)`
  width: 230px;
`;

const UserOptions = ({ children, history }) => {
  const { t, i18n } = useTranslation();
  const themeState = useSelector(state => state.themeReducer);
  const dispatch = useDispatch();

  const handleLogout = e => {
    e.preventDefault();
    logout({}).then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
      if (res.data.status === 200) {
        localStorage.clear();
        history.push('/login');
        dispatch(changeTheme('dark'));
        window.less
          .modifyVars({
            ...theme2,
          })
          .then(() => {
            console.log('success');
          })
          .catch(() => {
            console.log('fail');
          });
      }
    });
  };

  const menu = (
    <UserOptionsMenu themeState={themeState}>
      <UserDropDown key="profile">
        <Link to="/profile">{t('Profile')}</Link>
      </UserDropDown>
      <UserDropDown key="logout">
        <a onClick={handleLogout}>
          {t('Logout')}
          {/* {loading ? "..." : "Logout"} */}
        </a>
      </UserDropDown>
    </UserOptionsMenu>
  );
  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      placement="bottomRight"
      overlayStyle={{ width: '230px' }}
    >
      <a>{children}</a>
    </Dropdown>
  );
};

export default withRouter(UserOptions);
