import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import functions from './CommonFunctions';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 0px;
`;
const ButtonContainer = styled.span`
  margin-left: auto;
  display: flex;
  margin-right: 0px;
`;
const FooterButton = styled(Button)`
  margin-left: 10px;
  font-size: 11px;
  width: 140px;
  border: 1px solid #848c94;
`;
const ChooseVitalFooter = ({
  hierarchyList,
  listType,
  setListType,
  filterOptions,
  changeTab,
  additionalInfo,
  request,
  dataSource,
  setDataSource,
  setVital,
  setBreadCrumblist,
}) => {
  const { t } = useTranslation();
  const [currentHierarchyIndex, setCurrentHierarchyIndex] = useState(0);
  const onNext = () => {
    if (
      hierarchyList[currentHierarchyIndex] === additionalInfo.aggregation_level
    ) {
      setListType('vitals');
      setBreadCrumblist(prevState =>
        prevState.includes('vitals') ? [...prevState] : [...prevState, 'vitals']
      );
    } else {
      setListType(hierarchyList[currentHierarchyIndex + 1]);
      setBreadCrumblist(prevState =>
        prevState.includes(hierarchyList[currentHierarchyIndex + 1])
          ? [...prevState]
          : [...prevState, hierarchyList[currentHierarchyIndex + 1]]
      );
    }
  };
  const onBack = () => {
    if (listType === 'vitals') {
      setListType(additionalInfo.aggregation_level);
    } else setListType(hierarchyList[currentHierarchyIndex - 1]);
  };

  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    setCurrentHierarchyIndex(
      hierarchyList.findIndex(item => item === listType)
    );
  }, [hierarchyList, listType]);
  return (
    <FooterContainer>
      <ButtonContainer>
        {currentHierarchyIndex !== 0 && (
          <FooterButton
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            type="default"
          >
            {listType === 'vitals'
              ? t(additionalInfo.aggregation_level.charAt(0).toUpperCase() +
                additionalInfo.aggregation_level.slice(1))
              : t(capitalize(
                  hierarchyList[currentHierarchyIndex - 1]
                    .split(/(?=[/A-Z])/)
                    .join(' ')
                ))
                }
          </FooterButton>
        )}
        {currentHierarchyIndex !== hierarchyList.length - 1 && (
          <FooterButton
            onClick={onNext}
            disabled={filterOptions[listType].length === 0}
            type="default"
          >
            {hierarchyList[currentHierarchyIndex] ===
            additionalInfo.aggregation_level
              ? t('Vitals')
              : t(capitalize(
                  hierarchyList[currentHierarchyIndex + 1]
                    .split(/(?=[/A-Z])/)
                    .join(' ')
                ))
                }
            <ArrowRightOutlined />
          </FooterButton>
        )}
        {listType === 'vitals' && (
          <FooterButton
            type="primary"
            ghost
            onClick={() => {
              functions.updateDataSourceOnChangingTab(
                filterOptions,
                request,
                setVital,
                additionalInfo,
                dataSource,
                setDataSource
              );
              changeTab('2');
            }}
          >
           { t('Configure')}
          </FooterButton>
        )}
      </ButtonContainer>
    </FooterContainer>
  );
};
ChooseVitalFooter.propTypes = {
  request: PropTypes.string.isRequired,
  hierarchyList: PropTypes.instanceOf([]).isRequired,
  dataSource: PropTypes.instanceOf([]).isRequired,
  listType: PropTypes.string.isRequired,
  setListType: PropTypes.func.isRequired,
  additionalInfo: PropTypes.instanceOf({}).isRequired,
  filterOptions: PropTypes.instanceOf({}).isRequired,
  changeTab: PropTypes.func.isRequired,
  setDataSource: PropTypes.func.isRequired,
  setVital: PropTypes.func.isRequired,
  setBreadCrumblist: PropTypes.func.isRequired,
};
export default ChooseVitalFooter;
