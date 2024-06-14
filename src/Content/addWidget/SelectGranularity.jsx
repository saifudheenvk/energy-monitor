import React from 'react';
import PropTypes from 'prop-types';
import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;
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

const SelectGranularity = ({
  request,
  setAdditionalInfo,
  additionalInfo,
  setLabels,
  dataSource,
}) => {
  const { widgetType } = request;
  const selectData = () => {
    switch (widgetType) {
      case 'bar':
        return ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
      case 'pie':
        return [
          'Hourly',
          'Daily',
          'Weekly',
          'Monthly',
          'Yearly',
          additionalInfo.aggregation_level,
        ];
      default:
        return ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
    }
  };
  return (
    <LabelSelector
      value={
        additionalInfo.aggregation_granularity
          ? additionalInfo.aggregation_granularity
          : selectData() && selectData()[0]
      }
      suffixIcon={<CaretDownOutlined />}
      onSelect={e => {
        setAdditionalInfo({ ...additionalInfo, aggregation_granularity: e });
        if (widgetType === 'pie' && additionalInfo.aggregation_level !== e) {
          setLabels(prevState => {
            const cloned = [...prevState];
            const firstRow = dataSource[0].key;
            return cloned.map(l =>
              l[additionalInfo.aggregation_level].indexOf(firstRow) !== -1
                ? {
                    ...l,
                    [additionalInfo.aggregation_level]: dataSource.map(
                      d => d.key
                    ),
                  }
                : { ...l, [additionalInfo.aggregation_level]: [] }
            );
          });
        }
      }}
    >
      {selectData() &&
        selectData().map(op => (
          <StyledOptions value={op} key={op}>
            {op}
          </StyledOptions>
        ))}
    </LabelSelector>
  );
};
SelectGranularity.propTypes = {
  request: PropTypes.instanceOf({}).isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  setLabels: PropTypes.func.isRequired,
  dataSource: PropTypes.instanceOf([]).isRequired,
};
export default SelectGranularity;
