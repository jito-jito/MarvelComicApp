import React from 'react';


function FormInput({ placeHolder, className, type }) {

    return(
        <>
            <input 
                className={`form-input ${className}`}
                type={type}
                placeholder={placeHolder} 
                
            />
        </>
    )
}

export { FormInput }