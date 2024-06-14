import React from 'react';
import { Statistic, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CustomizedStatistic = styled(Statistic)`
  direction: ltr;
  display: ${props => (props.singleTile ? 'flex' : 'block')};
  flex-direction: ${props => (props.singleTile ? 'column' : 'unset')};
  height: ${props => (props.singleTile ? 'calc(100% - 22px)' : 'unset')};
  & .ant-statistic-content {
    justify-content: center;
    align-items: center;
    font-size: ${props => (props.singleTile ? '48px' : '28px')};
  }
  & .ant-statistic-content-value {
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  & .ant-statistic-content-value-decimal {
    font-size: ${props => (props.singleTile ? '32px' : '20px')};
  }
`;

const NumberRenderer = ({ label, content, singleTile, config }) => {
  const { annotations } = config;
  const themeState = useSelector(state => state.themeReducer);
  let color = themeState === 'dark' ? '#ffffff' : '#848C94';
  if (annotations && annotations.length) {
    const sortedFilteredGTAnnotations = annotations
      .filter(
        eachAnnotation =>
          eachAnnotation.annotation_for === label &&
          eachAnnotation.type === 'GREATER_THAN'
      )
      .sort(
        (firstAnnotation, secondAnnotation) =>
          firstAnnotation.value - secondAnnotation.value
      );
    const sortedFilteredLTAnnotations = annotations
      .filter(
        eachAnnotation =>
          eachAnnotation.annotation_for === label &&
          eachAnnotation.type === 'LESS_THAN'
      )
      .sort(
        (firstAnnotation, secondAnnotation) =>
          secondAnnotation.value - firstAnnotation.value
      );
    const sortedFilteredEQAnnotations = annotations
      .filter(
        eachAnnotation =>
          eachAnnotation.annotation_for === label &&
          eachAnnotation.type === 'EQUAL_TO'
      )
      .sort(
        (firstAnnotation, secondAnnotation) =>
          secondAnnotation.value - firstAnnotation.value
      );

    // Assumption: Considering the Greater than(GT) value as the lowest priority one
    sortedFilteredGTAnnotations.forEach(eachGTAnnotation => {
      if (eachGTAnnotation.value < content[label]) {
        color = eachGTAnnotation.color;
      }
    });

    // Assumption: Considering the Less than(LT) value as the medium priority one
    sortedFilteredLTAnnotations.forEach(eachLTAnnotation => {
      if (eachLTAnnotation.value > content[label]) {
        color = eachLTAnnotation.color;
      }
    });

    // Assumption: Considering the Equal To(EQ) value as the high priority one
    sortedFilteredEQAnnotations.forEach(eachEQAnnotation => {
      if (Number(eachEQAnnotation.value) === content[label]) {
        color = eachEQAnnotation.color;
      }
    });
  }

  return (
    <CustomizedStatistic
      singleTile={singleTile}
      title={
        <Tooltip title={`${label}: ${content[label]}`}>
          <HeaderWrapper>{label}</HeaderWrapper>
        </Tooltip>
      }
      value={content[label]}
      precision={2}
      valueStyle={{
        color: `${color}`,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: `${singleTile ? 1 : 'unset'}`,
        display: 'flex',
        padding: `${singleTile ? 'unset' : '15px 0'}`,
      }}
    />
  );
};

NumberRenderer.propTypes = {
  label: PropTypes.string.isRequired,
  singleTile: PropTypes.bool.isRequired,
  content: PropTypes.instanceOf({}).isRequired,
  config: PropTypes.shape({
    annotations: PropTypes.shape([
      {
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      },
    ]),
  }).isRequired,
};

export default NumberRenderer;
