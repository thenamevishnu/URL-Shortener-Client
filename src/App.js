import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UrlShortPage from './Pages/UrlShortPage'
import LoginPage from './Pages/LoginPage'
import { useSelector } from 'react-redux'

function App() {

    const {email} = useSelector(state => state.users)

    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={email ? <UrlShortPage/> : <Navigate to={"/login"}/> }/>
                    <Route path="/login" element={email ? <Navigate to={"/"} /> : <LoginPage/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
