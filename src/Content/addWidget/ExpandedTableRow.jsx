import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

const showableKeys = [
  'CompanyName',
  'BuildingName',
  'FloorName',
  'applianceName',
  'ModelName',
  'MakeName',
  'applianceType',
];
const ExpandedTableRow = ({ record }) => {
  useEffect(() => {
    console.log(record);
  }, [record]);
  return (
    <Row gutter={24}>
      {Object.entries(record.key).map(([key, value]) => {
        return (
          showableKeys.includes(key) && (
            <Col sm={24} md={12} lg={12} xl={12} xxl={6}>
              <Row>
                <Col span={11}>{key}</Col>
                <Col span={1}>:</Col>
                <Col span={12}>{value}</Col>
              </Row>
            </Col>
          )
        );
      })}
    </Row>
  );
};
ExpandedTableRow.propTypes = {
  record: PropTypes.instanceOf({}).isRequired,
};
export default ExpandedTableRow;
