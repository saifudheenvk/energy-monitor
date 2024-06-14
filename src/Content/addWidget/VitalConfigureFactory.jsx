/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import Icon from '@ant-design/icons';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import WidgetLabel from './WidgetLabel';
import WidgetColor from './WidgetColor';
import SelectVitalConfig from './SelectVitalConfig';
import LiveWidgetLabel from './LiveWidgetLabel';
import functions from './CommonFunctions';
import getDetails from './getAggregatedDetails';
import HelpPopover from '../../utils/HelpPopover';
import { helps } from '../../utils/HelpPopover/helpDescription';
import { useTranslation } from 'react-i18next';
import SelectDurationType from './SelectDurationType';
import DurationUnit from './DurationCount';

const StyledTable = styled(Table)`
  && {
    .ant-table-tbody {
      // background: #393b43 !important;
    }
  }
  .ant-table-thead > tr > th {
    border-bottom: 1px solid #848c94 !important;
    color: ${props => (props.themeState === 'dark' ? '#ffff' : '#49548D')};
    font-weight: normal;
    font-size: 14px;
    padding-bottom: 5px;
  }
  .ant-table-tbody > tr > td {
    color: #848c94 !important;
    padding: 14px;
    border-bottom: none !important;
  }
`;
const VitalConfigFactory = ({
  statistics,
  additionalInfo,
  dataSource,
  setDataSource,
  request,
  setAdditionalInfo,
  vital,
  labels,
  setLabels,
  isPieLabelRequired,
}) => {
  const themeState = useSelector(state => state.themeReducer);
  const [colors, setColors] = useState(
    additionalInfo.colors ? additionalInfo.colors : {}
  );
  const { t } = useTranslation();

  useEffect(() => {
    const agLevel =
      request.mode !== 'live' ? additionalInfo.aggregation_level : 'equipments';
    // removing items from label which is not present in dataSource
    setLabels(prevState =>
      prevState
        .map(label => {
          const cloned = { ...label };
          const elements = [...cloned[agLevel]];
          const newLabel = {
            ...cloned,
            [agLevel]: elements.filter(
              el =>
                dataSource.find(d =>
                  functions.compareObjects(d.key, el, request.mode)
                ) !== undefined
            ),
          };
          return newLabel;
        })
        .filter(l => l[agLevel].length > 0)
    );
  }, [dataSource]);

  // change vital in the labels on changing vital in filterOptions
  useEffect(() => {
    console.log('statistics', statistics);
    if (request.mode !== 'live') {
      setLabels(prevState => prevState.map(l => ({ ...l, vital })));
    }
  }, [vital]);

  useEffect(() => {
    // setting additional info when color object or labels changes and letting labels with elements
    const agLevel = [
      request.mode !== 'live' ? additionalInfo.aggregation_level : 'equipments',
    ];
    if (request.widgetType === 'number' || request.widgetType === 'report') {
      setAdditionalInfo(prevState => ({
        ...prevState,
        labels: labels.filter(l => l[agLevel].length !== 0),
      }));
    } else {
      setAdditionalInfo(prevState => ({
        ...prevState,
        labels: labels.filter(l => l[agLevel].length !== 0),
        colors,
      }));
    }
  }, [colors, labels, request.mode, request.widgetType, setAdditionalInfo]);

  const liveLabel = {
    title: t('Label'),
    dataIndex: 'key',
    render: (key, row) => (
      <LiveWidgetLabel
        key={JSON.stringify(key)}
        row={row}
        labels={labels}
        setLabels={setLabels}
        setColors={setColors}
      />
    ),
  };
  const LabelHead = styled.div`
    display: inline-flex;
  `;
  const label = {
    title: (
      <LabelHead>
        <p>{t('Label')}</p>
        <HelpPopover
          iconStyle={{ marginTop: '-1px', fontSize: '18px' }}
          helpList={[helps.configureVitals.labels]}
        />{' '}
      </LabelHead>
    ),
    dataIndex: 'key',
    render: (key, row) => (
      <WidgetLabel
        widgetType={request.widgetType}
        labels={labels}
        statistics={statistics}
        aggregationLevel={additionalInfo.aggregation_level}
        granularity={additionalInfo.aggregation_granularity}
        setLabels={setLabels}
        key={JSON.stringify(key)}
        row={row}
        colors={colors}
        setColors={setColors}
        vital={vital}
      />
    ),
  };
  const details = {
    title: t('Details'),
    dataIndex: 'details',
  };

  const AggregatedDetatils = {
    title: t('Details'),
    dataIndex: 'key',
    render: row => (
      <p>{getDetails(row, additionalInfo.aggregation_level, vital)}</p>
    ),
  };

  const aggregationStatistics = {
    title: (
      <LabelHead>
        <p>{t('Aggregation Statistics')}</p>
        <HelpPopover
          iconStyle={{ marginTop: '-1px', fontSize: '18px' }}
          helpList={[helps.configureVitals.statistics]}
        />{' '}
      </LabelHead>
    ),
    dataIndex: 'key',
    render: (key, row) => (
      <SelectVitalConfig
        key={JSON.stringify(key)}
        row={row}
        labels={labels}
        statistics={statistics}
        aggregationLevel={additionalInfo.aggregation_level}
        setLabels={setLabels}
        request={request}
      />
    ),
  };
  const color = {
    dataIndex: 'key',
    render: (key, row) => (
      <WidgetColor
        key={JSON.stringify(key)}
        row={row}
        aggregationLevel={additionalInfo.aggregation_level}
        colors={colors}
        labels={labels}
        setColors={setColors}
      />
    ),
    width: 'fit-content',
  };
  const del = {
    title: t('Delete'),
    dataIndex: 'key',
    render: key => {
      const index = dataSource.findIndex(d =>
        functions.compareObjects(d.key, key, request.mode)
      );
      return (
        <Icon
          component={DeleteIcon}
          onClick={() => {
            setDataSource([
              ...dataSource.slice(0, index),
              ...dataSource.slice(index + 1),
            ]);
          }}
          type="delete"
        />
      );
    },
  };

  const durationUnit = {
    title: 'Duration',
    dataIndex: 'key',
    render: (key, row) => (
      <DurationUnit
        key={JSON.stringify(key)}
        setLabels={setLabels}
        labels={labels}
        row={row}
        aggregationLevel={additionalInfo.aggregation_level}
      />
    ),
  };
  const durationType = {
    title: 'Duraton Unit',
    dataIndex: 'key',
    render: (key, row) => (
      <SelectDurationType
        key={JSON.stringify(key)}
        setLabels={setLabels}
        labels={labels}
        row={row}
        aggregationLevel={additionalInfo.aggregation_level}
      />
    ),
  };
  const columns = [
    color,
    label,
    AggregatedDetatils,
    aggregationStatistics,
    del,
  ];
  const columnsForNumber = [
    label,
    AggregatedDetatils,
    durationUnit,
    durationType,
    aggregationStatistics,
    del,
  ];
  const columnsForPie = [label, AggregatedDetatils, del];

  const TableColumns = () => {
    switch (request.widgetType) {
      case 'number':
        return request.mode === 'live'
          ? [liveLabel, details, del]
          : columnsForNumber;
      case 'line':
        return request.mode === 'live'
          ? [color, liveLabel, details, del]
          : columns;
      case 'bar':
        return columns;
      // this condition is to add label in future for pie chart
      case 'pie':
        return isPieLabelRequired ? columnsForPie : [AggregatedDetatils, del];
      case 'report':
        return [label, AggregatedDetatils, aggregationStatistics, del];
      default:
        return columns;
    }
  };
  return (
    <StyledTable
      themeState={themeState}
      dataSource={dataSource}
      columns={TableColumns()}
      pagination={false}
    />
  );
};
VitalConfigFactory.propTypes = {
  statistics: PropTypes.instanceOf([]).isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  dataSource: PropTypes.instanceOf([]).isRequired,
  setDataSource: PropTypes.func.isRequired,
  request: PropTypes.instanceOf({}).isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
  vital: PropTypes.string.isRequired,
  setLabels: PropTypes.func.isRequired,
  labels: PropTypes.instanceOf([]).isRequired,
  isPieLabelRequired: PropTypes.bool.isRequired,
};
export default VitalConfigFactory;
