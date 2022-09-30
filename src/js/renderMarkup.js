const pathImage = "https://image.tmdb.org/t/p/";
import imageDefaults from '../images/default.jpg'

export function createMarkupElement({id, title, poster_path, genre_str, release_date, vote_average}) {
  
  return `<li class="galary-list__item" data-movie-id = ${id}>
              <a data-modal-open href="" class="galary-list-link-wrapper skeleton" data-movie-id = ${id}>
                <div class="galary-list-item-wraper">
                  <img
                    src=${!poster_path ? imageDefaults: `${pathImage}original${poster_path}`}
                    alt="galary"
                    class="galary-list-item-img"
                    data-movie-id=${id}
                  />
                  <div class="film-data first">
                    <p class="films-name skeleton skeleton-text">${title}</p>
                    <div class="film-data-wraper">
                      <p class="films-genre skeleton skeleton-text">
                        ${genre_str.join(", ")} &#124; ${release_date.slice(0,4)}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>`
}