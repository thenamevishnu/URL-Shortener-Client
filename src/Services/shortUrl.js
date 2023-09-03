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
        const encodedLink = encodeURIComponent(link)
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

const createShortLinkDomain = async (link, id, alias="") => {
    try{
        const {data} = await server_call.post(`/createLink`,{link,id,alias})
        if(!data.status){
            return {alias:"Alias is not available!"}
        }else{
            return data.response
        }
    }catch(err){
        console.log(err)
    }
}

export const shortUrl = async (link, domain, id, alias="") => {
    if(domain === "tinyurl"){
        if(alias!=="")
            return await createShortLinkAlias(link, alias)
        else
            return await createShortLink(link)
    }else if(domain === window.location.hostname){
        if(alias!=="")
            return await createShortLinkDomain(link, id, alias)
        else
            return await createShortLinkDomain(link, id)
    }
}

export const insertDB = async (insertData, id) => {
    try{
        const {data} = await server_call.post(`/insertHistory`,{insertData, id})
        return data
    }catch(err){
        console.log(err)
    }
}