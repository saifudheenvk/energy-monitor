import React from 'react';
import { Empty, Col, Row, Card, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import dashboardDummyData from '../../render-dashboard/dummy';
import FavoriteDashboardItem from '../../home/FavoriteDashboardItem';
import { useSelector } from 'react-redux';

const AssignedCard = styled(Card)`
  && {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: none;
    margin-bottom: 15px;
  }

  & .ant-card-body {
    background: ${props => props.theme === 'dark' ? '#34363e' : '#FFFFFF'};
    padding: 24px 0 0;
  }
`;

const AssignedCardFooter = styled.div`
  background: ${props => props.theme === 'dark' ? '#3b3e48' : '#ffffff'};
  height: 38px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px 15px;
  font-size: 12px;
  color: #838c95;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const AssignedCardFooterMoreButton = styled(Button)`
&& {
  border: none;
  font-size: 12px;
}
`;

const AssignedDashboardContainer = ({ dashboardDetail }) => {
  const history = useHistory();
  const themeState = useSelector(state => state.themeReducer);
  const redirectToAssignedDashBoard = (id, dashName) => {
    history.push(`${history.location.pathname}/${id}/${dashName}`);
  };

  return dashboardDetail.map(item => {
    return (
      <AssignedCard
        headStyle={{
          background: themeState === 'dark' ? '#3B3E48' : '#E1E6ED',
          fontSize: '20px',
          fontWeight: '600',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
        title={item.dash_name}
        theme={themeState}
      >
        <Row>
          {console.log('history', history)}
          {item.widgets && item.widgets.length > 0 ? (
            item.widgets.map((widgetItem, index) => {
              return (
                <>
                  {index <= 1 && (
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      style={{ padding: '10px' }}
                    >
                      <FavoriteDashboardItem item={widgetItem} />
                    </Col>
                  )}
                </>
              );
            })
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No widgets</span>}
            />
          )}
        </Row>
        <AssignedCardFooter theme={themeState} >
          {item.widgets && item.widgets.length > 0 && (
            <AssignedCardFooterMoreButton
              onClick={() => {
                redirectToAssignedDashBoard(item.id, item.dash_name);
              }}
            >
              More...
            </AssignedCardFooterMoreButton>
          )}
        </AssignedCardFooter>
      </AssignedCard>
    );
  });
};

export default AssignedDashboardContainer;
