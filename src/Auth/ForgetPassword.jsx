import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { forgetPassword } from '../api/LoginApi';

const ForgetPassword = ({ form, visible, setVisible }) => {
  const { getFieldDecorator, validateFields } = form;

  const handleOk = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const reqParams = {
          btnSubmit: 'Save',
          uemail: values.email,
        };
        forgetPassword(reqParams).then(res => {
          if (res.data.result) {
            message.success(res.data.msg);
            setVisible(false);
          } else {
            message.error('Email id verification failed');
          }
        });
      }
    });
  };

  const handleCancel = e => {
    e.preventDefault();
    setVisible(false);
  };

  return <>
    <Modal
      title="Forgot your Password"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      key={JSON.stringify(visible)}
    >
      <Form>
        <Form.Item label="Enter your email id :">
          {getFieldDecorator('email', {
            rules: [{ required: true }, { type: 'email' }],
          })(
            <Input
              id="email"
              autoComplete="email"
              prefix={
                <UserOutlined style={{ color: 'rgba(255, 255, 255, 0.25)' }} />
              }
              placeholder="example@gmail.com"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  </>;
};

ForgetPassword.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Form.create()(ForgetPassword);
