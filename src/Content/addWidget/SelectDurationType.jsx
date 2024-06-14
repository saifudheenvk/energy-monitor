/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';

const LabelSelector = styled(Select)`
  flex: 3 !important;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  color: #848c94 !important;
`;
const StyledOptions = styled(Option)`
  color: #848c94;
`;

const SelectDurationType = ({ setLabels, labels, row, aggregationLevel }) => {
  const [label, setLabel] = useState({});
  useEffect(() => {
    const selectedLabel = labels.find(
      l => l[aggregationLevel].indexOf(row.key) !== -1
    );
    if (selectedLabel !== undefined) {
      setLabel(selectedLabel);
    }
    console.log('selectedLabel', selectedLabel);
  }, [labels]);
  const types = ['hours', 'days', 'weeks', 'months', 'years'];
  return (
    <LabelSelector
      value={label && label.duration_unit}
      onSelect={val =>
        setLabels(prevState =>
          prevState.map(l => {
            const clonedLabel = { ...l };
            return clonedLabel[aggregationLevel].indexOf(row.key) !== -1
              ? { ...clonedLabel, duration_unit: val }
              : { ...clonedLabel };
          })
        )
      }
    >
      {types.map(op => (
        <StyledOptions value={op} key={op}>
          {op.charAt(0).toUpperCase() + op.slice(1)}
        </StyledOptions>
      ))}
    </LabelSelector>
  );
};
SelectDurationType.propTypes = {
  setLabels: PropTypes.func.isRequired,
  labels: PropTypes.instanceOf([]).isRequired,
  row: PropTypes.node.isRequired,
  aggregationLevel: PropTypes.string.isRequired,
};
export default SelectDurationType;
