import React from 'react';


function CheckboxInput({ value, content, id, checkboxType, className }) {

    return(
        <>
            <label className={`checkbox-label ${className}`} htmlFor={`checkbox${id}`}>
                <input className='checkbox-input' type="checkbox" id={`checkbox${id}`}/>
                <div className={`checkbox-img-${checkboxType}`}></div>
                {content}
            </label>                    
        </>
    )
}


export  { CheckboxInput }