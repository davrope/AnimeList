import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter } from '../actions';
import CharactersCard from './CharactersCard';

const  ShowCharacters = () => {

    const dispatch = useDispatch();

    const regex = /(?<=anime\/).*/g
  
    const id = window.location.href.match(regex)


    useEffect(() => {
        dispatch(fetchCharacter(id))
    
    //   return () => {
    //     console.log("fetch characters")
    //   }
    }, [])


    const charactersState = useSelector(state=>state.characters)

    function  RenderCharacters(){
        try{
            // const characters = charactersState[0].data
            const characters = charactersState[0].included || charactersState[0].included


            return characters.map((element)=>{
                const {attributes} = element

                const {name} = attributes
                const characterImage = attributes.image.original
                return(
                    <CharactersCard character={name} img={characterImage}/>
                    // <div>
                    //     <img src={characterImage}/>
                    //     {name}
                    // </div>
                )
            })
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <>
        {RenderCharacters()}
    </>
  )
}

export default ShowCharacters

