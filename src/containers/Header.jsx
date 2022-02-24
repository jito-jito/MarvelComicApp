import React from 'react';
import { User } from '../components/user/User';
import { logOut } from '../utils/auth/singOut';


function Header() {


    return(
        <>
            <header className='header'>
                <h1>Marvel Comic App</h1>
                <User logOut={logOut}/>
            </header>
        </>
    )
}

export { Header }