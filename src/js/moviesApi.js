import axios from "axios";

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'bb9be7856d820d280efdc8865f07d5b2';

import './genres-names'
import { genresNames } from "./genres-names";

axios.defaults.baseURL = API_URL;

function handlerGenres ({results, ...other}, genres) {
  if (genres === null){
    genres = genresNames;
  }

  for (let object of results) {
    object.genre_str = object.genre_ids.map(elem => genres.find(genre =>  genre.id === elem).name);
  }
  return {...other, results}
}

function getQueryGendres(queryGendres) {
  if (Array.isArray(queryGendres)) {
    return queryGendres.join(",");
  }
  else if (typeof(queryGendres) === 'string') {
    return queryGendres;
  }
  else if (typeof(queryGendres) === 'number') {
    console.log(queryGendres);
    return queryGendres.toString();
  }
  else{
    return ""
  }
}

class MoviesApi {

  static allGenres = null;

  #searchParams;
  #currentPage;

  constructor(onShow) {
    this.#searchParams = null;
    this.#currentPage = 1;
    this.currentFetch = null;
    this.onShow = onShow;

    this.fetchAllGendresMovie().then(
      genres => {this.constructor.allGenres = genres;}
    );
  }

  async fetchAllGendresMovie() {
    const response = await axios.get('/genre/movie/list', {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  }

  async fetchTrendWeekMovies() {
    const response = await axios.get(`/trending/movie/week`, {
      params: {
        api_key: API_KEY,
        language: "en",
        page: this.#currentPage,
      },
    });
    this.onShow(handlerGenres(response.data, MoviesApi.allGenres));
  }

  async fetchTrendDayMovies() {
    const response = await axios.get(`/trending/movie/day`, {
      params: {
        api_key: API_KEY,
        language: "en",
        page: this.#currentPage,
      },
    });
    this.onShow(handlerGenres(response.data, MoviesApi.allGenres));
  }

  async fetchMovieByID(id, withVideo = true) {
    const response = await axios.get(`/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en",
      },
    });

    if (withVideo) {
      const { results } = await this.fetchMovieVideoByID(id);
      response.data['resultVideo'] = results;
      return response.data;
    }
    return response.data;
  }

  async fetchMovieVideoByID(id) {
    const response = await axios.get(`/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: "en",
      },
    });

    return response.data;
  }

  async fetchMovieByGenres() {
    console.log(this.#searchParams);
    const response = await axios.get('/discover/movie', {
      params: {
        api_key: API_KEY,
        language: "en",
        page: this.#currentPage,
        with_genres: this.#searchParams,
      },
    });

    this.onShow(handlerGenres(response.data, MoviesApi.allGenres));
  }

  async fetchMovieQuery() {
    const response = await axios.get(`/search/movie/`, {
      params: {
        api_key: API_KEY,
        language: "en",
        query: this.#searchParams,
        page: this.#currentPage,
      },
    });
    this.onShow(handlerGenres(response.data, MoviesApi.allGenres));
  }

  get query() {
    return this.#searchParams;
  }

  set query(newSearhQuery) {
    this.#searchParams = newSearhQuery;
    this.#currentPage = 1;
  }

  get genres() {
    return;
  }

  /**
   * @param {any} arrayGenres
   */
  set genres(arrayGenres) {
    const queryGendres = getQueryGendres(arrayGenres);
    if (queryGendres) {
      this.query = queryGendres;
    }
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

  get currentPage() {
    return this.#currentPage;
  }

  set currentPage(newPage) {
    this.#currentPage = newPage;
  }

  getAllGenres() {
    if (MoviesApi.allGenres === null){
      return this.fetchAllGendresMovie();
    }
    return MoviesApi.allGenres;
  }
}

export default MoviesApi;