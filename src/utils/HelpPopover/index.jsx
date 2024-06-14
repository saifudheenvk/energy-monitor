import React from 'react';
import { Popover, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const HelpSection = styled(Row)``;
const HelpHeaderCol = styled(Col)``;
const HelpContainer = styled.div`
  padding: 20px;
  max-width: 400px;
`;
const DescCol = styled(Col)`
  color: #6b7279;
  line-height: 2;
`;

const HelpLabel = styled.h4`
  color: #ffc107;
`;
const popOverContent = (helpList, t) => {
  return (
    <HelpContainer>
      {helpList.map(item => {
        return (
          <HelpSection>
            <HelpHeaderCol span={24}>
              <HelpLabel>{t(item.title)}</HelpLabel>
            </HelpHeaderCol>
            <DescCol>
              <p>{t(item.description)}</p>
            </DescCol>
          </HelpSection>
        );
      })}
    </HelpContainer>
  );
};
const IconContainer = styled.div`
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 23px;
`;
const HelpPopover = ({ helpList, iconStyle }) => {
  const { t } = useTranslation();

  return (
    <Popover
      placement="topRight"
      trigger="click"
      content={popOverContent(helpList, t)}
      getPopupContainer={node => node.parentNode.parentNode.parentNode}
    >
      <IconContainer style={iconStyle || {}}>
        <QuestionCircleOutlined />
      </IconContainer>
    </Popover>
  );
};
HelpPopover.propTypes = {
  helpList: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  iconStyle: PropTypes.instanceOf({}).isRequired,
};

export default HelpPopover;
