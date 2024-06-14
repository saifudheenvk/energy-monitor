/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import ChooseVitalsContainer from './ChooseVitalsContainer';
import ConfigureVitals from './ConfigureVitals';
import ConfigureGraphContainer from './ConfigureGraph';
import ConfigureNumberWidget from './ConfigureNumberWidget';
import functions from './CommonFunctions';
import PieGraphConfig from './pie/PieGraphConfig';
import { useTranslation } from 'react-i18next';
import ReportGraphConfig from './report/ReportGrapghConfig';
import styled from 'styled-components';

const { TabPane } = Tabs;

const VitalsTabPane = styled(TabPane)`
  && {
    outline: none;
  }
`;

const VitalTabs = props => {
  const {
    request,
    dataSource,
    setDataSource,
    setVital,
    filterOptions,
    additionalInfo,
    setListType,
    widgetState,
    activeKey,
    setActiveKey,
  } = props;
  const { t } = useTranslation();

  useEffect(() => {
    setActiveKey(widgetState !== 'edit' ? '1' : '2');
  }, [widgetState]);
  const changeTab = key => {
    setActiveKey(key);
  };
  return (
    <Tabs
      type="card"
      style={{ width: '100%' }}
      onChange={k => {
        setActiveKey(k);
        functions.updateDataSourceOnChangingTab(
          filterOptions,
          request,
          setVital,
          additionalInfo,
          dataSource,
          setDataSource
        );
        setListType('companies');
      }}
      activeKey={activeKey}
    >
      <VitalsTabPane tab={t('Choose Vitals')} key="1">
        <ChooseVitalsContainer {...props} changeTab={changeTab} />
      </VitalsTabPane>

      <VitalsTabPane tab={t('Configure Vitals')} key="2">
        <ConfigureVitals {...props} activeKey={activeKey} />
      </VitalsTabPane>
      <VitalsTabPane tab={t('Configure Graph')} key="3">
        {(request.widgetType === 'bar' || request.widgetType === 'line') && (
          <ConfigureGraphContainer {...props} />
        )}
        {request.widgetType === 'number' && (
          <ConfigureNumberWidget {...props} />
        )}
        {request.widgetType === 'pie' && <PieGraphConfig {...props} />}
        {request.widgetType === 'report' && <ReportGraphConfig />}
      </VitalsTabPane>
    </Tabs>
  );
};
VitalTabs.propTypes = {
  request: PropTypes.instanceOf({}).isRequired,
  setListType: PropTypes.func.isRequired,
  widgetState: PropTypes.string.isRequired,
  setDataSource: PropTypes.func.isRequired,
  setVital: PropTypes.func.isRequired,
  dataSource: PropTypes.instanceOf([]).isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  filterOptions: PropTypes.instanceOf({}).isRequired,
  activeKey: PropTypes.string.isRequired,
  setActiveKey: PropTypes.func.isRequired,
};
export default VitalTabs;
