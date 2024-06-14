import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const AssignDashboardContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.3em;
`;

const AssignedKey = styled.label`
  font-size: 12px;
  color: #848c94;
  margin-right: 10px;
  margin-left: ${props => (props.lang === 'ar' ? '10px' : '0')};
`;

const HeaderButton = styled(Button)`
  && {
    background: ${props => (props.themeState === 'dark' ? '#32343c' : '#fff')};
    border: 1px solid #848c94;
    box-sizing: border-box;
    border-radius: 5px;
    width: 250px;
    height: 32px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media (max-width: 700px) {
      width: 100%;
    }
  }
`;

const AssignToHeaderButton = styled(Button)`
  background-color: ${props =>
    props.themeState === 'dark' ? '#32343c' : '#fff'} !important;
  border: 1px solid #848c94 !important ;
  box-sizing: border-box !important;
  border-radius: 5px !important;
  width: ${props => (props.assignButton ? '150 px' : '250px')};
  height: 32px;
  font-size: 12px;
  overflow: ${props => (props.assignButton ? 'unset' : 'hidden')};
  white-space: ${props => (props.assignButton ? 'unset' : 'nowrap')};
  text-overflow: ${props => (props.assignButton ? 'unset' : 'ellipsis')};
`;

const AssignDashboardDropDown = ({ assignedTo, onAssignedToClick }) => {
  const themeState = useSelector(state => state.themeReducer);
  const [tagContent, setTagContent] = useState('');
  const lang = useSelector(state => state.lang);
  const { t: i18n } = useTranslation();

  const updateTagContent = () => {
    let tagValue = '';
    if (assignedTo.buildings || assignedTo.equipments) {
      if (!assignedTo.type || assignedTo.type === 'buildings') {
        tagValue = `${assignedTo.buildings[0].company_name ||
          assignedTo.buildings[0].CompanyName} / ${assignedTo.buildings[0]
          .building_name || assignedTo.buildings[0].buildingName}`;
      } else if (assignedTo.type && assignedTo.type === 'equipments') {
        tagValue = `${assignedTo.equipments[0].company_name} / ${assignedTo.equipments[0].building_name} / ${assignedTo.equipments[0].floor_name} / ${assignedTo.equipments[0].appliance_type_name} / ${assignedTo.equipments[0].appliance_name}`;
      }
    }
    setTagContent(tagValue);
  };

  useEffect(() => {
    updateTagContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedTo]);

  const handleClick = () => {
    onAssignedToClick(true);
  };

  return (
    <AssignDashboardContainer>
      {tagContent ? (
        <>
          <AssignedKey lang={lang}>{`${i18n('Assigned To')} :`}</AssignedKey>
          <Tooltip title={tagContent}>
            <HeaderButton
              assignButton={false}
              themeState={themeState}
              onClick={handleClick}
            >
              {tagContent}
            </HeaderButton>
          </Tooltip>
        </>
      ) : (
        <HeaderButton
          assignButton
          themeState={themeState}
          onClick={handleClick}
        >
          {i18n('Assign Dashboard')}
        </HeaderButton>
      )}
    </AssignDashboardContainer>
  );
};

AssignDashboardDropDown.propTypes = {
  assignedTo: PropTypes.shape({
    type: PropTypes.string,
    buildings: PropTypes.arrayOf({}),
    equipments: PropTypes.arrayOf({}),
  }).isRequired,
  onAssignedToClick: PropTypes.func.isRequired,
};

export default AssignDashboardDropDown;
