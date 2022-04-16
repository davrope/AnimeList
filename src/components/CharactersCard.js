import React from 'react';
import styled from 'styled-components'

const CharactersCard = ({character, img}) => {
  return (

        <CardContainer className='hoverwrap'>
          <img src = {img} alt = {`${character} image`} style={{objectFit:'cover'}}/>
          <div className='hovercapCharacter' style={{marginTop:'auto'}}>
            <div className='linkTitle'>{character}</div>
          </div>
        </CardContainer>
      
  )
}

export default CharactersCard

const CardContainer = styled.div`
  position: relative;
  display: grid;
  /* background-color: green; */
  width: 225px;
  /* width: fit-content; */
  /* height: fit-content; */
  /* max-width: 300px; */

// `
// const IconsContainer = styled.div`
//   position: relative;
//   display: flex;
//   height: 50%;
//   width: 100%;
//   /* margin-top: 15px; */
//   align-items: center;
//   align-content: center
//   `