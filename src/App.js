import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UrlShortPage from './Pages/UrlShortPage'
import LoginPage from './Pages/LoginPage'
import { useSelector } from 'react-redux'
import NavigateTo from './Components/NavigateTo'

function App() {

    const {email} = useSelector(state => state.users)

    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={email ? <UrlShortPage/> : <Navigate to={"/login"}/> }/>
                    <Route path="/login" element={email ? <Navigate to={"/"} /> : <LoginPage/>} />
                    <Route path='/r/:shortKey' element={<NavigateTo/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
