import server_call from "../axios"

export const getLinkByKey = async (shortKey) => {
    try{
        const {data} = await server_call.get(`/redirect_to/${shortKey}`)
        return data.response
    }catch(err){
        console.log(err)
    }
}