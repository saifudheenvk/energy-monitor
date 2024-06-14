import moment from 'moment';

const getAnnotationfromTimeStamp = (granularity, timestamp) => {
  switch (granularity) {
    case 'Yearly':
      return moment(timestamp).format('YYYY');
    case 'Monthly':
      return `${moment(timestamp).format('YYYY-MM')}-01`;
    case `Weekly`:
      return moment(timestamp)
        .startOf('week')
        .format('YYYY-MM-DD');
    default:
      return moment(timestamp).format('YYYY-MM-DD');
  }
};
export default getAnnotationfromTimeStamp;
