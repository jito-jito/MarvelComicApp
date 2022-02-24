import React, { useContext } from 'react';
import { LoginForm } from '../containers/LoginForm';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { userData } = useContext( UserContext )
    let navigate = useNavigate()

    if(userData) {
        navigate('/search', { replace: true })
    }
    
    return(
        <>
            <div className='login-page'>
                <LoginForm/>
            </div>
        </>
    )
}

export { LoginPage }