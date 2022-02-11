import React from 'react';
import { CharacterResult } from '../components/CharacterResult';
import { ComicsResult } from '../components/ComicsResult';
import { FormButton } from '../components/buttons/FormButton';


function ResultsContainer() {

    return (
        <>
            <section className='results-container'>
                <CharacterResult>
                    <div className='results-container-comics'>
                        <h3>List of comics by character</h3>
                        <FormButton className='defaultButton comicRandomAdd'
                    value='add three random comics'/>
                    </div>
                    <ComicsResult  />
                    <ComicsResult  />
                    <ComicsResult  />
                </CharacterResult>
                <CharacterResult/>
                <CharacterResult/>
            </section>
        </>
    )
}


export { ResultsContainer }