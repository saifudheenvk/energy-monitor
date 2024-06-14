import React from 'react';
import styled from 'styled-components';
import EmptyMessage from '../../../utils/EmptyMessage';
import { useTranslation } from 'react-i18next';

const ReportGraphConfigContainer = styled.div`
  width: 100%;
  height: 50vh;
  padding: 20px;
  outline: none;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #32343c;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const ReportGraphConfig = () => {
  const { t } = useTranslation();
  return (
    <ReportGraphConfigContainer>
      <EmptyMessage
        message={t('No Graph Configuration Available for Report Widget')}
      />
    </ReportGraphConfigContainer>
  );
};
export default ReportGraphConfig;
