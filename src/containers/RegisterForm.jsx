import React, { useState } from 'react';
import { FormInput } from '../components/inputs/FormInput'
import { FormButton } from '../components/buttons/FormButton'
import { registerUser } from '../utils/auth/createUserWithCredentials'
import { Link, useNavigate  } from 'react-router-dom';



function RegisterForm() {
    let navigate = useNavigate();
    const [ credentials , setCredentials ] = useState({
        nickName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
  

    function onHandleChange(e) {
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
    
    async function submmitData(e) {
        e.preventDefault()
        console.log(e)
        
        try {
            await registerUser(credentials.email, credentials.password)
            navigate("/search", { replace: true })
        } catch(error) {
            console.error(error)
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
                    <FormButton 
                        className='defaultButton'
                        value='register'
                        onClick={submmitData}
                    />
                </form>
                <div className='register-options'>
                    <p className='register-options-login'>You already  have an account?<br /><Link to='/'>login here</Link></p>
                </div>
            </div>
        </>
    )
}

export { RegisterForm }