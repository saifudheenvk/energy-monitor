import React from 'react';
import { PageHeader } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContentHeaderStyle = styled.div`
  border-bottom: 1px solid #848c94;
  margin: 0 40px;
`;

const FavoritePageHeader = styled(PageHeader)`
  && {
    padding: 16px 0px;
  }
`;

const FavoriteDashboardHeader = ({ title }) => {
  return (
    <>
      <div>
        <ContentHeaderStyle>
          <FavoritePageHeader title={title} />
        </ContentHeaderStyle>
      </div>
    </>
  );
};

FavoriteDashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FavoriteDashboardHeader;
