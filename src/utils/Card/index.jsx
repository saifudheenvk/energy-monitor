import React from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { Card as AntdCard, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const CardContainer = styled(AntdCard)`
  cursor: pointer;
  border-radius: 10px !important;
  &:hover {
    box-shadow: 3px 3px 10px 7px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  border: ${props =>
    props.themeState === 'dark' ? '' : '1px solid #E1E6ED'} !important;
  @media (max-width: 415px) {
    & .ant-card-body {
      padding: 24px 16px;
    }
  }
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 35px;
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const CardAlertButton = styled(Button)`
  height: 28px;
  width: 55px;
  border-radius: 27px !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContents = styled.p`
  margin-bottom: 6px;
  font-size: 11px;
  color: #848c94;
`;

const CardSpan = styled.p`
  margin-bottom: 6px !important;
  font-size: ${props => {
    return props.isId ? '12px' : '11px';
  }};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => {
    return props.themeState !== 'dark' ? '#848c94' : '#FFFFFF';
  }};
`;

const Card = ({
  item,
  applianceTypeId,
  handleAlertClick,
  alertcount,
  gotoEquipmentDetails,
}) => {
  const { t } = useTranslation();
  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const themeState = useSelector(state => state.themeReducer);

  return (
    <CardContainer
      themeState={themeState}
      onClick={() => {
        gotoEquipmentDetails(
          item.ApplianceId,
          applianceTypeId,
          item.applianceName
        );
      }}
    >
      <CardTitleContainer>
        <CardTitle>{item.applianceName || ' '}</CardTitle>
        {alertcount !== '0' && (
          <CardAlertButton
            type="ghost"
            onClick={e => {
              e.stopPropagation();
              handleAlertClick({
                equipment: item,
                building: { BuildingName: item.BuildingName },
                company: { CompanyName: item.CompanyName },
              });
            }}
          >
            <WarningOutlined style={{ color: '#ffc34a' }} />
            {alertcount}
          </CardAlertButton>
        )

        // alertIcon({
        //   equipmentName: item.applianceName,
        //   companyName: item.CompanyName,
        //   buildingName: item.BuildingName
        // })
        }
      </CardTitleContainer>
      {Object.entries(item).map(([key, value]) => {
        return (
          <>
            <Row gutter={6}>
              {key !== 'applianceName' && key !== 'ApplianceId' && (
                <>
                  <Col span={8}>
                    <CardContents>
                      {t(capitalize(key.split(/(?=[/A-Z])/).join(' ')))}
                    </CardContents>
                  </Col>
                  <Col span={1} style={{ color: '#848c94' }}>
                    <p style={{ width: '100%' }}> :</p>
                  </Col>
                </>
              )}
              {key !== 'applianceName' && key !== 'ApplianceId' && (
                <Col span={15}>
                  <CardSpan themeState={themeState}>{value || ' '}</CardSpan>
                </Col>
              )}
            </Row>
          </>
        );
      })}
    </CardContainer>
  );
};

Card.propTypes = {
  item: PropTypes.instanceOf({}).isRequired,
  applianceTypeId: PropTypes.string.isRequired,
  handleAlertClick: PropTypes.func.isRequired,
  alertcount: PropTypes.number.isRequired,
  gotoEquipmentDetails: PropTypes.func.isRequired,
};

export default Card;
