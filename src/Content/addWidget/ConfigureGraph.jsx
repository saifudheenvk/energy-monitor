import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import AddAnnotationTable from './AddAnotationTable';
import EmptyMessage from '../../utils/EmptyMessage';
import BarStakDesider from './bar/BarStackDesider';
import HelpPopover from '../../utils/HelpPopover';
import { helps } from '../../utils/HelpPopover/helpDescription';
import {
  addHorizontalAnnotationRow,
  addVerticalAnnotationRow,
} from './configureGrapgh';
import { useContext } from 'react';
import { ThemeContext } from './AddWidgetModal';
import { useTranslation } from 'react-i18next';

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
    border-radius:2px;
    background: ${props => props.theme.scrollThumb}; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.scrollThumbHover}; }
`;
const HeaderContainer = styled.div`
  display: inline-flex;
  flex: 3;
  align-items: center;
`;
const AnnotationHeader = styled.p`
  font-size: 20px;
  line-height: 27px;
  color: ${props => props.theme.headFontColor};
  font-weight: 600;
`;
const AddButtonContainer = styled.div`
  width: 90%;
`;
const HeadContainer = styled.div`
  display: inline-flex;
`;
const ConfigureGraphTab = ({
  horizontalAnnotations,
  setHorizontalAnnotation,
  verticalAnnotations,
  setVerticalAnnotation,
  additionalInfo,
  setAdditionalInfo,
  request,
}) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <ConfigureGraphContainer theme={theme}>
      {additionalInfo &&
      additionalInfo.labels &&
      additionalInfo.labels.length !== 0 ? (
        <>
          {/* <LabelInputContainer>
            <Row>
              <Form layout="inline">
                <LabelConfigItem label="X Axis Label">
                  <LabelInput />
                </LabelConfigItem>
                <LabelConfigItem label="Y Axis Label">
                  <LabelInput />
                </LabelConfigItem>
              </Form>
            </Row>
          </LabelInputContainer> */}

          {request.widgetType === 'bar' && (
            <BarStakDesider
              additionalInfo={additionalInfo}
              setAdditionalInfo={setAdditionalInfo}
            />
          )}
          <Row gutter={[36, 48]}>
            <Col span={request.mode === 'live' ? 24 : 12}>
              <Row justify="space-between">
                <Col span={16}>
                  <HeadContainer>
                    <AnnotationHeader theme={theme}>
                      {t('Horizontal Annotations')}
                    </AnnotationHeader>
                    <HelpPopover
                      helpList={[helps.configureGraph.line.horizontal]}
                      iconStyle={{ marginTop: '-3px' }}
                    />
                  </HeadContainer>
                </Col>
                <Col>
                  <AddButtonContainer>
                    <Button
                      ghost
                      type="primary"
                      style={{ float: 'right' }}
                      onClick={() => {
                        addHorizontalAnnotationRow(
                          horizontalAnnotations,
                          setHorizontalAnnotation,
                          additionalInfo &&
                            request.mode === 'live' &&
                            additionalInfo.labels[0].name
                        );
                      }}
                    >
                      {t('Add')}
                    </Button>
                  </AddButtonContainer>
                </Col>
              </Row>
              <AddAnnotationTable
                dataSource={horizontalAnnotations}
                setDataSource={setHorizontalAnnotation}
                annotationType="horizontal"
                additionalInfo={additionalInfo}
                request={request}
              />
            </Col>
            <Col span={12}>
              {additionalInfo &&
                request.mode !== 'live' &&
                additionalInfo.aggregation_granularity !== 'Hourly' && (
                  <>
                    <Row justify="space-between">
                      <Col span={16}>
                        <HeadContainer>
                          <AnnotationHeader theme={theme}>
                            {t('Vertical Annotations')}
                          </AnnotationHeader>
                          <HelpPopover
                            helpList={[helps.configureGraph.line.vertical]}
                            iconStyle={{ marginTop: '-3px' }}
                          />
                        </HeadContainer>
                      </Col>
                      <Col>
                        <AddButtonContainer>
                          <Button
                            ghost
                            type="primary"
                            style={{ float: 'right' }}
                            onClick={() => {
                              addVerticalAnnotationRow(
                                verticalAnnotations,
                                setVerticalAnnotation,
                                additionalInfo &&
                                  request.mode === 'live' &&
                                  additionalInfo.labels[0].name
                              );
                            }}
                          >
                            {t('Add')}
                          </Button>
                        </AddButtonContainer>
                      </Col>
                    </Row>
                    <AddAnnotationTable
                      dataSource={verticalAnnotations}
                      annotationType="vertical"
                      setDataSource={setVerticalAnnotation}
                      additionalInfo={additionalInfo}
                      request={request}
                    />
                  </>
                )}
            </Col>
          </Row>
        </>
      ) : (
        <EmptyMessage message="Configure atleast one vital to add annotations." />
      )}
    </ConfigureGraphContainer>
  );
};
ConfigureGraphTab.propTypes = {
  horizontalAnnotations: PropTypes.instanceOf([]).isRequired,
  verticalAnnotations: PropTypes.instanceOf([]).isRequired,
  setHorizontalAnnotation: PropTypes.func.isRequired,
  setVerticalAnnotation: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  request: PropTypes.instanceOf({}).isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
};
export default ConfigureGraphTab;
