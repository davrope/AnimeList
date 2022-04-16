import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFirstAnimeList, fetchMoreAnimes } from '../actions';
import styled from 'styled-components'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import {Link as LinkRouter} from 'react-router-dom';

import AnimeCard from './AnimeCard';
// import SearchBar from './SearchBar';
import SearchBarLab from './SearchBarLab';

import useNearScreen from '../hooks/useNearScreen';
import debounce from 'lodash.debounce'
// import debounce from 'just-debounce-it'



const ShowCardsLab = () => {
    // INFINITE SCROLLING

    const [starFilter, setStarFilter] = useState(false)
    const [likeFilter, setLikeFilter] = useState(false)

    const IconLike = likeFilter ? MdFavorite : MdFavoriteBorder
    const IconStar = starFilter ? AiFillStar : AiOutlineStar

    const myStorage = window.localStorage

    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(10)

    const externalRef = useRef()


    // NEW APPROACH FOR INFINITE SCROLLING

    // let pagesCounter = 0;
    console.log("Pages outside: " + page)
    let NextURL= `https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=${page}`
    window.onscroll = debounce(()=>{
      if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        dispatch(fetchMoreAnimes(NextURL))
        setPage(page+10)
        console.log("pages inside: "+page)
      }
    }, 100)


    // ********************





    const dispatch = useDispatch();

    useEffect(()=>{
        const myURL = "https://kitsu.io/api/edge/anime"
        
        dispatch(fetchFirstAnimeList(myURL))
        setTotalAnimes(animes)
        
    }, [])

    const obj = useSelector((state)=>state.animes)
    
    
    let animes = useSelector((state)=>state.animes).data

    const [totalAnimes, setTotalAnimes] = useState([animes])

    


    // useEffect(()=>{
    //   // console.log(page)

    //   let NextURL= `https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=${page}`
    //   // dispatch(fetchMoreAnimes(NextURL))
    //     // tryingConsole()
    // }, [page, debounceHandleNextPage, isNearScreen])


    const RenderList =()=>{
      if(!starFilter&& !likeFilter){
        try{

            let iterableAnimes = animes
            
            return iterableAnimes.map((element, index)=>{
                  return(
                        <AnimeCard anime={element} id={element.id} key={element.id} />
                    )
                // if(iterableAnimes.length === index+1){
                //     return(
                //         <AnimeCard anime={element} id={element.id} key={element.id} />
                //     )
                // }else{
                //     return(
                //         <AnimeCard anime={element}  id={element.id} key={element.id} />
                //     )
                // }

            })
        }catch(error){
            console.log(error)
        }
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




    function myGeneralFilterHandler(){
      if(starFilter){
        return StarFilterHandler()
      }else if(likeFilter){
        return LikedFilterHandler()
      }else if(starFilter && likeFilter){
        try{

          let iterableAnimes = totalAnimes || animes

          return iterableAnimes.map((element, index)=>{
            if(myStorage[`star-${element.id}`] && myStorage[`like-${element.id}`]){
                return(
                    <AnimeCard anime={element} id={element.id} key={element.id} />
                )
            }else{
                return
            }

        })

        }catch(error){
          console.log(error)
        }
      }else{
        return
      }
    }
    function StarFilterHandler(){
      if(starFilter){
        try{

          let iterableAnimes = totalAnimes || animes

          return iterableAnimes.map((element, index)=>{
            if(myStorage[`star-${element.id}`]){
                return(
                    <AnimeCard anime={element} id={element.id} key={element.id} />
                )
            }else{
                return
            }

        })

        }catch(error){
          console.log(error)}
      }else{
        return
          // return(
          //   RenderList()
          // )
        }
    }

    function LikedFilterHandler(){
      if(likeFilter){
        try{

          let iterableAnimes = totalAnimes || animes

          return iterableAnimes.map((element, index)=>{
            if(myStorage[`like-${element.id}`]){
                return(
                    <AnimeCard anime={element} id={element.id} key={element.id} />
                )
            }else{
                return
            }

        })

        }catch(error){
          console.log(error)
        }
      }else{
        return
        }
    }



    

  return (
    <div>
        <h2>Anime List</h2>
        {renderCount()}
        <SearchBarLab/>
        <div style={{textAlign:'center', marginTop:"15px", marginBottom:"15px", fontSize:'1.5rem'}}>
          Filter<br/>
          <IconStar size="32px"  onClick= {()=>setStarFilter(!starFilter)}/>
          <IconLike size="32px" onClick= {()=>setLikeFilter(!likeFilter)}/>
        </div>
        {/* <SearchBar/> */}
        <AnimeGrid>
          {myGeneralFilterHandler()}
            {/* {StarFilterHandler()}
            {LikedFilterHandler()} */}
            {RenderList()}
        </AnimeGrid>
        
        {/* <AnimeGrid>
            {RenderMore()}
        </AnimeGrid> */}
        <div id ="visor" ref={externalRef} ></div>
    </div>

  )
}

export default ShowCardsLab

const AnimeGrid = styled.div`
    display: grid;
    gap: 40px;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 284px);
    margin-left: auto;
    margin-right: auto;
    max-width: 1600px;

`