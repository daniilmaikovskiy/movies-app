const debounce = (fn, debounceTime) => {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};

export default class MoviesService {
  apiKey = '639828d50e7b3c39e3270402fcde3061';

  url = 'https://api.themoviedb.org/3';

  urlImageDB = 'https://image.tmdb.org/t/p/w500';

  constructor(fnGet) {
    this.fnGet = fnGet;
  }

  createURL(query, page) {
    const encodedQuery = encodeURIComponent(query);

    return `${this.url}/search/movie?api_key=${this.apiKey}&query=${encodedQuery}&page=${page}`;
  }

  debouncedGetMoviesFn = debounce((query, page) => {
    fetch(this.createURL(query, page))
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
      });
  }, 1000);

  getMovies(query, page = 1) {
    if ((typeof query === 'string' || query instanceof String) && query.length > 0) {
      this.debouncedGetMoviesFn(query, page);
    }
  }
}
