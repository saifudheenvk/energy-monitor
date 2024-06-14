import React from 'react';
import PropTypes from 'prop-types';
import { Sector } from 'recharts';

const RenderActiveShape = props => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};
RenderActiveShape.propTypes = {
  cx: PropTypes.string.isRequired,
  cy: PropTypes.string.isRequired,
  innerRadius: PropTypes.string.isRequired,
  outerRadius: PropTypes.string.isRequired,
  startAngle: PropTypes.string.isRequired,
  endAngle: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
};
export default RenderActiveShape;
