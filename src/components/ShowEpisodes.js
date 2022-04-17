import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter, fetchEpisodes } from '../actions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import EpisodeElement from './EpisodeElement';






const  ShowEpisodes = () => {

    const dispatch = useDispatch();
    const regex = /(?<=anime\/).*/g
  
    const id = window.location.href.match(regex)



    useEffect(() => {
        dispatch(fetchEpisodes(id))

    }, [])

    const episodesState = useSelector(state=>state.episodes)

    function RenderEpisodesLab(){
        try{
          const episodes = episodesState.data|| episodesState[1].data || episodesState[0].data ||episodes.data
    
          return episodes.map((element)=>{
            const {id} = element
            const {airdate} = element.attributes
            const {number} = element.attributes

            
    
            const strCreated = new Date(airdate).toLocaleDateString()
    
            return(
              <EpisodeElement id = {id} strCreated = {strCreated} number ={number} titles ={element.attributes.titles}/>
              // <div key={id} >
              //   <IconWatched onClick={()=>setWatched(!liked)}/>
              //   <p style={{textAlign:'left'}}>{strCreated} <b>{number}</b>:  {element.attributes.titles.canonicalTitle || element.attributes.titles.en_us || element.attributes.titles.en_jp} </p>
              // </div>
              
            )
          })
    
    
        }catch(error){
          console.log(error)
        }
      }


    

    function  RenderEspisodes(){
        try{
            return RenderEpisodesLab()

        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <div>
        {RenderEspisodes()}
        
    </div>
  )
}

export default ShowEpisodes