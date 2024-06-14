import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { useTranslation } from 'react-i18next';

const BreadcrumbContainer = styled.div`
  margin-bottom: 20px;
`;

const ChooseVitalBreadCrumb = ({ listType, blist, setListType }) => {
  const { t } = useTranslation(); 
  const index = blist.findIndex(item => item === listType);
  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return (
    <BreadcrumbContainer>
      <Breadcrumb>
        {blist.slice(0, index + 1).map(item => (
          <Breadcrumb.Item
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setListType(item);
            }}
          >
            {t(capitalize(item.split(/(?=[/A-Z])/).join(' ')))}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </BreadcrumbContainer>
  );
};
ChooseVitalBreadCrumb.propTypes = {
  listType: PropTypes.string.isRequired,
  blist: PropTypes.instanceOf([]).isRequired,
  setListType: PropTypes.func.isRequired,
};

export default ChooseVitalBreadCrumb;
