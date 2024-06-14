import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Message = styled.p`
  height: ${props => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #848c94;
`;

const EmptyMessage = ({ message, height }) => {
  return <Message height={height || '100%'}>{message}</Message>;
};

EmptyMessage.propTypes = {
  message: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default EmptyMessage;
