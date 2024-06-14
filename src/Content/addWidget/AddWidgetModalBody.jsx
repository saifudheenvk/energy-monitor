/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { message } from 'antd';
import ChoseWidgetType from './ChoseWidgetType';
import fetchAggregationStatistics from '../../api/aggregationStatisticsApis';
import ChoseVitals from './ChoseVitals';
import { wireFrameAddwidget } from '../../api/widget-apis';

const AddWidgetModalBody = ({
  setVisible,
  setWidgetState,
  widgetState,
  widgetToEdit,
  dashboardFetch,
}) => {
  const { id } = useParams();
  const d = new Date();
  const [additionalInfo, setAdditionalInfo] = useState({
    start_date: d.setDate(d.getDate() - 7),
    end_date: d.setDate(new Date().getDate()),
    aggregation_granularity: 'Daily',
    aggregation_level: 'equipments',
    theme: 'Peacock-Shade',
    duration: 60,
    is_pie: 'donut',
    stacked: true,
  });
  const [horizontalAnnotations, setHorizontalAnnotation] = useState([]);
  const [verticalAnnotations, setVerticalAnnotation] = useState([]);
  const [numberAnnotation, setNumberAnnotation] = useState([]);
  const [request, setRequest] = useState({
    additional_info: {
      aggregation_level: 'equipments',
    },
  });
  const [listType, setListType] = useState('companies');
  const hierarchyList = [
    'companies',
    'buildings',
    'floors',
    'equipmentTypes',
    'equipments',
    'vitals',
  ];
  const [filterOptions, setFilterOptions] = useState({
    companies: [],
    buildings: [],
    floors: [],
    equipmentTypes: [],
    equipments: [],
    vitals: [],
  });
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vital, setVital] = useState('');
  const getAnnotations = () => {
    switch (request.widgetType) {
      case 'bar':
        return [...horizontalAnnotations, ...verticalAnnotations];
      case 'number':
        return [...numberAnnotation];
      case 'line':
        if (request.mode === 'live') {
          return [...horizontalAnnotations];
        }
        return [...horizontalAnnotations, ...verticalAnnotations];
      default:
        return [];
    }
  };
  const [statistcs, setStatistics] = useState([]);
  const handleModalSubmit = () => {
    setLoading(true);
    const addInfo = { ...additionalInfo };
    if (request.mode === 'live') {
      delete addInfo.start_date;
      delete addInfo.end_date;
      delete addInfo.aggregation_granularity;
      delete addInfo.stacked;
      delete addInfo.is_pie;
      delete addInfo.theme;
    }
    if (request.mode !== 'live') {
      delete addInfo.duration;
      if (request.widgetType === 'number') {
        delete addInfo.start_date;
        delete addInfo.end_date;
        delete addInfo.aggregation_granularity;
      }
      if (request.widgetType !== 'pie') {
        delete addInfo.is_pie;
        delete addInfo.theme;
      }
      if (request.widgetType !== 'bar') {
        delete addInfo.stacked;
      }
    }
    wireFrameAddwidget({
      ...request,
      widget_type: request.widgetType,
      widget_name: request.widgetName,
      dashboard_id: id,
      id: widgetState === 'edit' ? widgetToEdit.Id : 0,
      additional_info: JSON.stringify({
        ...addInfo,
        annotations: getAnnotations(),
      }),
    })
      .then(({ data }) => {
        if (data.msg && data.status === 200) {
          message.success(data.msg);
          setVisible(false);
          dashboardFetch();
          setWidgetState('selectGraph');
        } else message.error(data.msg);
        setLoading(false);
      })
      .catch(error => {
        message.error('Failed');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (request.mode !== 'live') {
      fetchAggregationStatistics({
        vital: JSON.stringify({
          vital: filterOptions.vitals && filterOptions.vitals[0],
        }),
      }).then(res => {
        setStatistics(res.data.data);
      });
    }
  }, [vital, filterOptions.vitals]);
  useEffect(() => {
    if (widgetState === 'edit') {
      setRequest(prevState => ({
        ...prevState,
        widgetName: widgetToEdit.widget_name,
        widgetType: widgetToEdit.widget_type,
        mode: widgetToEdit.mode,
      }));
      const newAddInfo = JSON.parse(widgetToEdit.additional_info);
      setAdditionalInfo(prevState => ({
        ...prevState,
        stacked:newAddInfo.stacked&&newAddInfo.stacked,
        aggregation_level: newAddInfo.aggregation_level,
        start_date: newAddInfo.start_date,
        end_date: newAddInfo.end_date,
        aggregation_granularity: newAddInfo.aggregation_granularity,
        colors: newAddInfo.colors,
        labels: newAddInfo.labels,
        theme: newAddInfo.theme && newAddInfo.theme,
        is_pie: newAddInfo.is_pie,
      }));
      newAddInfo.labels.forEach(label =>
        label[newAddInfo.aggregation_level].forEach(el => {
          setDataSource(prevState => [
            ...prevState,
            { key: el, details: el.description && el.description },
          ]);
        })
      );
      if (widgetToEdit.mode !== 'live') {
        setVital(newAddInfo.labels[0].vital);
        setFilterOptions(prevState => ({
          ...prevState,
          vitals: [newAddInfo.labels[0].vital],
        }));
      }
      if (newAddInfo.annotations) {
        newAddInfo.annotations.forEach(a =>
          a.type === 'horizontal'
            ? setHorizontalAnnotation(prevState => [...prevState, a])
            : setVerticalAnnotation(prevState => [...prevState, a])
        );
        if (widgetToEdit.widget_type === 'number') {
          setNumberAnnotation(newAddInfo.annotations);
        }
      }
    }
  }, [widgetState, widgetToEdit]);
  return (
    <>
      {widgetState === 'selectGraph' ? (
        <ChoseWidgetType
          setAdditionalInfo={setAdditionalInfo}
          setWidgetState={setWidgetState}
          request={request}
          setRequest={setRequest}
          setVisible={setVisible}
          hierarchyList={hierarchyList}
        />
      ) : (
        <ChoseVitals
          vital={vital}
          statistics={statistcs}
          setVital={setVital}
          dataSource={dataSource}
          setDataSource={setDataSource}
          widgetToEdit={widgetToEdit}
          widgetState={widgetState}
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
          request={request}
          setVisible={setVisible}
          setWidgetState={setWidgetState}
          setRequest={setRequest}
          listType={listType}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          hierarchyList={hierarchyList}
          setListType={setListType}
          horizontalAnnotations={horizontalAnnotations}
          verticalAnnotations={verticalAnnotations}
          setHorizontalAnnotation={setHorizontalAnnotation}
          setVerticalAnnotation={setVerticalAnnotation}
          numberAnnotation={numberAnnotation}
          setNumberAnnotation={setNumberAnnotation}
          handleModalSubmit={handleModalSubmit}
          loading={loading}
        />
      )}
    </>
  );
};
AddWidgetModalBody.propTypes = {
  dashboardFetch: PropTypes.func.isRequired,
  widgetState: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  widgetToEdit: PropTypes.instanceOf({}).isRequired,
  setWidgetState: PropTypes.func.isRequired,
};
export default AddWidgetModalBody;
