import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react'
import 'font-awesome/css/font-awesome.min.css';
import './SearchPage.css';
import HeaderCarusel from './HeaderCarusel';
import FooterMedia from './FooterMedia';
import DataTable from './DataTable';
import DiskTable from './DiskTable';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeAlbums: [],
            isFetched: false,
            isLoading: false,
            error: ''
        }
    }
    // https://fierce-refuge-31884.herokuapp.com/api/albums  heroku API URL
    // http://localhost:5000/api/albums localhost


    // Ajax request
    componentDidMount() {
        if (this.state.isFetched === false) {
            this.setState({ isLoading: true });
            fetch(`https://fierce-refuge-31884.herokuapp.com/api/albums`) // fetch from Heroku database
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw new Error('HTTP error');
                    }
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        fakeAlbums: data, // data.rows for local data
                        isFetched: true,
                        isLoading: false
                    });
                })
                .catch((err) => {
                    this.setState({
                        isLoading: false,
                        error: err.toString()
                    });
                });
        }
    }
    render() {
        if (this.state.error) {
            return (
                <h2>
                    There is an error: <span>{this.state.error}</span>
                </h2>
            );
        } else {
            if (this.state.isLoading) {
                return <Dimmer active>
                    <Loader size="massive" active inline="centered" content="Loading" />
                </Dimmer>;
            } else {
                return (
                    <div>
                        <HeaderCarusel />
                        <Switch>
                            <Route exact path="/search/" render={props => <DataTable data={this.state.fakeAlbums} {...props} />} />
                            <Route path="/search/:id" component={DiskTable} />} />
                        </Switch>
                        <FooterMedia />
                    </div>
                )
            }
        }
    }
}
export default SearchPage