/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styled from 'styled-components';
import { fetchWidgetData } from '../../api/widget-apis';
import WidgetFactory from '../widget-factory';
import LiveWidgetRenderer from './LiveWidgetRenderer';
import EmptyMessage from '../../utils/EmptyMessage';

const SpinContainer = styled.div`
  // text-align: center;printRef
  margin: 2rem 0;
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WidgetApiWrapper = ({ mode, itemId, visibleMaximised, printRef }) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [widgetType, setWidgetType] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState({});
  useEffect(() => {
    setLoading(true);
    fetchWidgetData({ widget_id: itemId })
      .then(({ data }) => {
        if (data.data && data.data.data) {
          setWidgetType(data.data.widget_type);
          setAdditionalInfo(JSON.parse(data.data.additional_info));
          setDataSource(data.data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [itemId]);
  return !loading ? (
    (dataSource && dataSource.length) ||
    (dataSource && Object.keys(dataSource).length) ? (
      <>
        {mode === 'live' ? (
          <LiveWidgetRenderer
            mode={mode}
            id={itemId}
            widgetType={widgetType}
            dataSource={dataSource}
            additionalInfo={additionalInfo}
            visibleMaximised={visibleMaximised}
          />
        ) : (
          <WidgetFactory
            widgetType={widgetType}
            dataSource={dataSource}
            id={itemId}
            additionalInfo={additionalInfo}
            visibleMaximised={visibleMaximised}
            printRef={printRef}
          />
        )}
      </>
    ) : (
      <EmptyMessage message="No data" height="calc(100% - 80px)" />
    )
  ) : (
    <SpinContainer>
      <Spin />
    </SpinContainer>
  );
};
WidgetApiWrapper.propTypes = {
  mode: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  visibleMaximised: PropTypes.bool.isRequired,
  printRef: PropTypes.node.isRequired,
};
export default WidgetApiWrapper;
