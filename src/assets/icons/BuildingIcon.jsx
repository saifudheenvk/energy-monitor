import React from 'react';
import PropTypes from 'prop-types';

const path = 'buildings';
const BuildingIcon = ({ activePath, themeState }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.7812 2.10938V0H4.21875V2.10938H0V18H18V2.10938H13.7812ZM12.7266 1.05469V16.9453H11.6719V10.5117H6.32812V16.9453H5.27344V1.05469H12.7266ZM10.6172 12.6211H7.38281V11.5664H10.6172V12.6211ZM7.38281 13.6758H8.47266V16.9453H7.38281V13.6758ZM9.52734 13.6758H10.6172V16.9453H9.52734V13.6758ZM1.05469 3.16406H4.21875V16.9453H1.05469V3.16406ZM16.9453 16.9453H13.7812V3.16406H16.9453V16.9453Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M3.16406 4.21875H2.10938V5.27344H3.16406V4.21875Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M3.16406 6.32812H2.10938V7.38281H3.16406V6.32812Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M3.16406 8.4375H2.10938V9.49219H3.16406V8.4375Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M3.16406 10.5469H2.10938V11.6016H3.16406V10.5469Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M15.8906 4.21875H14.8359V5.27344H15.8906V4.21875Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M15.8906 6.32812H14.8359V7.38281H15.8906V6.32812Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M15.8906 8.4375H14.8359V9.49219H15.8906V8.4375Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M15.8906 10.5469H14.8359V11.6016H15.8906V10.5469Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M3.16406 12.6562H2.10938V13.7109H3.16406V12.6562Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M15.8906 12.6562H14.8359V13.7109H15.8906V12.6562Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M11.6719 2.10938H6.32812V5.23828H11.6719V2.10938ZM10.6172 4.18359H7.38281V3.16406H10.6172V4.18359Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
    <path
      d="M11.6719 6.32812H6.32812V9.45703H11.6719V6.32812ZM10.6172 8.40234H7.38281V7.38281H10.6172V8.40234Z"
      fill={
        themeState === 'dark'
          ? `${activePath === path ? '#fff' : '#848C94'}`
          : '#fff'
      }
    />
  </svg>
);
BuildingIcon.propTypes = {
  activePath: PropTypes.string.isRequired,
  themeState: PropTypes.string.isRequired,
};
export default BuildingIcon;
