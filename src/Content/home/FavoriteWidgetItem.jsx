import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import EnlargeIcon from '../../assets/icons/Enlarge';
import MaximisedViewModal from '../render-dashboard/MaximisedViewModal';

const ExpandIcon = styled(Icon)`
  font-size: 20px;
  font-weight: 700;
  float: right;
  color: #848c94;
`;

const FavoriteWidgetCard = styled(Card)`
  && {
    margin: 10px;
  }

  & .ant-card-extra {
    margin-left: 0.5em;
  }
`;

const FavoriteWidgetItem = ({ children, title, item }) => {
  const themeState = useSelector(state=>state.themeReducer);
  const [visibleMaximised, setVisibleMaximised] = useState(false);
  const [maximisedItem, setMaximisedItem] = useState();
  return (
    <FavoriteWidgetCard
      title={title}
      headStyle={{ background: themeState === 'dark' ? '#393C43' : '#F3F3F4', fontWeight: '600' }}
      extra={
        <ExpandIcon
          component={EnlargeIcon}
          onClick={() => {
            setVisibleMaximised(true);
            setMaximisedItem(item.Id);
          }}
        />
      }
      bodyStyle={{
        height: '300px',
        background: themeState === 'dark' ? '#393C43' : '#F3F3F4',
        padding: '15px',
      }}
      bordered={false}
    >
      {/* <FavoriteWidgetHeader title={title}></FavoriteWidgetHeader> */}
      <MaximisedViewModal
        data={item}
        visibleMaximised={
          visibleMaximised === true && maximisedItem === item.Id
        }
        setVisibleMaximised={setVisibleMaximised}
        key={item.widget_name}
      />
      {children}
    </FavoriteWidgetCard>
  );
};

FavoriteWidgetItem.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    widget_name: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default FavoriteWidgetItem;
