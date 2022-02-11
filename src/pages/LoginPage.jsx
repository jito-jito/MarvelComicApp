import React from 'react';
import { LoginForm } from '../containers/LoginForm';

function LoginPage() {

    return(
        <>
            <div className='login-page'>
                <LoginForm/>
            </div>
        </>
    )
}

export { LoginPage }