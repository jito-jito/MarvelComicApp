import React from 'react';
import { FormInput } from '../components/inputs/FormInput'
import { FormButton } from '../components/buttons/FormButton'


function LoginForm() {

    return(
        <>
            <div className='login-form'>
                <h1 className='login-form-title'>Marvel Comic app <br />login</h1>
                <form className='form-login-credentials' action="">
                    <FormInput 
                        className='defaultInput'
                        placeHolder='your email'
                        type='text'
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='your secret password'
                        type="password"
                    />
                    <FormButton 
                        className='defaultButton'
                        value='login'
                    />
                </form>
                <form className='form-login-social'>
                    <FormButton 
                        className='button-login-facebook'
                        value='Login with Facebook'
                    />
                    <FormButton 
                        className='button-login-google'
                        value='Login with google'
                    />
                </form>
                <div className='login-options'>
                    <p className='login-options-forgotPassword'>forgot password? <a href="">click here</a></p>
                    <p className='login-options-register'>You don't have an account?<br /><a href="">register here</a></p>
                </div>
            </div> 
        </>
    )
}

export { LoginForm }