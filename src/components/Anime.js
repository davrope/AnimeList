import React, { useEffect, lazy, Suspense, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../hooks/useLocalStorage';
import axios from 'axios'
// import { useSelector } from 'react-redux';
import { fetchAnime, fetchCharacter, fetchEpisodes } from '../actions';
// import ShowCharacters from './ShowCharacters';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import styled from 'styled-components'
import {Link as LinkRouter} from 'react-router-dom'


const ShowCharacters = lazy(()=>import('./ShowCharacters'))
const ShowEpisodes = lazy(()=>import('./ShowEpisodes'))



const Anime = () => {

  // const animeContext = React.useContext()


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




const key = `like-${id}`
const [liked, setLiked] = useLocalStorage(key, false)
const Icon = liked ? MdFavorite : MdFavoriteBorder

const starKey = `star-${id}`
const [favorite, setFavorite] = useLocalStorage(starKey, false)
const IconStar = favorite ? AiFillStar : AiOutlineStar
  

  function renderElements(){


    try{
      const {attributes} = animeDetail.data

      const title = attributes.titles.en_jp
      const {synopsis} =  attributes
      const poster = attributes.posterImage.small
      const {popularityRank} = attributes
      const {favoritesCount} = attributes
      const {startDate} = attributes
      const typeAnime = attributes.subtype
      const {ageRating} = attributes
      const {userCount} = attributes
      const {endDate} = attributes
      const {ageRatingGuide} = attributes


      const emission = ()=>{
        if(endDate){
          return (`Ended on: ${endDate}`)
        }else{
          return("Ongoing")
        }
      }


      return(
        <div>

          <h2>{title}</h2>
          <LinkRouter to="/"> Back</LinkRouter>
          <AnimeDetailContainer>
            <Col25>
              <img src= {poster} alt= 'anime poster'/>

              <div style={{display:'block', marginLeft:'auto', marginRight:'auto', alignText:'center'}}>
                <IconStar size = '32px' onClick={()=>setFavorite(!favorite)} style={{color:'yellow'}} />{favoritesCount} from {userCount} users
                
                
              </div>
              <Icon size='32px' onClick= {()=>setLiked(!liked)}style={{color:'red'}}/>{favoritesCount} 
              <p>Rank: #{popularityRank} </p>
              <p>Rated {ageRating}: {ageRatingGuide} </p>
              <p>Aired on: {startDate} </p>
              <p>{emission()} </p>
              <p>Type: {typeAnime.toUpperCase()} </p>
            </Col25>

            <Col75>
              <div><p>{synopsis} </p></div>
              

              <Suspense fallback = {<p>Loading...</p>}>
                <ShowCharacters/>
              </Suspense>

              <Suspense fallback ={<p>Loading</p>}>
                <ShowEpisodes/>
              </Suspense>

            </Col75>
          

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

  width: 300px;
  margin-top: 5px;
  display: block;
  text-align: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 0%;

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
    
  }
`