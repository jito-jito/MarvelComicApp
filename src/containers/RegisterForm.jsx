import React from 'react';
import { FormInput } from '../components/inputs/FormInput'
import { FormButton } from '../components/buttons/FormButton'

import { Link } from 'react-router-dom';



function RegisterForm({
    credentials,
    onHandleChange,
    submmitData,
    pageState

}) {
    
    
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