import React from 'react';
import { CheckboxInput } from '../components/inputs/CheckboxInput';

import charImage  from '../assets/images/charImage.png'


function CharacterResult({ img, name, children }) {

    return (
        <>
            <article className='character-result'>
                <section className='character-result-container'>
                    <figure className='character-result-img'>
                        <img src={charImage} alt={name} />
                    </figure>
                    <h3 className='character-result-name'>name{name}</h3>
                    <CheckboxInput checkboxType={'charResults'} className='character-result-checkbox' />
                </section>
                {children}
            </article>
        </>
    )
}


export { CharacterResult }

