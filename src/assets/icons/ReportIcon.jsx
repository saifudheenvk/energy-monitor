import React from 'react';
import PropTypes from 'prop-types';

const ReportIcon = ({ color }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Outline">
        <path
          fill={color}
          d="m456 456v-400a32.036 32.036 0 0 0 -32-32h-336a32.036 32.036 0 0 0 -32 32v264h16v-24h80v24h16v-24h80v24h16v-24h80v48h-48v16h48v48h-48v16h48v32a32.036 32.036 0 0 0 32 32h48a32.036 32.036 0 0 0 32-32zm-112-304h-80v-48h80zm16-48h80v48h-80zm-96-16v-48h80v48zm-16 0h-80v-48h80zm0 16v48h-80v-48zm-96 48h-80v-48h80zm0 16v48h-80v-48zm16 0h80v48h-80zm96 0h80v48h-80zm96 0h80v48h-80zm80 64v48h-80v-48zm0-176v32h-80v-48h64a16.019 16.019 0 0 1 16 16zm-352-16h64v48h-80v-32a16.019 16.019 0 0 1 16-16zm-16 240v-48h80v48zm96 0v-48h80v48zm96 0v-48h80v48zm96 16h80v48h-80zm80 64v48h-80v-48zm-80 96v-32h80v32a16.019 16.019 0 0 1 -16 16h-48a16.019 16.019 0 0 1 -16-16z"
        />
        <path fill={color} d="m88 56h16v16h-16z" />
        <path fill={color} d="m120 56h16v16h-16z" />
        <path fill={color} d="m184 56h48v16h-48z" />
        <path fill={color} d="m280 56h48v16h-48z" />
        <path fill={color} d="m376 56h48v16h-48z" />
        <path
          fill={color}
          d="m280 456v-88a32.036 32.036 0 0 0 -32-32h-116.687l-13.656-13.657a8 8 0 0 0 -11.314 0l-13.656 13.657h-36.687a32.036 32.036 0 0 0 -32 32v88a32.036 32.036 0 0 0 32 32h192a32.036 32.036 0 0 0 32-32zm-240 0v-88a16.019 16.019 0 0 1 16-16h40a8 8 0 0 0 5.657-2.343l10.343-10.344 10.343 10.344a8 8 0 0 0 5.657 2.343h120a16.019 16.019 0 0 1 16 16v88a16.019 16.019 0 0 1 -16 16h-192a16.019 16.019 0 0 1 -16-16z"
        />
        <path fill={color} d="m80 376h16v16h-16z" />
        <path fill={color} d="m112 376h128v16h-128z" />
        <path fill={color} d="m64 408h176v16h-176z" />
        <path fill={color} d="m64 440h144v16h-144z" />
      </g>
    </svg>
  );
};
ReportIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ReportIcon;
