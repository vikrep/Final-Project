import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import Welcome from './components/WelcomePage';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        {/* <Navbar /> */}
        <Route exact path="/" component={Welcome} />
        <Route path="/search" component={SearchPage} />
      </div>
       </Router>
    );
  }
}

export default App;
