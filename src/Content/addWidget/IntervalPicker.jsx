import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { DatePicker } from 'antd';

const StyledDatePicker = styled(DatePicker)`
  // border: 1px solid #848c94
  box-sizing: border-box;
  flex: 3 !important;
  border-radius: 5px;
  width: 100%;
  color: #848c94 !important;
`;
const IntervalPicker = ({ selector, setAdditionalInfo, additionalInfo }) => {
  const disabledDates = current => {
    if (selector === 'end_date') {
      return (
        current &&
        current < moment(Number(additionalInfo.start_date))
      );
    }
    return (
      current && current > moment(Number(additionalInfo.end_date))
    );
  };
  return (
    <StyledDatePicker
      disabledDate={disabledDates}
      defaultValue={moment(Number(additionalInfo[selector]))}
      allowClear={false}
      onChange={val => {
        if (val !== null) {
          setAdditionalInfo(prevState => ({
            ...prevState,
            [selector]: val.format('x'),
          }));
        }
      }}
    />
  );
};
IntervalPicker.propTypes = {
  selector: PropTypes.string.isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
};
export default IntervalPicker;
