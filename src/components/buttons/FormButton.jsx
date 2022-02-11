import React from 'react';


function FormButton({ value, className }) {

    return(
        <>
            <input 
                className={`form-button ${className}`}
                type='button'
                value={value} 
            />
        </>
    )
}

export { FormButton }