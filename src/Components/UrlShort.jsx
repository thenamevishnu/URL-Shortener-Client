import React, { useEffect, useState } from 'react'
import { submitData } from '../Services/submitData'
import Generated from './Generated'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../Redux/userSlice'
import { getFevicon, insertDB } from '../Services/shortUrl'
import { getUserHistory } from '../Services/userFetch'
import moment from 'moment'
import Loader from './Loader/Loader'

function UrlShort() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [historyLoading, sethistoryLoading] = useState(false)
    const {id, name, picture} = useSelector(state => state.users)
    const [title, showTitle] = useState(false)
    const [copied,setCopied] = useState(false)

    useEffect(()=>{
        if(copied){
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        }
    },[copied])

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    },[])

    const [history,setHistory] = useState([])
    const [formData,setFormData] = useState({
        url:"",
        alias:"",
        domain:"tinyurl"
    })
    const [shortLink, setShortLink] = useState("")
    const [error,setError] = useState({
        url:"",
        alias:""
    })
    const [linkGenerated,setLinkGenerated] = useState(false)
    const [showHistory,setShowHistory] = useState(false)
    const [clicked, setClicked] = useState(null)

    useEffect(()=>{
        setError({
            url:"",
            alias:""
        })
    },[formData])

    const logoutSession = async () => {
        localStorage.removeItem("userDB")
        dispatch(updateUser({id:"",name:"",email:"",picture:""}))
        navigate("/login")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await submitData(formData, id)
        if(!response.status){
            if(response.response?.url && response.response?.alias){
                setError({url:response.response.url,alias:response.response.alias})
            }else if(response.response?.url){
                setError({url:response.response.url})
            }else if(response.response?.alias){
                setError({alias:response.response.alias})
            }
        }else{
            setError({url:"",alias:""})
            setShortLink(response.response)
            const obj = {longUrl:formData.url,shortUrl:response.response,time: new Date().getTime()}
            const icon = await getFevicon(obj.longUrl)
            if(icon){
                obj.icon = icon
            }
            setHistory([obj,...history])
            await insertDB(obj,id)
            setLinkGenerated(true)
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            setHistory(await getUserHistory(id))
            setTimeout(()=>{
                sethistoryLoading(false)
            },1500)
        }
        showHistory && fetchData()
    },[showHistory, id])

    return (
        <>
        {loading ? <Loader center={true}/> : <>
         
            <div className='absolute top-5 right-5'>
                <i className='fa fa-history bg-white mr-3 cursor-pointer rounded-xl p-2' title='My History' onClick={()=>{!showHistory && sethistoryLoading(true); setShowHistory(!showHistory);}}></i>
                <i className='fa fa-sign-out text-white mr-3 cursor-pointer bg-red-700 p-2 rounded-xl' onClick={async () => await logoutSession()}></i>
                <span className='relative'>
                    <img className='fa fa-sign-out mt-[-0.26rem] w-8 rounded-xl text-white cursor-pointer' src={picture} alt='profile' onMouseEnter={()=>showTitle(true)} onMouseLeave={()=>showTitle(false)}></img>
                    {title && <p className='absolute top-10 bg-white text-black font-mono p-1 px-2 rounded-xl font-bold whitespace-nowrap'>{name}</p>}
                </span>
            </div>
            {!linkGenerated ?
                <div className="flex justify-center font-mono">
                    <form onSubmit={handleSubmit} className='mt-20 w-11/12 md:w-8/12 lg:w-5/12 xl-5/12 p-5 bg-white rounded-xl'>
                        <h1 className='font-mono text-violet-950 text-center text-xl mb-4 font-bold bg-white'>URL SHORTENER</h1>
                        <input type='text' value={formData.url} className='w-full p-2 outline-none border-2 border-gray-300 bg-white rounded-xl' placeholder='Enter Long URL...' name='url' onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}/>
                        {error?.url && <span className='bg-white text-red-600 text-xs'>{error.url}</span>}
                        <div className='bg-white text-violet-950 font-bold mt-3'>Customize Your Link: </div>
                        <div className=' bg-white grid grid-cols-12 gap-3 mt-3'>
                            <select defaultValue={formData.domain} className='col-span-7 p-2 outline-none border-2 border-gray-300 bg-white rounded-xl' name='domain' onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}>
                                <option value={"tinyurl"}>tinyurl</option>
                                <option value={window.location.hostname}>{window.location.hostname}</option>
                            </select>
                            <input type='text' value={formData.alias} className='col-span-5 p-2 outline-none border-2 border-gray-300 bg-white rounded-xl' name='alias' placeholder='Enter Alias...' onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}/>
                        </div>
                        {error?.alias && <span className='w-5/12 bg-white text-red-600 text-xs'>{error.alias}</span>}
                        <button type='submit' className='mt-4 w-full bg-green-700 text-white font-mono font-semibold p-2 rounded-xl'>Create</button>
                    </form>
                </div> : 
                <Generated data={{...formData,short:shortLink}} setLinkGenerated={setLinkGenerated} showHistory={showHistory}/>
            }
             {historyLoading ? <div className='text-center mt-20'><Loader center={false}/></div> : showHistory && 
                <div className='w-screen mt-7 grid grid-cols-12 gap-3 mx-auto font-mono px-5'>
                    <div className='col-span-12 font-bold text-xl text-center bg-gray-600 text-white py-1 rounded-xl'>
                        My URL Created History
                    </div>
                    { history?.length > 0 ?
                        history.map((item) => { 
                            return(
                                <div key={item.time} className='my-2 px-5 p-2 text-white col-span-12 lg:col-span-6 font-bold text-base text-start border-2 border-gray-400 rounded-xl overflow-x-hidden'>
                                    {item.icon && <img alt='icon' src={item.icon}/>}
                                    <p className=' whitespace-nowrap'>Long: <span className='text-gray-400'>{item.longUrl}</span></p>
                                    <p className=' whitespace-nowrap'>Short: <span className='text-gray-400'>{item.shortUrl}</span> <i className={copied && clicked === item ? 'fa fa-circle-check text-green-700 bg-white rounded-full cursor-pointer' : 'fa fa-copy text-white cursor-pointer'} onClick={()=>{setClicked(item); navigator.clipboard.writeText(item.shortUrl); setCopied(true)}}></i></p>
                                    <p className=' whitespace-nowrap'>Created: <span className='text-gray-400'>{moment(item.time).fromNow()}</span></p>
                                </div>
                            )
                        }) : <div className='my-2 px-5 p-2 col-span-12 font-bold text-xl text-center border-2 border-gray-400 rounded-xl text-white'>No Data Found!</div>
                    }
                </div>
            }
        </>}
        </>
    )
}

export default UrlShort
