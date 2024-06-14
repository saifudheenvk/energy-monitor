import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Typography, Button, Col, message, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { SaveOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { updateProfile, fetchProfile } from '../../api/ProfileApi';
import { setUserDetails } from '../../redux/actions/login';

const Title = styled(Typography.Title)`
  && {
    font-size: 20px;
  }
`;

const FormItem = styled(Form.Item)`
  & .ant-legacy-form-item-label > label {
    float: ${props => props.lang === 'ar' && 'right'};
  }
`;

const StyledInput = styled(Input)`
  height: 45px;
  &.ant-input[disabled] {
    background: ${props => (props.themeState === 'dark' ? '' : '#F6F7F9 !important')};
    border: ${props =>
      props.themeState !== 'dark' ? '1px solid #E1E6ED !important' : ''};
  }
`;

const ProfileButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

const EditorCancelButton = styled(Button)`
  margin-right: 10px;
  width: 103px;
  @media (max-width: 400px) {
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

const ProfileSaveButton = styled(Button)`
  width: 103px;
  margin-right: 10px;
  @media (max-width: 400px) {
    margin-right: 0;
  }
`;

const UserProfile = ({ form, setIsEdit, isEdit }) => {
  const { getFieldDecorator, validateFields } = form;
  const lang = useSelector(state => state.lang);
  const themeState = useSelector(state => state.themeReducer);
  const { t } = useTranslation();
  const userProfile = useSelector(state => state.loginStat);
  const dispatch = useDispatch();

  const userDetails = JSON.parse(localStorage.getItem('userCredentials'));

  const initilaParams = {
    id: userDetails.UserId,
    btnSubmit: 'Save',
  };

  const getUserDetails = () => {
    const requestParams = {
      id: userDetails.UserId,
    };
    fetchProfile(requestParams).then(res => {
      if (res.data) {
        const profileDetails = {
          FirstName: res.data.data.FirstName,
          LastName: res.data.data.LastName,
          Username: res.data.data.Username,
          EmailAddr: res.data.data.EmailAddr,
          Phoneno: res.data.data.Phoneno,
        };
        dispatch(setUserDetails(profileDetails));
      }
    });
  };

  const updateUserDetails = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const newParams = {
          ...initilaParams,
          FirstName: values.FirstName,
          LastName: values.LastName,
          EmailAddr: values.EmailAddr,
          Phoneno: values.Phoneno,
        };

        updateProfile(newParams).then(res => {
          if (res.data) {
            if (res.data.result) {
              message.success(res.data.msg);
              getUserDetails();
            } else {
              message.error(res.data.msg);
            }
          }
        });
        setIsEdit(false);
      }
    });
  };

  const handleCancelButton = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      onSubmit={updateUserDetails}
      key={isEdit ? 0 : 1}
      layout="vertical"
      labelCol={{ span: 24 }}
    >
      <Title level={2}>{t('Profile Details')}</Title>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <FormItem label={t('First Name')} lang={lang}>
            {getFieldDecorator('FirstName', {
              initialValue: userProfile.FirstName,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <StyledInput
                themeState={themeState}
                placeholder={t('First Name')}
                disabled={!isEdit}
              />
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <FormItem label={t('Last Name')} lang={lang}>
            {getFieldDecorator('LastName', {
              initialValue: userProfile.LastName,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <StyledInput
                themeState={themeState}
                placeholder={t('Last Name')}
                disabled={!isEdit}
              />
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <FormItem label={t('Email Address')} lang={lang}>
            {getFieldDecorator('EmailAddr', {
              initialValue: userProfile.EmailAddr,
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please enter your email',
                },
              ],
            })(
              <StyledInput
                themeState={themeState}
                type="email"
                placeholder={t('Email')}
                disabled={!isEdit}
              />
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <FormItem label={t('Phone no')} lang={lang}>
            {getFieldDecorator('Phoneno', {
              initialValue: userProfile.Phoneno,
              rules: [
                {
                  required: true,
                  message: 'Please enter your phone number',
                },
              ],
            })(
              <StyledInput
                themeState={themeState}
                placeholder={t('Phone Number')}
                disabled={!isEdit}
              />
            )}
          </FormItem>
        </Col>
        <Col span={24}>
          <ProfileButtonContainer>
            {!isEdit && (
              <EditorCancelButton
                icon={<EditOutlined />}
                type="primary"
                ghost
                onClick={() => setIsEdit(true)}
              >
                {t('Edit')}
              </EditorCancelButton>
            )}
            {isEdit && (
              <>
                <EditorCancelButton
                  icon={<CloseOutlined />}
                  type="primary"
                  ghost
                  onClick={handleCancelButton}
                >
                  {t('Cancel')}
                </EditorCancelButton>
                <ProfileSaveButton
                  icon={<SaveOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  {t('Save')}
                </ProfileSaveButton>
              </>
            )}
          </ProfileButtonContainer>
        </Col>
      </Row>
    </Form>
  );
};

UserProfile.propTypes = {
  form: PropTypes.instanceOf({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  setIsEdit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'user_info' })(UserProfile);
