import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import MoviesManagement from './containers/MoviesManagement';
import { Container } from '@material-ui/core';

export default class Routes extends Component<{}, {}> {
    render() {
        return (
            <Container className="Main_Container" style={{ maxWidth: "1400px" }}>
                <Switch>
                    <Route exact path={["/players", "/"]} component={MoviesManagement} />
                </Switch>
            </Container>
        );
    }
}