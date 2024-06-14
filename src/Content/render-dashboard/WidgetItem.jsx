import React, { useState } from 'react';
import { Card, Row, Col, Dropdown } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon, { MoreOutlined } from '@ant-design/icons';
import EnlargeIcon from '../../assets/icons/Enlarge';
import MaximisedViewModal from './MaximisedViewModal';

const MoreIcon = styled(MoreOutlined)`
  font-size: 20px;
  font-weight: 700;
  padding: 0px 4px 0px 4px !important;
  float: ${props => (props.lang === 'ar' ? 'left' : 'right')};
`;
const Enlarge = styled(Icon)`
  padding: 0px 4px 0px 4px !important;
  font-size: 20px;
  font-weight: 700;
  float: ${props => (props.lang === 'ar' ? 'left' : 'right')};
`;

const WidgetHeader = ({ children, title }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Row>
        <Col xs={15} sm={18}>
          <h3
            style={{
              fontWeight: 'bolder',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </h3>
        </Col>
        <Col xs={9} sm={6}>
          {children}
        </Col>
      </Row>
    </div>
  );
};
WidgetHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const WidgetItem = ({ children, title, item, menu }) => {
  const themeState = useSelector(state => state.themeReducer);
  const lang = useSelector(state => state.lang);
  const [visibleMaximised, setVisibleMaximised] = useState(false);
  const [maximisedItem, setMaximisedItem] = useState();

  return (
    <Card
      bodyStyle={{
        height: '100%',
        background: themeState !== 'dark' ? '#F3F3F4' : '',
        padding: '20px',
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <WidgetHeader title={title}>
        <Dropdown overlay={menu} trigger={['click']}>
          <MoreIcon lang={lang} type="more" />
        </Dropdown>
        <Enlarge
          lang={lang}
          component={EnlargeIcon}
          onClick={() => {
            setVisibleMaximised(true);
            setMaximisedItem(item.Id);
          }}
        />
      </WidgetHeader>
      <MaximisedViewModal
        data={item}
        visibleMaximised={
          visibleMaximised === true && maximisedItem === item.Id
        }
        setVisibleMaximised={setVisibleMaximised}
        key={item.widget_name}
      />
      {children}
    </Card>
  );
};
WidgetItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  menu: PropTypes.node.isRequired,
  item: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    widget_name: PropTypes.string.isRequired,
    data: PropTypes.instanceOf({}).isRequired,
  }).isRequired,
};
export default WidgetItem;
