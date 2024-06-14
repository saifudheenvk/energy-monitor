import React from 'react';
import ReactToPrint from 'react-to-print';
import PropTypes from 'prop-types';
const PrintItem = ({ printRef }) => {
  return (
    <ReactToPrint
      trigger={() => <button>Print</button>}
      content={() => printRef.current}
    />
  );
};
PrintItem.propTypes = {
  ref: PropTypes.node.isRequired,
};

export default PrintItem;
