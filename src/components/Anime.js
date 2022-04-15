import React, { useEffect, lazy, Suspense, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
// import { useSelector } from 'react-redux';
import { fetchAnime, fetchCharacter, fetchEpisodes } from '../actions';
// import ShowCharacters from './ShowCharacters';
import styled from 'styled-components'

const ShowCharacters = lazy(()=>import('./ShowCharacters'))
const ShowEpisodes = lazy(()=>import('./ShowEpisodes'))


const Anime = () => {


  const dispatch = useDispatch();

  

  const regex = /(?<=anime\/).*/g

  const id = window.location.href.match(regex)
  
  useEffect(() => {


    dispatch(fetchAnime(id))
    dispatch(fetchCharacter(id))
    dispatch(fetchEpisodes(id))
    
  
    return () => {

    }
  }, [])

 const animeDetail = useSelector(state=>state.animes)
 const charactersState = useSelector(state=>state.characters)
 const episodesState = useSelector(state=>state.episodes)


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
            <p>{strCreated} {number}:  {element.attributes.titles.canonicalTitle || element.attributes.titles.en_us} </p>
          </div>
          
        )
      })


    }catch(error){
      console.log(error)
    }
  }


 function  RenderCharacters(){
  try{

      const characters = charactersState.data

      return characters.map((element)=>{
          return(
            <div key={element.id}>
              <p >
                 Character: {element.id}
              </p>
            </div>

          )
      })
  }catch(error){
      console.log(error)
  }
}

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
          <AnimeDetailContainer>
            <Col25>
              <img src= {poster} alt= 'anime poster'/>
              <p>corazones {favoritesCount} </p>
              <p>Rank: #{popularityRank} </p>
              <p>Aired on: {startDate} </p>
              <p>Type: {typeAnime.toUpperCase()} </p>
            </Col25>

            <Col75>
              <div><p>{synopsis} </p></div>
              

              <Suspense fallback = {<p>Loading...</p>}>
                <ShowCharacters/>
              </Suspense>
              {RenderEpisodesLab()}
            </Col75>

          
          
          
          


          {/* Need to make a function for ongoing or ended on Date */}

          

          </AnimeDetailContainer>
          
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
      {/* {RenderCharacters()} */}
      {/* {RenderEpisodesArray()} */}
      {/* <Col75>
        {RenderCharacters()}
        {RenderEpisodesLab()}
      </Col75> */}

      


      {/* <Suspense fallback = {<p>Loading...</p>}>
        <ShowCharacters/>
      </Suspense> */}

    </div>
  )
}

export default Anime

const AnimeDetailContainer = styled.div`

  display: flex;
  flex-direction: row;


  @media screen and (max-width: 600px) {

    flex-direction: column;

  }
`

const Col25 = styled.div`
  /* float: left; */
/*  */
  width: 300px;
  margin-top: 5px;
  display: block;
  text-align: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 0%;
    /* flex-direction: column; */
  }
`

const Col75 = styled.div`
  display: block;
  float: left;
  width: 70%;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 0%;
    /* flex-direction: column; */
  }
`