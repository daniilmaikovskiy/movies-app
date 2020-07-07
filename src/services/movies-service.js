export default class MoviesService {
  apiKey = '639828d50e7b3c39e3270402fcde3061';

  url = 'https://api.themoviedb.org/3';

  urlImageDB = 'https://image.tmdb.org/t/p/w500';

  createSearchMoviesURL(query, page) {
    const searchUrl = `${this.url}/search/movie?api_key=${this.apiKey}`;
    const encodedQuery = encodeURIComponent(query);
    const url = `${searchUrl}&query=${encodedQuery}&page=${page}`;

    return url;
  }

  async getMovies(query, page = 1) {
    if ((typeof query === 'string' || query instanceof String) && query.length > 0) {
      return fetch(this.createSearchMoviesURL(query, page))
        .then((responce) => responce.json())
        .then(({ results, total_pages: totalPages }) => {
          const movieBlocksData = results.map((el) => {
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

          return { movieBlocksData, totalPages };
        });
    }
    return { movieBlocksData: [], totalPages: 0 };
  }
}
