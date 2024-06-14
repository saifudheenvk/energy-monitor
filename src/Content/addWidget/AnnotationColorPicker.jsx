import React, { useState } from 'react';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CompactPicker } from 'react-color';
import { changeAxisAnnotationColor } from './configureGrapgh';
import { changeAnnotationColor } from './numberAnnotationUtils';

const ColorPopOver = styled(Popover)``;
const ColorPickerContainer = styled.div`
  & div > div {
    background: none !important;
    box-shadow: none !important;
  }
`;
const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background: ${props => props.color};
  border-radius: 3px;
`;

const ColorPicker = (
  index,
  dataSource,
  setDataSource,
  handlePopoverVisible,
  type
) => (
  <ColorPickerContainer>
    <CompactPicker
      onChange={color => {
        if (type !== 'number') {
          changeAxisAnnotationColor(
            dataSource,
            setDataSource,
            index,
            color.hex
          );
        } else {
          changeAnnotationColor(dataSource, setDataSource, index, color.hex);
        }
        handlePopoverVisible(false);
      }}
    />
  </ColorPickerContainer>
);

const AnnotationColorPicker = ({
  index,
  dataSource,
  setDataSource,
  color,
  type,
}) => {
  const [popoverVisible, setPopOverVisible] = useState(false);
  const handlePopoverVisible = visible => {
    setPopOverVisible(visible);
  };
  return (
    <ColorPopOver
      placement="bottomLeft"
      content={ColorPicker(
        index,
        dataSource,
        setDataSource,
        handlePopoverVisible,
        type
      )}
      trigger="click"
      visible={popoverVisible}
      onVisibleChange={handlePopoverVisible}
    >
      <ColorBox color={color} />
    </ColorPopOver>
  );
};

export default AnnotationColorPicker;
