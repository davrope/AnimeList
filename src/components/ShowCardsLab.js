import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFirstAnimeList } from '../actions';
import styled from 'styled-components'
import {Link as LinkRouter} from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';

import AnimeCard from './AnimeCard';
import SearchBar from './SearchBar';



const ShowCardsLab = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const initialURL = "https://kitsu.io/api/edge/anime"
        dispatch(fetchFirstAnimeList(initialURL))
    }, [])

    const animes = useSelector((state)=>state.animes).data
    const obj = useSelector((state)=>state.animes)


    // INFINITE SCROLLING


  const [episodeList, setEpisodeList] = useState(useSelector(state=>state.animes).data);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

    
  const loadMoreAnimes = async () => {
    try {
        
      if (animes.length<15) {
          const nextURL = obj.links.next
        setLoading(true);
        const { data } =  dispatch(fetchFirstAnimeList(nextURL));
        const modifiedResults = [...episodeList.results, ...data.results];

        setEpisodeList(
          (prevState) =>
            ({ ...prevState, info: data.info, results: modifiedResults }),
        );
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };


    
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
        <h2>Anime List LAB</h2>
        <SearchBar/>
        {renderCount()}
        <InfiniteScroll
            data-testid = "animes-infinite-scroll"
            pageStart={0}
            loadMore={loadMoreAnimes}
            hasMore={true}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            <AnimeGrid>
                {RenderList()}
            </AnimeGrid>
        </InfiniteScroll>
       

    </div>

  )
}

export default ShowCardsLab

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