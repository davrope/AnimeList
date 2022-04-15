import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFirstAnimeList, fetchMoreAnimes } from '../actions';
import styled from 'styled-components'
import {Link as LinkRouter} from 'react-router-dom';

import AnimeCard from './AnimeCard';
import SearchBar from './SearchBar';

import useNearScreen from '../hooks/useNearScreen';
import debounce from 'just-debounce-it'



const ShowCards = () => {
    // INFINITE SCROLLING

    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)

    const externalRef = useRef()
    const {isNearScreen} = useNearScreen({
      externalRef: loading ? null: externalRef,
      once: false
    })

    // useEffect(()=>{
    //     let NextURL= `https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=${page}`
    //     // dispatch(fetchMoreAnimes(NextURL))
    //     console.log(NextURL)
    // }, [page])

    const testfunction = ()=>{
        setPage(page+10)
        let NextURL= `https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=${page}`
        // dispatch(fetchMoreAnimes(NextURL))
        
        console.log(NextURL)
    }
  
    const debounceHandleNextPage = useCallback(debounce(
    //   ()=>setPage(prevPage=>prevPage+1), 200
    // ()=>setPage(page+10), 200
    ()=>testfunction(), 200
    ), [setPage])
  
    useEffect(() => {
      if(isNearScreen) debounceHandleNextPage()
    }, [ debounceHandleNextPage, isNearScreen])
    // }, [debounceHandleNextPage, isNearScreen])

    
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
        

        // dispatch(fetchFirstAnimeList(NextURL))

        const myURL = "https://kitsu.io/api/edge/anime"
        
        dispatch(fetchFirstAnimeList(myURL))
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
        {renderCount()}
        <SearchBar/>
        <AnimeGrid>
            {RenderList()}
        </AnimeGrid>
        <div id ="visor" ref={externalRef} ></div>
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