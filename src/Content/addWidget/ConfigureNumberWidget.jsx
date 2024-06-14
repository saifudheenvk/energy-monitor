import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddNumberAnnotationTable from './AddNumberAnnotationTable';
import HelpPopover from '../../utils/HelpPopover';
import { helps } from '../../utils/HelpPopover/helpDescription';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './AddWidgetModal';

const ConfigureGraphContainer = styled.div`
  width: 100%;
  height: 50vh;
  padding: 20px;
  outline: none;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.scrolTrack};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: ${props => props.theme.scrollThumb};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.scrollThumbHover};
  }
`;
const AnnotationHeader = styled.h3`
  color: #848c94;
`;
const HeaderContainer = styled.div`
  display: inline-flex;
`;
const ConfigureNumberWidget = ({
  numberAnnotation,
  setNumberAnnotation,
  additionalInfo,
}) => {
  const { t } = useTranslation();
  const theme = useContext(ThemeContext);
  return (
    <ConfigureGraphContainer theme={theme}>
      <HeaderContainer>
        <AnnotationHeader>{t('Annotations')}</AnnotationHeader>
        <HelpPopover
          helpList={[helps.configureGraph.number.annotation]}
          iconStyle={{ marginTop: '-3px' }}
        />
      </HeaderContainer>
      {additionalInfo.labels && additionalInfo.labels.length !== 0 ? (
        <AddNumberAnnotationTable
          dataSource={numberAnnotation}
          setDataSource={setNumberAnnotation}
          numberGroups={additionalInfo.labels}
        />
      ) : (
        <div style={{ width: '100%', height: '50%' }}>
          <div
            style={{ margin: 'auto', width: 'max-content', marginTop: '50px' }}
          >
            <p style={{ width: 'max-content' }}>
              <i>{t('Configure atleast one vital to add annotations..')}</i>
            </p>
          </div>
        </div>
      )}
    </ConfigureGraphContainer>
  );
};
ConfigureNumberWidget.propTypes = {
  numberAnnotation: PropTypes.instanceOf([]).isRequired,
  setNumberAnnotation: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
};
export default ConfigureNumberWidget;
