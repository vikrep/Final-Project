
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import Welcome from './components/WelcomePage';
import Admin from './Admin';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route path="/search" component={SearchPage} />
          <Route path="/Admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;