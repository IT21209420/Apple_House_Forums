import React from 'react'
import Layout from './components/Layout'
import { Routes , Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Layout>
    </AuthContextProvider>
  )
}

export default App