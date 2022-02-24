import React, { useContext } from 'react';
import { RegisterForm } from '../containers/RegisterForm';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const { userData } = useContext( UserContext )
    let navigate = useNavigate()

    if(userData) {
        navigate('/search', { replace: true })
    }


    return(
        <>
            <div className='register-page'>
                <RegisterForm/>
            </div>
        </>
    )
}

export { RegisterPage }