/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WidgetFactory from '../widget-factory';
import { fetchWidgetData } from '../../api/widget-apis';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const LiveWidgetRenderer = props => {
  const {
    dataSource: data,
    id,
    widgetType,
    additionalInfo,
    mode,
    visibleMaximised,
  } = props;
  const [dataSource, setDataSource] = useState(data);
  useInterval(() => {
    fetchWidgetData({ widget_id: id, interval: true })
      .then(res => {
        if (res.data.data) {
          if (widgetType === 'number') setDataSource(res.data.data.data);
          const spliced = [...dataSource, ...res.data.data.data];
          spliced.shift();
          setDataSource(spliced);
        }
      })
      .catch(() => {});
  }, 15000);

  return (
    <>
      <WidgetFactory
        additionalInfo={additionalInfo}
        widgetType={widgetType}
        dataSource={dataSource}
        mode={mode}
        id={id}
        visibleMaximised={visibleMaximised}
      />
    </>
  );
};

LiveWidgetRenderer.propTypes = {
  dataSource: PropTypes.instanceOf([]).isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  id: PropTypes.string.isRequired,
  widgetType: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  visibleMaximised: PropTypes.bool.isRequired,
};
export default LiveWidgetRenderer;
