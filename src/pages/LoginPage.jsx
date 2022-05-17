// react
import React, { useContext, useState } from 'react'
import { LoginForm } from '../containers/LoginForm'
import { UserContext } from '../UserContext'

// router
import { useNavigate } from 'react-router-dom'

// auth
import { loginUser } from '../utils/auth/loginUserWithCredentials'
import { signWithFacebook } from '../utils/auth/providers/facebook'
import { signWithGoogle } from '../utils/auth/providers/google'

function LoginPage () {
  const { userData, setloadingUserData } = useContext(UserContext)
  const navigate = useNavigate()

  if (userData) {
    navigate('/search', { replace: true })
  }

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [pageState, setPageState] = useState({
    error: null,
    loading: false
  })

  const { email, password } = credentials

  function onHandleChange (e) {
    setPageState({ ...pageState, error: null })
    if (e.target.id == 'email') {
      setCredentials({ ...credentials, email: e.target.value })
    }
    if (e.target.id == 'password') {
      setCredentials({ ...credentials, password: e.target.value })
    }
  }

  function validateCredentials (data, type) {
    if (type == 'email') {
      return String(data)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }
    if (type == 'password') {
      return data.length >= 6
    }
  }

  async function submmitData (e) {
    e.preventDefault()
    const isValidEmail = validateCredentials(email, 'email')
    const isValidPassword = validateCredentials(password, 'password')

    try {
      if (!isValidEmail || !isValidPassword) {
        setPageState({ ...pageState, error: 'credentials' })
        throw 'invalid credentials'
      }
      setPageState({ ...pageState, loading: true })
      const response = await loginUser(email, password)

      if (response.error) {
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
      navigate('/search', { replace: true })
    } catch (err) {
      console.error(err)
    }
  }

  async function signWithProvider (signInProvider) {
    try {
      setloadingUserData(true)
      navigate('/search', { replace: true })
      signInProvider()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='login-page'>
        <LoginForm
          email={email}
          password={password}
          onHandleChange={onHandleChange}
          submmitData={submmitData}
          signWithFacebook={() => signWithProvider(signWithFacebook)}
          signWithGoogle={() => signWithProvider(signWithGoogle)}
          pageState={pageState}
        />
      </div>
    </>
  )
}

export { LoginPage }
