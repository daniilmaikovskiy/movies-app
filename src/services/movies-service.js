export default class MoviesService {
  apiKey = '639828d50e7b3c39e3270402fcde3061';

  url = 'https://api.themoviedb.org/3';

  urlImageDB = 'https://image.tmdb.org/t/p/w500';

  getMovies(query, updateDataFn) {
    if ((typeof query === 'string' || query instanceof String) && query.length > 0) {
      fetch(new URL(`${this.url}/search/movie?api_key=${this.apiKey}&query=${query}`))
        .then((responce) => responce.json())
        .then((json) => json.results)
        .then((results) => {
          const moviesData = results.map((el) => {
            const movieData = {
              id: el.id,
              title: el.title,
              overview: el.overview,
              date: el.release_date,
              img: this.urlImageDB + el.poster_path,
              vote: `${el.vote_average}`,
            };

            return movieData;
          });

          updateDataFn(moviesData);
        });
    }
  }
}
