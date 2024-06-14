/* eslint-disable no-unused-expressions */
import React, { useState, useContext } from 'react';
import { Input, Radio, Col, Row, Button, message, Select } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ListPossibleWidgets from './WidgetTypeFactory';
import WidgetCard from './WidgetCard';
import HelpPopover from '../../utils/HelpPopover';
import { helps } from '../../utils/HelpPopover/helpDescription';
import { ThemeContext } from './AddWidgetModal';
import { useTranslation } from 'react-i18next';
const AddWidgetCol = styled(Col)`
  margin-top: 4px;
  color: #6b7279;
  margin-bottom: 8px;
`;
const WidgetRow = styled(Row)`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;
const WidgetCol = styled(Col)`
  margin: 10px 0;
  // margin-bottom: 8px;
`;
const ButtonContainer = styled.div`
  padding: 20px;
`;
const ConfigureButton = styled(Button)`
  width: 100px;
  margin: 5px;
  color: #ffffff !important;
`;
const CancelButton = styled(Button)`
  width: 100px;
  margin: 5px;
`;
const WidgetInput = styled(Input)`
  ${props => props.theme.inputText}
`;

const AggregationSelect = styled(Select)`
  border-radius: 5px;
  width: 100%;
`;

const ChoseWidgetType = ({
  setAdditionalInfo,
  setWidgetState,
  request,
  setRequest,
  setVisible,
  hierarchyList,
}) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState('aggregated');
  const [widgetName, setWidgetName] = useState('');
  const [widgetType, setWidgetType] = useState('');
  const theme = useContext(ThemeContext);

  return (
    <div>
      <Row>
        <WidgetCol xl={12} lg={24}>
          <Row>
            <AddWidgetCol md={8} sm={24}>
              {t('Widget Name')}:
            </AddWidgetCol>
            <Col md={12} sm={24}>
              <WidgetInput
                theme={theme}
                defaultValue={widgetName}
                onChange={event => {
                  setWidgetName(event.target.value);
                }}
              />
            </Col>
          </Row>
        </WidgetCol>
      </Row>

      <WidgetRow>
        <WidgetCol xl={12} lg={24}>
          <Row gutter={8}>
            <AddWidgetCol span={13}>
              {t('Analyse aggregated readings')}:
            </AddWidgetCol>
            <Col style={{ display: 'inline-flex' }} span={11}>
              <Radio.Group
                defaultValue={mode}
                size="default"
                onChange={e => {
                  if (e.target.value === 'live')
                    setRequest({ ...request, aggregation_level: 'equipments' });
                  setMode(e.target.value);
                  setWidgetType('');
                }}
              >
                <Radio.Button value="aggregated">{t('Yes')}</Radio.Button>
                <Radio.Button value="live">{t('No')}</Radio.Button>
              </Radio.Group>
              <HelpPopover helpList={helps.chooseWidget.aggregationMode} />
            </Col>
          </Row>
        </WidgetCol>
        {mode !== 'live' && (
          <>
            <Col xl={11} lg={21}>
              <Row>
                <AddWidgetCol md={8} sm={24}>
                  {t('Aggregation Level')} :
                </AddWidgetCol>
                <Col span={11}>
                  <AggregationSelect
                    theme={theme}
                    defaultValue="equipments"
                    onChange={val => {
                      setAdditionalInfo(prevState => ({
                        ...prevState,
                        aggregation_level: val,
                      }));
                    }}
                  >
                    {hierarchyList.map(
                      item =>
                        item !== 'vitals' && (
                          <Select.Option value={item}>
                            {t(
                              item.charAt(0).toUpperCase() +
                                item
                                  .slice(1)
                                  .split(/(?=[/A-Z])/)
                                  .join(' ')
                            )}
                          </Select.Option>
                        )
                    )}
                  </AggregationSelect>
                </Col>
                <Col xl={1} lg={1}>
                  <HelpPopover
                    helpList={[helps.chooseWidget.aggregationLevel]}
                  />
                </Col>
              </Row>
            </Col>
          </>
        )}
      </WidgetRow>

      <h3 style={{ color: '#848C94', margin: '20px', marginLeft: '0px' }}>
        {t('Select Widget Type')}
      </h3>
      <Row
        gutter={[24, 36]}
        type="flex"
        justify="space-evenly"
        style={{
          width: '95%',
          margin: 'auto',
          justifyContent: mode !== 'live' ? 'space-evenly' : 'start',
        }}
      >
        {' '}
        {ListPossibleWidgets(mode, widgetType).map(type => {
          return (
            <WidgetCard
              widgetType={widgetType}
              setWidgetType={setWidgetType}
              type={type}
            />
          );
        })}
      </Row>
      <Row justify="end">
        <Col>
          <ButtonContainer>
            <CancelButton
              type="default"
              key="back"
              onClick={() => {
                setVisible(false);
              }}
            >
              {t('Cancel')}
            </CancelButton>
            <ConfigureButton
              key="submit"
              type="primary"
              onClick={() => {
                setRequest({
                  ...request,
                  widgetName,
                  widgetType,
                  mode,
                });
                widgetType !== '' && widgetName !== ''
                  ? setWidgetState('configure')
                  : message.error('Please give widget type and widget name');
              }}
            >
              {t('Configure')}
            </ConfigureButton>
          </ButtonContainer>
        </Col>
      </Row>
    </div>
  );
};
ChoseWidgetType.propTypes = {
  request: PropTypes.instanceOf({}).isRequired,
  setVisible: PropTypes.func.isRequired,
  setRequest: PropTypes.func.isRequired,
  setWidgetState: PropTypes.func.isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
  hierarchyList: PropTypes.instanceOf([]).isRequired,
};
export default ChoseWidgetType;
