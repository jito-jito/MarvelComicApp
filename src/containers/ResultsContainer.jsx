import React from 'react';
import { CharacterResult } from './CharacterResult';
import { ComicsResult } from './ComicsResult';


function ResultsContainer( { charactersData, comicsData, searchComics, saveComic, loadingCharacters } ) {

    return (
        <>
            { loadingCharacters === '' ?
                <section className='results-container'>

                </section> : ''
            }
            {loadingCharacters === true ? 
                <>
                    <section className='results-container'>
                        <h1>loading...</h1>
                    </section>
                </>
                : ''
            }
            { loadingCharacters === false && charactersData ?
                <section className='results-container'>
                { charactersData ?
                    charactersData.map((character) => (
                        <CharacterResult
                            key={character.id}
                            id={character.id}
                            name={character.name}
                            img={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            searchComics={searchComics}
                        > 
                            <ComicsResult 
                                comicsData={comicsData} 
                                characterId={character.id}
                                saveComic={saveComic}
                            />
                        </CharacterResult>
                    )) : ''
                }
                
                </section> : ''
            }
            
        </>
    )
}


export { ResultsContainer }