import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import RenderActiveShape from './RenderActiveShape';
import pieThemes from '../addWidget/pie/pieThemes';

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  & div > div > div > ul {
    .recharts-tooltip-item {
      font-weight: 600 !important;
      color: ${props =>
        props.colors[props.activeIndex % props.colors.length]} !important;
    }
    .recharts-tooltip-item-name {
      font-weight: 700 !important;
    }
  }
`;

const PieChartRenderer = ({ data, additionalInfo }) => {
  const themeState = useSelector(state => state.themeReducer);
  const [activeIndex, setActiveIdex] = useState('0');
  const [colors, setColors] = useState([]);
  const onPieEnter = (d, index) => {
    setActiveIdex(index);
  };
  const toolTipStyle = {
    backgroundColor: themeState === 'dark' ? '#3b3e48' : '#E1E6ED',
    boxShadow: '2px 2px 3px rgba(0,0,0,0.5)',
    borderRadius: '3px',
    border: '1px solid #848c94',
  };

  useEffect(() => {
    setColors(
      additionalInfo.theme
        ? pieThemes[additionalInfo.theme]
        : ['green', 'blue', 'white', '#ccc', 'red']
    );
  }, []);
  return (
    <StyledResponsiveContainer
      colors={colors}
      activeIndex={activeIndex}
      className="graph"
    >
      <PieChart
        style={{ direction: 'ltr' }}
        margin={{ top: 5, right: 50, bottom: 30, left: 60 }}
      >
        <Tooltip contentStyle={toolTipStyle} />
        <Pie
          activeIndex={activeIndex}
          activeShape={additionalInfo.is_pie === 'pie' ? '' : RenderActiveShape}
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={additionalInfo.is_pie === 'pie' ? '0%' : '50%'}
          outerRadius="70%"
          fill="#8884d8"
          paddingAngle={additionalInfo.is_pie === 'pie' ? 0 : 5}
          onMouseEnter={onPieEnter}
          onMouseLeave={() => {
            setActiveIdex('0');
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </StyledResponsiveContainer>
  );
};
export default PieChartRenderer;

PieChartRenderer.propTypes = {
  data: PropTypes.instanceOf([]).isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
};
