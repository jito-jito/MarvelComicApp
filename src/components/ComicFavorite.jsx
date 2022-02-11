import React from 'react';
import comicImg from '../assets/images/comicImage.png';

function ComicFavorite() {


    return (
        <>
            <article className='comicFavorite'>
                <figure className='comicFavorite-img'>
                    <img src={comicImg} alt="" />
                </figure>
                <h4 className='comicFavorite-title'>comic title</h4>
            </article>
        </>
    )
}


export { ComicFavorite }