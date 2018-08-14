
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import Welcome from './components/WelcomePage';
import Admin from './components/Admin';
import HeaderCarusel from './components/HeaderCarusel';
import DataTable from './components/DataTable';
import DiskTable from './components/DiskTable'
import FooterMedia from './components/FooterMedia'

class App extends Component {
  render() {
    return (
      <Router>

        <div className="app">
          <HeaderCarusel />

          <div className="content">
            <Route exact path="/" component={Welcome} />
            <Route path="/search" component={SearchPage} />
            <Route path="/admin" component={Admin} />
          </div>

          <FooterMedia />
        </div>
      </Router>
    );
  }
}

export default App;