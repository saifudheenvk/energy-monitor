/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { useSelector } from 'react-redux';
import moment from 'moment';
import getAnnotationfromTimeStamp from './verticalAnnotationGraphUtlis';
import CustomLegend from './customLegend';

const BarchartRenderer = ({ data, additionalInfo, visibleMaximised }) => {
  const themeState = useSelector(state => state.themeReducer);
  const lang = useSelector(state => state.lang);
  const [keys, setKeys] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const toolTipStyle = {
    backgroundColor: themeState === 'dark' ? '#3b3e48' : '#E1E6ED',
    boxShadow: '2px 2px 3px rgba(0,0,0,0.5)',
    borderRadius: '3px',
    border: '1px solid #848c94',
  };
  const labelStyle = {
    borderBottom: '0.5px solid #848c94',
    fontWeight: '700',
    color: themeState === 'dark' ? '#848c94' : '#49548D',
  };

  useEffect(() => {
    if (data[0]) setKeys(Object.keys(data[0]).filter(item => item !== 'x'));
  }, [data]);
  const TiltedAxisTick = ({
    payload: { value },
    verticalAnchor,
    visibleTicksCount,
    ...rest
  }) => (
    <text {...rest} className="bar-chart-tick" dy={12}>
      {value}
    </text>
  );
  return (
    <ResponsiveContainer className="graph">
      <BarChart
        style={{ direction: 'ltr' }}
        data={data}
        margin={{
          bottom: 50,
        }}
      >
        <CartesianGrid strokeOpacity="0.1" />
        <XAxis tick={<TiltedAxisTick />} dataKey="x" reversed={lang === 'ar'} />
        <YAxis
          orientation={lang !== 'ar' ? 'left' : 'right'}
          type="number"
          domain={['dataMin', 'dataMax']}
          allowDecimals={false}
          allowDataOverflow
          tickFormatter={val => {
            if (Number(val) > 10000) {
              return `${Math.ceil(val / 1000)}k`;
            }
            return Math.ceil(val);
          }}
        />
        <Tooltip
          labelStyle={labelStyle}
          contentStyle={toolTipStyle}
          cursor={{ fill: 'rgba(35, 39, 41,0.2)' }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          align="left"
          payload={keys.map(key => ({
            dataKey: key,
            color:
              additionalInfo &&
              additionalInfo.colors &&
              additionalInfo.colors[key],
          }))}
          content={
            <CustomLegend disabled={disabled} setDisabled={setDisabled} />
          }
        />
        {keys &&
          keys
            .filter(item => !disabled.includes(item))
            .map(item => (
              <Bar
                stackId={
                  additionalInfo.stacked === true ||
                  additionalInfo.stacked === undefined
                    ? 'a'
                    : item
                }
                dataKey={item}
                fill={
                  additionalInfo &&
                  additionalInfo.colors &&
                  additionalInfo.colors[item]
                }
              />
            ))}
        {visibleMaximised &&
          additionalInfo &&
          additionalInfo.annotations &&
          additionalInfo.annotations.map(annotation => {
            return annotation.type === 'horizontal' ? (
              <ReferenceLine
                y={Number(annotation.value)}
                label={{ value: annotation.label, fill: annotation.color }}
                stroke={annotation.color}
                strokeDasharray="3 3"
              />
            ) : (
              <ReferenceLine
                x={getAnnotationfromTimeStamp(
                  additionalInfo.aggregation_granularity,
                  Number(moment(annotation.value).format('x'))
                )}
                label={{ value: annotation.label, fill: annotation.color }}
                stroke={annotation.color}
                strokeDasharray="3 3"
              />
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );
};
BarchartRenderer.propTypes = {
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  data: PropTypes.instanceOf([]).isRequired,
  visibleMaximised: PropTypes.bool.isRequired,
};

export default BarchartRenderer;
