import React from 'react'


function CloseModalButton ({
    onClick,
    content,
    className
}) {

    return(
        <>
            <button 
                className={`closeModal-button ${className}`}
                onClick={onClick}
            >{content}</button>
        </>
    )
}


export { CloseModalButton }