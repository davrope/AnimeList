import axios from 'axios'
import {FETCH_ANIME_LIST, FETCH_ANIME, SET_FAVORITE, SET_LIKE} from "../actions/types";

const URL = "https://kitsu.io/api/edge/anime"

export const fetchAnimeList = (term)=> async dispatch=>{
   
    const res = await axios.get(URL+`?filter[text]=${term}`)
    
    // const res = await axios.get(URL +`?filter[text]=${term}`);
   
    dispatch({type: FETCH_ANIME_LIST, payload: res.data})
}

export const fetchFirstAnimeList = ()=> async dispatch=>{
    const res = await axios.get(URL)

    dispatch({type: FETCH_ANIME_LIST, payload: res.data})
}