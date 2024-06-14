import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Empty, Spin } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import FavoriteDashboardItem from './FavoriteDashboardItem';
import FavoriteDashboardHeader from './FavoriteDashboardHeader';
import { fetchFavoritedDashboards } from '../../api/DashboardApis';
import { useSelector } from 'react-redux';

const FavoriteCard = styled(Card)`
  && {
    margin: 30px 40px 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: none;
    // width: 100%;
  }

  @media (max-width: 991px) {
    && {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  & .ant-card-body {
    background: ${props => (props.themeState === 'dark' ? '#34363e' : '#ffff')};
    padding: 24px 0 0;
  }
`;

const FavoriteCardFooter = styled.div`
  background: ${props => (props.themeState === 'dark' ? '#3b3e48' : '#E1E6ED')};
  height: 38px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px 15px;
  font-size: 12px;
  color: #838c95;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FavoriteFooterMoreButton = styled(Button)`
  border: none !important;
  font-size: 12px;
`;

const SpinContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const { t: i18n } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const themeState = useSelector(state => state.themeReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [favoritedDasboardList, setFavoritedDasboardList] = useState([]);

  const redirectToDashBoard = (id, itemName) => {
    history.push(`home/${id}/${itemName}`);
  };

  const getFavoritedDashboards = () => {
    setLoading(true);
    const params = {
      favorited: true,
    };
    fetchFavoritedDashboards(params).then(res => {
      if (res.data.data) {
        setLoading(false);
        setFavoritedDasboardList(res.data.data);
      }
    });
  };

  useEffect(() => {
    getFavoritedDashboards();
  }, []);

  return (
    <>
      <FavoriteDashboardHeader
        title={i18n('Favorite Dashboards')}
        setSearchTerm={setSearchTerm}
      />

      {loading ? (
        <SpinContainer>
          <Spin spinning={loading} />
        </SpinContainer>
      ) : (
        favoritedDasboardList.map(item => {
          return (
            <FavoriteCard
              themeState={themeState}
              headStyle={{
                background: themeState === 'dark' ? '#3B3E48' : '#E1E6ED',
                fontSize: '22px',
                fontWeight: '600',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}
              title={item.dash_name}
            >
              <Row>
                {item.widgets && item.widgets.length > 0 ? (
                  item.widgets.map((widgetItem, index) => {
                    return (
                      <>
                        {index <= 1 && (
                          <Col
                            xs={24}
                            sm={24}
                            md={24}
                            lg={12}
                            xl={12}
                            style={{ padding: '10px' }}
                          >
                            <FavoriteDashboardItem item={widgetItem} />
                          </Col>
                        )}
                      </>
                    );
                  })
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>No widgets</span>}
                  />
                )}
              </Row>
              <FavoriteCardFooter themeState={themeState}>
                {item.widgets && item.widgets.length > 0 && (
                  <FavoriteFooterMoreButton
                    onClick={() => {
                      redirectToDashBoard(item.Id, item.dash_name);
                    }}
                  >
                    {i18n('more')}
                  </FavoriteFooterMoreButton>
                )}
              </FavoriteCardFooter>
            </FavoriteCard>
          );
        })
      )}
    </>
  );
};

export default Home;
