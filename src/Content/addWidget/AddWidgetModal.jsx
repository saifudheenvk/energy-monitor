import React, { createContext, useContext } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AddWidgetModalBody from './AddWidgetModalBody';
import { light, dark } from './modal-theme/modal-theme';
import { useTranslation } from 'react-i18next';

const ModalContent = styled(Modal)`
  & .ant-modal-header {
    background: ${props => props.theme.modalHeaderBg};
  }
  & .ant-modal-title {
    margin: 0;
    font-weight: 600;
    font-size: 22px;
    line-height: 22px;
    word-wrap: break-word;
  }
  .ant-modal-close {
    color: ${props => props.theme.modalCloseIcon};
  }
  .ant-modal-content {
    background-color: ${props => props.theme.modalBg} !important;
  }
`;
export const ThemeContext = createContext(
  localStorage.getItem('app_theme' === 'white' ? light : dark)
);

const AddWidgetModal = ({
  visible,
  setVisible,
  widgetState,
  setWidgetState,
  widgetToEdit,
  dashboardFetch,
}) => {
  const theme = useContext(ThemeContext);
  const themeState = useSelector(state => state.themeReducer);
  const { t } = useTranslation();
  const AddWidget = () => {
    setVisible(false);
  };
  return (
    <ThemeContext.Provider value={themeState === 'white' ? light : dark}>
      <ModalContent
        theme={themeState === 'white' ? light : dark}
        className="modal"
        bodyStyle={{ height: '100%', paddingBottom: 0 }}
        width={widgetState === 'selectGraph' ? '80%' : '90%'}
        title={t("Add this widget to dashboard")}
        onOk={AddWidget}
        onCancel={() => {
          setWidgetState('selectGraph');
          setVisible(false);
        }}
        visible={visible}
        footer={[]}
        centered
        maskClosable={false}
        destroyOnClose
      >
        <AddWidgetModalBody
          widgetToEdit={widgetToEdit}
          setVisible={setVisible}
          setWidgetState={setWidgetState}
          widgetState={widgetState}
          dashboardFetch={dashboardFetch}
        />
      </ModalContent>
    </ThemeContext.Provider>
  );
};
AddWidgetModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  dashboardFetch: PropTypes.func.isRequired,
  widgetState: PropTypes.string.isRequired,
  setWidgetState: PropTypes.func.isRequired,
  widgetToEdit: PropTypes.instanceOf({}).isRequired,
};
export default AddWidgetModal;
