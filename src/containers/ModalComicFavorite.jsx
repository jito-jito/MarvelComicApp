import React from 'react'
import ReactDOM from 'react-dom'
import { FormButton } from '../components/buttons/FormButton'
import { Button } from '../components/buttons/Button'

function ModalComicFavorite ({
  openModal,
  toggleModal,
  goToMarvelPage,
  modalId,
  title,
  description,
  img,
  urls

}) {
  return ReactDOM.createPortal(
    <>
      {!!openModal && openModal.id == modalId
        ? <div className='modal-container'>
          <section className='modal-comicFavorite'>
            <figure className='modal-comicFavorite-img'>
              <img src={img} alt='' />
            </figure>
            <article className='modal-comicFavorite-data'>
              <h1>{title}</h1>
              <h3>Description:</h3>
              <p>{description}</p>
              <FormButton
                className='defaultButton modal-mainProfile'
                value='see in marvel'
                onClick={() => goToMarvelPage(urls[0].url)}
              />
            </article>
            <Button
              className='closeModal-button modal-comicFavorite-closeButton'
              onClick={(e) => toggleModal(e, { state: false, id: null })}
            />
          </section>
          </div>
        : ''}

    </>, document.getElementById('modal')
  )
}

export { ModalComicFavorite }
