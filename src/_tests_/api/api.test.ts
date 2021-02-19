import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchMoviesApi, FetchMoviesApiParams, FetchMoviesApiResponse} from '../../api/movies_management/fetchMovies';
import { createCheckoutApi, CreateCheckoutApiParams, CreateCheckoutApiResponse} from '../../api/checkout/createCheckout';

const moviesList = [
    {   
        adult: false,
        backdrop_path: "/z5LhR3cqKIL0atMcNd16s4IP2kQ.jpg",
        genre_ids: [80, 18, 53],
        id: 1830,
        original_language: "en",
        original_title: "Lord of War",
        overview: "Test1 overview",
        popularity: 18.338,
        poster_path: "/xEdwdFZRwrNAvTDx0fAV3MAInaA.jpg",
        release_date: "2005-09-16",
        title: "Lord of War",
        video: false,
        vote_average: 7.2,
        vote_count: 3144 ,
    },
    { 
        adult: false,
        backdrop_path: "/yLfUS9nFmyrYsntznhvxpZMrdtl.jpg",
        genre_ids: [27, 14],
        id: 8973,
        original_language: "en",
        original_title: "Lord of Illusions",
        overview: "Test 2 overview",
        popularity: 13.374,
        poster_path: "/tMNkSDbDEVxgHjjbjtqU236ZfBF.jpg",
        release_date: "1995-08-25",
        title: "Lord of Illusions",
        video: false,
        vote_average: 6,
        vote_count: 183
     },
  ]
  
  describe('Fetch movies list api', () => {
      it('returns data when fetchMoviesApi is called with search param', done => {
          const mock = new MockAdapter(axios);
          const data = { response: moviesList };

          const params = { 
              page: 1,
              query: "lord"
          } as FetchMoviesApiParams

          mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${params.query}&page=${params.page}`).reply(200, data);
        
          fetchMoviesApi(params).then((response: FetchMoviesApiResponse) => {
              expect(response.data).toEqual(data);
              done();
          });
      });
  });

  describe('Make checkout with selected movies', () => {
    it('returns data when fetchMoviesApi is called with search param on second page', done => {
        const mock = new MockAdapter(axios);
        const data = false;

        const params = { 
            data: ['2','14']
        } as CreateCheckoutApiParams

        mock.onPost(`https://api.mocklets.com/mock68075/`, {
            headers: {
                "X-Mocklets-PublicKey": "txmovies",
                "X-Mocklets-Checksum": "830c7cd4a70be6540a4898441ca02951",
              }
        }).reply(200, data);

        createCheckoutApi(params).then((response: CreateCheckoutApiResponse) => {
            expect(response.success).toEqual(data);
            done();
        });
    });
});