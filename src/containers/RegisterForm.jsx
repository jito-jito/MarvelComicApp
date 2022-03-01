import React, { useState } from 'react';
import { FormInput } from '../components/inputs/FormInput'
import { FormButton } from '../components/buttons/FormButton'
import { registerUser } from '../utils/auth/createUserWithCredentials'
import { Link, useNavigate  } from 'react-router-dom';
// import { isValidFormat } from '@firebase/util';
import { updateUserData } from '../utils/auth/updateUserData';


function RegisterForm() {
    let navigate = useNavigate();
    const [ credentials , setCredentials ] = useState({
        nickName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [ pageState, setPageState ] = useState({
        error: false,
        loading: false
    })

    function onHandleChange(e) {
        setPageState(prevState => ({...prevState, error: false}))
    
        // console.log(e.target)
        console.log(e.target.id)
        if(e.target.id == 'nickName') {
            setCredentials({...credentials, nickName: e.target.value})
        }
        if(e.target.id == 'firstName') {
            setCredentials({...credentials, firstName: e.target.value})
        }
        if(e.target.id == 'lastName') {
            setCredentials({...credentials, lastName: e.target.value})
        }
        if(e.target.id == 'email') {
            setCredentials({...credentials, email: e.target.value})
        }
        if(e.target.id == 'password') {
            setCredentials({...credentials, password: e.target.value})
        }
    }

    function validateNames(arrayNames) {
        const hasInvalidNames = arrayNames.some((name) => name.length < 4 )

        if(hasInvalidNames) {
            return  true
        }

        return false
       

    }

    function validateEmail(email) {
        const hasValidEmail = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if(!hasValidEmail) {
            return true
        } else {
            return false
        }

        return 
    }

    function validatePassword(password) {
        const hasValidPassword = password.length > 6

        if(!hasValidPassword) {
            return true
        } else {
            return false
        }
    }

    function validateCredentials(credentials) {

        const areValidNames = validateNames([
            credentials.nickName,
            credentials.firstName,
            credentials.lastName
        ])
      
        const isValidEmail = validateEmail(credentials.email)

        const isValidPassword = validatePassword(credentials.password)

        return {
            invalidNames: areValidNames,
            invalidEmail: isValidEmail,
            invalidPassword: isValidPassword
        }
    }
    async function submmitData(e) {
        e.preventDefault()
        console.log(e)
        
        try {
            const areValidCredentials = validateCredentials(credentials)
            const hasError = Object.entries(areValidCredentials).some(validations => validations[1] == true)

            console.log(areValidCredentials, hasError)
            
            if(hasError) {
                setPageState(prevState => ({ ...prevState, error: { ...areValidCredentials, invalidCredentials: true}}))
                throw 'error, invalid credentials'
            }
            setPageState(prevState => ({ ...prevState, loading: true}))
            
            const createUser = await registerUser(credentials.email, credentials.password)
            
            if( createUser == 'Firebase: Error (auth/email-already-in-use).') {
                setPageState(prevState => ({ ...prevState, error: { firebaseEmail: true }}))
            }

            if(createUser.user) {
                const updateData = await updateUserData(`${credentials.firstName} ${credentials.lastName}`)
            }

            setPageState(prevState => ({ ...prevState, loading: false}))

            // navigate("/search", { replace: true })
        } catch(error) {
            console.log(error)
        }
        
    }

    
    return(
        <>
            <div className='register-form'>
                <h1 className='login-form-title'>Marvel Comic app <br />register</h1>
                <form className='form-register-credentials' action="">
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Nick name'
                        type='text'
                        id='nickName'
                        value={credentials.nickName}
                        onChange={onHandleChange}
                        required={true}
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='First name'
                        type="text"
                        id='firstName'
                        value={credentials.firstName}
                        onChange={onHandleChange}
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Last name'
                        type="text"
                        id='lastName'
                        value={credentials.lastName}
                        onChange={onHandleChange}
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Email'
                        type="text"
                        id="email"
                        value={credentials.email}
                        onChange={onHandleChange}
                    />
                    <FormInput 
                        className='defaultInput'
                        placeHolder='Password'
                        type="text"
                        id="password"
                        value={credentials.password}
                        onChange={onHandleChange}
                    />
                    { pageState.error.invalidNames ?
                        <p className='error-registerForm'>invalid name</p> : ''                       
                    }
                    { pageState.error.invalidEmail ?
                        <p className='error-registerForm'>invalid email</p> : ''                       
                    }
                    { pageState.error.invalidPassword ?
                        <p className='error-registerForm'>invalid password</p>  : ''                      
                    }
                    { pageState.error.invalidCredentials ?
                        <p className='error-registerForm'>error in credentials</p> : ''
                    }
                    <FormButton 
                        className='defaultButton'
                        value='register'
                        onClick={submmitData}
                    />
                    { pageState.loading ? 
                        <div className="loading-registerForm"></div> : ''
                    }
                    { pageState.error.firebaseEmail ?
                        <p className='error-registerForm'>This email already exists</p>  : ''   
                    }
                </form>
                <div className='register-options'>
                    <p className='register-options-login'>You already  have an account?<br /><Link to='/'>login here</Link></p>
                </div>
            </div>
        </>
    )
}

export { RegisterForm }