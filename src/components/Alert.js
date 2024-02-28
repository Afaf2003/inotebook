import React, { useContext } from 'react';
import alertContext from '../context/Alert/alertContext';

function Alert() {
    const { alert } = useContext(alertContext);
    const Capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <div style={{ height: '40px' }}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{Capitalize(alert.type)}</strong>: {alert.msg}
            </div>}
        </div>
    )
}

export default Alert