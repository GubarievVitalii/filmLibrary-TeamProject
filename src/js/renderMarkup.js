const pathImage = "https://image.tmdb.org/t/p/";
import imageDefaults from '../images/default.jpg'

export function createMarkupElement({id, title, poster_path, genre_str, release_date, vote_average}) {
  
  return `<li class="galary-list__item" data-movie-id = ${id}>
              <a data-modal-open href="" class="galary-list-link-wrapper skeleton" data-movie-id = ${id}>
                <div class="galary-list-item-wraper">
                  <picture>
                    <source
                      srcset=${!poster_path ? imageDefaults: `${pathImage}w1280${poster_path}`}
                      media="(min-width: 1280)"
                      type="image"
                    />
                    <source
                      srcset===${!poster_path ? imageDefaults: `${pathImage}w768${poster_path}`}
                      media="(min-width: 768)"
                      type="image"
                    />
                    <source
                      srcset=${!poster_path ? imageDefaults: `${pathImage}w320${poster_path}`}
                      media="(min-width: 320)"
                      type="image"
                    />
                    <img
                      src=${!poster_path ? imageDefaults: `${pathImage}original${poster_path}`}
                      alt="galary"
                      class="galary-list-item-img"
                      data-movie-id=${id}
                    />
                  </picture>
                  <div class="film-data first">
                    <p class="films-name skeleton skeleton-text">${title}</p>
                    <div class="film-data-wraper">
                      <p class="films-genre skeleton skeleton-text">
                        ${genre_str.join(", ")} &#124; ${release_date.slice(0,4)}
                      </p>
                      <p class="film-rating skeleton skeleton-text">${vote_average}</p>
                    </div>
                  </div>
                </div>
              </a>
            </li>`
}