/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card as AntdCard, Row, Col, Avatar, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { statuses } from '../../../utils/AlertStatus';

const CardContainer = styled(AntdCard)`
  & .ant-card-body {
    padding: 0;
    margin: 0;
  }
  border-radius: 10px !important;
  //   border-bottom: 27px solid #9dce4e !important;
  &:hover {
    box-shadow: 3px 3px 10px 7px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  border: ${props => (props.themeState === 'dark' ? '' : '1px solid #E1E6ED')} !important;
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  @media (max-width: 870px) {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const CardContents = styled.p`
  margin-bottom: 6px;
  font-size: 11px;
  color: #848c94;
`;

const AlertCardRow = styled(Row)`
  ${props => props.isAssignee && 'height: 30px;'}
`;

const CardSpan = styled.p`
  margin-bottom: 6px !important;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #c4c4c4;
  font-weight: 400;
  // font-weight: ${props => (props.isUser ? '300' : '400')};
`;

const AlertStatusContainer = styled.div`
  width: 100%;
  height: 27px;
  background-color: ${props => statuses[props.status]};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px 15px;
  font-size: 11px;
  color: #ffffff;
`;

const AlertProfileImage = styled(Avatar)`
  && {
    margin-right: 0.3rem;
  }
`;

const AlertsCard = ({ item, detailedItem }) => {
  const themeState = useSelector(state => state.themeReducer);
  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const { t } = useTranslation();

  return (
    <CardContainer 
    themeState={themeState}
    >
      <div style={{ padding: '24px' }}>
        <CardTitle>{item.AlertTypeName || ' '}</CardTitle>
        {Object.entries(item).map(([key, value]) => {
          return (
            <Fragment>
              <AlertCardRow gutter={6} isAssignee={key === 'assignedTo'}>
                {key !== 'AlertTypeName' && key !== 'CurrentStatus' && (
                  <>
                    <Col span={12}>
                      <CardContents>
                        {t(capitalize(key.split(/(?=[/A-Z])/).join(' ')))}
                      </CardContents>
                    </Col>
                    <Col span={2} style={{ color: '#848c94' }}>
                      :
                    </Col>
                    <Col
                      span={key === 'assignedTo' ? 10 : 9}
                      style={{ display: 'flex', alignItems: 'baseline' }}
                    >
                      {key === 'assignedTo' &&
                        value &&
                        value.map((assignee, index) => {
                          if (index <= 4) {
                            return (
                              <Tooltip title={assignee.Username}>
                                <AlertProfileImage icon="user" size={29} />
                              </Tooltip>
                            );
                          }
                        })}
                      {key !== 'assignedTo' && (
                        <CardSpan>{value || ' '}</CardSpan>
                      )}
                    </Col>
                  </>
                )}
              </AlertCardRow>
            </Fragment>
          );
        })}
      </div>
      <AlertStatusContainer status={item.CurrentStatus || 'OPENED'}>
        {item.CurrentStatus || 'OPENED'}
      </AlertStatusContainer>
    </CardContainer>
  );
};
AlertsCard.propTypes = {
  item: PropTypes.instanceOf({}).isRequired,
  detailedItem: PropTypes.instanceOf({}).isRequired,
};
export default AlertsCard;
