

const fromApiResponseToAnimes = apiResponse => {
    const {data = []} = apiResponse
    if (Array.isArray(data)) {
      const animes = data.map(element => {
        const {id} = element

        return {element, id}
      })
      return animes
    }
    return []
  }

  export default function getAnimes({
      limit = 10,
      keyword = "",
      page = 0,
  }= {}){
      const apiURL = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=${page}`
      
      return fetch(apiURL)
        .then((res)=>res.json())
        .then(fromApiResponseToAnimes)
  }
  