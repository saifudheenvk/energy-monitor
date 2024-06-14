import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import pieThemes from './pieThemes';
import ChartTypes from './ChartTypes';
import { helps } from '../../../utils/HelpPopover/helpDescription';
import HelpPopover from '../../../utils/HelpPopover';
import { ThemeContext } from '../AddWidgetModal';
import { useTranslation } from 'react-i18next';

const ConfigureGraphContainer = styled.div`
  background: ${props => props.theme.inputBg};
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
const ColorPanel = styled.div`
  // background: black;
  importcharttypesfrom"./charttypes"width: 100%;
  display: flex;
`;
const ColorDote = styled.div`
  background: ${props => props.color};
  margin: 2px;
  height: 20px;
  flex: 1;
`;
const ThemeContainer = styled.div`
  margin: 20px;
`;
const ThemeListContainer = styled.div`
  margin-top: 20px;
`;
const HeadingContainer = styled.div`
  display: inline-flex;
`;

const PieGraphConfig = props => {
  const { additionalInfo, setAdditionalInfo } = props;
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  const [colorThemes, setColorThemes] = useState(
    pieThemes[additionalInfo.theme]
  );
  return (
    <ConfigureGraphContainer theme={theme}>
      <Row>
        <Col span={24}>
          <HeadingContainer>
            <h3>{t('Pie-chart Type')}</h3>
            <HelpPopover
              helpList={[helps.configureGraph.pie.choosePieType]}
              iconStyle={{ marginTop: '-2px' }}
            />
          </HeadingContainer>
        </Col>
        <Col span={24}>
          <ChartTypes
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        </Col>
      </Row>
      <br />
      <HeadingContainer>
        <h3>{t('Choose theme')}</h3>
        <HelpPopover
          helpList={[helps.configureGraph.pie.chooseTheme]}
          iconStyle={{ marginTop: '-4px' }}
        />
      </HeadingContainer>
      <ThemeContainer>
        <ColorPanel>
          {colorThemes.map(color => (
            <ColorDote color={color} />
          ))}
        </ColorPanel>
        <ThemeListContainer>
          <Row gutter={[24, 24]}>
            {Object.keys(pieThemes).map(name => {
              return (
                <Col lg={4} md={6} sm={8}>
                  <Card
                    hoverable
                    style={{
                      height: 80,
                      borderRadius: '3px',
                      border:
                        additionalInfo.theme === name ? '1px solid' : 'none',
                    }}
                    onClick={() => {
                      setColorThemes(pieThemes[name]);
                      setAdditionalInfo({ ...additionalInfo, theme: name });
                    }}
                  >
                    {t(name)}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </ThemeListContainer>
      </ThemeContainer>
    </ConfigureGraphContainer>
  );
};
PieGraphConfig.propTypes = {
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  setAdditionalInfo: PropTypes.func.isRequired,
};
export default PieGraphConfig;
