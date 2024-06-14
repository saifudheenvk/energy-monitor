import React, { useEffect } from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Avatar, Badge, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import UserOptions from './Options';
import Logo from '../assets/logo.png';
import LanguageSelector from '../Content/LanguageSelector';
import NavMenuHeader from './NavMenuHeader';
import { fetchProfile } from '../api/ProfileApi';
import { setUserDetails } from '../redux/actions/login';

const { Header: AntdHeader } = Layout;
const Search = styled(Input.Search)`
  .ant-input::placeholder {
    color: #848c94 !important;
  }
  .ant-input {
    color: #848c94 !important;
    border: none !important;
    margin-left: 20px !important;
  }
`;

const Container = styled(AntdHeader)`
  width: 100%;
  display: flex !important;
  align-items: center !important;
  flex-direction: column;
  background: #ffffff !important;
  &.ant-layout-header {
    height: auto;
  }
`;

const HeaderContainer = styled(Row)`
  width: 100%;
  height: 55px;
  &.ant-row {
    justify-content: space-between;
  }
`;

const NotificationBadge = styled(Badge)`
  margin-right: 20px !important;
  line-height: initial !important;
  .ant-badge-dot {
    width: 10px;
    height: 10px;
    top: 3px;
    right: 4px;
    box-shadow: none;
  }
`;

const Username = styled.p`
  display: inline-block;
  display: inline-block;
  margin: 4px;
  font-size: 12px;
  color: #848c94;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const LogoContainer = styled.div`
  width: 100%;
  background: ${props =>
    props.themeState === 'dark' ? '#ffc107' : ''} !important;
  height: 55px;
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 200px;
  cursor: pointer;
`;
const NavbarLogo = styled.img`
  width: 60px;
  height: 43px;
  margin: auto;
`;
const NavOptions = styled(Col)`
  padding-left: 10px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
`;
const LanguageSelectContainer = styled.div`
  // float:right;
  margin-right: 10px;
  margin-left: 10px;
`;
const StyledSearch = styled(Search)`
  border: none !important;
  width: 100%;
`;
const Header = () => {
  const { t } = useTranslation();
  const themeState = useSelector(state => state.themeReducer);
  const userDetails = JSON.parse(localStorage.getItem('userCredentials'));
  const profileDetails = useSelector(state => state.loginStat);
  const history = useHistory();
  const dispatch = useDispatch();
  const getUserDetails = () => {
    const params = {
      id: userDetails.UserId,
    };
    fetchProfile(params).then(res => {
      if (res.data) {
        const profileData = {
          FirstName: res.data.data.FirstName,
          LastName: res.data.data.LastName,
          Username: res.data.data.Username,
          EmailAddr: res.data.data.EmailAddr,
          Phoneno: res.data.data.Phoneno,
        };
        dispatch(setUserDetails(profileData));
      }
    });
  };

  useEffect(() => {
    if (userDetails) {
      getUserDetails();
    } else {
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={{ padding: 0 }}>
      <HeaderContainer justify="start">
        <Col sxl={4} md={4} sm={4} xs={4}>
          <LogoContainer
            themeState={themeState}
            onClick={() => {
              history.push('/home');
            }}
          >
            <NavbarLogo src={Logo} />
          </LogoContainer>
        </Col>
        {/* <Col xl={16} md={14} sm={10} xs={8}>
          <StyledSearch
            placeholder={t('Search')}
            onSearch={value => console.log(value)}
          />
        </Col> */}
        <NavOptions xl={4} md={6} sm={10} xs={12}>
          <Row justify="end">
            {/* <UserOptionsContainer
              className={
                lang === 'ar'
                  ? 'user-options-view-rtl'
                  : 'user-options-view-ltr'
              }Col
            > */}
            <Col>
              <LanguageSelectContainer>
                <LanguageSelector />
              </LanguageSelectContainer>
            </Col>
            {/* <Col>
              <NotificationBadge
                count={1}
                dot
                color={themeState === 'dark' ? '#ffd700' : '#49548D'}
              > */}
            {/* <a href="#" className="head-example" /> */}
            {/* <BellOutlined style={{ fontSize: '16px', color: '#6B7279' }} />
              </NotificationBadge>
            </Col> */}
            <Col>
              <UserOptions>
                {/* {console.log("profileDetails", profileDetails)} */}
                <Username>{profileDetails.FirstName}</Username>
                <Avatar icon={<UserOutlined />} />
              </UserOptions>
            </Col>
            {/* </UserOptionsContainer> */}
          </Row>
        </NavOptions>
      </HeaderContainer>
      <NavMenuHeader />
    </Container>
  );
};

export default Header;
