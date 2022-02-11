import React from 'react';
import { Layout } from '../containers/Layout';
import { ComicFavorite } from '../components/ComicFavorite';
import { FormButton } from '../components/buttons/FormButton';

function MainProfilePage() {

    return(
        <>
            <Layout>
                <main className='mainProfile-page'>
                    <h1>Hello user</h1>
                    <h1>Your favorite comics:</h1>
                    <section className='favoriteComics-container'>
                        <ComicFavorite/>
                        <ComicFavorite/>
                        <ComicFavorite/>
                        <ComicFavorite/>
                        <ComicFavorite/>
                        <ComicFavorite/>
                        <ComicFavorite/>
                        <ComicFavorite/>
                        
                    </section>
                    <FormButton className={'defaultButton mainProfile'} value='search more comics' />
                </main>
            </Layout>
        </>
    )
}


export { MainProfilePage }