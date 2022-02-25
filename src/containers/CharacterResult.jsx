import React from 'react';
import { CheckboxInput } from '../components/inputs/CheckboxInput';



function CharacterResult({ img, name, id, children, searchComics }) {

    return (
        <>
            <article className='character-result'>
                <section className='character-result-container'>
                    <figure className='character-result-img'>
                        <img src={img} alt={name} />
                    </figure>
                    <h3 className='character-result-name'>{name}</h3>
                    <CheckboxInput 
                        checkboxType={'charResults'} 
                        id={id} 
                        className='character-result-checkbox' 
                        onClick={searchComics}
                    />
                </section>
                {children}
            </article>
        </>
    )
}


export { CharacterResult }

