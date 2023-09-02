import React from 'react'
import {GoogleLogin} from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { createUser } from '../Services/userFetch'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../Redux/userSlice'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sendData = async (credentialResponse) => {
        const extractData = jwt_decode(credentialResponse.credential)
        const {userObj} = await createUser(extractData)
        if(userObj.loggedIn){
            localStorage.setItem("userDB",JSON.stringify(userObj))
            dispatch(updateUser({id:userObj.userData._id,name:userObj.userData.name,email:userObj.userData.email,picture:userObj.userData.picture}))
            navigate("/")
        }else{
            navigate("/login")
        }
    }

    return (
        <div className="flex justify-center mt-20 font-mono">
            <GoogleLogin size="medium" theme="filled_black"
                onSuccess={async (credentialResponse) => {
                    await sendData(credentialResponse)
                }}
                onError={() => {
                    console.log("Error Happend!");
                }}
            />
        </div>
    )
}

export default Login
