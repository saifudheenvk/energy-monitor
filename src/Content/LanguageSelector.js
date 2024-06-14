import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import { updateProfile } from '../api/ProfileApi';
import LanguageSwitch from '../assets/icons/LanguaguageSwitch';

const LanguageIcon = styled(Icon)`
  margin-top: 20px;
`;
const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const prevLang = useSelector(state => state.lang);
  const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
  const userId = userCredentials && userCredentials.UserId;

  const updateLanguage = lang => {
    updateProfile({ language: lang, id: userId })
      .then(({ data }) => {
        if (data.result) {
          localStorage.setItem('lang', lang);
          i18n.changeLanguage(lang);
          dispatch({
            type: 'SET_LANGUAGE',
            language: lang,
          });
        }
      })
      .catch(err => {
        console.error(err);
        message.error('Language Change Failed');
      });
  };

  const hangleSelect = useCallback(lang => {
    if (lang.key !== prevLang) {
      updateLanguage(lang.key);
    }
  });
  const languages = ['ar', 'en', 'hin'];
  const menu = (
    <Menu onClick={hangleSelect}>
      {languages.map(lang => (
        <Menu.Item key={lang}>{lang.toLocaleUpperCase()}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <LanguageIcon component={LanguageSwitch} />
    </Dropdown>
  );
};
export default LanguageSelector;
