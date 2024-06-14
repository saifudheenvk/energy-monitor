/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Select, Row, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Container, FilterSelect, FilterCol } from './styledComponents';
import Company from './company';
import Buildings from './buildings';
import Location from './locations';
import Equipments from './Equipments';
import Type from './EquipmentType';
import Date from './Date';
import { FetchFloor } from '../../api/BuildingApis';

const { Option } = Select;

const Floor = ({ filterOptions, handleChange }) => {
  const [floors, setFloors] = useState([1, 2, 3]);
  const { t } = useTranslation();
  useEffect(() => {
    FetchFloor({
      companyId: filterOptions.company && filterOptions.company.Id,
      buildingId: filterOptions.building && filterOptions.building.Id,
    }).then(res => {
      setFloors(res.data.data);
    });
  }, [filterOptions]);
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t('Floor')}</p>
      <FilterSelect
        value={filterOptions.floor && filterOptions.floor.FloorName}
        onChange={val =>
          handleChange(
            floors.find(floor => floor.FloorName === val),
            'floor'
          )
        }
        placeholder={t('Select floor')}
        optionFilterProp="children"
      >
        {floors &&
          floors.map(floor => {
            return <Option value={floor.FloorName}>{floor.FloorName}</Option>;
          })}
      </FilterSelect>
    </FilterCol>
  );
};
Floor.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};

const Status = ({ filterOptions, handleChange, alertStatuses }) => {
  const { t } = useTranslation();
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t('Status')}</p>
      <FilterSelect
        value={filterOptions.status}
        onChange={val => handleChange(val, 'status')}
        placeholder={t('Select status')}
        optionFilterProp="children"
      >
        {alertStatuses.map(status => {
          return <Option value={status}>{t(status)}</Option>;
        })}
      </FilterSelect>
    </FilterCol>
  );
};
Status.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  alertStatuses: PropTypes.instanceOf([]).isRequired,
};

const FilterRow = ({
  fetchCity,
  title,
  setFilterOptions,
  filterOptions,
  company,
  locations,
  alertStatuses,
  type,
  setType,
}) => {
  const handleChange = (val, key) => {
    if (title === 'Dashboards') {
      setFilterOptions({ ...filterOptions, type, [key]: val });
    } else {
      setFilterOptions({ ...filterOptions, [key]: val });
    }
  };
  const FilterFactory = () => {
    const { t } = useTranslation();
    switch (title) {
      case t('Buildings'):
        return (
          <Row>
            <Company
              company={company}
              filterOptions={filterOptions}
              handleChange={handleChange}
            />

            <Location
              locations={locations}
              filterOptions={filterOptions}
              fetchCity={fetchCity}
              handleChange={handleChange}
            />
          </Row>
        );
      case t('Equipments'):
        return (
          <Row>
            <Company
              company={company}
              filterOptions={filterOptions}
              handleChange={handleChange}
            />
            {filterOptions.company && (
              <Buildings
                filterOptions={filterOptions}
                handleChange={handleChange}
              />
            )}
            {filterOptions.building && (
              <Floor
                filterOptions={filterOptions}
                handleChange={handleChange}
              />
            )}
            {filterOptions.floor && (
              <Type filterOptions={filterOptions} handleChange={handleChange} />
            )}
          </Row>
        );
      case t('Alerts'):
        return (
          <Row>
            <Company
              company={company}
              filterOptions={filterOptions}
              handleChange={handleChange}
            />
            {filterOptions.company && (
              <Buildings
                filterOptions={filterOptions}
                handleChange={handleChange}
              />
            )}
            {filterOptions.building && (
              <Equipments
                filterOptions={filterOptions}
                name={title}
                handleChange={handleChange}
              />
            )}
            <Status
              filterOptions={filterOptions}
              handleChange={handleChange}
              alertStatuses={alertStatuses}
            />
            <Date
              name={t('Date')}
              filterOptions={filterOptions}
              placeholder={t('select date')}
              handleChange={handleChange}
            />
          </Row>
        );
      case 'Dashboards':
        return (
          <Row>
            <Date
              name={t('Created')}
              filterOptions={filterOptions}
              handleChange={handleChange}
            />
            <Date
              name={t('Last Updated')}
              filterOptions={filterOptions}
              handleChange={handleChange}
            />
            <FilterCol>
              <Radio.Group onChange={e => setType(e.target.value)} value={type}>
                <Radio value='buildings'>{t('Buildings')}</Radio>
                <Radio value='equipments'>{t('Equipments')}</Radio>
              </Radio.Group>
            </FilterCol>
           {(type === 'buildings' || type === 'equipments') && <Company
              company={company}
              filterOptions={filterOptions}
              handleChange={handleChange}
            />}
            {filterOptions.company && (
              <Buildings
                filterOptions={filterOptions}
                handleChange={handleChange}
              />
            )}
            {(filterOptions.building && type === 'equipments') && (
              <Floor
                filterOptions={filterOptions}
                handleChange={handleChange}
              />
            )}
            {filterOptions.building &&
              filterOptions.floor &&
              type === 'equipments' && (
                <Type
                  filterOptions={filterOptions}
                  handleChange={handleChange}
                />
              )}
            {filterOptions.building &&
              filterOptions.floor &&
              filterOptions.equipmentType &&
              type === 'equipments' && (
                <Equipments
                  filterOptions={filterOptions}
                  handleChange={handleChange}
                  name={title}
                />
              )}
          </Row>
        );
      default:
        return '';
    }
  };
  return <Container>{FilterFactory()}</Container>;
};
FilterRow.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  alertStatuses: PropTypes.instanceOf([]).isRequired,
  fetchCity: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setFilterOptions: PropTypes.func.isRequired,
  company: PropTypes.instanceOf([]).isRequired,
  locations: PropTypes.instanceOf([]).isRequired,
  type:PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};

export default FilterRow;
