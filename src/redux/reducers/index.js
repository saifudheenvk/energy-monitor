import { combineReducers } from 'redux';
import languageReducer from './languageReducers';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import alertFilterReducer from './alertFilterReducer';
import themeReducer from './themeReducer';
import pathReducer from "./pathReducer";

const allReducers = combineReducers({
  lang: languageReducer,
  loginStat: loginReducer,
  logoutState: logoutReducer,
  alertFilter: alertFilterReducer,
  themeReducer,
  pathState: pathReducer
});
export default allReducers;
