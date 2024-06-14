import React from 'react';
import { Form } from '@ant-design/compatible';
import styled from 'styled-components';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const StyledInput = styled(Input)`
  background: ${props =>
    props.themeState === 'dark' ? '' : '#fff !important'};
`;

const DashboardName = ({
  handleCancel,
  handleCreate,
  showModal,
  dashboardName,
  setShowModal,
  form,
  title,
}) => {
  const themeState = useSelector(state => state.themeReducer);
  const { t } = useTranslation();
  const handleForm = () => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      handleCreate(values);
      form.resetFields();
      setShowModal(false);
    });
  };
  const { getFieldDecorator } = form;
  return (
    <Modal
      okText={dashboardName ? 'Update' : 'Create'}
      onOk={handleForm}
      onCancel={handleCancel}
      title={t(title)}
      visible={showModal}
    >
      <Form layout="vertical">
        <Form.Item label="Dashboard Name">
          {getFieldDecorator('dash_name', {
            initialValue: dashboardName,
            rules: [
              {
                required: true,
                message: 'Please enter the dashboard name',
              },
            ],
          })(<StyledInput themeState={themeState} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};
DashboardName.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  dashboardName: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
  form: PropTypes.node.isRequired,
};
export default Form.create({ name: 'form_in_modal' })(DashboardName);
