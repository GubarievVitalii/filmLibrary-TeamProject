import axios from 'axios';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'bb9be7856d820d280efdc8865f07d5b2';

axios.defaults.baseURL = API_URL;

function handlerGenres({ results, ...other }, genres) {
  for (const object of results) {
    object.genre_str = object.genre_ids.map(
      elem => genres.find(genre => genre.id === elem).name
    );
  }
  return { ...other, results };
}

function getQueryGendres(queryGendres) {
  console.log(queryGendres);
  if (Array.isArray(queryGendres)) {
    return queryGendres.join(',');
  } else if (typeof queryGendres === 'string') {
    return queryGendres;
  } else if (typeof queryGendres === 'number') {
    console.log(queryGendres);
    return queryGendres.toString();
  } else {
    return '';
  }
}

class MoviesApi {
  static genres = null;
  static async fetchGendresMovie() {
    const response = await axios.get('/genre/movie/list', {
      params: {
        api_key: API_KEY,
      },
    });
    this.genres = response.data.genres;
  }

  #searchQuery;
  #currentPage;

  constructor() {
    this.#searchQuery = null;
    this.#currentPage = 1;

    this.constructor.fetchGendresMovie();
  }

  async fetchTrendWeekMovies() {
    const response = await axios.get(`/trending/movie/week`, {
      params: {
        api_key: API_KEY,
        language: 'en',
        page: this.#currentPage,
      },
    });
    return handlerGenres(response.data, MoviesApi.genres);
  }

  async fetchTrendDayMovies() {
    const response = await axios.get(`/trending/movie/day`, {
      params: {
        api_key: API_KEY,
        language: 'en',
        page: this.#currentPage,
      },
    });
    return handlerGenres(response.data, MoviesApi.genres);
  }

  async fetchMovieByID(id) {
    const response = await axios.get(`/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en',
      },
    });
    const { results } = await this.fetchMovieVideoByID(id);
    response.data['resultVideo'] = results;
    return response.data;
  }

  async fetchMovieVideoByID(id) {
    const response = await axios.get(`/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: 'en',
      },
    });

    return response.data;
  }

  async fetchMovieByGenres(arrayGenres) {
    const queryGendres = getQueryGendres(arrayGenres);
    if (!queryGendres) {
      return { results: [] };
    }
    const response = await axios.get('/discover/movie', {
      params: {
        api_key: API_KEY,
        language: 'en',
        with_genres: queryGendres,
        page: this.#currentPage,
      },
    });

    return handlerGenres(response.data, MoviesApi.genres);
  }

  async fetchMovieQuery () {
    const response = await axios.get(`/search/movie/`, {
      params: {
        api_key: API_KEY,
        language: "en",
        query: this.#searchQuery,
        page: this.#currentPage,
      },
    });

    if (response.data.results.length === 0) {
      Notiflix.Notify.warning('❌ Sorry, there are no images matching your search query. Please try again.', {
                    timeout: 3000,
                    });
            } 

    const totalFilmsOfResponse = response.data.total_results;

    // const {results} = response.data;

    if (response.data.results.length > 0) {
        Notiflix.Notify.success (
          ` We found ${totalFilmsOfResponse} images.`, {
            timeout: 3000,}
        )
        }


    return handlerGenres(response.data, MoviesApi.genres);

    
  }


  get query() {
    return this.#searchQuery;
  }

  set query(newSearhQuery) {
    this.#searchQuery = newSearhQuery;
    this.#currentPage = 1;
  }

  eventPage(newPage) {
    this.#currentPage = newPage;
  }

  nextPage() {
    this.#currentPage += 1;
  }

  previousPage() {
    if (!(this.#currentPage - 1)) {
      return;
    }

    this.#currentPage -= 1;
  }

  get currentpage() {
    return this.#currentPage;
  }

  set currentpage(newPage) {
    this.#currentPage = newPage;
  }

  get genres() {
    return MoviesApi.genres;
  }

  set genres(genre) {
    return;
  }
}

export default MoviesApi;
