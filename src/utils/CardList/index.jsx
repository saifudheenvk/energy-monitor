import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import ListCard from './ListCard';

const CardList = ({
  itemList,
  keyset,
  headKey,
  selectedItems,
  selectedItemKey,
  onCardClick,
}) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    setSelectedKeys(
      selectedItems.map(item => {
        const record = {};
        selectedItemKey.forEach(key => {
          record[key] = item[key];
        });
        return record;
      })
    );
  }, [selectedItems, selectedItemKey]);
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 6,
        size: 'medium',
      }}
      dataSource={itemList}
      renderItem={item => (
        <List.Item>
          <ListCard
            item={item}
            keyset={keyset}
            headKey={headKey}
            isChecked={selectedKeys.some(element => {
              const record = {};
              selectedItemKey.forEach(key => {
                record[key] = item[key];
              });
              return JSON.stringify(element) === JSON.stringify(record);
            })}
            onCardClick={onCardClick}
          />
        </List.Item>
      )}
    />
  );
};
CardList.propTypes = {
  itemList: PropTypes.arrayOf(PropTypes.instanceOf({})).isRequired,
  keyset: PropTypes.arrayOf(PropTypes.string).isRequired,
  headKey: PropTypes.string.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.instanceOf({})).isRequired,
  selectedItemKey: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
export default CardList;
