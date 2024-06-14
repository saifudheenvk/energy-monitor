import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Button, Radio } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import BuildingsHierarchy from './BuildingsHierarchy';
import EquipmentHierarchy from './EquipmentHierarchy';

const TreeSectionContainer = styled.div`
  height: 257px;
  width: 100%;
  overflow-x: hidden:
  scroll: auto;
  background: ${props =>
    props.themeState === 'dark' ? '#2a2d34' : '#ffffff'} !important;
`;

const AssignToRadioButton = styled(Radio)`
  & .ant-radio-inner {
    border-color: rgba(255, 255, 255, 0.65);
  }
`;

const AssignedDetailsRow = styled(Row)`
  margin: 6px 0 12px 0;
`;

const NoContentView = styled(Col)`
  color: #848c94;
`;

const ButtonColumn = styled(Col)`
  text-align: ${props => (props.lang !== 'ar' ? 'right' : 'left')};
`;

const SubSectionButton = styled(Button)`
  margin-left: 12px;
`;

const AssignDashboardModal = props => {
  const { visible, setVisible, assignedTo, assignDashboard } = props;
  const [tagContent, setTagContent] = useState('');
  const [enableAddOrUpdate, setAddOrUpdateStatus] = useState(true);
  const [treeType, setTreeType] = useState('buildings');
  const [assignedToValue, updateAssignedToValue] = useState({});
  const { t: i18n } = useTranslation();
  const lang = useSelector(state => state.lang);
  const themeState = useSelector(state => state.themeReducer);

  const updateTagContent = () => {
    let tagValue = '';
    if (assignedToValue.buildings || assignedToValue.equipments) {
      if (!assignedToValue.type || assignedToValue.type === 'buildings') {
        tagValue = `${assignedToValue.buildings[0].company_name ||
          assignedToValue.buildings[0].CompanyName} / ${assignedToValue
          .buildings[0].building_name ||
          assignedToValue.buildings[0].buildingName}`;
        setTreeType('buildings');
      } else if (
        assignedToValue.type &&
        assignedToValue.type === 'equipments'
      ) {
        tagValue = `${assignedToValue.equipments[0].company_name} / ${assignedToValue.equipments[0].building_name} / ${assignedToValue.equipments[0].floor_name} / ${assignedToValue.equipments[0].appliance_type_name} / ${assignedToValue.equipments[0].appliance_name}`;
        setTreeType('equipments');
      }
    }
    setTagContent(tagValue);
  };

  useEffect(() => {
    updateTagContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedToValue]);

  useEffect(() => {
    updateAssignedToValue(assignedTo);
  }, [assignedTo]);

  const onTypeChange = event => {
    setTreeType(event.target.value);
  };

  const handleAddOrUpdate = () => {
    setAddOrUpdateStatus(false);
  };

  const handleAssignedToRemove = () => {
    updateAssignedToValue({});
  };

  const handleModalClose = () => {
    updateAssignedToValue(assignedTo);
    setAddOrUpdateStatus(true);
    setVisible(false);
  };

  const handleConFirm = () => {
    assignDashboard(assignedToValue);
  };

  return (
    <div>
      <Modal
        title={i18n('Assign Dashboard')}
        bodyStyle={{ height: '100%', paddingBottom: 0 }}
        width="60%"
        visible={visible}
        onOk={handleConFirm}
        onCancel={handleModalClose}
        okText={i18n('Confirm')}
        cancelText={i18n('Cancel')}
        destroyOnClose
        maskClosable={false}
      >
        <div>
          <AssignedDetailsRow gutter={24}>
            <Col sm={24} md={24} lg={12} xl={12}>
              {`${i18n('Assigned To')}:`}
            </Col>
          </AssignedDetailsRow>
          <AssignedDetailsRow>
            {tagContent ? (
              <Col sm={24} md={24} lg={12} xl={12}>
                {tagContent}
              </Col>
            ) : (
              <NoContentView sm={24} md={24} lg={12} xl={12}>
                {`${i18n('Not assigned')}:`}
              </NoContentView>
            )}
          </AssignedDetailsRow>
          <AssignedDetailsRow gutter={24}>
            <ButtonColumn sm={24} md={24} lg={12} xl={24} lang={lang}>
              <SubSectionButton
                key="3"
                onClick={handleAssignedToRemove}
                disabled={!tagContent}
              >
                {i18n('Remove')}
              </SubSectionButton>
              <SubSectionButton
                type="primary"
                ghost
                key="3"
                onClick={handleAddOrUpdate}
              >
                {tagContent ? i18n('Update') : i18n('Add')}
              </SubSectionButton>
            </ButtonColumn>
          </AssignedDetailsRow>
          <AssignedDetailsRow gutter={24}>
            <Col sm={24} md={24} lg={12} xl={12}>
              {`${i18n('Assign To')}:`}
            </Col>
          </AssignedDetailsRow>
          <AssignedDetailsRow>
            <Radio.Group
              value={treeType}
              onChange={onTypeChange}
              disabled={enableAddOrUpdate}
            >
              <Col span={24}>
                <AssignToRadioButton value="buildings">
                  {i18n('Buildings')}
                </AssignToRadioButton>
                <AssignToRadioButton value="equipments">
                  {i18n('Equipments')}
                </AssignToRadioButton>
              </Col>
            </Radio.Group>
          </AssignedDetailsRow>
          <AssignedDetailsRow>
            <TreeSectionContainer themeState={themeState}>
              {treeType === 'buildings' ? (
                <BuildingsHierarchy
                  updateAssignedTo={updateAssignedToValue}
                  modify={enableAddOrUpdate}
                  assignedTo={assignedTo}
                />
              ) : (
                <EquipmentHierarchy
                  updateAssignedTo={updateAssignedToValue}
                  modify={enableAddOrUpdate}
                  assignedTo={assignedTo}
                />
              )}
            </TreeSectionContainer>
          </AssignedDetailsRow>
        </div>
      </Modal>
    </div>
  );
};

AssignDashboardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  assignedTo: PropTypes.shape({}).isRequired,
  assignDashboard: PropTypes.func.isRequired,
};

export default AssignDashboardModal;
