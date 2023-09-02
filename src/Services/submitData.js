import {isUri} from "valid-url" 
import { shortUrl } from "./shortUrl"

const urlCheck = async (url) => {
    if(url.slice(0,7).toLowerCase() === "http://" || url.slice(0,8).toLowerCase() === "https://"){
        return true
    }else{
        return false
    }
}

export const submitData = async ({url, alias}) => {
    const obj = {}
    if(!isUri(url) || !urlCheck(url)){
        obj.status = false
        obj.response = {url:"Enter a valid url or Include http/https!"}
    }else if(alias === ""){
        const response = await shortUrl(url)
        obj.status = response.url==="Enter a valid url!" ? false : true
        obj.response = response
    }else{
        const response = await shortUrl(url,alias)
        obj.status = response.alias==="Alias is not available!" || response.url === "Enter a valid url or Include http/https!" ? false : true
        obj.response = response
    }
    return obj
}