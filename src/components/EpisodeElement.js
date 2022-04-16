import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {AiOutlineCheckCircle,AiFillCheckCircle } from 'react-icons/ai'

const EpisodeElement = ({id, strCreated, number, titles}) => {

    const watchedKey = `watched-${id}`

    const [watched, setWatched] = useLocalStorage(watchedKey, false);
    const IconWatched = watched? AiFillCheckCircle:AiOutlineCheckCircle

  return (
    <div key={id} style={{textAlign:'left', fontSize:'1.2rem', margin:'10px auto 10px auto'}} >
     
        <IconWatched size="20px" onClick={()=>setWatched(!watched)} style={{color:'green'}} />
            
    
    
        {strCreated} <b>{number}</b>:  {titles.canonicalTitle || titles.en_us ||titles.en_jp} 
    {/* <p style={{textAlign:'left'}}>{strCreated} <b>{number}</b>:  {titles.canonicalTitle || titles.en_us ||titles.en_jp} </p> */}
  </div>
  )
}

export default EpisodeElement