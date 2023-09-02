import server_call from "../axios";

export const createUser = async (extractData) => {
    try{
        const {data} = await server_call.post(`/login`, {extractData}, {withCredentials:true})
        return data
    }catch(err){
        console.log(err);
    }
}

export const getUserHistory = async (user_id) => {
    try{
        const {data} = await server_call.get(`/getUserHistory/${user_id}`)
        return data
    }catch(err){
        console.log(err);
    }
}