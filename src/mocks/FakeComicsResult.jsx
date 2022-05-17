import React from 'react'
import { CheckboxInput } from './inputs/CheckboxInput'
import { FormButton } from './buttons/FormButton'

import comicImg from '../assets/images/comicImage.png'

function FakeComicsResult () {
  return (
    <>
      <section className='comics-result'>
        <CheckboxInput checkboxType='favorite' id='ss' />
        <figure className='comics-result-img'>
          <img src={comicImg} alt='' />
        </figure>
        <article className='comics-result-description'>
          <section className='comics-result-descriptionTitle'>
            <h4>Title:</h4>
            <p>Avengers (2010) #1</p>
          </section>
          <section className='comics-result-descriptionDetails'>
            <h4>Description:</h4>
            <p>Kang The Conqueror has come from the future! Now, The Avengers must assemble to prevent a catastrophic threat from tearing apart the timestream. But who will answer the call?</p>
          </section>

          <FormButton
            className='defaultButton comicResult'
            value='see in marvel'
          />
        </article>
      </section>
    </>
  )
}

export { FakeComicsResult }
