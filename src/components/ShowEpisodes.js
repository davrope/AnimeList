import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter, fetchEpisodes } from '../actions';





const  ShowEpisodes = () => {

    const dispatch = useDispatch();
    const regex = /(?<=anime\/).*/g
  
    const id = window.location.href.match(regex)

    useEffect(() => {
        dispatch(fetchEpisodes(id))

    }, [])

    function RenderEpisodesLab(){
        try{
          const episodes = episodesState[1].data || episodesState[0].data ||episodes.data
    
          return episodes.map((element)=>{
            const {id} = element
            const {airdate} = element.attributes
            const {number} = element.attributes
    
            const strCreated = new Date(airdate).toLocaleDateString()
    
            return(
              <div key={id}>
                <p>{strCreated} {number}:  {element.attributes.titles.canonicalTitle || element.attributes.titles.en_us || element.attributes.titles.en_jp} </p>
              </div>
              
            )
          })
    
    
        }catch(error){
          console.log(error)
        }
      }


    const episodesState = useSelector(state=>state.episodes)

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