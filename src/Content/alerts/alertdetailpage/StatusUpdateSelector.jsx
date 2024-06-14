import React from "react";
import { Row, Col, Select, Button } from "antd";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const {Option}=Select;

const StatusRow = styled(Row)`
  padding-bottom: 20px;
`;

const UpdateButton = styled(Button)`
  margin-left: ${props => props.lang !== 'ar' ? '10px' : '0'};
  border-radius: 2px;
  margin-right: ${props => props.lang === 'ar' ? '10px' : '0'};
`;
const StatusSelector = styled(Select)`
  width: 100%;

  & .ant-select-selection {
    margin-bottom: 20px;
    border-radius: 2px;
  }
`;
const alertStatuses = [
  "OPENED",
  "CLOSED",
  "WORK_IN_PROGRESS",
  "HELD",
  "HELD_FOR_SPARE"
];
const StatusUpdateSelector = ({ currentStatus, handleStatusChange,updateStatus,statusID }) => {

  const { t } = useTranslation();
  const lang = useSelector(state => state.lang);

return(
  <StatusRow>
    <Col span={14}>
      <StatusSelector value={currentStatus} onSelect={handleStatusChange}>
        {alertStatuses.map(status => (
          <Option value={status} key={status}>
            {status}
          </Option>
        ))}
      </StatusSelector>
    </Col>
    <Col span={10}>
      <UpdateButton type="primary" ghost onClick={()=>updateStatus(statusID)} lang={lang} >
        {t("Update")}
      </UpdateButton>
    </Col>
  </StatusRow>
);
}
export default StatusUpdateSelector;
