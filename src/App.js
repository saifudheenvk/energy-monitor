/* eslint-disable react/jsx-filename-extension */
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Auth/index';
import Content from './Content';
import theme from './utils/theme';
import GlobalStyles from './utils/GlobalStyle';
import { changeTheme } from './redux/actions/index';
import theme1 from './theme';
import theme2 from './theme2';
import './App.css';
import i18n from '../src/utils/i18n';

function App() {
  const dispatch = useDispatch();
  const themeRedux = useSelector(state => state.themeReducer);
  const lang = useSelector(state => state.lang);
  const themeSelector = themeState => {
    if (themeState !== 'white') {
      dispatch(changeTheme('dark'));
      window.less
        .modifyVars({
          ...theme2,
        })
        .then(() => {
          console.log('success');
        })
        .catch(() => {
          console.log('fail');
        });
    } else {
      dispatch(changeTheme('white'));
      window.less
        .modifyVars({
          ...theme1,
        })
        .then(() => {
          console.log('success');
        })
        .catch(() => {
          console.log('fail');
        });
    }
  };
  useEffect(() => {
    const themeState = localStorage.getItem('app_theme');
    themeSelector(themeState && themeState);
  }, []);
  useEffect(() => {
    let lang = localStorage.getItem('lang');
    if (lang) {
      i18n.changeLanguage(lang);
      dispatch({
        type: 'SET_LANGUAGE',
        language: lang,
      });
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider direction={lang === 'ar' ? 'rtl' : 'ltr'}>
        <Router>
          <Suspense fallback="loading">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/" component={Content} />
            </Switch>
          </Suspense>
        </Router>
      </ConfigProvider>
      <GlobalStyles themeState={themeRedux} />
    </ThemeProvider>
  );
}

export default App;
