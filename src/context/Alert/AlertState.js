import alertContext from './alertContext';
import React, { useState } from 'react';


const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        });

        setTimeout(() => {
            setAlert(null)
        }, 1500);
    }
    return (
        <alertContext.Provider value={{alert, showAlert }}>
            {props.children}
        </alertContext.Provider>

    )
}

export default AlertState
