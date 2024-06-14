/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
import VitalTabs from './VitalTabs';
import { useContext } from 'react';
import { ThemeContext } from './AddWidgetModal';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ButtonContainer = styled.div`
  padding: 10px 0;
`;
const WidgetNameInput = styled(Input)`
  ${props => props.theme.inputText}
`;
const TypeInput = styled(Input)`
  && {
    ${props => props.theme.inputText}
  }
`;
const FormItem = styled(Form.Item)`
  & .ant-form-item-label > label {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #848c94;
    margin-right: 15px;
  }

  & .ant-legacy-form-item-label {
    margin-left: ${props => (props.lang === 'ar' ? '5px' : '0')};
  }
`;
const ConfigureButton = styled(Button)`
  margin: 5px 0px 5px 10px;
  color: #ffffff !important;
`;
const CancelButton = styled(Button)`
  margin: 5px 0px 5px 10px;
`;
const ChoseVitals = props => {
  const {
    widgetState,
    setWidgetState,
    request,
    setVisible,
    setRequest,
    handleModalSubmit,
    additionalInfo,
    loading,
  } = props;
  const [activeKey, setActiveKey] = useState('1');
  const theme = useContext(ThemeContext);
  const lang = useSelector(state => state.lang);
  const { t } = useTranslation();
  return (
    <div>
      <Form layout="inline">
        <Row gutter={24}>
          <Col sm={24} md={24} lg={12} xl={12}>
            <FormItem label={t('Widget Name')} lang={lang}>
              <WidgetNameInput
                theme={theme}
                value={request.widgetName}
                onChange={e => {
                  setRequest({ ...request, widgetName: e.target.value });
                }}
                lang={lang}
              />
            </FormItem>
          </Col>
          <Col sm={24} md={24} lg={12} xl={12}>
            <FormItem label={t('Type')} lang={lang}>
              <TypeInput
                value={
                  request &&
                  request.widgetType &&
                  request.widgetType.charAt(0).toUpperCase() +
                    request.widgetType.slice(1)
                }
                disabled
                theme={theme}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row style={{ marginTop: '30px', borderBottom: '1px solid #848c94' }}>
        <VitalTabs
          {...props}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
        />
      </Row>
      <Row justify="end">
        <Col>
          <ButtonContainer>
            <CancelButton
              key="back"
              type="default"
              onClick={() => {
                setVisible(false);
                setWidgetState('selectGraph');
              }}
            >
              {t('Cancel')}
            </CancelButton>
            <ConfigureButton
              loading={loading}
              key="submit"
              type="primary"
              onClick={() => {
                // setVisible(false);
                handleModalSubmit();
              }}
              disabled={
                !(
                  activeKey !== '1' &&
                  additionalInfo &&
                  additionalInfo.labels &&
                  additionalInfo.labels.length !== 0
                )
              }
            >
              {widgetState === 'edit' ? t('Update Widget') : t('Create Widget')}
            </ConfigureButton>
          </ButtonContainer>
        </Col>
      </Row>
    </div>
  );
};
ChoseVitals.propTypes = {
  request: PropTypes.instanceOf({}).isRequired,
  setWidgetState: PropTypes.func.isRequired,
  setRequest: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  handleModalSubmit: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  widgetState: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ChoseVitals;
