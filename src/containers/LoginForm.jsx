import React, {useState, useContext} from 'react';
import { FormInput } from '../components/inputs/FormInput';
import { FormButton } from '../components/buttons/FormButton';
import { loginUser } from '../utils/auth/loginUserWithCredentials';
import { signWithFacebook } from '../utils/auth/providers/facebook';
import { signWithGoogle } from '../utils/auth/providers/google';
import { Link, useNavigate  } from 'react-router-dom';
import { UserContext } from '../UserContext';


function LoginForm() {
    const { setloadingUserData } = useContext(UserContext)
    let navigate = useNavigate();
    const [ credentials, setCredentials ] = useState({
        email: String,
        password: String
    })
    const [ pageState, setPageState ] = useState({
        error: Object, 
        loading: Boolean
    })

    const { email, password } = credentials
    
    function onHandleChange(e) {   
        setPageState({ ...pageState, error: null })
        if(e.target.id == 'email') {
            setCredentials({ ...credentials, email: e.target.value} )
        }
        if(e.target.id == 'password') {
            setCredentials({ ...credentials, password: e.target.value} )
        }
    }
    
    function validateCredentials(data, type) {
        if(type == 'email') {
            return String(data)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        }
        if(type == 'password') {
            return data.length >= 6
        }
    }

    async function submmitData(e) {
        e.preventDefault()
        const isValidEmail = validateCredentials(email, 'email')
        const isValidPassword = validateCredentials(password, 'password')


        try {
            if( !isValidEmail || !isValidPassword ) {
                setPageState({ ...pageState, error: 'credentials' })
                throw 'invalid credentials'
            }
            setPageState({ ...pageState, loading: true })
            const response = await loginUser(email, password)
            
            if(response.error) {
                if (response.errorCode == 'auth/wrong-password') {
                    setPageState({ ...pageState, error: 'credentials' })

                }
                if (response.errorCode == 'auth/user-not-found') {
                    setPageState({ ...pageState, error: 'userNotFound' })

                }
                if (response.errorCode == 'auth/too-many-requests') {
                    setPageState({ ...pageState, error: 'tooRequests' })

                }
                
                throw response
            }

            setPageState({ ...pageState, loading: false })
            navigate("/search", { replace: true })

        } catch (err) {
            console.log(err)
        }
        
    }

    async function signWithProvider(signInProvider) {
        try {
            setloadingUserData(true)
            navigate("/search", { replace: true })
            signInProvider()
        } catch (error) {
            
        }
    }


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
                        onClick={() => {signWithProvider(signWithFacebook)}}
                    />
                    <FormButton 
                        className='button-login-google'
                        value='Login with google'
                        onClick={() => {signWithProvider(signWithGoogle)}}
                    />
                </form>
                <div className='login-options'>
                    <p className='login-options-forgotPassword'>forgot password? <a href="">click here</a></p>
                    <p className='login-options-register'>You don't have an account?<br /><Link to="/register">register here</Link></p>
                </div>
            </div> 
        </>
    )
}

export { LoginForm }