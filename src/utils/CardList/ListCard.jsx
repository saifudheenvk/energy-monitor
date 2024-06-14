import React, { useContext } from 'react';
import { Card, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ThemeContext } from '../../Content/addWidget/AddWidgetModal';

const CardContainer = styled(Card)`
  && {
    direction: ltr;
    border-radius: 5px;
    background: ${props =>
      props.isChecked ? props.theme.selectedCard : `none`} !important;
    box-shadow: ${props =>
      props.isChecked ? ` 0px 4px 4px rgba(0, 0, 0, 0.25)` : `none`};
    color: #6b7279 !important;
  }
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.selectedCard} !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  position: relative;
  border: ${props =>
    props.isChecked ? `1px solid #848C94` : `1px solid #6B7279`} !important;
`;
const HeaderContainer = styled.p`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => (props.isChecked ? `#FFFFFF` : `#6b7279`)};
  margin-bottom: 3px;
`;
const ItemCardKeys = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin: 0px;
`;
const ListCard = ({ item, keyset, headKey, isChecked, onCardClick }) => {
  const theme = useContext(ThemeContext);
  return (
    <CardContainer
      // title={item[headKey]}
      theme={theme}
      isChecked={isChecked}
      onClick={() => {
        onCardClick(item);
      }}
    >
      <Tooltip title={item[headKey]} placement="topRight">
        <HeaderContainer isChecked={isChecked}>{item[headKey]}</HeaderContainer>
      </Tooltip>
      {keyset.map(key => (
        // <Col span={24}>
        <ItemCardKeys>{item[key]}</ItemCardKeys>
        // </Col>
      ))}
    </CardContainer>
  );
};
ListCard.propTypes = {
  item: PropTypes.instanceOf({}).isRequired,
  keyset: PropTypes.arrayOf(PropTypes.string).isRequired,
  headKey: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default ListCard;
