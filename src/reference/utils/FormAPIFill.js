import React, {useState} from 'react'
import SearchBar from '../../components/SearchBar'
// import Suggestions from './Suggestions';
import { useSelector } from 'react-redux';

const FormAPIFill = () => {

    let animes = useSelector((state)=>state.animes).data  

    

    const Suggestions = (props) => {
    
        const doSomething=(anime)=>{
            console.log("Clicked ", anime)
        }
    
      const options = props.results.map(anime => (
        <li key={anime.attributes.id} onClick = {()=>doSomething(anime)}>
          {anime.attributes.titles.en_jp}
        </li>
      ))
      return <ul>{options}</ul>
    }
    
    
    


  return (
    <div>
        <h2>Anime form filling from API</h2>
        <form>
            <label>Title</label>
            <SearchBar/>
            <Suggestions results = {animes ? animes: []} />
            <input type='text' name= "title"></input>
            <label>synopsis</label>
            <input type='text' name= 'synopsis'/>
            <label>Favorites count</label>
            <input type='number' step="any" name='favoritesCount'></input>
        </form>
    </div>
  )
}

export default FormAPIFill