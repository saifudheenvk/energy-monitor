import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col, Button, message } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../api/LoginApi';
import { LOGIN_SUCCESS } from '../redux/actions';
import ForgetPassword from './ForgetPassword';
import { useTranslation } from 'react-i18next';
import theme from '../theme';
import theme2 from '../theme2';
import { changeTheme } from '../redux/actions/index';

const LoginFormContainer = styled(Form)`
  padding: 10px 15px 15px 15px;
  background-color: rgba(68, 70, 79, 0.5);
  border-radius: 3px;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 1rem;
`;

const LoginButton = styled(Button)`
  width: 80px;
  height: 35px;
  padding: 5px 10px;
  display: block;
  float: right;
  margin: 0 auto;
  background: transparent;
  border-radius: 0.25rem;
  color: #949ba2;
`;

const ForgetPasswordButton = styled(Button)`
  color: #ffc34a;
  border: none;
  font-size: 12px;
  float: left;
  padding: 0;
  & span {
    text-decoration: underline;
  }
  &.ant-btn:active {
    color: #ffc34a;
  }
`;

const LoginForm = ({ form }) => {
  const history = useHistory();
  const { getFieldDecorator, validateFields } = form;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const FORM_NAME = `login`;

  useEffect(() => {
    if (localStorage.getItem('userCredentials')) {
      history.push('/');
    }
  }, []);

  const updateLanguage = lang => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
    dispatch({
      type: 'SET_LANGUAGE',
      language: lang,
    });
  };
  const updateTheme = thm => {
    dispatch(changeTheme(thm === 'dark' ? thm : 'white'));
    localStorage.setItem('app_theme', thm === 'dark' ? thm : 'white');
    const themeVariable = thm === 'dark' ? theme2 : theme;
    window.less
      .modifyVars({
        ...themeVariable,
      })
      .then(() => {
        console.log('success');
      })
      .catch(() => {
        console.log('fail');
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        login({
          btnSubmit: 'Login',
          Username: values.username,
          Pword: values.password,
        }).then(res => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
          if (res.data.status === 200) {
            const { data } = res.data;
            const [userDetails] = data;
            if (userDetails) {
              localStorage.setItem(
                'userCredentials',
                JSON.stringify(userDetails)
              );
              localStorage.setItem('userName', userDetails.Username);
              updateLanguage(userDetails.language);
              updateTheme(userDetails.theme);

              history.push('/');
            }
            setLoading(false);
          } else {
            message.error(res.data.msg);
            setLoading(false);
          }
        });
      }
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <FormItem help="Your unique username to app">
        <label htmlFor={`${FORM_NAME}_username`}>Username</label>
        {getFieldDecorator('username', {
          rules: [{ required: true }],
        })(
          <Input
            id="username"
            autoComplete="username"
            prefix={<UserOutlined />}
            placeholder="example@gmail.com"
          />
        )}
      </FormItem>
      <FormItem help="Your strong password">
        <label htmlFor={`${FORM_NAME}_password`}>Password</label>
        {getFieldDecorator('password', {
          rules: [{ required: true }],
        })(
          <Input.Password
            id="password"
            autoComplete="current-password"
            prefix={<LockOutlined />}
            placeholder="******"
          />
        )}
      </FormItem>
      <Row type="flex" justify="space-between">
        <Col span={12}>
          <FormItem>
            <ForgetPasswordButton type="link" onClick={showModal}>
              Forget Password ?
            </ForgetPasswordButton>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem>
            <LoginButton type="primary" htmlType="submit" loading={loading}>
              Login
            </LoginButton>
          </FormItem>
        </Col>

        <ForgetPassword visible={visible} setVisible={setVisible} />
      </Row>
    </LoginFormContainer>
  );
};

LoginForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form.create()(LoginForm);
