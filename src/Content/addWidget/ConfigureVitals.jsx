/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import VitalConfigFactory from './VitalConfigureFactory';
import IntervalPicker from './IntervalPicker';
import SelectGranularity from './SelectGranularity';
import LiveDurationSelector from './LiveDurationSelector';
import HelpPopover from '../../utils/HelpPopover';
import { helps } from '../../utils/HelpPopover/helpDescription';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './AddWidgetModal';

const CommonConfigureContainer = styled.div`
  display: flex;HelpPopover
`;
const LabelSpan = styled.span`
  flex: 1 !important;
  margin: 5px !important;
`;
const ElementContainer = styled.div`
  display: flex !important;
  flex: 1 !important;
  margin: 10px !important;
  align-items: center;
`;
const ConfigureVitalContainer = styled.div`
width: 100%;
height: 50vh;
padding: 20px;
overflow-y: scroll;
outline: none;
::-webkit-scrollbar {
width: 3px;48, 36
}
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.scrolTrack}; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius:2px;
    background: ${props => props.theme.scrollThumb}; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.scrollThumbHover}; 
`;
const HeaderContainer = styled.div`
  display: inline-flex;
  flex: 3;
  align-items: center;
`;

const ConfigureVitals = props => {
  const {
    request,
    activeKey,
    setAdditionalInfo,
    additionalInfo,
    setFilterOptions,
    dataSource,
    vital,
  } = props;
  const { t } = useTranslation();
  const theme = useContext(ThemeContext);
  const themeState = useSelector(state => state.themeReducer);
  const [labels, setLabels] = useState(
    additionalInfo.labels ? additionalInfo.labels : []
  );

  const [isPieLabelRequired, setLabelRequired] = useState(false);
  useEffect(() => {
    if (request.widgetType === 'pie' && !isPieLabelRequired) {
      setLabels([
        {
          name: 'label',
          [additionalInfo.aggregation_level]: dataSource.map(d => d.key),
          aggregation_statistics: 'sum',
          vital,
        },
      ]);
    }
    if (activeKey !== '1') {
      setFilterOptions(prevState => ({
        ...prevState,
        companies: [],
        buildings: [],
        floors: [],
        equipmentTypes: [],
        equipments: [],
      }));
    }
  }, [activeKey]);
  return (
    <ConfigureVitalContainer themeState={themeState} theme={theme}>
      {request.mode !== 'live' && request.widgetType !== 'number' ? (
        <CommonConfigureContainer>
          <ElementContainer>
            <LabelSpan>{t('Granularity')}</LabelSpan>

            <HeaderContainer>
              <SelectGranularity
                setLabels={setLabels}
                labels={labels}
                additionalInfo={additionalInfo}
                setAdditionalInfo={setAdditionalInfo}
                request={request}
                dataSource={dataSource}
              />{' '}
              <HelpPopover helpList={[helps.configureVitals.granularity]} />
            </HeaderContainer>
          </ElementContainer>
          <ElementContainer>
            <LabelSpan>{t('Start Date')}</LabelSpan>
            <IntervalPicker
              setAdditionalInfo={setAdditionalInfo}
              additionalInfo={additionalInfo}
              selector="start_date"
              request={request}
            />
          </ElementContainer>
          <ElementContainer>
            <LabelSpan>{t('End Date')}</LabelSpan>
            <IntervalPicker
              additionalInfo={additionalInfo}
              setAdditionalInfo={setAdditionalInfo}
              selector="end_date"
              request={request}
            />
          </ElementContainer>
        </CommonConfigureContainer>
      ) : (
        request.widgetType === 'line' && (
          <LiveDurationSelector
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        )
      )}
      <VitalConfigFactory
        {...props}
        isPieLabelRequired={isPieLabelRequired}
        setLabelRequired={setLabelRequired}
        setLabels={setLabels}
        labels={labels}
      />
    </ConfigureVitalContainer>
  );
};
ConfigureVitals.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  request: PropTypes.string.isRequired,
  setFilterOptions: PropTypes.func.isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  activeKey: PropTypes.string.isRequired,
  dataSource: PropTypes.instanceOf([]).isRequired,
  vital: PropTypes.string.isRequired,
};

export default ConfigureVitals;
