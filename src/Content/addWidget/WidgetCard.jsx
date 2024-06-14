import React, { useContext } from 'react';
import { Col, Card } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeContext } from './AddWidgetModal';
import { useTranslation } from 'react-i18next';

const WidgetCol = styled(Col)`
  // margin: 15px;
  height: 300px;
`;

const WidgetDescription = styled.p`
  color: #6b7279;
  //text-align: justify;
  font-size: 12px;
`;

const StyledCard = styled(Card)`
  && {
    max-width: 170px;
    border: 1px solid #6b7279 !important;
    box-sizing: border-box;
    border-radius: 7px;
    ${props =>
      props.flag === true
        ? `box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);background:${props.theme.selectedCard}`
        : 'background:none'} !important;
  }
`;

const WidgetTitle = styled.span`
  color: ${props =>
    props.flag === true ? props.theme.selctedTitle : '#6B7279'} !important;
  font-size: 18px;
`;
const WidgetCard = ({ type, setWidgetType, widgetType }) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <WidgetCol
      lg={8}
      xl={4}
      md={8}
      xs={24}
      sm={12}
      xxl={4}
      onClick={() => setWidgetType(type.type)}
    >
      <StyledCard
        theme={theme}
        bodyStyle={{ padding: 25 }}
        flag={widgetType === type.type}
      >
        {type.src}
      </StyledCard>
      <WidgetTitle theme={theme} flag={widgetType === type.type}>
        {t(type.title)}
      </WidgetTitle>
      <br />
      <WidgetDescription>{t(type.des)}</WidgetDescription>
    </WidgetCol>
  );
};
WidgetCard.propTypes = {
  type: PropTypes.instanceOf({}).isRequired,
  widgetType: PropTypes.string.isRequired,
  setWidgetType: PropTypes.func.isRequired,
};
export default WidgetCard;
