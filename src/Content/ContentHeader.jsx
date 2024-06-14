import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Input } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Filter from '../utils/Filter/index';

const { Search } = Input;

const FilterContainer = styled.div`
  display: flex;
  border: ${props =>
    props.themeState === 'dark' ? '' : '1px solid #E1E6ED;'};
  border-radius: 5px;
  width: 380px;
  & .ant-input {
    border: none;
  }
  @media (max-width: 576px) {
    && {
      width: auto;
      max-width: 280px;
    }
  }
`;

const StyledSearch = styled(Search)`
  background: ${props =>
    props.themeState === 'dark' ? '' : '#E8ECEF'} !important;
`;

const ContentHeaderStyle = styled.div`
  border-bottom: 1px solid #848c94;
  margin: 0 40px;
`;

const SearchFilter = ({
  filter,
  title,
  setFilter,
  fetchItems,
  setSearchTerm,
}) => {
  const themeState = useSelector(state => state.themeReducer);
  const { t } = useTranslation();
  return (
    <FilterContainer themeState={themeState}>
      <StyledSearch
        themeState={themeState}
        defaultValue={filter.search_term}
        onChange={event => {
          setSearchTerm(event.target.value);
        }}
        onSearch={() => {
          fetchItems();
        }}
        key="1"
        placeholder={t('search')}
      />
      <Filter filter={filter} setFilter={setFilter} title={title} />
    </FilterContainer>
  );
};

SearchFilter.propTypes = {
  filter: PropTypes.instanceOf({}).isRequired,
  title: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

const ContentHeader = ({
  filter,
  title,
  setFilter,
  fetchItems,
  setSearchTerm,
}) => {
  return (
    <>
      <div>
        <ContentHeaderStyle>
          <PageHeader
            style={{ padding: '16px 0px' }}
            title={title}
            extra={[
              <SearchFilter
                filter={filter}
                setFilter={setFilter}
                title={title}
                fetchItems={fetchItems}
                setSearchTerm={setSearchTerm}
              />,
            ]}
          />
        </ContentHeaderStyle>
      </div>
    </>
  );
};

ContentHeader.propTypes = {
  filter: PropTypes.instanceOf({}).isRequired,
  title: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default ContentHeader;
