/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect } from 'react';
import { Table, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import styled from 'styled-components';
import VerticalAnnotationCalenderFactory from './VerticalAnnotationCalenderFactory';

import DeleteIcon from '../../assets/icons/DeleteIcon';
import {
  addHorizontalAnnotationRow,
  addVerticalAnnotationRow,
  removeHorizontalAnnotationRow,
  removeVericalAnnotation,
  changeLabelInput,
  changeAnnoatationInput,
  changeAnnotationVital,
} from './configureGrapgh';
import './annotationTable.css';
import { ThemeContext } from './AddWidgetModal';
import { useTranslation } from 'react-i18next';
import AnnotationColorPicker from './AnnotationColorPicker';

const CustomSelect = styled(Select)`
// border: 1px solid #848c94;
box-sizing: border-box;
border-radius: 5px;
}
`;
const AnnotationInput = styled(Input)`
  background: ${props => props.theme.inputBg} !important;
  box-sizing: border-box;
  border-radius: 5px;
`;

const columns = (
  type,
  dataSource,
  setDataSource,
  additionalInfo,
  theme,
  t,
  widgetType
) => [
  {
    title: '',
    dataIndex: 'color',
    key: 'color',
    render: (color, record, index) => (
      <AnnotationColorPicker
        color={color}
        index={index}
        setDataSource={setDataSource}
        dataSource={dataSource}
        type={widgetType}
      />
    ),
  },
  {
    title: t('Label'),
    dataIndex: 'label',
    key: 'label',
    render: (text, record, index) => (
      <AnnotationInput
        theme={theme}
        value={text}
        onChange={e => {
          changeLabelInput(dataSource, setDataSource, index, e.target.value);
        }}
      />
    ),
  },
  {
    title: t('Vitals'),
    dataIndex: 'annotation_for',
    key: 'label',
    render: (text, record, index) => (
      <CustomSelect
        style={{ maxWidth: '2500px' }}
        defaultValue={text}
        onChange={value => {
          changeAnnotationVital(dataSource, setDataSource, index, value);
        }}
      >
        {additionalInfo &&
          additionalInfo.labels.map(item => (
            <Select.Option value={item.name}>{item.name}</Select.Option>
          ))}
      </CustomSelect>
    ),
  },
  {
    title: t('Value'),
    dataIndex: 'value',
    key: 'value',
    render: (text, record, index) =>
      type === 'horizontal' ? (
        <AnnotationInput
          theme={theme}
          value={text}
          onChange={e => {
            changeAnnoatationInput(
              dataSource,
              setDataSource,
              index,
              e.target.value
            );
          }}
        />
      ) : (
        <VerticalAnnotationCalenderFactory
          additionalInfo={additionalInfo}
          defaultDate={text}
          changeAnnoatationInput={changeAnnoatationInput}
          dataSource={dataSource}
          setDataSource={setDataSource}
          index={index}
        />
      ),
  },
  {
    title: t('Delete'),
    dataIndex: '',
    key: '',
    render: (text, record, index) => {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          onClick={() => {
            if (type === 'horizontal')
              removeHorizontalAnnotationRow(dataSource, setDataSource, index);
            else removeVericalAnnotation(dataSource, setDataSource, index);
          }}
        >
          <DeleteIcon />
        </div>
      );
    },
  },
];
const AddAnnotationTable = ({
  dataSource,
  annotationType,
  setDataSource,
  additionalInfo,
  request,
}) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <Table
      columns={columns(
        annotationType,
        dataSource,
        setDataSource,
        additionalInfo,
        theme,
        t,
        request.widgetType
      ).filter(c => !(c.title === t('Vitals') && request.mode !== 'live'))}
      dataSource={dataSource}
      pagination={false}
    />
  );
};
AddAnnotationTable.propTypes = {
  dataSource: PropTypes.node.isRequired,
  annotationType: PropTypes.string.isRequired,
  setDataSource: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  request: PropTypes.instanceOf({}).isRequired,
};

export default AddAnnotationTable;
