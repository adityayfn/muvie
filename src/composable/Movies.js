import { ref } from "vue"
import axios from "axios"
const accessToken = import.meta.env.VITE_ACCESS_TOKEN
const baseUrl = "https://api.themoviedb.org/3/"

const getMovies = () => {
  const getPopular = async (page) => {
    try {
      const res = await axios.get(
        `${baseUrl}movie/popular?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  const getTrendingDay = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}trending/movie/day?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return res.data.results
    } catch (error) {
      console.log("Error", error)
    }
  }

  const getTrendingWeek = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}trending/movie/week?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return res.data.results
    } catch (error) {
      console.log("Error", error)
    }
  }

  const getTopRated = async (page) => {
    try {
      const res = await axios.get(
        `${baseUrl}movie/top_rated?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  const getDiscover = async (page) => {
    try {
      const res = await axios.get(
        `${baseUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_count.desc`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  const getGenre = async () => {
    try {
      const res = await axios.get(`${baseUrl}genre/movie/list?language=en`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const getSearch = async (query, page) => {
    try {
      const res = await axios.get(
        `${baseUrl}search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }

  const getDetails = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}movie/${id}?language=en-US`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  const getImagesMovie = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}movie/${id}/images`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  const getCharacter = async (id) => {
    try {
      const res = await axios.get(
        `${baseUrl}movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  const getReviews = async (id) => {
    try {
      const res = await axios.get(
        `${baseUrl}movie/${id}/reviews?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  const getVideos = async (id) => {
    try {
      const res = await axios.get(
        `${baseUrl}movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res.data
    } catch (error) {
      console.log("Error", error)
    }
  }

  return {
    getPopular,
    getTrendingDay,
    getTrendingWeek,
    getTopRated,
    getDiscover,
    getGenre,
    getSearch,
    getDetails,
    getImagesMovie,
    getCharacter,
    getReviews,
    getVideos,
  }
}

export default getMovies
