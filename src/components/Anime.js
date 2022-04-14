import React, { useEffect, lazy, Suspense }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { fetchAnime, fetchCharacter } from '../actions';
// import ShowCharacters from './ShowCharacters';

const ShowCharacters = lazy(()=>import('./ShowCharacters'))


const Anime = () => {
  const dispatch = useDispatch();

  const regex = /(?<=anime\/).*/g

  const id = window.location.href.match(regex)
  
  useEffect(() => {


    dispatch(fetchAnime(id))
    dispatch(fetchCharacter(id))
    
  
    return () => {
      // console.log("first render")
      // const animeDetail = useSelector(state=>state.animes)
    }
  }, [])

 const animeDetail = useSelector(state=>state.animes)
 const characters = useSelector(state=>state.characters)

//  const title = animeDetail.data.attributes.titles.en_jp
  

  function renderElements(){
    try{
      const title = animeDetail.data.attributes.titles.en_jp
      const {synopsis} = animeDetail.data.attributes
      const poster = animeDetail.data.attributes.posterImage.small
      const {popularityRank} = animeDetail.data.attributes
      const {favoritesCount} = animeDetail.data.attributes
      const {startDate} = animeDetail.data.attributes
      const typeAnime = animeDetail.data.attributes.subtype

      // console.log(characters)
      return(
        <div>

          <h2>{title}</h2>

          <p>{synopsis} </p>
          <img src= {poster} alt= 'anime poster'/>
          <p>corazones {favoritesCount} </p>
          <p>Rank: #{popularityRank} </p>
          <p>Aired on: {startDate} </p>

          {/* Need to make a function for ongoing or ended on Date */}

          <p>Type: {typeAnime.toUpperCase()} </p>
          
        </div>
      )
    }catch(error){
      console.log(error)
    }
  }


  return (
    <div>
      

      {renderElements()}
      {/* <ShowCharacters/> */}

      <Suspense fallback = {<p>Loading...</p>}>
        <ShowCharacters/>
      </Suspense>

    </div>
  )
}

export default Anime