import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';


export default function App() {
    return (
        <AuthProvider>
        <div>
           <Routes>
             <Route path="/" element={<Home />} />  
             <Route path="/login" element={<Login />} />
             <Route path='*' element={<NotFound />} />
           </Routes>
        </div>
        </AuthProvider>
    );
};