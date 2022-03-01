import React from 'react';
import { User } from './User';
import { logOut } from '../utils/auth/singOut';
import { Link } from 'react-router-dom';

function Header() {


    return(
        <>
            <header className='header'>
                <h1><Link to='/search'>Marvel Comic App</Link></h1>
                <User logOut={logOut}/>
            </header>
        </>
    )
}

export { Header }