import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import MoviesManagement from './containers/MoviesManagement';
import { Box, Container } from '@material-ui/core';

export default class Routes extends Component<{}, {}> {
    render() {
        return (
            <Container className="Main_Container">
                <Switch>
                    <Route exact path={["/players", "/"]} component={MoviesManagement} />
                </Switch>
            </Container>
        );
    }
}