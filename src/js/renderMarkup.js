const pathImage = "https://image.tmdb.org/t/p/";
import imageDefaults from '../images/default.jpg'

export function createMarkupElement({id, title, poster_path, genre_str, release_date, vote_average}) {
  
  return `<li class="gallery__item" data-movie-id = ${id}>
              <a data-modal-open href="" class="gallery__link link skeleton" data-movie-id = ${id}>
                <div class="galary__card">
                  <img
                    src=${!poster_path ? imageDefaults: `${pathImage}original${poster_path}`}
                    alt="galary"
                    class="gallery__img"
                    data-movie-id=${id}
                  />
                  <div class="film first">
                    <p class="films__name skeleton skeleton-text">${title}</p>
                    <p class="films__genre skeleton skeleton-text">
                      ${genre_str.join(", ")} &#124; ${release_date.slice(0,4)}
                    </p>
                  </div>
                </div>
              </a>
            </li>`
}