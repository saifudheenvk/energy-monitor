import React from 'react';
import { Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import { Input, Typography, Button, Col, message, Row } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { updatePassword, confirmCurrentPassword } from '../../api/ProfileApi';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Title = styled(Typography.Title)`
  && {
    font-size: 20px;
  }
`;

const FormItem = styled(Form.Item)`
& .ant-legacy-form-item-label > label {
  float: ${props => props.lang === 'ar' && 'right' };
}
`;

const StyledInput = styled(Input)`
  height: 45px;
  width: 100%;
  & .ant-input-suffix {
    align-self: center;
  }
`;

const PasswordButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PasswordCancelButton = styled(Button)`
  margin-right: 10px;
  width: 140px;
  @media (max-width: 400px) {
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

const PasswordSaveButton = styled(Button)`
  width: 140px;
  margin-right: 10px;
  @media (max-width: 400px) {
    margin-right: 0;
  }
`;

const Password = ({ form }) => {
  const { getFieldDecorator, validateFields } = form;
  const lang = useSelector(state => state.lang);
  const { t } = useTranslation();
  const userDetails = JSON.parse(localStorage.getItem('userCredentials'));
  const initialParams = {
    user_id: userDetails.UserId,
    btnSubmit: 'Save',
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSavePassword = params => {
    updatePassword(params).then(res => {
      if (res.data.result) {
        message.success(res.data.msg);
        handleReset();
      } else {
        message.error(res.data.msg);
      }
    });
  };

  const handleConfirmCurrentPassword = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        const newParams = {
          ...initialParams,
          password: values.currentPassword,
        };
        const params = { ...initialParams, password: values.password };
        if (values.password === values.confirmNewPassword) {
          confirmCurrentPassword(newParams).then(res => {
            if (res.data.result) {
              handleSavePassword(params);
            } else {
              message.error("Current password doesn't match");
            }
          });
        } else {
          message.error("New Password and Confirm New Password doesn't match");
        }
      }
    });
  };

  return (
    <Form onSubmit={handleConfirmCurrentPassword} layout="vertical">
      <Title level={2}>{t("Change Password")}</Title>
      <Row>
        <Col span={24}>
          <FormItem label={t("Current Password")} lang={lang} >
            {getFieldDecorator('currentPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your current password!',
                },
              ],
            })(<StyledInput as={Input.Password} />)}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={t("New Password")} lang={lang} >
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ],
            })(<StyledInput as={Input.Password} />)}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={t("Confirm New Password")} lang={lang} >
            {getFieldDecorator('confirmNewPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your new password!',
                },
              ],
            })(<StyledInput as={Input.Password} />)}
          </FormItem>
        </Col>
        <Col span={24}>
          <PasswordButtonContainer>
            <PasswordCancelButton
              icon={<CloseOutlined />}
              type="primary"
              ghost
              htmlType="reset"
              onClick={handleReset}
            >
              {t("Reset")}
            </PasswordCancelButton>
            <PasswordSaveButton
              icon={<SaveOutlined />}
              type="primary"
              htmlType="submit"
            >
              {t("Update")}
            </PasswordSaveButton>
          </PasswordButtonContainer>
        </Col>
      </Row>
    </Form>
  );
};

Password.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form.create({ name: 'update_password' })(Password);
