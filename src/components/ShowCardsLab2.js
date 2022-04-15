// import React, {useCallback, useRef, useEffect} from 'react'
// // import ListofAnimes from 'components/ListOfGifs'

// import {useAnimes} from '../hooks/useAnimes'
// import useNearScreen from '../hooks/useNearScreen'

// import debounce from 'just-debounce-it'

// export default function ShowCardsLab2({})

import React, {useCallback, useRef, useEffect} from 'react'

import ListofAnimes from './ListofAnimes'


import useNearScreen from '../hooks/useNearScreen'

import debounce from 'just-debounce-it'
import { useAnimes } from '../hooks/useAnimes'

export default function SearchResults ({ params }) {
//   const { keyword, rating } = params
  const { loading, animes, setPage } = useAnimes()
  
  const externalRef = useRef()
  const {isNearScreen} = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  })

//   const title = animes ? `${animes.length} resultados de keyword` : ''

  const debounceHandleNextPage = useCallback(debounce(
    () => setPage(prevPage => prevPage + 10), 200
  ), [setPage])

  useEffect(function () {
    if (isNearScreen) debounceHandleNextPage()
  }, [debounceHandleNextPage, isNearScreen])

  return <>
    {loading
      ? <p>Loading...</p>
      : <>
        {/* <header className="o-header">
          <SearchForm initialKeyword={keyword} initialRating={rating} />
        </header> */}
        <div className="App-wrapper">
          {/* <h3 className="App-title">
            {decodeURI(keyword)}
          </h3> */}
          <ListofAnimes animes={animes} />
          <div id="visor" ref={externalRef}></div>
        </div>
      </>
    }
  </>
}