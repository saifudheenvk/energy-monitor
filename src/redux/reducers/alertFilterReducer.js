import {
  ALERT_FILTER_ON_BUILDING,
  CLEAR_ALERT_FILTER,
  ALERT_FILTER_ON_EQUIPMENT,
  APPLY_FILTER
} from "../actions/alertFilterAction";

const alertFilterReducer = (state = {}, action) => {
  switch (action.type) {
    case ALERT_FILTER_ON_BUILDING:
      return action.payload;

    case ALERT_FILTER_ON_EQUIPMENT:
      return action.payload;
    case APPLY_FILTER:
      return action.payload;
    case CLEAR_ALERT_FILTER:
      return {};
    default:
      return state;
  }
};
export default alertFilterReducer;
