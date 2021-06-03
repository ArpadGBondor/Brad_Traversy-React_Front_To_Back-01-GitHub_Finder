import React, { useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';

const Alert = (props) => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alert && (
      <div className={`alert alert-${alertContext.alert.type}`}>
        <i className="fas fa-info-circle" /> {alertContext.alert.message}
      </div>
    )
  );
};

export default Alert;
