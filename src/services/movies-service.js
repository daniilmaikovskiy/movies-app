export default class MoviesService {
  apiKey = '639828d50e7b3c39e3270402fcde3061';

  url = 'https://api.themoviedb.org/3';

  urlImageDB = 'https://image.tmdb.org/t/p/w500/';

  getMovies(query) {
    if ((typeof query === 'string' || query instanceof String) && query.length > 0) {
      fetch(new URL(`${this.url}/search/movie?api_key=${this.apiKey}&query=${query}`))
        .then((responce) => responce.json())
        .then((json) => json.results)
        .then((results) => console.log(results[0]));
    }
  }
}
