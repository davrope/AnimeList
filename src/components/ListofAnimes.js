import React from 'react'
import AnimeCard from './AnimeCard'


export default function ListOfGifs ({animes}) {
  return <div className='ListOfGifs'>
    {
      animes.map(({anime, id}) =>
        <AnimeCard
            anime = {anime}
          id={id}
        />
      )
    }
  </div>
}