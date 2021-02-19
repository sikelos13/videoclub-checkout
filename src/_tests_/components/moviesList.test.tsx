import MoviesList from "../../components/movies_management/MoviesList";
import * as React from 'react';
import { shallow } from 'enzyme';
import { TableCell } from "@material-ui/core";
import { moviesList } from "../constants/moviesList";

const MoviesListProps = {
    moviesList: moviesList,
    handleRemoveMovie: () => {
        console.log('removed')
    },
    handleAddMovie: () => {
        console.log('added')
    }
}

describe("Movies list container renders", () => {
    it('renders with props when passed in', () => {

        const result = shallow(<MoviesList {...MoviesListProps} />).contains(<TableCell />);
        expect(result).toMatchSnapshot();
    });

    it('finds the right div for mounting the movies list', () => {

        const container = shallow(<MoviesList {...MoviesListProps} />);

        expect(container.find('div#table-row')).toBeTruthy();
    });
});