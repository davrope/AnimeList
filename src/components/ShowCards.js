import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFirstAnimeList } from '../actions';
import styled from 'styled-components'
import {Link as LinkRouter} from 'react-router-dom';

import AnimeCard from './AnimeCard';
import SearchBar from './SearchBar';



const ShowCards = () => {
    // INFINITE SCROLLING

    
    // const observer = useRef();
    // const lastAnimeElementRef = useCallback(node=>{
    //     // if (loading) return
    //     if (observer.current) observer.current.disconnect();
    //     observer.current = new IntersectionObserver(entries =>{
    //         if(entries[0].isIntersecting){
    //             setPageNumber(prevPageNumber=>prevPageNumber+1)

    //         }
    //     })
    //     if(node) observer.current.observe(node)
    // }, [])



    // ********************





    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchFirstAnimeList())
    }, [])

    const animes = useSelector((state)=>state.animes).data
    const obj = useSelector((state)=>state.animes)




    const RenderList =()=>{
        try{
            // console.log(animes)
            return animes.map((element, index)=>{
                if(animes.length === index+1){
                    return(
                        <AnimeCard anime={element} id={element.id} key={element.id} />
                    )
                }else{
                    return(
                        <AnimeCard anime={element}  id={element.id} key={element.id} />
                    )
                }

            })
        }catch(error){
            console.log(error)
        }
    } 

    const renderCount = ()=>{
        try{
            return(
                <p>{obj.meta.count} Results</p>
            )
        }catch(error){
            console.log(error)
        }
    }


    

  return (
    <div>
        <h2>Anime List</h2>
        ´{renderCount()}
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