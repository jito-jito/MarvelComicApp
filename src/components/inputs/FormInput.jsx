import React from 'react';


function FormInput({ 
    placeHolder, 
    className, 
    type, 
    value,  
    onChange, 
    id
}) {

    return(
        <>
            <input 
                className={`form-input ${className}`}
                type={type}
                id={id}
                placeholder={placeHolder} 
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export { FormInput }