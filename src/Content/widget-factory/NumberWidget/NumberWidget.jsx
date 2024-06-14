import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NumberRenderer from './NumberRenderer';

const WidgetWrapper = styled.div`
  cursor: default !important;
  width: inherit;
  height: calc(100% - 75px);
  scrollbar-color: ${props =>
    props.themeState !== 'dark' ? '#E5E5E5 #fff' : ''} !important;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px !important;
  }

  ::-webkit-scrollbar-track {
    background: ${props =>
      props.themeState === 'dark' ? '#32343c' : '#d9d9d9'} !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 2px !important;
    background: ${props =>
      props.themeState === 'dark' ? '#888' : '#b2b2b2'} !important;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555 !important;
  }
`;

const StyledDiv = styled.div`
  display: inline-block;
  border-radius: 3px;
  padding: 25px 20px;
  margin: 11px;
  background: ${props => (props.themeState === 'dark' ? '#32343c' : '#ffffff')};
  width: ${props => (props.singleTile ? 'calc(100% - 25px)' : '214px')};
  height: ${props => (props.singleTile ? 'calc(100% - 25px)' : 'unset')};
  @media (max-width: 600px) {
    display: block;
    min-width: unset;
    width: calc(100% - 25px);
  }
`;

const NumberWidget = ({ data, additionalInfo }) => {
  const themeState = useSelector(state => state.themeReducer);
  const numberWidgetLabels = Object.keys(data);
  const singleNumberTile =
    numberWidgetLabels && numberWidgetLabels.length === 1;
  return (
    <WidgetWrapper themeState={themeState} className="graph" style={{}}>
      {numberWidgetLabels.map(eachNumberLabel => (
        <StyledDiv singleTile={singleNumberTile} themeState={themeState}>
          <NumberRenderer
            singleTile={singleNumberTile}
            label={eachNumberLabel}
            content={data}
            config={additionalInfo}
          />
        </StyledDiv>
      ))}
    </WidgetWrapper>
  );
};

NumberWidget.propTypes = {
  data: PropTypes.instanceOf([]).isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
};

export default NumberWidget;
