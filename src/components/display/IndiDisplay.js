import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Display from './Display'
import './IndiDisplay.css'

const IndiDisplay=()=>{

    const location=useLocation()

    const [title, titleSET]=useState(undefined)
    const [description, descriptionSET]=useState(undefined)
    const [src, srcSET]=useState(undefined)
    const [alt, altSET]=useState(undefined)
 
    useEffect(()=>{
        const prePath=location?.state?.prePath
        const ele=location?.state?.objData
        if(prePath==='/country'){
            titleSET(ele?.name?.common?.toUpperCase())
            descriptionSET(ele?.area)
            srcSET(ele?.flags?.png)
            altSET(ele?.name?.common)
       }else if(prePath==='/people'){
            titleSET(ele?.login?.toUpperCase())
            descriptionSET(ele?.node_id?.slice(0,10))
            srcSET(ele?.avatar_url)
            altSET(ele?.login)
       }
    },[])

    return(
        <div className='indiDisplayMain'>
            <Display
                title={title}
                description={description}
                src={src}
                alt={alt}
                index={0}
            />
        </div>
    )
}

export default IndiDisplay