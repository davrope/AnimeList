import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchAnimeList, fetchFirstAnimeList } from '../actions';
import styled from 'styled-components'



const SearchBarLab = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
        const search = async ()=>{
            const data = dispatch(fetchAnimeList(term))
            setResults(data)
        } 

        const firstRender = async ()=>{
            const data = dispatch(fetchFirstAnimeList())
            setResults(data)
        }

        if(term && !results.length){
            search();
        }else if(!term){
            firstRender();
        }else{
            const timeoutId = setTimeout(()=>{
                if(term){
                    search()
                }
            }, 500);
            return () => {
              clearTimeout(timeoutId)
            }
        }


    }, [term])
    
    return (
        
 
        <SearchContainer className='field'>    
            <InputSearch
                placeholder='Search anime'
                value = {term}
                onChange = {e=>setTerm(e.target.value)}
                className= "input"
            />

        </SearchContainer>

  )
}

export default SearchBarLab



const SearchContainer = styled.div`

    text-align: center;
    font-size: 1.6rem;
    position: absolute;
    display: flex;

    margin: auto;
    width: 400px;
    height: 50px;
    border-radius: 15px;
    border: 1px solid #dcdcdc;
    padding: 0px 10px 0px 10px;


  @media screen and (max-width: 943px) {
      position: relative;
      width: 350px

  }

  @media screen and (max-width: 390px) {
      position: relative;
      width: 320px

  }



`

const InputSearch = styled.input`

    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 15px;
    height: 45px;
    outline: none;
    border: none;
    width: 95%;


`
