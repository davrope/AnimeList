import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchAnimeList, fetchFirstAnimeList } from '../actions';
import styled from 'styled-components'


const SearchBar = () => {
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
    // <WrapContainer>
        <SearchContainer className='field'>
            {/* <label>Q</label> */}
            {/* <SearchIcon/> */}
            
            <InputSearch
                placeholder='Search anime'
                value = {term}
                onChange = {e=>setTerm(e.target.value)}
                className= "input"
            />

        </SearchContainer>
    // </WrapContainer>
  )
}

export default SearchBar

// const WrapContainer = styled.div`
//     width: 30%;
//     position: relative;
//     left:50%;
//     transform: translate(-50%, 50%);
//     margin-bottom: 30px;
// `

const SearchContainer = styled.div`

    text-align: center;
    font-size: 1.6rem;
    position: relative;
    display: flex;

    margin: 0 auto 20px auto;
    width: 575px;
    height: 50px;
    border-radius: 15px;
    border: 1px solid #dcdcdc;
    padding: 0px 10px 0px 10px;



`

const InputSearch = styled.input`
    /* margin-left: auto;
    margin-right: auto; */
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 15px;

    /* width: 100%; */
    /* border: 3px solid #00b4cc; */
    /* border-left: none; */
    
    height: 45px;
    /* border-radius: 5px 0 0 5px; */
    outline: none;
    /* color: #9dbfaf; */

    border: none;
    width: 95%;
    /* font-size: 16px; */

`
/* const SearchIcon = styled.div`
    width: 40px;
    height: 36px;
    border: 1px solid #00B4CC;
    background: #00B4CC;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
` */