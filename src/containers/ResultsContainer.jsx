import React from 'react';



function ResultsContainer({ 
    children,
    charactersData,
    pageState
    
}) {

    const initialState = () => { return ( pageState.loading === '' ?
        <section className='results-container'>

        </section> : ''
    )}
    const loadingState = () => { return ( pageState.loading === true ? 
        <>
            <section className='results-container'>
                <div className='loading-resultsContainer'>
                    <h1>Loading</h1>
                    <div className="loader"><div></div><div></div><div></div><div></div></div>
                </div>
            </section>
        </>
        : ''
    )}
    const errorInGetCharacters = () => {return ( pageState.loading === false && pageState.errorInFindCharacters === true ?
        <section className='results-container'>
            <div className='error-resultsContainer'>
                <h1 >error in find characters, try again with other name</h1>
            </div>
            
        </section> : ''

    )}
    const successComicsLoadedState = () => pageState.loading === false && charactersData.length > 0 

    return (
        <>
            { initialState() }
            { loadingState() }
            { errorInGetCharacters() }
            { successComicsLoadedState() ?
                <section className='results-container'>
                    { children }    
                </section> : ''
            }
           
            
        </>
    )
}


export { ResultsContainer }