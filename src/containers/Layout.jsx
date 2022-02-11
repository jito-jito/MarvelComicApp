import React from 'react';
import { Header } from './Header';
import { Footer } from '../components/Footer';

function Layout({ children }) {

    return(
        <>
            <Header/>
                { children }
            <Footer/>
        </>
    )
}

export { Layout }