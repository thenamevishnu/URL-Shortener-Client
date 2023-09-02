import axios from "axios"

export const api_call = axios.create({
    baseURL: process.env.REACT_APP_BASE_API
})

const server_call = axios.create({
    baseURL: process.env.REACT_APP_SERVER
})

server_call.interceptors.request.use((config) => {
    const token = localStorage.getItem("userDB") ? JSON.parse(localStorage.getItem("userDB")).token : null
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default server_call