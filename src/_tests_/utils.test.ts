import { getFetchedUpdatedItems } from '../utils/getFetchedUpdatedItems';
import { getHasNextPage } from '../utils/getHasNextPage';
import { getFilteredMoviesList } from '../utils/getFilteredMoviesList';
import { handleErrorMessage } from '../api/utils/handleErrorMessage';
import { getInitialListState } from '../utils/getInitialListState';
import { moviesList } from "./constants/moviesList";
import { selectedMoviesList } from "./constants/selectedMoviesList";
import { checkoutMoviesList } from "./constants/checkoutMoviesList";
import { getSortedMoviesList } from '../utils/getSortedMoviesList';
import { sortedMoviesListHighest } from "./constants/sortedMoviesListHighest";
import { sortedMoviesListLowest } from "./constants/sortedMoviesListLowest";


describe("Return updates list of movies", () => {
  test("it should return the movies with updated the add or remove button ", () => {

    const output = [
        {   
            adult: false,
            backdrop_path: "/z5LhR3cqKIL0atMcNd16s4IP2kQ.jpg",
            genre_ids: [80, 18, 53],
            id: "1830",
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
            isSelected: true
        },
        { 
            adult: false,
            backdrop_path: "/yLfUS9nFmyrYsntznhvxpZMrdtl.jpg",
            genre_ids: [27, 14],
            id: "8973",
            original_language: "en",
            original_title: "Lord of Illusions",
            overview: "Test 2 overview",
            popularity: 13.374,
            poster_path: "/tMNkSDbDEVxgHjjbjtqU236ZfBF.jpg",
            release_date: "1995-08-25",
            title: "Lord of Illusions",
            video: false,
            vote_average: 6,
            vote_count: 183,
            isSelected: false
         },
         {
            adult: false,
            backdrop_path: "/chEIFJpFS8D6srbptxrgm1ebtWT.jpg",
            genre_ids: [53, 12, 18],
            id: "9960",
            original_language: "en",
            original_title: "Lord of the Flies",
            overview: "test3 overview",
            popularity: 9.688,
            poster_path: "/3jhp9oxZpwcWCZ1vfn3PyMWovzq.jpg",
            release_date: "1963-08-13",
            title: "Lord of the Flies",
            video: false,
            vote_average: 6.7,
            vote_count: 354,
            isSelected: false
         }
    ];

    expect(getFetchedUpdatedItems(selectedMoviesList, moviesList)).toEqual(output);

  });
});

describe("Return filtered movies list", () => {
  test("it should remove movie from checkout list", () => {
    const selectedMovie = {   
        adult: false,
        backdrop_path: "/z5LhR3cqKIL0atMcNd16s4IP2kQ.jpg",
        genre_ids: [80, 18, 53],
        id: "1830",
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
        isSelected: true
    }

    const output = [] as any[];

    expect(getFilteredMoviesList(selectedMoviesList, selectedMovie)).toEqual(output);

  });
});

describe("Return if has a next page", () => {
    test("it should return a boolean regarding the next page", () => {
  
      const output = true;
  
      expect(getHasNextPage(5, 110)).toEqual(output);
  
    });
  });

  describe("Return the initial state of the movies list", () => {
    test("it should set isSelected boolean to false as initial state", () => {
  
      const output = moviesList;
  
      expect(getInitialListState(checkoutMoviesList)).toEqual(output);
  
    });
  });

  describe("Return the list sorted", () => {
    test("it should return list of movies from highest to lowest vote", () => {
  
      const output = sortedMoviesListHighest;
  
      expect(getSortedMoviesList(moviesList, "highest_vote_average")).toEqual(output);
  
    });

    test("it should return list of movies from lowest to highest vote", () => {
  
        const output = sortedMoviesListLowest;
    
        expect(getSortedMoviesList(moviesList, "lowest_vote_average")).toEqual(output);
    
      });
  });

describe("Return error of api call", () => {
  test("it should return a normalized message from rejected request", () => {
    const responseApiOne = {
      error_code: ["Something went wrong please try again"]
    };

    const outputOne = "Something went wrong please try again";

    expect(handleErrorMessage(responseApiOne)).toEqual(outputOne);
  });

  test("it should return a normalized message from rejected non field errors", () => {
    const responseApiTwo = {
      non_field_errors: ["Something went wrong , contact administrator"]
    };

    const outputTwo = "Something went wrong , contact administrator";

    expect(handleErrorMessage(responseApiTwo)).toEqual(outputTwo);
  });

  test("it should return a normalized message response data object", () => {
    const responseApiThree = {
      response: {
        data: {
          non_field_errors: ["Object has some problems"]
        }
      }
    };

    const outputThree = "Object has some problems";

    expect(handleErrorMessage(responseApiThree)).toEqual(outputThree);
  });
});