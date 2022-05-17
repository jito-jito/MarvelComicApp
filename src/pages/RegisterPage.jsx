// react
import React, { useContext, useState } from 'react'
import { RegisterForm } from '../containers/RegisterForm'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

// auth
import { registerUser } from '../utils/auth/createUserWithCredentials'
import { updateUserData } from '../utils/auth/updateUserData'

function RegisterPage () {
  const { userData } = useContext(UserContext)
  const navigate = useNavigate()

  if (userData) {
    navigate('/search', { replace: true })
  }

  const [credentials, setCredentials] = useState({
    nickName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [pageState, setPageState] = useState({
    error: {
      invalidNames: false,
      invalidEmail: false,
      invalidPassword: false,
      invalidCredentials: false,
      firebaseEmail: false
    },
    loading: false
  })

  function onHandleChange (e) {
    setPageState(prevState => ({
      ...prevState,
      error: {
        invalidNames: false,
        invalidEmail: false,
        invalidPassword: false,
        invalidCredentials: false,
        firebaseEmail: false
      }
    }))

    // console.log(e.target)
    if (e.target.id === 'nickName') {
      setCredentials({ ...credentials, nickName: e.target.value })
    }
    if (e.target.id === 'firstName') {
      setCredentials({ ...credentials, firstName: e.target.value })
    }
    if (e.target.id === 'lastName') {
      setCredentials({ ...credentials, lastName: e.target.value })
    }
    if (e.target.id === 'email') {
      setCredentials({ ...credentials, email: e.target.value })
    }
    if (e.target.id === 'password') {
      setCredentials({ ...credentials, password: e.target.value })
    }
  }

  function validateNames (arrayNames) {
    const hasInvalidNames = arrayNames.some((name) => name.length < 4)

    if (hasInvalidNames) {
      return true
    }

    return false
  }

  function validateEmail (email) {
    const hasValidEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    if (!hasValidEmail) {
      return true
    } else {
      return false
    }
  }

  function validatePassword (password) {
    const hasValidPassword = password.length > 6

    if (!hasValidPassword) {
      return true
    } else {
      return false
    }
  }

  function validateCredentials (credentials) {
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
  async function submmitData (e) {
    e.preventDefault()

    try {
      const areValidCredentials = validateCredentials(credentials)
      const hasError = Object.entries(areValidCredentials).some(validations => validations[1] == true)

      if (hasError) {
        setPageState(prevState => ({ ...prevState, error: { ...areValidCredentials, invalidCredentials: true } }))
        throw 'error, invalid credentials'
      }
      setPageState(prevState => ({ ...prevState, loading: true }))

      const createUser = await registerUser(credentials.email, credentials.password)

      if (createUser === 'Firebase: Error (auth/email-already-in-use).') {
        setPageState(prevState => ({ ...prevState, error: { firebaseEmail: true } }))
      }

      if (createUser.user) {
        const updateData = await updateUserData(`${credentials.firstName} ${credentials.lastName}`)
      }

      setPageState(prevState => ({ ...prevState, loading: false }))
    } catch (error) {
      // console.log(error)
      console.log('error, user already exist')
    }
  }

  return (
    <>
      <div className='register-page'>
        <RegisterForm
          credentials={credentials}
          onHandleChange={onHandleChange}
          submmitData={submmitData}
          pageState={pageState}
        />
      </div>
    </>
  )
}

export { RegisterPage }
