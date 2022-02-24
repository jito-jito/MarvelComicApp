import React from 'react';


function SearchInput( { placeholder, value, onChange, onClick } ) {

    return(
        <>
            <div className='search-input-container'>
                <input 
                    className='search-input' 
                    type="text" 
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                />
                <button 
                    className='search-input-button'
                    onClick={onClick}
                ></button>
            </div>
                                
        </>
    )
}


export  { SearchInput }