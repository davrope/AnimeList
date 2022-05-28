import React from 'react';
import {Link as LinkRouter} from 'react-router-dom';
import styled from 'styled-components'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';


// import { useNearScreen } from '../hooks/useNearScreen';

const AnimeCard = ({anime, id}) => {

  // Likes and favs
  const key = `like-${id}`
  const [liked, setLiked] = useLocalStorage(key, false)
  const Icon = liked ? MdFavorite : MdFavoriteBorder

  const starKey = `star-${id}`
  const [favorite, setFavorite] = useLocalStorage(starKey, false)
  const IconStar = favorite ? AiFillStar : AiOutlineStar

  // *************************


  return (
    <CardContainer className='hoverwrap'>
      <img src = {anime.attributes.posterImage.small} alt = "anime poster" style={{objectFit:'cover'}}/>
      <div className='hovercap'>
        <LinkRouter className='linkTitle' to = {`/anime/${id}`}>{anime.attributes.titles.en_jp}</LinkRouter>
        <br/>
       <IconsContainer>
         <div style={{display:'flex', marginLeft:'auto', marginRight:'auto'}}>
           <IconStar size = '32px' onClick={()=>setFavorite(!favorite)} style={{color:'yellow'}} />{anime.attributes.averageRating}
          <Icon size='32px' onClick={()=>setLiked(!liked)} style={{color:'red'}}/> {anime.attributes.favoritesCount}

         </div>

       </IconsContainer>
 
        

      </div>
    </CardContainer>
  )
}

export default AnimeCard;

const CardContainer = styled.div`
  position: relative;
  display: grid;
  /* background-color: green; */
  width: 284px;
  /* width: fit-content; */
  /* height: fit-content; */
  /* max-width: 300px; */

`
const IconsContainer = styled.div`
  position: relative;
  display: flex;
  height: 50%;
  width: 100%;
  /* margin-top: 15px; */
  align-items: center;
  align-content: center
  /* margin 15px auto auto auto */

  
  /* background-color: green; */
  
  /* width: fit-content; */
  /* height: fit-content; */
  /* max-width: 300px; */

`


// const StarFilled = styled.AiFillStar`
//   background-color: yellow;
//   /* background-color: green; */
//   /* width: fit-content; */
//   /* height: fit-content; */
//   /* max-width: 300px; */

// `
