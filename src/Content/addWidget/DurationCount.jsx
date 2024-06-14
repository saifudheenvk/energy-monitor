/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, message } from 'antd';

const StyledInput = styled(Input)`
  box-sizing: border-box;
  border-radius: 5px;
  width: 80%;
`;

const DurationCount = ({ setLabels, labels, row, aggregationLevel }) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const selectedLabel = labels.find(
      l => l[aggregationLevel].indexOf(row.key) !== -1
    );
    if (selectedLabel !== undefined) {
      setDuration(selectedLabel.duration);
    }
    console.log('selectedLabel', selectedLabel);
  }, [labels]);
  const handleChange = e => {
    setDuration(e.target.value);
  };
  return (
    <StyledInput
      value={duration}
      type="number"
      onChange={handleChange}
      onBlur={() => {
        if (duration !== '') {
          if (duration < 0) {
            message.error('Number should be greater than 1');
          } else {
            setLabels(prevState =>
              prevState.map(l => {
                const clonedLabel = { ...l };
                return clonedLabel[aggregationLevel].indexOf(row.key) !== -1
                  ? { ...clonedLabel, duration }
                  : { ...clonedLabel };
              })
            );
          }
        } else {
          message.error('Please type a number');
        }
      }}
    />
  );
};
DurationCount.propTypes = {
  setLabels: PropTypes.func.isRequired,
  labels: PropTypes.instanceOf([]).isRequired,
  row: PropTypes.node.isRequired,
  aggregationLevel: PropTypes.string.isRequired,
};
export default DurationCount;
