import React from 'react';
import PropTypes from 'prop-types';
import FavoriteWidgetItem from './FavoriteWidgetItem';
import WidgetApiWrapper from '../render-dashboard/WidgetApiWraper';

const FavoriteDashboardItem = ({ item }) => {
  return (
    <div>
      <FavoriteWidgetItem item={item} key={item.Id} title={item.widget_name}>
        <WidgetApiWrapper mode={item.mode} itemId={item.Id} />
      </FavoriteWidgetItem>
    </div>
  );
};

FavoriteDashboardItem.propTypes = {
  item: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    widget_name: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    widget_type: PropTypes.string.isRequired,
    data: PropTypes.instanceOf({}),
  }).isRequired,
};

export default FavoriteDashboardItem;
