import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StackedBarIcon from '../../../assets/icons/StackedBarIcon';
import BarIcon from '../../../assets/icons/BarIcon';
import { useContext } from 'react';
import { ThemeContext } from '../AddWidgetModal';
import { useTranslation } from 'react-i18next';

const TypeCard = styled.div`
  text-align: center;
  padding: 20px;
  background: ${props => (props.isActive ? props.theme.selectedCard : 'none')};
  border: ${props =>
    props.isActive ? '1px solid #fff' : '0.5px solid#848c94'};
  box-sizing: border-box;
  box-shadow: ${props =>
    props.isActive ? ' 0px 4px 4px rgba(0, 0, 0, 0.25)' : '0px'};
  border-radius: 5px;
  width: 160px;
  color: ${props => (props.isActive ? '#fff' : ' #848c94')};
  cursor: pointer;
  margin: 15px;
  display: flex;
  height: 75px;
  align-items: center;
`;
const TypesContainer = styled.div`
  width: 100%;
  display: inline-flex;
  margin-bottom: 20px;
`;
const IconContainer = styled.div`
  flex: 2;
`;

const BarStakDesider = ({ additionalInfo, setAdditionalInfo }) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();

  const clickHandler = val => {
    setAdditionalInfo({ ...additionalInfo, stacked: val });
  };
  return (
    <TypesContainer>
      <TypeCard
        theme={theme}
        isActive={
          additionalInfo.stacked === true ||
          additionalInfo.stacked === undefined
        }
        onClick={() => clickHandler(true)}
      >
        <IconContainer>
          <StackedBarIcon
            color={
              additionalInfo.stacked === true ||
              additionalInfo.stacked === undefined
                ? '#fff'
                : ' #848c94'
            }
          />
        </IconContainer>
        <div style={{ flex: 3 }}>{t('Stacked')}</div>
      </TypeCard>
      <TypeCard
        theme={theme}
        isActive={additionalInfo.stacked === false}
        onClick={() => clickHandler(false)}
      >
        <IconContainer>
          <BarIcon
            color={additionalInfo.stacked === false ? '#fff' : ' #848c94'}
          />
        </IconContainer>
        <div style={{ flex: 3 }}>{t('Unstacked')}</div>
      </TypeCard>
    </TypesContainer>
  );
};
BarStakDesider.propTypes = {
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
};
export default BarStakDesider;
