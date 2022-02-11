import React from 'react';
import { Layout } from '../containers/Layout';
import { Search } from '../containers/Search.jsx';
import { ResultsContainer } from '../containers/ResultsContainer';

function MainPage() {

    return (
        <>
            <Layout>
                <div className='main-page'>
                    <h1>Search characters!</h1>
                    <Search/>
                    <ResultsContainer />
                </div>
            </Layout>
        </>
    )
}


export { MainPage }