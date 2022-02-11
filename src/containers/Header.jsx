import React from 'react';
import { User } from '../components/user/User';

function Header() {

    return(
        <>
            <header className='header'>
                <h1>Marvel Comic App</h1>
                <User/>
            
            </header>
        </>
    )
}

export { Header }