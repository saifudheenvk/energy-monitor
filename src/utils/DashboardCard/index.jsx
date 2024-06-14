import React from 'react';
import { Card as AntdCard, Row, Col, Avatar, Tooltip } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const CardContainer = styled(AntdCard)`
  border: ${props =>
    props.themeState === 'dark' ? '' : '1px solid #E1E6ED'} !important;
  border-radius: 10px !important;
  &:hover {
    box-shadow: 3px 3px 10px 7px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  @media (max-width: 415px) {
    & .ant-card-body {
      padding: 24px 16px;
    }
  }
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 35px;
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 5px 0;
`;

const CardContents = styled.p`
  margin-bottom: 6px;
  font-size: 11px;
  color: #848c94;
`;

const CardData = styled.span`
  margin-bottom: 6px;
  font-size: 15px;
  color: ${props => {
    return props.themeState !== 'dark' ? '#848c94' : '#FFFFFF';
  }};
`;

const CardSpan = styled.p`
  margin-bottom: 6px !important;
  font-size: ${props => {
    return props.isId ? '12px' : '11px';
  }};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => {
    return props.isId ? '#C4C4C4' : '#FFFFFF';
  }};
`;

const StarIcon = styled(StarFilled)`
  color: #ffc107 !important;
  margin: 5px 0;
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
  &:hover {
    color: #ffd230;
    transform: scale(1.2);
  }
`;

const OutlinedStarIcon = styled(StarOutlined)`
  color: #848c94;
  margin: 5px 0;
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
  &:hover {
    color: #ffc107;
    transform: scale(1.2);
  }
`;

const DashboardCard = ({ item, onFavoriteClick, onCardClick }) => {
  const themeState = useSelector(state => state.themeReducer);
  const { t } = useTranslation();
  const iconClick = (event, id, status, action) => {
    event.stopPropagation();
    onFavoriteClick(id, status, action);
  };
  return (
    <CardContainer
      themeState={themeState}
      onClick={() => {
        onCardClick(item.Id, item.name);
      }}
    >
      <CardTitleContainer>
        <CardTitle>{item.name || ' '}</CardTitle>
        {item.icon ? (
          <StarIcon
            type="star"
            theme="filled"
            onClick={event => {
              iconClick(event, item.Id, false, 'Unfavoriting');
            }}
          />
        ) : (
          <OutlinedStarIcon
            type="star"
            theme="outlined"
            onClick={event => {
              iconClick(event, item.Id, true, 'Favoriting');
            }}
          />
        )}
      </CardTitleContainer>
      <>
        <Row gutter={6}>
          <Col span={24}>
            <CardContents>{t('Created By')}</CardContents>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CardSpan>
              <Avatar
                style={{
                  marginRight: '10px',
                  background: themeState === 'dark' ? '' : '#E1E6ED',
                }}
              >
                {item.createdBy[0].toUpperCase()}
              </Avatar>
              <CardData themeState={themeState}>{item.createdBy}</CardData>
            </CardSpan>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={24}>
            <CardContents>{t('Created Date')}</CardContents>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CardSpan>
              <CardData themeState={themeState}>
                {item.createDate
                  ? item.createDate
                  // moment(parseInt(item.createDate, 10)).format(
                  //     item.dateFormat
                  //   )
                  : t('No Created Date')}
              </CardData>
            </CardSpan>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={24}>
            <CardContents>{t('Last Updated Date')}</CardContents>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CardSpan>
              <CardData themeState={themeState}>
                {item.lastUpdatedDate
                  ? item.lastUpdatedDate
                  //  moment(parseInt(item.lastUpdatedDate, 10)).format(
                  //     item.dateFormat
                  //   )
                  : t('No Updated Date')}
              </CardData>
            </CardSpan>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={24}>
            <CardContents>{t('Assigned To')}</CardContents>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CardSpan>
              <CardData themeState={themeState}>
                {item.tag ? (
                  <Tooltip
                    overlayStyle={{
                      color: themeState !== 'dark' ? '#848c94' : '#FFFFFF',
                    }}
                    title={item.tag}
                  >
                    {item.tag}
                  </Tooltip>
                ) : (
                  t('Not yet Assigned')
                )}
              </CardData>
            </CardSpan>
          </Col>
        </Row>
      </>
    </CardContainer>
  );
};

DashboardCard.propTypes = {
  item: PropTypes.instanceOf({}).isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default DashboardCard;
