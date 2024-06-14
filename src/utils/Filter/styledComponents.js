import { Button, DatePicker, Select, Col, Row, message } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 0.5rem;
`;

export const FilterCol = styled(Col)`
  padding: 10px;
  @media (max-width: 414px) {
    padding: 3px 5px;
    margin: 3px;
  }
`;

export const FilterSelect = styled(Select)`
  width: 100%;
  border-radius: 5px;
  .ant-select-selection {
    background-color: transparent;
  }
  .ant-select-selection:hover {
    border: 1px solid #434343;
  }
`;

export const FilterDatePicker = styled(DatePicker)`
  .ant-input-sm {
    height: 32px;
  }
  &.ant-calendar-picker {
    border: 1px solid #434343;
    border-radius: 4px;
    cursor: pointer;
  }
  & .ant-calendar-picker-input.ant-input-sm {
    cursor: pointer;
  }
`;
