import React from 'react';
import LineIcon from '../../assets/icons/LineIcon';
import NumberIcon from '../../assets/icons/NumberIcon';
import BarIcon from '../../assets/icons/BarIcon';
import PieIcon from '../../assets/icons/PieIcon';
import ReportIcon from '../../assets/icons/ReportIcon';

const ListPossibleWidgets = (mode, widgetType) => {
  const line = {
    type: 'line',
    src: <LineIcon color={widgetType === 'line' ? '#fff' : '#848C94'} />,
    title: 'Line',
    des: 'Compares the live / aggregated readings over time',
  };
  const number = {
    type: 'number',
    src: <NumberIcon color={widgetType === 'number' ? '#fff' : '#848C94'} />,
    title: 'Number',
    des: 'Shows the Latest Reading / Aggregated Reading over a period',
  };
  const bar = {
    type: 'bar',
    src: <BarIcon color={widgetType === 'bar' ? '#fff' : '#848C94'} />,
    title: 'Bar',
    des: 'Compares the aggregated readings stacked by shift hours',
  };
  const pie = {
    type: 'pie',
    src: <PieIcon color={widgetType === 'pie' ? '#fff' : '#848C94'} />,
    title: 'Pie',
    des:
      'Compares the aggregated readings across equipments/ equipment types/ floors/ buildings',
  };
  const report = {
    type: 'report',
    src: <ReportIcon color={widgetType === 'report' ? '#fff' : '#848C94'} />,
    title: 'Report',
    des: 'Compares the aggregated readings over different time series',
  };

  switch (mode) {
    case 'live':
      return [line, number];
    case 'aggregated':
      return [line, number, bar, pie, report];
    default:
      return [];
  }
};

export default ListPossibleWidgets;
