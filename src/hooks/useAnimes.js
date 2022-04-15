import {useContext, useEffect, useState} from 'react'
import getAnimes from './getAnimes'
import AnimesContext from '../context/AnimesContext'

const INITIAL_PAGE = 0

export function useAnimes ({ keyword, rating } = { keyword: null }) {
  const [loading, setLoading] = useState(false)
  const [loadingNextPage, setLoadingNextPage] = useState(false)

  const [page, setPage] = useState(INITIAL_PAGE)
  const {animes, setAnimes} = useContext(AnimesContext)

  // recuperamos la keyword del localStorage
  const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

  useEffect(function () {
    setLoading(true)

    getAnimes({ keyword: keywordToUse, rating })
      .then(animes => {
        setAnimes(animes)
        setLoading(false)
        // guardamos la keyword en el localStorage
        localStorage.setItem('lastKeyword', keyword)
      })
  }, [keyword, keywordToUse, rating, setAnimes])

  useEffect(function () {
    if (page === INITIAL_PAGE) return

    setLoadingNextPage(true)

    getAnimes({ keyword: keywordToUse, page, rating })
      .then(nextAnimes => {
        setAnimes(prevAnimes => prevAnimes.concat(nextAnimes))
        setLoadingNextPage(false)
      })
  }, [keywordToUse, page, rating, setAnimes])

  return {loading, loadingNextPage, animes, setPage}
}