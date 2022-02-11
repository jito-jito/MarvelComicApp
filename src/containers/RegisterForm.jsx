import React from 'react';
import { FormInput } from '../components/inputs/FormInput'
import { FormButton } from '../components/buttons/FormButton'


function RegisterForm() {

    return(
        <>
            <div className='register-form'>
                <h1 className='login-form-title'>Marvel Comic app <br />register</h1>
                <form className='form-register-credentials' action="">
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Nick name'
                        type='text'
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='First name'
                        type="text"
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Last name'
                        type="text"
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Email'
                        type="text"
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Password'
                        type="text"
                    />
                    <FormButton 
                        className='defaultButton'
                        value='register'
                    />
                </form>
                <div className='register-options'>
                    <p className='register-options-login'>You already  have an account?<br /><a href="">login here</a></p>
                </div>
            </div>
        </>
    )
}

export { RegisterForm }