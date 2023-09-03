import { toast } from "react-hot-toast";
import server_call from "../axios";

export const createUser = async (extractData) => {
    try{
        const {data} = await server_call.post(`/login`, {extractData}, {withCredentials:true})
        return data
    }catch(err){
        toast.error(err)
    }
}

export const getUserHistory = async (user_id) => {
    try{
        const {data} = await server_call.get(`/getUserHistory/${user_id}`)
        if(data.error) return "navigate"
        return data
    }catch(err){
        toast.error(err)
    }
}

export const deleteElement = async (item, user_id) => {
    try{
        const {data} = await server_call.post(`/deleteElement`,{item:item, user_id:user_id})
        return data.response
    }catch(err){
        toast.error(err)
    }
}