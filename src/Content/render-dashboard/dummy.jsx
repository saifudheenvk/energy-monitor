const dashboardDummyData = [
  {
    id: '123asd',
    dash_name: 'Test_dashboard',
    widgets: [
      {
        Id: '12asdd',
        widget_name: 'Widget Dexter',
        mode: 'aggregation',
        layout: { x: 0, y: 0, w: 3, h: 2.1 },
        widget_type: 'bar',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '122sdded',
        widget_name: 'Widget Sherlock',
        mode: 'aggregation',
        layout: { x: 7, y: 0, w: 3, h: 2.1 },
        widget_type: 'bar',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '122sddd',
        widget_name: 'Widget Punisher',
        mode: 'live',
        layout: { x: 3, y: 0, w: 3, h: 2.1 },
        widget_type: 'line',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '122sdgf',
        widget_name: 'Widget Money Heist',
        mode: 'aggregation',
        layout: { x: 5, y: 0, w: 3, h: 2.1 },
        widget_type: 'line',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '123asdqwerty',
        widget_name: 'Heisenberg',
        mode: 'aggregation',
        layout: { x: 5, y: 0, w: 3, h: 2.1 },
        widget_type: 'number',
        additional_info: {
          annotations: [
            {
              type: 'GT',
              value: 100,
              color: '#f4rds',
              label: 'Heisenberg - Blue Meth',
            },
            {
              type: 'GT',
              value: 80,
              color: 'red',
              label: 'Heisenberg - Blue Meth',
            },
            {
              type: 'GT',
              value: 95,
              color: 'green',
              label: 'Heisenberg - Blue Meth',
            },
            {
              type: 'LT',
              value: 97,
              color: 'green',
              label: 'Heisenberg - Jessie Pinkman',
            },
            {
              type: 'GT',
              value: 90,
              color: 'red',
              label: 'Heisenberg - Jessie Pinkman',
            },
          ],
        },
        data: {
          'Heisenberg - Blue Meth': 97.98,
          'Jessie Pinkman': 95.05,
          'Heisenberg - Jessie Pinkman': 2000000000,
          'Page D - Heisenberg - Jessie Pinkman - All Characters': 27801253167235,
          'Page Heisenberg': 38,
          'Page Jessie Pinkman': 8,
          'Page Maffia': 100,
        },
      },
    ],
  },
  {
    id: '123asde',
    dash_name: 'Test_dashboard',
    widgets: [
      {
        Id: '12asdd',
        widget_name: 'Widget Dexter',
        mode: 'aggregation',
        layout: { x: 0, y: 0, w: 3, h: 2.1 },
        widget_type: 'bar',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '122sdded',
        widget_name: 'Widget Sherlock',
        mode: 'aggregation',
        layout: { x: 7, y: 0, w: 3, h: 2.1 },
        widget_type: 'bar',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '122sddd',
        widget_name: 'Widget Punisher',
        mode: 'live',
        layout: { x: 3, y: 0, w: 3, h: 2.1 },
        widget_type: 'line',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '122sdgf',
        widget_name: 'Widget Money Heist',
        mode: 'aggregation',
        layout: { x: 5, y: 0, w: 3, h: 2.1 },
        widget_type: 'line',
        data: [
          {
            x: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            x: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            x: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            x: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            x: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            x: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            x: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ],
      },
      {
        Id: '123asdfgh',
        widget_name: 'Heisenberg',
        mode: 'aggregation',
        layout: { x: 5, y: 0, w: 3, h: 2.1 },
        widget_type: 'number',
        additional_info: {
          annotations: [
            {
              type: 'GT',
              value: 100,
              color: '#f4rds',
              label: 'Heisenberg - Blue Meth',
            },
            {
              type: 'GT',
              value: 80,
              color: 'red',
              label: 'Heisenberg - Blue Meth',
            },
            {
              type: 'GT',
              value: 95,
              color: 'green',
              label: 'Heisenberg - Blue Meth',
            },
            {
              type: 'LT',
              value: 97,
              color: 'green',
              label: 'Heisenberg - Jessie Pinkman',
            },
            {
              type: 'GT',
              value: 90,
              color: 'red',
              label: 'Heisenberg - Jessie Pinkman',
            },
          ],
        },
        data: {
          'Heisenberg - Blue Meth': 97.98,
          'Jessie Pinkman': 95.05,
          'Heisenberg - Jessie Pinkman': 2000000000,
          'Page D - Heisenberg - Jessie Pinkman - All Characters': 27801253167235,
          'Page Heisenberg': 38,
          'Page Jessie Pinkman': 8,
          'Page Maffia': 100,
        },
      },
    ],
  },
];

export default dashboardDummyData;
