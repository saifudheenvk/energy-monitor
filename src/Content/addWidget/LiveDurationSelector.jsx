import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const { Option } = Select;
const SelecContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;
const DurationHeader = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: #848c94;
  margin-right: ${props => props.lang !== 'ar' ? '27px' : '0'};
  padding: 5px;
  margin-bottom: 0;
  margin-left: ${props => props.lang === 'ar' ? '20px' : '0'};
`;
const MinuteSelector = styled(Select)`
  & .ant-select-selection--single {
    border: 1px solid #848c94 !important;
    box-sizing: border-box !important;
    border-radius: 5px !important;
    width: 200px !important;
    color: #ffff !important;
    background-color: #32343c !important;
    height: 42px !important;
    padding: 5px !important;
  }
`;
const mins = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const LiveDurationSelector = ({ additionalInfo, setAdditionalInfo }) => {
  const lang = useSelector(state => state.lang);
  const { t } = useTranslation();
  const handleChange = val => {
    setAdditionalInfo({ ...additionalInfo, duration: val });
  };
  return (
    <SelecContainer>
      <DurationHeader lang={lang} >{t("Duration")}</DurationHeader>
      <MinuteSelector
        suffixIcon={<CaretDownOutlined />}
        value={additionalInfo.duration}
        onChange={handleChange}
      >
        {mins.map(min => {
          return <Option value={min}>{`${min} minutes`}</Option>;
        })}
      </MinuteSelector>
    </SelecContainer>
  );
};
LiveDurationSelector.propTypes = {
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
};
export default LiveDurationSelector;
