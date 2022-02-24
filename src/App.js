import './styles/global.scss';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { MainPage } from './pages/MainPage.jsx';
import { MainProfilePage } from './pages/MainProfilePage.jsx';
import { UserContext } from "./UserContext";

import {  auth, onAuthStateChanged } from './utils/lib/firebase';

import { getUser } from './utils/lib/getUser'
import { getUserComics } from './utils/lib/getUserComics'


function App() {
  const [ userData, setUserData ] = useState()
  const [ userSavedComics, setUserSavedComics ] = useState()
  const [ loadingUserData, setloadingUserData ] = useState( false )


  onAuthStateChanged(auth, async (user) => {
    if (user) {      
      const uid = user.uid;
      const email = user.email
      const name = user.displayName
      const photo = user.photoURL
  
      await setUserData( user )

    } else {
      console.log('user signed out')
      setUserData(null)
      setUserSavedComics(null)
    }
  });
   
  useEffect(async() => {
    
    const userDbId = await getUser(userData)
    const userComics = await getUserComics(userDbId)
    setUserSavedComics( userComics )
    
  }, [userData])

  console.log(userSavedComics)
  console.log(userData)
  return (
    <UserContext.Provider value={ 
    { 
      userData,
      loadingUserData,
      setloadingUserData,
      userSavedComics,
      setUserSavedComics
      
    }
    }>
      <Routes>
        <Route path="/"  element={<LoginPage />} />
        <Route path="/register"  element={<RegisterPage/>} />
        <Route path="/search"  element={<MainPage/>} /> 
        <Route path="/profile"  element={<MainProfilePage/>} /> 
      </Routes>
    </UserContext.Provider>
  );
}


export default App;
