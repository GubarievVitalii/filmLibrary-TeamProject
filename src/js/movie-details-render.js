import getRefs from './get-refs';
const { movieModalContent } = getRefs();

export default function renderMovieDetails(movieDetails) {
  const genres = movieDetails.genres.map(genre => genre.name).join(', ');
  const movieDetailsMarkup = `
  <div class="movie-modal">
        <button type="button" class="modal-close-btn">
            &#x26CC
        </button>
        <div class="movie-modal-content">
    <img class="modal-image" src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" />
    <div class="modal-data-box">
        <h2 class="modal-title">${movieDetails.title}</h2>
        <table class="modal-table-box">
            <tr class="movie-modal-tr">
              <td class="modal-data">Vote / Votes</td>
              <td class="modal-data-value">
                <span class="modal-rating">${movieDetails.vote_average}</span>/
                <span class="modal-rating-two">${movieDetails.vote_count}</span>
              </td>
            </tr>
            <tr class="movie-modal-tr">
              <td class="modal-data">Popularity</td>
              <td class="modal-data-value">${movieDetails.popularity}</td>
            </tr>
            <tr class="movie-modal-tr">
              <td class="modal-data">Original Title</td>
              <td class="modal-data-value">${movieDetails.original_title}</td>
            </tr>
            <tr class="movie-modal-tr">
              <td class="modal-data">Genre</td>
              <td class="modal-data-value">${genres}</td>
            </tr>
          </table>
          <h3 class="modal-title-about">ABOUT</h3>
          <p class="modal-description">
            ${movieDetails.overview}
          </p>
          <div class="movie-modal-buttons">
            <button class="button-modal add-watch-js" type="button" id="first-btn">
              Add to watch
            </button>
            <button class="button-modal vissualy-hidden remove-watch-js" type="button" id="first-btn">
              Remove from watch
            </button>
            <button class="button-modal add-queue-js" type="button">Add to queue</button>
            <button class="button-modal vissualy-hidden remove-queue-js" type="button">Remove from queue</button>
            <button class="button-modal play-trailer" type="button">Watch trailer</button>
          </div>
        </div>
        </div>
      </div>
`;
  movieModalContent.insertAdjacentHTML('beforeend', movieDetailsMarkup);
}
