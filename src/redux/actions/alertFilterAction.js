export const filterAlertsForBuilding = data => {
  return {
    type: "ALERT_FILTER_ON_BUILDING",
    payload: data
  };
};
export const filterAlertsForEquipments = data => {
  return {
    type: "ALERT_FILTER_ON_EQUIPMENT",
    payload: data
  };
};
export const clearAlertFilter = () => {
  return {
    type: "CLEAR_ALERT_FILTER"
  };
};
export const applyFilter = data => {
  return {
    type: APPLY_FILTER,
    payload: data
  };
};
export const CLEAR_ALERT_FILTER = "CLEAR_ALERT_FILTER";
export const ALERT_FILTER_ON_EQUIPMENT = "ALERT_FILTER_ON_EQUIPMENT";
export const ALERT_FILTER_ON_BUILDING = "ALERT_FILTER_ON_BUILDING";
export const APPLY_FILTER = "APPLY_FILTER";
