import React, {useState} from 'react'
import SearchBar from '../../components/SearchBar'
// import Suggestions from './Suggestions';
import { useSelector } from 'react-redux';

const FormAPIFill = () => {

    let animes = useSelector((state)=>state.animes).data  

    const [formValues, setFormValues] = useState({
        title:'',
        synopsis:'',
        favoritesCount:null

      })

      const handleInputChange = (event)=>{
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })}

    

    const Suggestions = (props) => {
    
        const doSomething=(anime)=>{
            // console.log("Clicked ", anime)
            setFormValues({
                ...formValues,
                title:anime.attributes.titles.en_jp,
                synopsis: anime.attributes.synopsis,
                favoritesCount: anime.attributes.favoritesCount
            })
        }

    const options = props.results.map(anime => (
    <li key={anime.attributes.id} onClick = {()=>doSomething(anime)}>
        {anime.attributes.titles.en_jp}
    </li>
    ))
    return <ul>{options}</ul>
    }
    
    const handleSubmit = (event)=>{
        event.preventDefault()
        
        console.log(formValues)
        // dispatch(submitFoodAPI(formValues))
        // setSubmit(!submit)
    
        
        
      }
    
    


  return (
    <div>
        <h2>Anime form filling from API</h2>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <SearchBar/>
            <Suggestions results = {animes ? animes: []} />
            <input type='text' name= "title" onChange={handleInputChange}></input>
            <label>synopsis</label>
            <input type='text' name= 'synopsis' onChange={handleInputChange}/>
            <label>Favorites count</label>
            <input type='number' step="any" name='favoritesCount' onChange={handleInputChange}></input>
            <button class="ui primary button" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default FormAPIFill