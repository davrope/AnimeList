import React from 'react'
import styled from 'styled-components'

const AnimeCard = ({anime}) => {
  return (
    <CardContainer className='hoverwrap'>
      <img src = {anime.posterImage.small} alt = "anime poster" style={{objectFit:'cover'}}/>
      <div className='hovercap'>
        <h2>{anime.titles.en_jp}</h2>
        <p>Favorites: {anime.favoritesCount} </p>
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