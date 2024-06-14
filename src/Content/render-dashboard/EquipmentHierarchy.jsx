import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { fetchCompany } from '../../api/companyApis';
import {
  fetchFilteredBuildings,
  fetchFilteredFloors,
} from '../../api/BuildingApis';

import {
  fetchFilteredEquipmentTypes,
  fetchFilteredEquipments,
} from '../../api/EquipmentsApi';

const StyledTree = styled(Tree)`
  padding: 12px 0;
  &.ant-tree {
    background: ${props =>
      props.themeState === 'dark' ? '#2a2d34' : '#ffffff'};
  }
  &.ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: ${props =>
      props.themeState === 'dark' ? '#32343C' : '#E1E6ED'};
    border: 1px dashed
      ${props => (props.themeState === 'dark' ? '#fff5ab' : '#303766')};
  }
`;

const EquipmentHierarchy = ({ updateAssignedTo, modify, assignedTo }) => {
  const updateTreeData = (list, key, children) => {
    return list.map(node => {
      if (node.key === key) {
        return { ...node, children };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }

      return node;
    });
  };
  const [treeData, setTreeData] = useState([]);
  const themeState = useSelector(state => state.themeReducer);

  useEffect(() => {
    fetchCompany({}).then(({ data }) => {
      const initialTreeData = data.data.map(eachCompany => ({
        title: eachCompany.CompanyName,
        selectable: false,
        key: JSON.stringify({ level: 'company', ...eachCompany }),
      }));
      setTreeData(initialTreeData);
    });
  }, []);

  const onLoadData = event => {
    const { key } = event;
    let dataLevel = null;
    const keyData = JSON.parse(key);
    if (keyData.level === 'company') {
      dataLevel = fetchFilteredBuildings({
        companies: JSON.stringify({
          companies: [
            {
              company_id: keyData.Id,
            },
          ],
        }),
      }).then(({ data }) => {
        const { data: buildingData } = data;
        const childBuildingData = buildingData.map(eachBuilding => ({
          title: eachBuilding.BuildingName,
          key: JSON.stringify({ level: 'building', ...eachBuilding }),
          selectable: false,
        }));
        setTreeData(origin => {
          return updateTreeData(origin, key, childBuildingData);
        });
      });
    } else if (keyData.level === 'building') {
      dataLevel = fetchFilteredFloors({
        buildings: JSON.stringify({
          buildings: [
            {
              building_id: keyData.Id,
              company_id: keyData.CompanyId,
            },
          ],
        }),
      }).then(({ data }) => {
        const { data: floorData } = data;
        const childFloorData = floorData.map(eachFloor => ({
          title: eachFloor.FloorName,
          key: JSON.stringify({ level: 'floor', ...eachFloor }),
          selectable: false,
        }));
        setTreeData(origin => {
          return updateTreeData(origin, key, childFloorData);
        });
      });
    } else if (keyData.level === 'floor') {
      dataLevel = fetchFilteredEquipmentTypes({
        floors: JSON.stringify({
          floors: [
            {
              floor_id: keyData.Id,
              building_id: keyData.BuildingId,
              company_id: keyData.CompanyId,
            },
          ],
        }),
      }).then(({ data }) => {
        const { data: equipmentTypeData } = data;
        const childEquipmentTypeData = equipmentTypeData.map(eachType => ({
          title: eachType.EquipmentType,
          key: JSON.stringify({ level: 'equipmentType', ...eachType }),
          selectable: false,
        }));
        setTreeData(origin => {
          return updateTreeData(origin, key, childEquipmentTypeData);
        });
      });
    } else if (keyData.level === 'equipmentType') {
      dataLevel = fetchFilteredEquipments({
        appliance_types: JSON.stringify({
          appliance_types: [
            {
              appliance_type_id: keyData.EquipmentTypeId,
              floor_id: keyData.floor_id,
              building_id: keyData.building_id,
              company_id: keyData.company_id,
            },
          ],
        }),
      }).then(({ data }) => {
        const { data: equipmentData } = data;
        const childEquipmentData = equipmentData.map(eachEquipment => ({
          title: eachEquipment.applianceName,
          key: JSON.stringify({ level: 'equipmentType', ...eachEquipment }),
          isLeaf: true,
        }));
        setTreeData(origin => {
          return updateTreeData(origin, key, childEquipmentData);
        });
      });
    }
    return dataLevel;
  };

  const onTreeSelect = node => {
    if (node.length) {
      const selectedNode = JSON.parse(node[0]);
      const updatedAssignedTo = {
        type: 'equipments',
        equipments: [
          {
            building_id: selectedNode.Id,
            company_id: selectedNode.CompanyId,
            company_name: selectedNode.CompanyName,
            building_name: selectedNode.BuildingName,
            floor_name: selectedNode.FloorName,
            floor_id: selectedNode.FloorId,
            appliance_type_name: selectedNode.applianceType,
            appliance_type_id: selectedNode.ApplianceTypeId,
            appliance_name: selectedNode.applianceName,
            appliance_id: selectedNode.ApplianceId,
          },
        ],
      };
      updateAssignedTo(updatedAssignedTo);
    } else {
      updateAssignedTo(assignedTo);
    }
  };
  return (
    <StyledTree
      loadData={onLoadData}
      treeData={treeData}
      virtual
      height={257}
      onSelect={onTreeSelect}
      disabled={modify}
      themeState={themeState}
    />
  );
};

EquipmentHierarchy.propTypes = {
  updateAssignedTo: PropTypes.func.isRequired,
  modify: PropTypes.bool.isRequired,
  assignedTo: PropTypes.shape({}).isRequired,
};

export default EquipmentHierarchy;
