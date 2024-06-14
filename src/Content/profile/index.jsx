import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Divider, Switch } from 'antd';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import Password from './Password';
import theme from '../../theme';
import theme2 from '../../theme2';
import { changeTheme } from '../../redux/actions/index';
import { updateProfile } from '../../api/ProfileApi';

import { useTranslation } from 'react-i18next';

const ProfileRow = styled(Row)`
  // display: flex;
  // flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const themeState = useSelector(state => state.themeReducer);
  const { t } = useTranslation();
  const userId = JSON.parse(localStorage.getItem('userCredentials')).UserId;

  const [isEdit, setIsEdit] = useState(false);
  const onChangeTheme = e => {
    if (e) {
      dispatch(changeTheme('dark'));
      localStorage.setItem('app_theme', 'dark');
      updateProfile({ theme: 'dark', id: userId });
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
    } else {
      dispatch(changeTheme('white'));
      localStorage.setItem('app_theme', 'white');
      updateProfile({ theme: 'light', id: userId });
      window.less
        .modifyVars({
          ...theme,
        })
        .then(() => {
          console.log('success');
        })
        .catch(() => {
          console.log('fail');
        });
    }
  };

  return (
    <>
      {' '}
      <ProfileRow gutter={32} justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={13}>
          <Card bordered={false}>
            <h2>{t('Switch Theme')}</h2>
            <Row>
              <Col span={4}>{t('Dark Theme')}</Col>
              <Col span={19}>
                {' '}
                <Switch
                  checked={themeState === 'dark'}
                  onChange={onChangeTheme}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Divider />
        <Col xs={24} sm={24} md={12} lg={12} xl={13}>
          <Card bordered={false}>
            <UserProfile
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              key={isEdit ? 0 : 1}
            />
          </Card>
        </Col>

        <Divider />
        <Col xs={24} sm={24} md={12} lg={12} xl={13}>
          <Card bordered={false}>
            <Password />
          </Card>
        </Col>
      </ProfileRow>
      {/* </div> */}
    </>
  );
};

export default Profile;
