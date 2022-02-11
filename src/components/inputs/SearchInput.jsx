import React from 'react';


function SearchInput( { placeholder } ) {

    return(
        <>
            <div className='search-input-container'>
                <input 
                    className='search-input' 
                    type="text" 
                    placeholder={placeholder} 
                />
            </div>
                                
        </>
    )
}


export  { SearchInput }