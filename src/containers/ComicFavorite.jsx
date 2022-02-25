import React from 'react';
import { DeleteButton } from '../components/buttons/DeleteButton'

function ComicFavorite( { img, title }) {


    return (
        <>
            <article className='comicFavorite'>
                <figure className='comicFavorite-img'>
                    <img src={img} alt="" />
                    <DeleteButton 
                        
                    />
                </figure>
                <h4 className='comicFavorite-title'>{title}</h4>
            </article>
        </>
    )
}


export { ComicFavorite }