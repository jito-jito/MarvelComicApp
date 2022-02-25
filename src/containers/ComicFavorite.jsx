import React from 'react';
import { DeleteButton } from '../components/buttons/DeleteButton'

function ComicFavorite( { img, title, comicId, deleteComic }) {


    return (
        <>
            <article className='comicFavorite'>
                <figure className='comicFavorite-img'>
                    <img src={img} alt="" />
                    <DeleteButton 
                        onClick={(e) => deleteComic(e, comicId)}
                        
                    />
                </figure>
                <h4 className='comicFavorite-title'>{title}</h4>
            </article>
        </>
    )
}


export { ComicFavorite }