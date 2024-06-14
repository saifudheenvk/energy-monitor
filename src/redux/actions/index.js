export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const setLanguage = language => ({
  type: "SET_LANGUAGE",
  language
});

export const changeTheme = theme => ({
  type: 'CHANGE_THEME',
  theme,
});