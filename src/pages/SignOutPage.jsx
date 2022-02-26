import React from 'react';
import { Link } from 'react-router-dom';


function SignOutPage() {

    return (
        <>
            <div className='signOut-mainPage'>
                <h1 className='signOut-mainPage-title'>
                    <Link to="/">sign in</Link> to search and save comics
                </h1>
            </div>
        </>
    )
}


export { SignOutPage }