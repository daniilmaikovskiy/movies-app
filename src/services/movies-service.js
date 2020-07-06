export default class MoviesService {
  apiKey = '639828d50e7b3c39e3270402fcde3061';

  url = 'https://api.themoviedb.org/3';

  urlImageDB = 'https://image.tmdb.org/t/p/w500';

  timerId = null;

  delay = 300;

  debounce = (fn, debounceTime) => {
    return function (...args) {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => {
        fn.apply(this, args);
      }, debounceTime);
    };
  };

  constructor(fnGet, fnLoading, fnError) {
    this.fnGet = fnGet;
    this.fnLoading = fnLoading;
    this.fnError = fnError;
  }

  createSearchMoviesURL(query, page) {
    const searchUrl = `${this.url}/search/movie?api_key=${this.apiKey}`;
    const encodedQuery = encodeURIComponent(query);
    const url = `${searchUrl}&query=${encodedQuery}&page=${page}`;

    return url;
  }

  debouncedGetMoviesFn = this.debounce((query, page) => {
    fetch(this.createSearchMoviesURL(query, page))
      .then((responce) => responce.json())
      .then(({ results, total_pages: totalPages }) => {
        const moviesData = results.map((el) => {
          const img = el.poster_path == null ? '' : this.urlImageDB + el.poster_path;

          const movieData = {
            id: el.id,
            title: el.title,
            overview: el.overview,
            date: el.release_date,
            img,
            vote: `${el.vote_average}`,
          };

          return movieData;
        });

        this.fnGet(moviesData, totalPages);
      })
      .catch((error) => this.fnError(error.message));
  }, this.delay);

  getMovies(query, page = 1) {
    if ((typeof query === 'string' || query instanceof String) && query.length > 0) {
      this.fnLoading();
      this.debouncedGetMoviesFn(query, page);
    } else {
      clearTimeout(this.timerId);
      this.fnGet([], 0);
    }
  }
}
