import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLinkByKey } from '../Services/redirect'

function NavigateTo() {

    const {shortKey} = useParams()
    const [toUrl, setToUrl] = useState(null)

    useEffect(()=>{
        const function_call = async () => {
            const response = await getLinkByKey(shortKey)
            setToUrl(response)
            window.location.href = response
        }
        function_call()
    },[shortKey])

    return (
        <div className='text-white text-center font-mono mt-10'>Redirecting to {toUrl && toUrl}</div>
    )
}

export default NavigateTo
