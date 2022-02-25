import React from 'react';


function DeleteButton( { className, onClick } ) {

    return(
        <>
            <button 
                className={`delete-button ${className}`}
                onClick={onClick}
            >
            
            </button>     
        </>
    )
}


export  { DeleteButton }

