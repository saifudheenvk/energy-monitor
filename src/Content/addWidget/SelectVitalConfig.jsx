import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;
const LabelSelector = styled(Select)`
  // border: 1px solid #848c94
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  color: #848c94 !important;
`;
const StyledOptions = styled(Option)`
  color: #848c94;
`;

const SelectVitalConfig = ({
  statistics,
  row,
  setLabels,
  labels,
  aggregationLevel,
}) => {
  const [label, setLabel] = useState({});
  useEffect(() => {
    if (labels !== []) {
      const obj = labels.find(
        l => l[aggregationLevel] && l[aggregationLevel].indexOf(row.key) !== -1
      );
      if (obj !== undefined) {
        setLabel(obj);
      }
    }
  }, [aggregationLevel, labels, row.key]);
  return (
    <LabelSelector
      disabled={label.name === undefined}
      value={label && label.aggregation_statistics}
      suffixIcon={<CaretDownOutlined />}
      onSelect={e => {
        setLabels(
          labels.map(l =>
            l.name === label.name ? { ...l, aggregation_statistics: e } : l
          )
        );
      }}
    >
      {statistics &&
        statistics.map(op => (
          <StyledOptions value={op} key={op}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </StyledOptions>
        ))}
    </LabelSelector>
  );
};
SelectVitalConfig.propTypes = {
  statistics: PropTypes.instanceOf([]).isRequired,
  setLabels: PropTypes.func.isRequired,
  labels: PropTypes.instanceOf([]).isRequired,
  aggregationLevel: PropTypes.string.isRequired,
  row: PropTypes.node.isRequired,
};
export default SelectVitalConfig;
