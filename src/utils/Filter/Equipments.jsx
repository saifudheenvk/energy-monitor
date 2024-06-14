import React, { useState, useEffect } from 'react';
import { Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FilterSelect, FilterCol } from './styledComponents';
import { fetchEquipments } from '../../api/EquipmentsApi';

const { Option } = Select;

const Equipments = ({ filterOptions, handleChange, name }) => {
  const [equipmentsList, setEquipmentsList] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const selectedOptions = name === 'Dashboards' && {
      floorName: filterOptions.floor && filterOptions.floor.FloorName,
      applianceType:
        filterOptions.equipmentType && filterOptions.equipmentType.EquipmentType,
    }
    fetchEquipments({
      filter_option: JSON.stringify({
        CompanyName: filterOptions.company && filterOptions.company.CompanyName,
        BuildingName:
          filterOptions.building && filterOptions.building.BuildingName,
          ...selectedOptions
      }),
    }).then(res => {
      if (res.data.data) {
        setEquipmentsList(res.data.data);
      } else {
        message.error(res.data.message);
      }
    });
  }, [filterOptions]);
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t("Equipments")}</p>
      <FilterSelect
        value={filterOptions.equipment && filterOptions.equipment.applianceName}
        onChange={val =>
          handleChange(
            equipmentsList.find(equipment => equipment.applianceName === val),
            'equipment'
          )
        }
        placeholder={t("Select Equipment")}
        optionFilterProp="children"
      >
        {equipmentsList &&
          equipmentsList.map(equipment => {
            return (
              <Option value={equipment.applianceName}>
                {equipment.applianceName}
              </Option>
            );
          })}
      </FilterSelect>
    </FilterCol>
  );
};

Equipments.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Equipments;
