import React, { useState, useEffect } from 'react';
import { SearchInput } from '../components/inputs/SearchInput';
import { CheckboxInput } from '../components/inputs/CheckboxInput'

function Search( { searchCharacters } ) {
    const [ searchValue, setSearchValue ] = useState('')
    const [ searchOptions, setSearchOptions ] = useState([
        {value: 10, checked: false}, 
        {value: 15, checked: false}, 
        {value: 20, checked: false}])


    function onHandleChange(e) {
        setSearchValue(e.target.value)
    }

    function setOptions(e) {
        const lastChecked = searchOptions.findIndex( option => option.checked == true )
        const opIndex = searchOptions.findIndex( option => option.value == e.target.children[0].id )

        if( lastChecked == -1 ) {
            let newOptions =  searchOptions.map((option) => {
                if(option.value == e.target.children[0].id) {
                    return {
                        value: parseInt(e.target.children[0].id),
                        checked: true
                    }
                } else {
                    return option
                }
            
            })

            
            setSearchOptions(newOptions)
            
        } else {
            let newOptions = searchOptions.map((option) => {
                if(option.value == e.target.children[0].id) {

                    return {
                        value: parseInt(e.target.children[0].id),
                        checked: !option.checked
                    }
                } else {
                    return {
                        ...option,
                        checked: false
                    }
                }
            })

            setSearchOptions(newOptions)
        }
        
        
        
    }
    
    


    return(
        <>
            <div className='search'>
                <SearchInput 
                    placeholder={'spiderman'}
                    value={searchValue}
                    onChange={onHandleChange}
                    onClick={ () => searchCharacters(searchOptions, searchValue) }
                />
                <div className='checkboxes-container'>
                    <p className='checkboxes-title'>Limit of results</p>
                    <div className='checkboxes-optionsContainer'>
                        {
                            searchOptions.map(({value, checked}) => (
                                <CheckboxInput 
                                    key={value} 
                                    id={value} 
                                    value={value} 
                                    content={`${value} Results`} 
                                    checkboxType='search'
                                    onClick={setOptions}
                                    checked={checked}
                                />
                            ))
                        }
                    </div>
                    
                </div>
            </div>
                    
        </>
    )
}


export  { Search }