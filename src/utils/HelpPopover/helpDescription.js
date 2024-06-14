export const helps = {
  chooseWidget: {
    aggregationLevel: {
      title: 'Aggregation Level',
      description:
        'Helps to choose which level of analytics is wanted to configure. Example - Aggregation Level - Floor helps to get analytics based on floors.',
    },
    aggregationMode: [
      {
        title: 'Analyse aggregated readings - Yes',
        description:
          'Allows to visualize calculated analytics over given time periods, over selected entities like Company,Buildings, Floor, Equipments',
      },
      {
        title: 'Analyse aggregated readings - No',
        description:
          "Allows to visualize live data(raw data) of selected equipments. Ideal for monitoring equipment's activities.",
      },
    ],
  },
  chooseVitals: {},
  configureVitals: {
    granularity: {
      title: 'Aggregation Granularity',
      description:
        'Granularity defines the interval between each data instance(i.e how the analytics should be divided). Example - Granularity - Yearly will give the computed data in each year between the given start and end dates',
    },
    statistics: {
      title: 'Aggregation Statistics',
      description:
        'Statistics defines that what kind of calculations needs to be performed on data.  Example - Statistics - Avg will be giving the average analytics of that particular vital.',
    },
    labels: {
      title: 'Labels',
      description:
        'Labels are the texts show inside the graphs. Labels can be used for Grouping of vitals. Multiple Vitals with same label name is considered as a group. Corresponding analytics will be combined result of both.*Note - Labels should be meaningful.',
    },
  },
  configureGraph: {
    pie: {
      chooseTheme: {
        title: `Theme`,
        description:
          'Pie graph color theme can be selected from following, default - Peacock-shade',
      },
      choosePieType: {
        title: `Pie Type`,
        description:
          'Visualisation type of pichart,  example - Selecting donut will create a Pie chart with inner radius.',
      },
    },
    number: {
      annotation: {
        title: 'Annotations',
        description:
          'Annotations helps to change colors of value based on the vaule appear in number widget, Helpfull to monitor performance and usage variations in easy manner.  example- user set an annotation for for vital- label1, value-125,type-GREATER_THAN, color-red then whenever the value exceed 125 corresponding number will be displayed in red.',
      },
    },
    bar: {},
    line: {
      vertical: {
        title: 'Vertical Annotations',
        description:
          'This add a vertical reference line in expanded view of chart corresponding to a given date instance. best for analysing values in particular date instance. example- add a vertical annotation 12th week of 2020 in weekly aggregation of a vital, then there will be a vertical annotation corresponding to that date with given label',
      },
      horizontal: {
        title: 'Horizontal Annotations',
        description:
          'Horizontal annotations used to add horizontal reference line in expanded view of charts. best for analysing usage and performance variations. example- add a horizontal annotation for a vital, then a horizontal reference line will be visible in expanded view of that widget with given label, positioned based on given value.',
      },
    },
  },
};
