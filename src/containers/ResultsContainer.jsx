import React from 'react';
import { CharacterResult } from '../components/CharacterResult';
import { FakeCharacterResult } from '../components/FakeCharacterResult';
import { ComicsResult } from '../components/ComicsResult';
import { FakeComicsResult } from '../components/FakeComicsResult';
import { FormButton } from '../components/buttons/FormButton';


function ResultsContainer( { charactersData, comicsData, searchComics, saveComic } ) {
    // console.log(comicsData)
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
                                // key={character.id}
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