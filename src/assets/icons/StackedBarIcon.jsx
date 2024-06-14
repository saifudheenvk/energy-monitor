import React from 'react';
import PropTypes from 'prop-types';

const StackedBarIcon = ({ color }) => {
  return (
    <svg
      id="Capa_1"
      enableBackground="new 0 0 512 512"
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
    >
      <g>
        <path d="m109.25 165.667h-101.75c-4.142 0-7.5 3.358-7.5 7.5v331.333c0 4.142 3.358 7.5 7.5 7.5h101.75c4.142 0 7.5-3.358 7.5-7.5v-331.333c0-4.143-3.358-7.5-7.5-7.5zm-7.5 15v150.667h-86.75v-150.667zm-86.75 316.333v-150.667h86.75v150.667z" />
        <path d="m241 331.333h-101.75c-4.142 0-7.5 3.358-7.5 7.5v165.667c0 4.142 3.358 7.5 7.5 7.5h101.75c4.142 0 7.5-3.358 7.5-7.5v-165.667c0-4.142-3.358-7.5-7.5-7.5zm-7.5 15v67.833h-86.75v-67.833zm-86.75 150.667v-67.833h86.75v67.833z" />
        <path d="m504.5 165.667h-101.75c-4.143 0-7.5 3.358-7.5 7.5v331.333c0 4.142 3.357 7.5 7.5 7.5h101.75c4.143 0 7.5-3.358 7.5-7.5v-331.333c0-4.143-3.357-7.5-7.5-7.5zm-7.5 15v233.5h-86.75v-233.5zm-86.75 316.333v-67.833h86.75v67.833z" />
        <path d="m372.75 0h-101.75c-4.143 0-7.5 3.358-7.5 7.5v497c0 4.142 3.357 7.5 7.5 7.5h101.75c4.143 0 7.5-3.358 7.5-7.5v-150.667c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v143.167h-86.75v-399.167h86.75v226c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-316.333c0-4.142-3.357-7.5-7.5-7.5zm-94.25 82.833v-67.833h86.75v67.833z" />
      </g>
    </svg>
  );
};
StackedBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
};
export default StackedBarIcon;
