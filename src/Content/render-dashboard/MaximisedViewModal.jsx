import React, { useRef } from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WidgetApiWrapper from './WidgetApiWraper';
import PrintItems from '../../utils/PrintItems';
import { useSelector } from 'react-redux';

const ModalContent = styled(Modal)`
  .ant-modal-footer {
    margin-top: -79px !important;
    text-align: right !important;
  }
  ${props =>
    props.theme !== 'dark' &&
    `& .ant-modal-content {
    background-color: rgb(255, 255, 255);
  }`}
`;
const MaximisedViewModal = ({
  data,
  visibleMaximised,
  setVisibleMaximised,
}) => {
  const printRef = useRef(null);
  const themeState = useSelector(state => state.themeReducer);

  return (
    <ModalContent
      theme={themeState}
      bodyStyle={{ height: '70vh', paddingBottom: 0 }}
      className="modal"
      title={data.widget_name}
      visible={visibleMaximised}
      width={window.innerWidth * 0.95}
      onCancel={() => {
        setVisibleMaximised(false);
      }}
      footer={[
        <Button
          type="link"
          onClick={() => {
            setVisibleMaximised(false);
          }}
        >
          Close
        </Button>,
      ]}
    >
      <WidgetApiWrapper
        visibleMaximised={visibleMaximised}
        mode={data.mode}
        itemId={data.Id}
        printRef={printRef}
      />
      {/* <PrintItems printRef={printRef} /> */}
    </ModalContent>
  );
};
MaximisedViewModal.propTypes = {
  data: PropTypes.instanceOf({}).isRequired,
  visibleMaximised: PropTypes.bool.isRequired,
  setVisibleMaximised: PropTypes.bool.isRequired,
};
export default MaximisedViewModal;
