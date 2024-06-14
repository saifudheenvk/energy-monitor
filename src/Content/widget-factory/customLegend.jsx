/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Surface, Symbols } from 'recharts';
import { useSelector } from 'react-redux';

const LegendContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
  max-height: 40px;
`;

const CustomLegend = ({ payload, disabled, setDisabled }) => {
  const themeState = useSelector(state => state.themeReducer);
  const handleClick = (dataKey, active) => {
    if (active) {
      setDisabled(() => {
        return disabled.filter(item => {
          return item !== dataKey;
        });
      });
    } else {
      setDisabled([...disabled, dataKey]);
    }
  };
  return (
    <LegendContainer>
      {payload &&
        payload.map(entry => {
          const { dataKey, color } = entry;
          const active = disabled.includes(dataKey);
          const style = {
            marginRight: 10,
            color: themeState !== 'dark' ? '#E1E6ED' : '#ccc',
            display: 'inline-block',
          };
          return (
            <span
              className="legend-item"
              onClick={() => handleClick(dataKey, active)}
              style={style}
            >
              <Surface width={20} height={10} viewBox="0 0 10 10">
                <Symbols
                  cx={5}
                  cy={5}
                  type="square"
                  size={100}
                  fill={active ? '#ccc' : color}
                />
              </Surface>
              <span style={{ color: themeState !== 'dark' ? '#49548D' : '' }}>
                {dataKey}
              </span>
            </span>
          );
        })}
    </LegendContainer>
  );
};
CustomLegend.propTypes = {
  payload: PropTypes.node.isRequired,
  disabled: PropTypes.instanceOf([]).isRequired,
  setDisabled: PropTypes.func.isRequired,
};
export default CustomLegend;
