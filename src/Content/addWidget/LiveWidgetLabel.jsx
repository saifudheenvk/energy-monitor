import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, message } from 'antd';
import functions from './CommonFunctions';

const StyledInput = styled(Input)`
  // border: 1px solid #848c94
  box-sizing: border-box;
  border-radius: 5px;
  width: 80%;
  color: #848c94 !important;
`;
const LiveWidgetLabel = ({ labels, setLabels, row, setColors }) => {
  const [labelName, setLabelName] = useState('new name');
  const [selectedLabel, setSelectedLabel] = useState({});
  const compareObjects = (firstKey, secondKey) => {
    return JSON.stringify(firstKey) === JSON.stringify(secondKey);
  };
  useEffect(() => {
    const label = labels.find(l =>
      compareObjects(l.equipments && l.equipments[0], row.key)
    );
    setLabelName(label && label.name);
    setSelectedLabel(label && label);
  }, [labels, row.key]);
  const handleChange = e => {
    setLabelName(e.target.value);
  };
  useEffect(() => {
    functions.setDefaultLabel(
      labels,
      'equipments',
      row,
      setColors,
      setLabels,
      row.key.vital,
      'live'
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledInput
      placeholder="Add Label"
      value={labelName}
      onChange={handleChange}
      onBlur={() => {
        if (selectedLabel.name !== labelName) {
          const label = labels.find(l =>
            compareObjects(l.equipments[0], row.key)
          );
          const isNamePresent = labels.find(l => l.name === labelName);
          if (label === undefined && isNamePresent === undefined) {
            setLabels(prevState => [
              ...prevState,
              { name: labelName, equipments: [row.key] },
            ]);
            setColors(prevState => ({ ...prevState, [labelName]: '#f9a825' }));
            message.success('label added');
          } else if (label && isNamePresent === undefined) {
            const index = labels.findIndex(l =>
              compareObjects(l.equipments[0], row.key)
            );
            setLabels(prevState => {
              const newState = [...prevState];
              newState.splice(index, 1);
              return [...newState, { ...label, name: labelName }];
            });
            setColors(prevState => {
              const updatedColors = { ...prevState };
              delete updatedColors[label.name];
              return { ...updatedColors, [labelName]: '#f9a825' };
            });
            message.success('label updated');
          } else {
            message.error('Please give another label');
          }
        }
      }}
    />
  );
};
LiveWidgetLabel.propTypes = {
  labels: PropTypes.instanceOf([]).isRequired,
  setLabels: PropTypes.func.isRequired,
  row: PropTypes.node.isRequired,
  setColors: PropTypes.func.isRequired,
};
export default LiveWidgetLabel;
