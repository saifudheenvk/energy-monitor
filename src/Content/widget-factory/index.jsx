import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BarchartRenderer from './BarChart';
import LinechartRenderer from './lineChart';
import NumberWidget from './NumberWidget/NumberWidget';
import ReportWidget from './ReportWidget';
import PieChartRenderer from './PieChart';

const WidgetFactory = ({
  widgetType,
  dataSource,
  id,
  mode,
  additionalInfo,
  visibleMaximised,
  printRef,
}) => {
  useEffect(() => {}, []);
  switch (widgetType) {
    case 'bar':
      return (
        <BarchartRenderer
          data={dataSource}
          id={id}
          additionalInfo={additionalInfo}
          visibleMaximised={visibleMaximised}
        />
      );
    // return <div></div>
    case 'line':
      return (
        <LinechartRenderer
          id={id}
          data={dataSource}
          mode={mode}
          additionalInfo={additionalInfo || {}}
          visibleMaximised={visibleMaximised}
        />
      );
    case 'number':
      return (
        <NumberWidget
          id={id}
          data={dataSource}
          mode={mode}
          additionalInfo={additionalInfo}
        />
      );
    case 'pie':
      return (
        <PieChartRenderer
          key={id}
          data={dataSource}
          additionalInfo={additionalInfo || {}}
        />
      );
    case 'report':
      return (
        <ReportWidget
          additionalInfo={additionalInfo || {}}
          data={dataSource}
          printRef={printRef}
        />
      );
    default:
      return (
        <div
          style={{
            width: '100%',
            minwidth: '50px',
            height: '77%',
            display: 'flex',
          }}
        >
          <p style={{ width: 'max-content', margin: 'auto' }}>
            <b>No Widget Configured!</b>
          </p>
        </div>
      );
  }
};
WidgetFactory.propTypes = {
  widgetType: PropTypes.string.isRequired,
  dataSource: PropTypes.instanceOf([]).isRequired,
  id: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  printRef: PropTypes.node.isRequired,
  visibleMaximised: PropTypes.bool.isRequired,
};
export default WidgetFactory;
