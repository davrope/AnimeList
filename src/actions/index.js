import axios from 'axios'
import {FETCH_ANIME_LIST, FETCH_ANIME, SET_FAVORITE, SET_LIKE, FETCH_CHARACTER_LIST, FETCH_MORE_ANIMES, FETCH_EPISODES} from "../actions/types";

const URL = "https://kitsu.io/api/edge/anime"

export const fetchAnimeList = (term)=> async dispatch=>{
   
    const res = await axios.get(URL+`?filter[text]=${term}`)
    
    // const res = await axios.get(URL +`?filter[text]=${term}`);
   
    dispatch({type: FETCH_ANIME_LIST, payload: res.data})
}

export const fetchFirstAnimeList = (myURL)=> async dispatch=>{
    const res = await axios.get(myURL)

    dispatch({type: FETCH_ANIME_LIST, payload: res.data})
}

export const fetchMoreAnimes = (myURL)=> async dispatch=>{
    const res = await axios.get(myURL)

    console.log("fetchMoreAnimedone")

    dispatch({type: FETCH_MORE_ANIMES, payload: res.data})
}

export const fetchAnime = id => async dispatch=>{
    const res = await axios.get(URL+`/${id}`)

    dispatch({type: FETCH_ANIME, payload: res.data})
}

export const fetchCharacter = id => async dispatch=>{
    const res = await axios.get(URL+`/${id}`+`/characters`)

    dispatch({type: FETCH_CHARACTER_LIST, payload: res.data})
}

export const fetchEpisodes = id => async dispatch=>{
    const res = await axios.get(URL+`/${id}`+`/episodes`)

    dispatch({type: FETCH_EPISODES, payload: res.data})
}