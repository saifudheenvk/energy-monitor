/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { Table, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import styled from 'styled-components';
import {
  validateValue,
  addAnnotationRow,
  removeAnnotationRow,
  changeAnnotationLabel,
  changeAnnotationType,
  changeAnnotationValue,
  changeAnnotationVital,
} from './numberAnnotationUtils';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import { ThemeContext } from './AddWidgetModal';
import { useTranslation } from 'react-i18next';
import AnnotationColorPicker from './AnnotationColorPicker';

const annotationTypes = [
  { type: 'GREATER_THAN', value: 'GREATER THAN' },
  { type: 'LESS_THAN', value: 'LESS THAN' },
  { type: 'EQUAL_TO', value: 'EQUAL TO' },
];

const CustomSelect = styled(Select)`
// border: 1px solid #848c94;
box-sizing: border-box;
border-radius: 5px;
}
`;
const AnnotationInput = styled(Input)`
  background: ${props => props.theme.inputBg}!important;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 5px;
`;
const columns = (dataSource, setDataSource, numberGroups, theme, t) => [
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
        type="number"
      />
    ),
  },
  {
    title: t('Type'),
    dataIndex: 'type',
    key: 'type',
    render: (text, record, index) => (
      <CustomSelect
        style={{ maxWidth: '200px', minWidth: '100px' }}
        defaultValue={text}
        onChange={value => {
          changeAnnotationType(dataSource, setDataSource, index, value);
        }}
      >
        {annotationTypes.map(item => (
          <Select.Option value={item.type}>{item.value}</Select.Option>
        ))}
      </CustomSelect>
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
          changeAnnotationLabel(
            dataSource,
            setDataSource,
            index,
            e.target.value
          );
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
        {numberGroups.map(item => (
          <Select.Option value={item.name}>{item.name}</Select.Option>
        ))}
      </CustomSelect>
    ),
  },
  {
    title: t('Value'),
    dataIndex: 'value',
    key: 'value',
    render: (text, record, index) => (
      <AnnotationInput
        theme={theme}
        value={text}
        onBlur={() => {
          validateValue(dataSource, setDataSource, index);
        }}
        onChange={e => {
          changeAnnotationValue(
            dataSource,
            setDataSource,
            index,
            e.target.value
          );
        }}
      />
    ),
  },
  {
    title: (
      <Button
        ghost
        type="primary"
        onClick={() => {
          addAnnotationRow(dataSource, setDataSource, numberGroups[0].name);
        }}
      >
        {t('Add')}
      </Button>
    ),
    dataIndex: '',
    key: nanoid(),
    render: (text, record, index) => {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          onClick={() => {
            removeAnnotationRow(dataSource, setDataSource, index);
          }}
        >
          <DeleteIcon />
        </div>
      );
    },
  },
];
const AddNumberAnnotationTable = ({
  dataSource,
  setDataSource,
  numberGroups,
}) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <Table
      columns={columns(dataSource, setDataSource, numberGroups, theme, t)}
      dataSource={dataSource}
      pagination={false}
    />
  );
};
AddNumberAnnotationTable.propTypes = {
  dataSource: PropTypes.node.isRequired,
  setDataSource: PropTypes.func.isRequired,
  numberGroups: PropTypes.instanceOf([]).isRequired,
};
export default AddNumberAnnotationTable;
