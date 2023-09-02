import server_call, { api_call } from "../axios"

const createShortLink = async (link) => {
    try{
        const encodedLink = encodeURIComponent(link);
        const {data,status} = await api_call.get(`?url=${encodedLink}`)
        if(status===200){
            return data
        }else{
            return {url:"Enter a valid url or Include http/https!"} 
        }
    }catch(err){
        return {url:"Enter a valid url or Include http/https!"}
    }
}

const createShortLinkAlias = async (link, alias) => {
    try{
        const encodedLink = encodeURIComponent(link);
        const {data,status} = await api_call.get(`?url=${encodedLink}&alias=${alias}`)
        if(status===200){
            return data
        }else{
            return {alias:"Alias is not available!"}
        }
    }catch(err){
        return {alias:"Alias is not available!"}
    }
}

export const shortUrl = async (link, alias="") => {
    const response = alias!=="" ? await createShortLinkAlias(link, alias) : await createShortLink(link)
    return response
}

export const insertDB = async (insertData, id) => {
    try{
        const {data} = await server_call.post(`/insertHistory`,{insertData, id})
        return data
    }catch(err){
        console.log(err)
    }
}