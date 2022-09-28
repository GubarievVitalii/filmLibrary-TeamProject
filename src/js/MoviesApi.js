import axios from "axios";
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a620a6416fb18e40f7d335c64c3f9e0e';

axios.defaults.baseURL = API_URL;

function handlerGenres ({results, ...other}, genres) {
  for (const object of results) {
    object.genre_str = object.genre_ids.map(elem => genres.find(genre =>  genre.id === elem).name);
  }
  return ({...other, results})
}

class MoviesApi{

  static genres = null;
  static async fetchGendresMovie() {
      const response = await axios.get("/genre/movie/list", {
        params: {
          api_key: API_KEY,
        },
      });
      this.genres = response.data.genres;
    }


  #searchQuery;
  #currentPage;

  constructor () {
      this.#searchQuery = null;
      this.#currentPage = 1;

      this.constructor.fetchGendresMovie();
  }


  async fetchTrendWeekMovies() {
    const response = await axios.get(`/trending/movie/week`, {
      params: {
        api_key: API_KEY,
        page: this.#currentPage,
        language: "en",
      },
    });
    return handlerGenres(response.data, MoviesApi.genres);
  }

  async fetchTrendDayMovies() {
    const response = await axios.get(`/trending/movie/day`, {
      params: {
        api_key: API_KEY,
        page: this.#currentPage,
        language: "en",
      },
    });
    return handlerGenres(response.data, MoviesApi.genres);
  }

  get query() {
    return this.#searchQuery
  }

  set query(newSearhQuery) {
    this.#searchQuery = newSearhQuery;
    this.#currentPage = 1;
  }

  nextPage() {
    this.#currentPage += 1;
  }

  previousPage() {
    if (!(this.#currentPage - 1)){
      return
    }
    
    this.#currentPage -= 1;
  }

  get currentpage() {
    return this.#currentPage
  }

  set currentpage(newPage) {
    this.#currentPage = newPage;
  }

  get genres() {
    return MoviesApi.genres;
  }

  set genres (genre) {
      return
  }

  
}

export default MoviesApi;