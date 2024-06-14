import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Legend,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { useSelector } from 'react-redux';
import moment from 'moment';
import getAnnotationfromTimeStamp from './verticalAnnotationGraphUtlis';
import CustomLegend from './customLegend';

const LinechartRenderer = ({
  data,
  mode,
  additionalInfo,
  visibleMaximised,
}) => {
  const themeState = useSelector(state => state.themeReducer);
  const lang = useSelector(state => state.lang);
  const [keys, setKeys] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(data.length - 1);

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
    if (data[0]) {
      setKeys(() => {
        return data[0] && Object.keys(data[0]).filter(key => key !== 'x');
      });
    }
  }, [data]);
  const changeIndex = index => {
    setEndIndex(index.endIndex);
    setStartIndex(index.startIndex);
  };
  return (
    <ResponsiveContainer className="graph">
      <LineChart
        style={{ direction: 'ltr' }}
        data={data}
        margin={{
          bottom: 50,
        }}
      >
        <XAxis tick={<TiltedAxisTick />} dataKey="x" reversed={lang === 'ar'} />
        <CartesianGrid strokeOpacity="0.1" />
        <Tooltip
          contentStyle={toolTipStyle}
          labelStyle={labelStyle}
          wrapperStyle={{ zIndex: 1000 }}
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
            .map(key => {
              return (
                <Line
                  dot={false}
                  dataKey={key}
                  yAxisId={mode === 'live' ? key : 'a'}
                  type="monotone"
                  stroke={
                    additionalInfo &&
                    additionalInfo.colors &&
                    additionalInfo.colors[key]
                  }
                  strokeWidth={2}
                  connectNulls
                />
              );
            })}

        {data && data.length >= 50 && (
          <Brush
            dataKey="x"
            height={30}
            startIndex={startIndex}
            endIndex={endIndex}
            onChange={changeIndex}
            fill="transparent"
            stroke={
              themeState === 'dark' ? 'rgba(255, 255, 255, 0.65)' : '#49548D'
            }
          >
            <LineChart>
              {keys &&
                keys.map(key => {
                  return (
                    <Line
                      dot={false}
                      dataKey={key}
                      type="monotone"
                      yAxisId={mode === 'live' ? key : 'a'}
                      stroke={
                        additionalInfo &&
                        additionalInfo.colors &&
                        additionalInfo.colors[key]
                      }
                    />
                  );
                })}
            </LineChart>
          </Brush>
        )}
        {visibleMaximised &&
          additionalInfo &&
          additionalInfo.annotations &&
          additionalInfo.annotations
            .filter(
              annotation =>
                mode !== 'live' || keys.includes(annotation.annotation_for)
            )
            .map(annotation => {
              return annotation.type === 'horizontal' ? (
                <ReferenceLine
                  y={Number(annotation.value)}
                  yAxisId={mode === 'live' ? annotation.annotation_for : 'a'}
                  label={{ value: annotation.label, fill: '#fff' }}
                  stroke={annotation.color}
                  strokeDasharray="3 3"
                />
              ) : (
                <ReferenceLine
                  x={getAnnotationfromTimeStamp(
                    additionalInfo.aggregation_granularity,
                    Number(moment(annotation.value).format('x'))
                  )}
                  yAxisId={mode === 'live' ? annotation.annotation_for : 'a'}
                  label={{ value: annotation.label, fill: annotation.color }}
                  stroke={annotation.color}
                  strokeDasharray="3 3"
                />
              );
            })}
      </LineChart>
    </ResponsiveContainer>
  );
};
LinechartRenderer.propTypes = {
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  data: PropTypes.instanceOf([]).isRequired,
  mode: PropTypes.string.isRequired,
  visibleMaximised: PropTypes.bool.isRequired,
};
export default LinechartRenderer;
