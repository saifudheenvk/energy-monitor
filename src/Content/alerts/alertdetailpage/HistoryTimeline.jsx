import React from 'react';
import { Timeline, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
const TimeLineItem = styled(Timeline.Item)``;
const HistoryTimeLineContainer = styled(Timeline)`
  & .ant-timeline-item-tail {
    border-left: ${props =>
      props.theme === 'dark'
        ? ' 2px solid #565656'
        : ' 2px solid #cad3de'} !important;
  }
`;
const DateContainer = styled.div`
  font-size: 12px;
`;
const StatusContainer = styled.div`
  font-size: 14px;
  color: ${props => (props.theme === 'dark' ? '#fff' : '#49538c')};
`;
const HistoryTimeline = ({ histories }) => {
  const theme = useSelector(state => state.themeReducer);

  return (
    <HistoryTimeLineContainer theme={theme}>
      {histories.map(item => (
        <TimeLineItem>
          <Row>
            <Col span={24}>
              <StatusContainer theme={theme}>
                {item.CurrentStatus}
              </StatusContainer>
            </Col>
            <Col span={24}>
              <DateContainer>{item.DateInserted}</DateContainer>
            </Col>
          </Row>
        </TimeLineItem>
      ))}
    </HistoryTimeLineContainer>
  );
};
export default HistoryTimeline;
