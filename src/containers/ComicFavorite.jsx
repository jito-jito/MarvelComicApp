import React from 'react'
import { Button } from '../components/buttons/Button'

function ComicFavorite ({
  img,
  title,
  comicId,
  deleteComic,
  toggleModal
}) {
  return (
    <>
      <article className='comicFavorite'>
        <figure
          className='comicFavorite-img'
          onClick={(e) => toggleModal(e, { state: true, id: comicId })}
        >
          <img src={img} alt='' />
          <Button
            className="delete-button"
            onClick={(e) => deleteComic(e, comicId)}
          />
        </figure>
        <h4 className='comicFavorite-title'>{title}</h4>
      </article>

    </>
  )
}

export { ComicFavorite }
