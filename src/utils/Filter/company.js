import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { FilterSelect, FilterCol } from './styledComponents';
const { Option } = Select;
const Company = ({ filterOptions, handleChange, company }) => {
  const { t } = useTranslation();
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t("Company")}</p>
      <FilterSelect
        style={{ minWidth: '120px' }}
        value={filterOptions.company && filterOptions.company.CompanyName}
        onSelect={val => {
          handleChange(
            company.find(oneCompany => val === oneCompany.CompanyName),
            'company'
          );
        }}
        placeholder={t("Select company")}
      >
        {company.map(oneCompany => {
          return (
            <Option value={oneCompany.CompanyName} key={oneCompany.CompanyName}>
              {oneCompany.CompanyName}
            </Option>
          );
        })}
      </FilterSelect>
    </FilterCol>
  );
};

export default Company;
