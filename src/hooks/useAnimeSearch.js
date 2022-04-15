import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useAnimeSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [animes, setAnimes] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setAnimes([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'https://kitsu.io/api/edge/anime',
    //   params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setAnimes(prevAnimes => {
        return [...new Set([...prevAnimes, ...res.data.map(b => b.id)])]
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, animes, hasMore }
}