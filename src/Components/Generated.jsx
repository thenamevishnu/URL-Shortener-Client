import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code"

function Generated({data,setLinkGenerated}) {

    const [copied,setCopied] = useState(false)
    const [qrCode, showQrCode] = useState(false)
    
    useEffect(()=>{
        if(copied){
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        }
    },[copied])

    return (
        <>
            <div className="flex justify-center font-mono">
                <div className='mt-20 p-5 w-11/12 md:w-8/12 lg:w-5/12 xl-5/12 bg-white rounded-xl'>
                <h1 className='font-mono text-green-600 text-center text-xl mb-4 font-bold bg-white'>GENERATED SUCCESSFUL</h1>
                    <label className='bg-white text-violet-950 font-semibold'>Long URL:</label>
                    <input type='text' disabled={true} value={data.url} className='w-full mb-3 p-2 outline-none border-2 border-gray-300 bg-white rounded-xl' name='url' id='longUrl'/>
                    <label className='bg-white text-violet-950 font-semibold'>Short URL:</label>
                    <input type='text' disabled={true} value={data.short} className='w-full p-2 outline-none border-2 border-gray-300 bg-white rounded-xl'/>
                    <div className='bg-white mt-4 text-center'>
                        <button className='bg-white mr-3 border-2 border-gray-400 rounded-xl px-3 py-2' onClick={()=>{window.open(data.short,"_blank")}}>
                            <i className='fa fa-link bg-white'></i>
                        </button>
                        {!copied ? <button className='text-white mr-3 bg-green-700 rounded-xl px-3 py-2' onClick={()=>{navigator.clipboard.writeText(data.short); setCopied(true)}}>
                            <i className='fa fa-copy bg-green-700'></i> Copy
                        </button> : <button className='text-white mr-3 bg-green-700 rounded-xl px-3 py-2'>
                            <i className='fa fa-circle-check bg-green-700'></i> Copied
                        </button> }
                        <button className='text-white mr-3 bg-violet-950 rounded-xl px-3 py-2' onClick={async ()=>showQrCode(!qrCode)}>
                            <i className='fa fa-qrcode bg-violet-950'></i> QR
                        </button>
                        <button className='text-white mr-3 bg-green-700 rounded-xl px-3 py-2' onClick={()=>setLinkGenerated(false)}>
                            <i className='fa fa-back bg-green-700'></i> Create New Links
                        </button>
                    </div>
                </div>
            </div>

            <span className='flex justify-center mt-7'>
                {qrCode && <div className='bg-white p-2 rounded-lg'><QRCode value={data.short}/></div>}
            </span>
        </>
    )
}

export default Generated
