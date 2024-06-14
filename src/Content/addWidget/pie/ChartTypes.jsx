import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PieIcon from '../../../assets/icons/PieIcon';
import DonutIcon from '../../../assets/icons/DonutIcon';
import { useContext } from 'react';
import { ThemeContext } from '../AddWidgetModal';
import { useTranslation } from 'react-i18next';

const TypeBox = styled.div`
  text-align: center;
  padding: 20px;
  background: ${props => (props.isActive ? props.theme.selectedCard : 'none')};
  border: ${props =>
    props.isActive ? '1px solid #fff' : '0.5px solid#848c94'};
  box-sizing: border-box;
  box-shadow: ${props =>
    props.isActive ? ' 0px 4px 4px rgba(0, 0, 0, 0.25)' : '0px'};
  border-radius: 5px;
  width: 150px;
  color: ${props => (props.isActive ? '#fff' : ' #848c94')};
  cursor: pointer;
  margin: 15px;
  display: inline-block;
`;
const TypesContainer = styled.div`
  width: 100%;
`;

const ChartTypes = ({ additionalInfo, setAdditionalInfo }) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  const clickHandler = type => {
    setAdditionalInfo(prevState => ({ ...prevState, is_pie: type }));
  };
  return (
    <TypesContainer>
      <TypeBox
        isActive={additionalInfo.is_pie === 'pie'}
        onClick={() => clickHandler('pie')}
        theme={theme}
      >
        <PieIcon
          color={additionalInfo.is_pie === 'pie' ? '#fff' : ' #848c94'}
        />
        {t('Pie-Chart')}
      </TypeBox>
      <TypeBox
        isActive={additionalInfo.is_pie === 'donut'}
        onClick={() => clickHandler('donut')}
        theme={theme}
      >
        <DonutIcon
          color={additionalInfo.is_pie === 'donut' ? '#fff' : ' #848c94'}
        />
        {t('Donut')}
      </TypeBox>
    </TypesContainer>
  );
};
ChartTypes.propTypes = {
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
};
export default ChartTypes;
