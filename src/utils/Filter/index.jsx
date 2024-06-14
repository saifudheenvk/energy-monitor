import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Popover, Button, Badge } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import FilterRow from './FilterRow';
import { fetchCompany, fetchLocations } from '../../api/companyApis';
import {
  clearAlertFilter,
  applyFilter,
} from '../../redux/actions/alertFilterAction';

const alertStatuses = [
  'OPENED',
  'WORK_IN_PROGRESS',
  'HELD',
  'HELD_FOR_SPARE',
  'CLOSED',
];

const ClearButton = styled(Button)`
  margin-right: 4px;
  width: 140px;
  border-radius: 5px;
  padding: 5px;
`;

const FilterButton = styled(Button)`
  color: #848c94;
  border: ${props => !props.isDashboard && 'none'};
  border-radius: 0;
  && {
    width: ${props => props.isDashboard && '100%'};
    display: ${props => props.isDashboard && 'flex'};
    align-items: ${props => props.isDashboard && 'center'};
    border-radius: ${props => props.isDashboard && '5px'};
    justify-content: ${props => props.isDashboard && 'space-between'};
  }

  &.ant-btn:hover {
    color: ${props => (props.themeState === 'dark' ? ' #ffc107' : '#49548D')};
  }
  &.ant-btn:focus,
  .ant-btn:active,
  .ant-btn.active {
    color: ${props => (props.themeState === 'dark' ? ' #ffc107' : '#49548D')};
  }
  @media (max-width: 575px) {
    justify-content: center !important;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
  width: 350px;
  @media (max-width: 576px) {
    width: 250px;
  }
`;

const FilterFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.5rem 0.1rem;
`;
const SearchButton = styled(Button)`
  width: 140px;
  background: #ffc107;
  border-radius: 5px;
  padding: 5px;
`;

const FilterTitle = styled.span`
  // @media(max-width: 575px) {
  //    && {
  //       display: none;
  //       }
  // }
`;

const FilterPopover = styled(Popover)`
  & .ant-popover-inner {
    padding-bottom: 5px;
  }
  background: ${props => (props.themeState === 'dark' ? '' : '#E8ECEF')};
`;

const Filter = ({ filter, title, setFilter }) => {
  const getWidth = () => window.innerWidth;
  const { t } = useTranslation();
  const lang = useSelector(state => state.lang);
  const themeState = useSelector(state => state.themeReducer);
  const [filterOptions, setFilterOptions] = useState(filter || {});
  const [company, setCompany] = useState([]);
  const [locations, setLocations] = useState([]);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const [type, setType] = useState('');
  const [width, setWidth] = useState(getWidth);
  const alertFilter = useSelector(state => state.alertFilter);
  const dispatch = useDispatch();
  const fetchCompanies = () => {
    fetchCompany({})
      .then(res => {
        setCompany(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  };
  const fetchCity = () => {
    fetchLocations({}).then(res => {
      setLocations(res.data.data);
    });
  };

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  useEffect(() => {
    fetchCompanies();
  }, []);
  useEffect(() => {}, [filterOptions]);

  const getContainer = node => {
    return node.parentNode;
  };

  const handlePopoverVisible = visible => {
    setPopOverVisible(visible);
  };
  const filterContent = (
    <Container>
      <div>
        <FilterRow
          title={title}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          company={company && company}
          locations={locations}
          alertStatuses={alertStatuses}
          fetchCity={fetchCity}
          type={type}
          setType={setType}
        />
      </div>
      <FilterFooter>
        <ClearButton
          type="primary"
          ghost
          onClick={() => {
            if (title === t('Buildings') || title === t('Equipments')) {
              setFilter({});
              setFilterOptions({});
              setType('');
            }
            if (title === t('Dashboards')) {
              dispatch(clearAlertFilter());
              setFilter({});
              setFilterOptions({});
              setType('');
            }
            if (title === t('Alerts')) {
              dispatch(clearAlertFilter());
              setFilterOptions({});
            }
            handlePopoverVisible(false);
          }}
        >
          {t('Clear')}
        </ClearButton>
        <SearchButton
          onClick={() => {
            setFilter(filterOptions);
            if (title === t('Alerts')) {
              dispatch(applyFilter(filterOptions));
            }
            handlePopoverVisible(false);
          }}
          type="primary"
        >
          {t('Filter')}
        </SearchButton>
      </FilterFooter>
    </Container>
  );
  return (
    <FilterPopover
      themeState={themeState}
      content={filterContent}
      placement="bottomLeft"
      trigger="click"
      getPopupContainer={getContainer}
      overlayStyle={{
        borderRadius: '5px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        boxSizing: 'border-box',
      }}
      visible={popOverVisible}
      onVisibleChange={handlePopoverVisible}
    >
      {title !== 'Dashboards' ? (
        <Badge dot={Object.keys(filterOptions).length !== 0}>
          <FilterButton
            lang={lang}
            icon={<FilterOutlined />}
            theme="filled"
            isDashboard={title === 'Dashboards'}
            themeState={themeState}
          />
        </Badge>
      ) : (
        <FilterButton
          lang={lang}
          themeState={themeState}
          isDashboard={title === 'Dashboards'}
        >
          {width > 572 && (
            <FilterTitle style={{ float: 'left' }}>{t('Filter')}</FilterTitle>
          )}
          <FilterOutlined theme="filled" />
        </FilterButton>
      )}
    </FilterPopover>
  );
};
Filter.propTypes = {
  filter: PropTypes.instanceOf({}).isRequired,
  title: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
export default Filter;
