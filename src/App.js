import React from "react";
import './styles/global.scss';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { MainPage } from './pages/MainPage.jsx';
import { MainProfilePage } from './pages/MainProfilePage.jsx';


function App() {
  return (
      <Routes>
        <Route path="/login"  element={<LoginPage />} />  
        <Route path="/register"  element={<RegisterPage/>} /> 
        <Route path="/mainProfile"  element={<MainProfilePage/>} />   
        <Route path="/main"  element={<MainPage/>} />  
      </Routes>
  );
}

export default App;
