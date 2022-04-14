import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter } from '../actions';

const  ShowEpisodes = (id) => {

    const dispatch = useDispatch();

    // const regex = /(?<=anime\/).*/g
  
    // const id = window.location.href.match(regex)


    useEffect(() => {
        dispatch(fetchCharacter(id))
    
    //   return () => {
    //     console.log("fetch characters")
    //   }
    }, [])


    const episodesState = useSelector(state=>state.episodes)

    function  RenderEspisodes(){
        try{
            // const characters = charactersState[0].data
            // const episodes = 
            // const characters = charactersState[0].data
            console.log(episodesState)

            // return episodes.map((element)=>{
            //     return(
            //         <p>
            //            Character: {element.id}
            //         </p>
            //     )
            // })
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <div>
        {RenderEspisodes()}
        Hola
    </div>
  )
}

export default ShowEpisodes