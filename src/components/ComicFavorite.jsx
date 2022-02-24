import React from 'react';
import comicImg from '../assets/images/comicImage.png';

function ComicFavorite( { img, title }) {


    return (
        <>
            <article className='comicFavorite'>
                <figure className='comicFavorite-img'>
                    <img src={img} alt="" />
                </figure>
                <h4 className='comicFavorite-title'>{title}</h4>
            </article>
        </>
    )
}


export { ComicFavorite }