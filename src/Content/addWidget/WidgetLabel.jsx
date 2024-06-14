/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Divider } from 'antd';
import styled from 'styled-components';
import functions from './CommonFunctions';
import './WidgetLabel.css';

const { Option } = Select;

const AddLabel = styled.div`
  padding: 8px;
  cursor: pointer;
`;
const StyledDivider = styled(Divider)`
  margin: '4px 0';
`;
const LabelSelector = styled(Select)`
  // border: 1px solid #848c94;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  min-width:100px;
  max-width:400px
  }
`;
const StyledOptions = styled(Option)`
  color: #848c94;
`;

const WidgetLabel = ({
  statistics,
  granularity,
  aggregationLevel,
  colors,
  setColors,
  row,
  labels,
  setLabels,
  vital,
  widgetType,
}) => {
  const [newLabel, setNewLabel] = useState({});
  const [labelName, setLabelName] = useState({});
  useEffect(() => {
    const label = labels.find(l => l[aggregationLevel].indexOf(row.key) !== -1);
    if (label !== undefined) {
      setLabelName(label);
    }
  }, [aggregationLevel, labels, colors]);
  useEffect(() => {
    functions.setDefaultLabel(
      labels,
      aggregationLevel,
      row,
      setColors,
      setLabels,
      vital,
      'aggregated',
      granularity,
      widgetType,
      statistics,
    );
  }, []);

  const handleSelect = e => {
    if (labelName.name !== e) {
      functions.selectLabels(
        setLabels,
        aggregationLevel,
        row,
        e,
        widgetType,
        granularity,
        labelName[aggregationLevel]
      );
    }
  };
  const handleChange = e => {
    setNewLabel({ color: '#f9a825', label: e });
  };
  return (
    <div>
      <LabelSelector
        showSearch
        onSelect={handleSelect}
        onSearch={handleChange}
        value={labelName.name}
        suffixIcon={<CaretDownOutlined />}
        dropdownRender={menu => (
          <div>
            {menu}
            {newLabel.label &&
            newLabel.label.replace(/\s/g, '').length &&
            !(widgetType === 'pie' && granularity !== aggregationLevel) &&
            labels.find(l => l.name === newLabel.label) === undefined ? (
              <div>
                <StyledDivider />
                <AddLabel
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    setColors({
                      ...colors,
                      [newLabel.label]: newLabel.color,
                    });
                    functions.addNewLabel(
                      setLabels,
                      aggregationLevel,
                      row,
                      newLabel,
                      vital,
                      widgetType,
                      granularity,
                      labelName[aggregationLevel],
                      statistics
                    );
                  }}
                >
                  <PlusOutlined /> Add item
                </AddLabel>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      >
        {labels &&
          labels.map(l => (
            <StyledOptions key={l.name} value={l.name}>
              {l.name}
            </StyledOptions>
          ))}
      </LabelSelector>
    </div>
  );
};
WidgetLabel.propTypes = {
  statistics: PropTypes.instanceOf([]).isRequired,
  vital: PropTypes.string.isRequired,
  row: PropTypes.node.isRequired,
  colors: PropTypes.instanceOf({}).isRequired,
  setColors: PropTypes.func.isRequired,
  setLabels: PropTypes.func.isRequired,
  aggregationLevel: PropTypes.string.isRequired,
  labels: PropTypes.instanceOf([]).isRequired,
  widgetType: PropTypes.string.isRequired,
  granularity: PropTypes.string.isRequired,
};
export default WidgetLabel;
