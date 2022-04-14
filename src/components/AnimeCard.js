import React from 'react';
import {Link as LinkRouter} from 'react-router-dom';
import styled from 'styled-components'

const AnimeCard = ({anime, id}) => {
  return (
    <CardContainer className='hoverwrap'>
      <img src = {anime.attributes.posterImage.small} alt = "anime poster" style={{objectFit:'cover'}}/>
      <div className='hovercap'>
        <LinkRouter className='linkTitle' to = {`/anime/${id}`}>{anime.attributes.titles.en_jp}</LinkRouter>
        <p>Favorites: {anime.attributes.favoritesCount} </p>
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

