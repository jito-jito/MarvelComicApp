import React from 'react';
import { CharacterResult } from './CharacterResult';
import { ComicsResult } from './ComicsResult';


function ResultsContainer( { charactersData, comicsData, searchComics, saveComic, loadings, errors } ) {


    console.log(loadings)
    return (
        <>
            { loadings.loading === '' ?
                <section className='results-container'>

                </section> : ''
            }
            {loadings.loading === true ? 
                <>
                    <section className='results-container'>
                        <div className='loading-resultsContainer'>
                            <h1>Loading</h1>
                            <div class="loader"><div></div><div></div><div></div><div></div></div>
                        </div>
                    </section>
                </>
                : ''
            }
            { loadings.loading === false && charactersData.length > 0 ?
                <section className='results-container'>
                { charactersData ?
                    charactersData.map((character) => (
                        <CharacterResult
                            key={character.id}
                            id={character.id}
                            name={character.name}
                            img={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            searchComics={searchComics}
                            loadings={loadings}
                        > 
                            <ComicsResult 
                                comicsData={comicsData} 
                                characterId={character.id}
                                saveComic={saveComic}
                                errors={errors}
                                loadings={loadings}
                            />
                        </CharacterResult>
                    )) : ''
                }
                
                </section> : ''
            }
            { loadings.loadingCharacters === false && errors.errorInFindCharacters ?
                <section className='results-container'>
                    <div className='error-resultsContainer'>
                        <h1 >error in find characters, try again with other name</h1>
                    </div>
                    
                </section> : ''
                
            }
            
        </>
    )
}


export { ResultsContainer }