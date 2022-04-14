import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter } from '../actions';

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
            const characters = charactersState[0].data
            console.log(characters)
            // return(
            //     <div>
            //         {characters.id}
            //     </div>
            // )
            return characters.map((element)=>{
                return(
                    <p>
                       Character: {element.id}
                    </p>
                )
            })
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <div>
        {RenderCharacters()}
    </div>
  )
}

export default ShowCharacters