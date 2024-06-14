import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { fetchCompany } from '../../api/companyApis';
import { fetchFilteredBuildings } from '../../api/BuildingApis';

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

const BuildingsHierarchy = ({ updateAssignedTo, modify, assignedTo }) => {
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
        key: eachCompany.Id,
      }));
      setTreeData(initialTreeData);
    });
  }, []);

  const onLoadData = event => {
    const { key } = event;
    return fetchFilteredBuildings({
      companies: JSON.stringify({
        companies: [
          {
            company_id: key,
          },
        ],
      }),
    }).then(({ data }) => {
      const { data: buildingData } = data;
      const childBuildingData = buildingData.map(eachBuilding => ({
        title: eachBuilding.BuildingName,
        key: JSON.stringify(eachBuilding),
        isLeaf: true,
      }));
      setTreeData(origin => {
        return updateTreeData(origin, key, childBuildingData);
      });
    });
  };

  const onTreeSelect = node => {
    if (node.length) {
      const selectedNode = JSON.parse(node[0]);
      const updatedAssignedTo = {
        type: 'buildings',
        buildings: [
          {
            building_id: selectedNode.Id,
            company_id: selectedNode.CompanyId,
            company_name: selectedNode.CompanyName,
            building_name: selectedNode.BuildingName,
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

BuildingsHierarchy.propTypes = {
  updateAssignedTo: PropTypes.func.isRequired,
  modify: PropTypes.bool.isRequired,
  assignedTo: PropTypes.shape({}).isRequired,
};

export default BuildingsHierarchy;
