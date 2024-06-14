import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { addDashboards } from '../../api/DashboardApis';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
const DraggableContainer = ({ children, dbId }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const onLayoutChange = newLayout => {
    const layoutList = [];
    newLayout.forEach(l => {
      const toUpdate = {
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
      };
      layoutList.push({ widgetId: l.i, layout: toUpdate });
    });
    if (width >= 700) {
      addDashboards({
        id: dbId,
        btnSubmit: 'Save',
        dash_layout: JSON.stringify(layoutList),
      }).then(res => {
        // eslint-disable-next-line no-console
        console.log('res,width', res, width);
      });
    }
  };
  return (
    <div>
      <ResponsiveGridLayout
        measureBeforeMount
        isResizable={width >= 500}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        style={{ overflow: 'hidden', zIndex: '0' }}
        draggableCancel=".graph,.modal"
        onLayoutChange={onLayoutChange}
        onWidthChange={w => {
          setWidth(w);
        }}
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  );
};
DraggableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dbId: PropTypes.string.isRequired,
};
export default DraggableContainer;
