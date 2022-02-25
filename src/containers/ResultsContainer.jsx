import React from 'react';
import { CharacterResult } from './CharacterResult';
import { ComicsResult } from './ComicsResult';


function ResultsContainer( { charactersData, comicsData, searchComics, saveComic } ) {

    return (
        <>
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
                
            </section>
        </>
    )
}


export { ResultsContainer }