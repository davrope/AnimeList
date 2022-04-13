import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFirstAnimeList } from '../actions';
import styled from 'styled-components'

import AnimeCard from './AnimeCard';
import SearchBar from './SearchBar';



const ShowCards = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchFirstAnimeList())
    }, [])

    const animes = useSelector((state)=>state.animes).data


    const RenderList =()=>{
        try{
            console.log(animes)
            return animes.map(element=>{
                return(
                    <AnimeCard anime={element.attributes} key={element.id} />
                )
            })
        }catch(error){
            console.log(error)
        }
    } 


    

  return (
    <div>
        <h2>Anime List</h2>
        <SearchBar/>
        <AnimeGrid>
            {RenderList()}
        </AnimeGrid>
    </div>

  )
}

export default ShowCards

const AnimeGrid = styled.div`
    display: grid;
    gap: 40px;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 284px);
    /* padding: 15px 284px 15px 284px; */
    margin-left: auto;
    margin-right: auto;
    max-width: 1600px;

    /* @media screen and (max-width:960px) {
        padding: 15px 284px 15px 284px;      
    } */

`