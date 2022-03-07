import React from 'react';
import { FormInput } from '../components/inputs/FormInput';
import { FormButton } from '../components/buttons/FormButton';
import { Link } from 'react-router-dom';



function LoginForm({
    children,
    email,
    password,
    onHandleChange,
    submmitData,
    signWithFacebook,
    signWithGoogle,
    pageState
}) {
    


    return(
        <>
            <div className='login-form'>
                <h1 className='login-form-title'>Marvel Comic app <br />login</h1>
                    <form className='form-login-credentials' action="">
                        <FormInput 
                            className='defaultInput'
                            placeHolder='your email'
                            type='text'
                            id='email'
                            value={email}
                            onChange={onHandleChange}
                        />
                        <FormInput 
                            className='defaultInput'
                            placeHolder='your secret password'
                            type="password"
                            id='password'
                            value={password}
                            onChange={onHandleChange}
                        />

                            {pageState.loading == true ? <p className='login-form-message-loading'>loading....</p> : null}
                            {pageState.error == 'credentials' ?  <p className='login-form-message-error'>error in credentials</p> : null }
                            {pageState.error == 'userNotFound' ?  <p className='login-form-message-error'>error in get a user</p> : null }
                            {pageState.error == 'tooRequests' ?  <p className='login-form-message-error'>too many requests, try again later</p> : null }
                        
                        <FormButton 
                            className='defaultButton'
                            value='login'
                            onClick={submmitData}
                        />
                    </form>
                    <form className='form-login-social'>
                        <FormButton 
                            className='button-login-facebook'
                            value='Login with Facebook'
                            onClick={signWithFacebook}
                        />
                        <FormButton 
                            className='button-login-google'
                            value='Login with google'
                            onClick={signWithGoogle}
                        />
                    </form>
                <div className='login-options'>
                    {/* <p className='login-options-forgotPassword'>forgot password? <a >click here</a></p> */}
                    <p className='login-options-register'>You don't have an account?<br /><Link to="/register">register here</Link></p>
                </div>
            </div> 
        </>
    )
}

export { LoginForm }