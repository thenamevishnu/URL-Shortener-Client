import { toast } from "react-hot-toast";
import server_call, { api_call } from "../axios"

const createShortLink = async (link) => {
    try{
        const encodedLink = encodeURIComponent(link);
        const token = localStorage.getItem("userDB") ? JSON.parse(localStorage.getItem("userDB")).token : null
        const {data,status} = token ? await api_call.get(`?url=${encodedLink}`) : {data:"navigate", status: 200}
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
        const token = localStorage.getItem("userDB") ? JSON.parse(localStorage.getItem("userDB")).token : null
        const {data,status} = token ? await api_call.get(`?url=${encodedLink}&alias=${alias}`) : {data:"navigate", status: 200}
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
        if(alias){
            const exp = /^[a-zA-Z0-9]+$/igm
            if(!exp.test(alias)){
                return {alias:"Alias is not available!"}
            }
        }
        const {data} = await server_call.post(`/createLink`,{link,id,alias})
        if(data.error){
            return "navigate"
        }
        if(!data.status){
            return {alias:"Alias is not available!"}
        }else{
            return data.response
        }
    }catch(err){
        toast.error(err)
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
        if(data.error) return "navigate"
        return data
    }catch(err){
        toast.error(err)
    }
}