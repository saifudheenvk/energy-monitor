import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const { MonthPicker, WeekPicker } = DatePicker;
const VerticalAnnotationCalenderFactory = ({
  additionalInfo,
  defaultDate,
  changeAnnoatationInput,
  dataSource,
  setDataSource,
  index,
}) => {
  const commonStyles = {
    // border: '1px solid ',
    boxSizing: 'borderBox',
    // borderRadius: '5px',
    width: '100%',
  };
  const [isOpen, setIsOpen] = useState(false);
  const disabledDates = current => {
    return (
      (current && current < moment(Number(additionalInfo.start_date))) ||
      current > moment(Number(additionalInfo.end_date))
    );
  };
  switch (additionalInfo.aggregation_granularity) {
    case 'Yearly':
      return (
        <DatePicker
          style={commonStyles}
          disabledDate={disabledDates}
          open={isOpen}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(true)}
          format="YYYY"
          mode="year"
          value={moment(defaultDate)}
          onPanelChange={date => {
            changeAnnoatationInput(dataSource, setDataSource, index, date);
            setIsOpen(false);
          }}
        />
      );
    case 'Monthly':
      return (
        <p>
          <MonthPicker
            style={commonStyles}
            disabledDate={disabledDates}
            defaultValue={moment(defaultDate)}
            onChange={date => {
              changeAnnoatationInput(dataSource, setDataSource, index, date);
            }}
          />
        </p>
      );
    case 'Weekly':
      return (
        <WeekPicker
          style={commonStyles}
          disabledDate={disabledDates}
          defaultValue={moment(defaultDate)}
          onChange={date => {
            changeAnnoatationInput(dataSource, setDataSource, index, date);
          }}
        />
      );
    case 'Hourly':
      return <p>Hour picker</p>;
    default:
      return (
        <DatePicker
          style={commonStyles}
          disabledDate={disabledDates}
          defaultValue={moment(defaultDate)}
          onChange={date => {
            changeAnnoatationInput(dataSource, setDataSource, index, date);
          }}
        />
      );
  }
};
VerticalAnnotationCalenderFactory.propTypes = {
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  defaultDate: PropTypes.string.isRequired,
  changeAnnoatationInput: PropTypes.func.isRequired,
  setDataSource: PropTypes.func.isRequired,
  dataSource: PropTypes.instanceOf([]).isRequired,
  index: PropTypes.number.isRequired,
};
export default VerticalAnnotationCalenderFactory;
