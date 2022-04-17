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
import {Link as LinkRouter} from 'react-router-dom';
import {IoChevronBackOutline} from 'react-icons/io5';
import {AiOutlineCheckCircle,AiFillCheckCircle } from 'react-icons/ai'



const ShowCharacters = lazy(()=>import('./ShowCharacters'))
const ShowEpisodes = lazy(()=>import('./ShowEpisodes'))



const Anime = () => {

  const [loading, setLoading] = useState(true)


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

 useEffect(()=>{
  setTimeout(() => {
    setLoading(false)
  },500);
},[charactersState])





const key = `like-${id}`
const [liked, setLiked] = useLocalStorage(key, false)
const Icon = liked ? MdFavorite : MdFavoriteBorder

const starKey = `star-${id}`
const [favorite, setFavorite] = useLocalStorage(starKey, false)
const IconStar = favorite ? AiFillStar : AiOutlineStar

function RenderCharacters(){
  if (loading){
    return (<p>Loading...</p>)
  }else{
    return(
      <Suspense fallback = {<p>Loading...</p>}>

        <AnimeSubtitle>
          Characters
        </AnimeSubtitle>
        <CharactersGrid>

          <ShowCharacters id={id} />
        </CharactersGrid>


    </Suspense>
    )
  }
}
  

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
          
          <LinkRouter to="/" style={{fontSize:'24px' ,textDecoration:'none', color:'blue', alignItems:'center'}}> 
          <IoChevronBackOutline size="16px" style={{color:'blue'}}/>Back
          </LinkRouter>
          <AnimeDetailContainer>
            <Col25>
              <img src= {poster} alt= 'anime poster'/>

              <AnimeIconContainer >
                <IconStar size = '32px' onClick={()=>setFavorite(!favorite)} style={{color:'yellow', paddingTop:'6px'}} />
                <p>{favoritesCount} from {userCount} users</p>
                
              </AnimeIconContainer>
              <AnimeIconContainer>
                 <Icon size='32px' onClick= {()=>setLiked(!liked)}style={{color:'red', paddingTop:'6px'}}/>
                <p>{favoritesCount} </p>
              </AnimeIconContainer>

              
              
              <p>Rank: #{popularityRank} </p>
              <p>Rated {ageRating}: {ageRatingGuide} </p>
              <p>Aired on: {startDate} </p>
              <p>{emission()} </p>
              <p>Type: {typeAnime.toUpperCase()} </p>
            </Col25>

            <Col75>
              <div style={{textAlign:'justify'}}><p>{synopsis} </p></div>
              
              {RenderCharacters()}
              {/* <Suspense fallback = {<p>Loading...</p>}>

                <AnimeSubtitle>
                  Characters
                </AnimeSubtitle>
                <CharactersGrid>

                  <ShowCharacters/>
                </CharactersGrid>


              </Suspense> */}
              <AnimeSubtitle>
                Episodes
              </AnimeSubtitle>
              {/* <div style={{textAlign:'left'}}>
                  <b>Episodes: </b>
                </div> */}

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

  @media screen and (max-width: 750px) {
  /* @media screen and (max-width: 1008px) { */

    flex-direction: column;

  }
`

const Col25 = styled.div`

  width: 300px;
  margin-top: 20px;
  display: block;
  text-align: center;
  background-color: #0f0f0f;
  color:white;
  

  @media screen and (max-width: 750px) {
    width: 100%;
    margin-top: 0%;

  }
`

const Col75 = styled.div`
  display: block;
  float: left;
  width: 80%;
  /* width: ${props => props.takeViewportWidth && `width: calc(100vh - 300px);`}; */
  /* width: calc(100%-300px); */
  /* width: 70%; */
  /* max-width: 1200px; */
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;

  @media screen and (max-width: 1500px) {
    width: 70%;
    margin-top: 0%;
    
  }
  @media screen and (max-width: 1013px) {
    width: 60%;
    margin-top: 0%;
    
  }

  @media screen and (max-width: 750px) {
    width: 95%;
    margin-top: 0%;
  }
`

const CharactersGrid = styled.div`
    display: grid;
    gap: 10px;
    /* justify-content: center; */
    grid-template-columns: repeat(auto-fit, 225px);
    /* margin-left: auto;
    margin-right: auto; */
    max-width: 1600px;
    @media screen and (max-width: 750px) {
      justify-content: center;
  }

`
const AnimeSubtitle = styled.div`
  text-align: left;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 15px;

`
const AnimeIconContainer = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: center;

`

