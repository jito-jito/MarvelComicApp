import React from 'react';
import { SearchInput } from '../components/inputs/SearchInput';
import { CheckboxInput } from '../components/inputs/CheckboxInput'

function Search() {
    const resultsOptions = [10, 15, 20]
    return(
        <>
            <div className='search'>
                <SearchInput placeholder={'spiderman'}/>
                <div className='checkboxes-container'>
                    <p className='checkboxes-title'>Limit of results:</p>
                    {
                        resultsOptions.map((option) => (
                        <CheckboxInput key={option} id={option} value={option} content={`${option} Results`} checkboxType='search'/>
                        ))
                    }
                </div>
            </div>
                    
        </>
    )
}


export  { Search }