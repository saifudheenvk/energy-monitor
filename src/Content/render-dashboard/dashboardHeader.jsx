import React, { useState } from 'react';
import {
  Input,
  Col,
  Row,
  Popover,
  Button,
  PageHeader,
  message,
  Breadcrumb,
  Badge,
} from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon, { FilterOutlined } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DashboardName from './dahboardRenameModal';
import { addDashboards } from '../../api/DashboardApis';
import Filter from '../../utils/Filter/index';

const { Search } = Input;

const ContentHeaderStyle = styled.div`
  border-bottom: 1px solid #848c94;
  margin: 0 40px 35px;
`;
const HeaderRow = styled(Row)`
  display: flex;
  align-items: center;
`;
const DashboardPageHeader = styled(PageHeader)`
  padding: 16px 0px !important;
  & .ant-page-header-heading {
    display: flex;
    flex-direction: column;
  }
`;

const DashboardBreadCrumb = styled(Breadcrumb)`
  && {
    font-size: 12px;
  }
`;

const DashboardsSearch = styled(Search)`
  && {
    border-radius: 5px;
  }
`;

const NewDashboardButton = styled(Button)`
&&  {
  float: right;
  border-radius: 5px;
}
@media(max-width: 575px) {
    && {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
}
`;

const HeaderCol = styled(Col)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (min-width: 576px) {
    margin-bottom: 10px;
  }
  @media (max-width: 575px) {
    margin-bottom: 10px;
  }
`;  

const StyledCol = styled(Col)`
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const FilterButton = styled(Button)`
  width: 100%;
  color: #848c94;
`;
const FilterSpan = styled.span`
  float: left;
`;
const FilterIcon = styled(Icon)`
  float: right;
  margin-top: 3px;
`;
const DashboardContentHeader = ({
  fetchDashboardItems,
  filter,
  setFilter,
  title,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const pathParams = useParams();
  const [showModal, setShowModal] = useState(false);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const handleCreate = values => {
    addDashboards({ ...values, id: 0, btnSubmit: 'Save' }).then(res => {
      if (!res.data.result) {
        message.error(res.data.msg);
      }
      message.success(t('Dashboard added successfully'));
      if (typeof fetchDashboardItems === 'function') {
        fetchDashboardItems();
      }
    });
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const setBreadCrumbName = () => {
    const basePath = history.location.pathname.split('/')[1];
    return [
      {
        item: basePath.charAt(0).toUpperCase() + basePath.slice(1),
        location: `/${basePath}`,
      },
      ...Object.keys(pathParams)
        .filter(p => !p.toLowerCase().includes('id'))
        .map(k => ({
          item: pathParams[k],
          location:
            history.location.pathname.split(pathParams[k])[0] + pathParams[k],
        })),
    ];
  };
  const handleDashboardSearch = searchTerm => {
    fetchDashboardItems(searchTerm);
  };

  return (
    <ContentHeaderStyle>
      <DashboardName
        title="Add Dashboards"
        handleCancel={handleCancel}
        handleCreate={handleCreate}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <HeaderRow gutter={24}>
        <Col xs={18} sm={16} md={9} lg={12} xl={12}>
          <DashboardPageHeader
            title={t(title)}
            extra={
              history.location.pathname !== '/dashboards' && (
                <DashboardBreadCrumb>
                  {setBreadCrumbName().map(p => {
                    return (
                      <Breadcrumb.Item>
                        <a
                          href
                          onClick={() => {
                            history.push(p.location);
                          }}
                        >
                          {p.item}
                        </a>
                      </Breadcrumb.Item>
                    );
                  })}
                </DashboardBreadCrumb>
              )
            }
          />
        </Col>
        {history.location.pathname !== '/dashboards' ? (
          <></>
        ) : (
          <HeaderCol xs={24} sm={24} md={15} lg={12} xl={12} >
            <Col xs={12} sm={9} md={9} lg={9} xl={9}>
              <DashboardsSearch
                placeholder={t('Search Dashboards')}
                onSearch={handleDashboardSearch}
                allowClear
              />
            </Col>
            <Col xs={4} sm={8} md={8} lg={8} xl={8}>
              {/* <Popover placement="bottomLeft" title="title" content="content"  trigger="click"
                getPopupContainer={getContainer}
                overlayStyle={{
                borderRadius: '5px',
                background: '#32343C',
                border: '1px solid #848c94',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                boxSizing: 'border-box',
               }}
                visible={popOverVisible}
                onVisibleChange={handlePopoverVisible}> */}
              {/* <Badge dot={Object.keys(filter).length !== 0}> */}
              {/* <FilterButton>
                  <FilterSpan style={{ float: 'left' }}>Filter</FilterSpan>
                  <FilterOutlined theme="filled" />
                 </FilterButton> */}
              {/* </Badge> */}
              {/* </Popover> */}
              <Filter
                filter={filter}
                setFilter={setFilter}
                title="Dashboards"
              />
            </Col>
            <Col xs={10} sm={8} md={8} lg={8} xl={8}>
              <NewDashboardButton
                type="primary"
                ghost
                key="3"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                {t('New Dashboard')}
              </NewDashboardButton>
            </Col>{' '}
          </HeaderCol>
        )}
      </HeaderRow>
      {/* {history.location.pathname !== '/dashboards' && (
        <DashboardBreadCrumb>
          <Breadcrumb.Item>
            <a
              href
              onClick={() => {
                history.push('/dashboards');
              }}
            >
              Dashboards
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{dashboardName}</Breadcrumb.Item>
        </DashboardBreadCrumb>
      )} */}
    </ContentHeaderStyle>
  );
};

DashboardContentHeader.propTypes = {
  fetchDashboardItems: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardContentHeader;
