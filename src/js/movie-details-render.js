export default function renderMovieDetails(movieDetails) {
  const modalContent = document.querySelector('.modal-content');

  const genres = movieDetails.data.genres.map(genre => genre.name).join(', ');
  const movieDetailsMarkup = `
    <img class="modal-image" src="https://image.tmdb.org/t/p/w500${movieDetails.data.poster_path}" />
    <div class="modal-data-box">
        <h2 class="modal-title">${movieDetails.data.title}</h2>
        <table class="modal-table-box">
            <tr>
              <td class="modal-data">Vote / Votes</td>
              <td class="modal-data-value">
                <span class="modal-rating">${movieDetails.data.vote_average}</span>/
                <span class="modal-rating-two">${movieDetails.data.vote_count}</span>
              </td>
            </tr>
            <tr>
              <td class="modal-data">Popularity</td>
              <td class="modal-data-value">${movieDetails.data.popularity}</td>
            </tr>
            <tr>
              <td class="modal-data">Original Title</td>
              <td class="modal-data-value">${movieDetails.data.original_title}</td>
            </tr>
            <tr>
              <td class="modal-data">Genre</td>
              <td class="modal-data-value">${genres}</td>
            </tr>
          </table>
          <h3 class="modal-title-about">ABOUT</h3>
          <p class="modal-description">
            ${movieDetails.data.overview}
          </p>
          <div class="md-modal-buttons">
            <button class="md-button swich-on" type="button">
              Add to watch
            </button>
            <button class="md-button" type="button">Add to queue</button>
          </div>
        </div>
`;
  modalContent.insertAdjacentHTML('beforeend', movieDetailsMarkup);
}
