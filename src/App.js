
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import Welcome from './components/WelcomePage';
import Admin from './components/Admin';
import NotFound from './components/NotFound';
import InputData from './components/InputData';
import PrivateRoute from './components/PrivateRoute'



class App extends Component {
  state = {
    user: null,
  };
  login = user => {
    this.setState({ user }, () => this.props.history.push('/input'));
    // Go to input
  }
  render() {
    return (
          <div className="app">
          <div className="content">
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/search" component={SearchPage} />
              <Route path="/admin" render={props => <Admin onLogin={this.login} />} />
              <PrivateRoute path="/input" user={this.state.user} component={InputData} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default withRouter(App);