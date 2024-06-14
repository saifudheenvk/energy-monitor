import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getTableColumns } from './utils';

const WidgetWrapper = styled.div`
  width: inherit;
  height: 75%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px !important;
  }
  scrollbar-color: ${props =>
    props.themeState !== 'dark' ? '#E5E5E5 #fff' : ''} !important;
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${props =>
      props.themeState === 'dark' ? '#32343c' : '#d9d9d9'} !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 2px !important;
    background: ${props =>
      props.themeState === 'dark' ? '#888' : '#b2b2b2'} !important;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555 !important;
  }
`;
const ReportWidget = props => {
  const themeState = useSelector(state => state.themeReducer);
  const { data, additionalInfo, printRef } = props;
  return (
    data.length && (
      <WidgetWrapper className="graph" themeState={themeState} ref={printRef}>
        <Table
          pagination={false}
          columns={getTableColumns(
            data[0],
            additionalInfo.aggregation_granularity
          )}
          dataSource={data}
        />
      </WidgetWrapper>
    )
  );
};
ReportWidget.propTypes = {
  data: PropTypes.instanceOf([]).isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  printRef: PropTypes.node.isRequired,
};
export default ReportWidget;
