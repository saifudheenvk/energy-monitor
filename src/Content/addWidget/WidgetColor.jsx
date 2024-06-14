import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { GithubPicker } from 'react-color';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import './annotationTable.css';

const ColorPickerPopover = styled(Popover)``;

const ColorPicker = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: ${props => props.color};
`;
const StyledColorContainer = styled.div`
  & div > div {
    // border-color: transparent transparent #32343c !important;
  }
`;
const StyledGithubPicker = styled(GithubPicker)`
  && {
    background: ${props =>
        props.themeState === 'dark' ? '#32343c !important' : ''}
      ${props =>
        props.themeState === 'dark' ? 'border: 0.5px solid !important' : ''};
  }
`;

const filterContent = (setColors, label, themeState, handlePopoverVisible) => (
  <StyledColorContainer>
    <StyledGithubPicker
      themeState={themeState}
      onChange={e => {
        setColors(prevState => ({ ...prevState, [label]: e.hex }));
        handlePopoverVisible(false);
      }}
      colors={[
        '#01579B',
        '#1A237E',
        '#1B5E20',
        '#2b8c2b',
        '#2c7873',
        '#50bda1',
        '#5b8c85',
        '#6decb9',
        '#721b65',
        '#827717',
        '#9E9D24',
        '#B71C1C',
        '#BF360C',
        '#F57F17',
        '#F9A825',
        '#AED581',
        '#CDDC39',
        '#c2b0c9',
        '#ABB8C3',
        '#d1cebd',
        '#f6eedf',
      ]}
    />
  </StyledColorContainer>
);

const WidgetColor = ({ colors, setColors, row, labels, aggregationLevel }) => {
  const [label, setLabel] = useState({});
  const [popoverVisible, setPopOverVisible] = useState(false);
  const themeState = useSelector(state => state.themeReducer);
  const getContainer = node => {
    return node.parentNode;
  };
  useEffect(() => {
    if (labels !== []) {
      const obj = labels.find(
        l => l[aggregationLevel] && l[aggregationLevel].indexOf(row.key) !== -1
      );
      if (obj !== undefined) {
        setLabel(obj);
      }
    }
  }, [aggregationLevel, colors, labels, row.key]);
  const handlePopoverVisible = visible => {
    setPopOverVisible(visible);
  };
  return (
    <ColorPickerPopover
      placement="bottomLeft"
      trigger="click"
      content={filterContent(
        setColors,
        label.name,
        themeState,
        handlePopoverVisible
      )}
      getPopupContainer={getContainer}
      visible={popoverVisible}
      onVisibleChange={handlePopoverVisible}
    >
      <ColorPicker
        color={label.name && colors !== {} ? colors[label.name] : 'green'}
      />
    </ColorPickerPopover>
  );
};
WidgetColor.propTypes = {
  row: PropTypes.node.isRequired,
  colors: PropTypes.instanceOf({}).isRequired,
  setColors: PropTypes.func.isRequired,
  labels: PropTypes.instanceOf([]).isRequired,
  aggregationLevel: PropTypes.string.isRequired,
};

export default WidgetColor;
