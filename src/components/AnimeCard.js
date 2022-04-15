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

  // useNearScreen reducer for infinite scroll:




  






  return (
    <CardContainer className='hoverwrap'>
      <img src = {anime.attributes.posterImage.small} alt = "anime poster" style={{objectFit:'cover'}}/>
      <div className='hovercap'>
        <LinkRouter className='linkTitle' to = {`/anime/${id}`}>{anime.attributes.titles.en_jp}</LinkRouter>
        <p>Favorites: {anime.attributes.favoritesCount} </p>

        <button onClick={()=>setLiked(!liked)}>
          <Icon size='32px'/> {anime.attributes.favoritesCount} likes!
        </button>

        <button onClick={()=>setFavorite(!favorite)}>
          <IconStar size = '32px'>{anime.attributes.favoritesCount}</IconStar>
        </button>

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

