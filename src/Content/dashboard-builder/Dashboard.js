import React from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RGL, { WidthProvider } from "react-grid-layout";


const ReactGridLayout = WidthProvider(RGL);


const Dashboard = ({ children, dashboardItems,setDashBoardItems }) => {
    const onLayoutChange = newLayout => {
      newLayout.forEach(l => {
        const item = dashboardItems.find(i => i.id.toString() === l.i);
        var index=dashboardItems.findIndex(i => i.id.toString() === l.i);
        const toUpdate = JSON.stringify({
          x: l.x,
          y: l.y,
          w: l.w,
          h: l.h
        });
        if (item && toUpdate !== item.layout) {
          var updatedItem={...item,
          layout:toUpdate
          }
          setDashBoardItems([...dashboardItems.slice(0,index),...dashboardItems.slice(index+1),updatedItem])
        }
      });
    };
  
    return (
      <ReactGridLayout cols={12} rowHeight={50} onLayoutChange={onLayoutChange}>
        {children}
      </ReactGridLayout>
    );
  };
  
  export default Dashboard;
  