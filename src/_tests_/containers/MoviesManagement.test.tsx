import MoviesManagement from "../../containers/MoviesManagement";
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import MoviesList from "../../components/movies_management/MoviesList";
import { moviesList } from "../constants/moviesList";

const playersList = [
    { id: "1234", name: "check first test" },
    { id: "1235", name: "check second test" },
    { id: "1236", name: "check third test" },
    { id: "1237", name: "check fourth test" }
];

const MoviesListProps = {
    moviesList: moviesList,
    handleRemoveMovie: () => {
        console.log('removed')
    },
    handleAddMovie: () => {
        console.log('added')
    }
}

describe("Application container renders", () => {
  it('renders children when passed in', () => {
    const result = shallow((
      <MoviesManagement>
        <div className="unique" />
      </MoviesManagement>
    ));

    expect(result).toBeTruthy();
  });

  it('should render list component', () => {

    const wrapper = mount(<MoviesList {...MoviesListProps} />);
    expect(wrapper.find(MoviesList).length).toEqual(1);

  });
});