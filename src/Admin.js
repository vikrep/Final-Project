
    import React, {Component} from 'react';
    import firebase from "firebase"
    import SearchPage from './components/SearchPage';
    import {BrowserRouter as Router, Route } from 'react-router-dom';
    import Welcome from './components/WelcomePage';
    import Admin from './Admin';

    let config = {
            apiKey: "AIzaSyAjBd4hamvW4AsYwymdJOE5Tiw2BHlLZLQ",
        authDomain: "collection-69f45.firebaseapp.com",
        databaseURL: "https://collection-69f45.firebaseio.com",
        projectId: "collection-69f45",
        storageBucket: "collection-69f45.appspot.com",
        messagingSenderId: "775971698132"
      };
    
      firebase.initializeApp(config);

      class Authen extends Component {
          state = {
              email: '',
              password: '',
              err: '',
              isLoggedIn: false,
          };
      
          login = () => {
              const email = this.state.email;
              const password = this.state.password;
      
              const auth = firebase.auth();
      
              const promise = auth.signInWithEmailAndPassword(email, password);
      
              promise.then(user => {
                  let message = 'Welcome, you are now logged in!';
                  this.setState({err: message, isLoggedIn: true});
                  firebase.auth().onAuthStateChanged(user => {
                    if(user) {
                      window.location = 'search'; //After successful login, user will be redirected to search
                    }
                  });
                  
              });
              
      
              promise.catch(e => {
                  let err = e.message;
                  this.setState({err});
              })
          };
      
          signup = () => {
              const email = this.state.email;
              const password = this.state.password;
      
              const auth = firebase.auth();
      
              const promise = auth.createUserWithEmailAndPassword(email, password);
      
              promise
                  .then(user => {
                      let err = `Welcome ${user.email}`;
                      firebase.database().ref(`users/${user.uid}`).set({
                          email: user.email,
                      });
                      this.setState({err});
                  })
                  .catch(e => {
                      let err = e.message;
                      this.setState({err});
                  });
          };
      
          logout = () => {
              let promise = firebase.auth().signOut();
              promise.then(() => {
                  let message = 'You are now logged out!';
                  this.setState({err: message, isLoggedIn: false});
              }).catch(err => {
                  this.setState({err: err.message});
              });
          };
      
          // Signs in with popup
          google = () => {
              let provider = new firebase.auth.GoogleAuthProvider();
      
              // Use redirect instead of Popup for better mobile experience
              let promise = firebase.auth().signInWithPopup(provider);
      
              promise.then(result => {
                  let user = result.user;
                  firebase.database().ref(`users/${user.uid}`).set({
                      email: user.email,
                      name: user.displayName,
                  });
                  this.setState({err: 'You are now sign in via Google', isLoggedIn: true});
              });
      
              promise.catch(e => {
                  let msg = e.message;
                  this.setState({err: msg});
              })
          };
      
          // Signs in with redirect
          googleRedirect = () => {
              let provider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithRedirect(provider);
      
              firebase.auth().getRedirectResult().then( result => {
                  let user = result.user;
                  firebase.database().ref(`users/${user.uid}`).set({
                      email: user.email,
                      name: user.displayName,
                  });
                  this.setState({err: 'You are now sign in via Google', isLoggedIn: true});
      
              }).catch(err => {
                  let msg = err.message;
                  this.setState({err: msg});
              });
          };
      
          render(){
              return(
                  <div>
                      <input
                          id="email"
                          onChange={(e) => {this.setState({email: e.target.value})}}
                          type="email"
                          placeholder="Enter your email"
                      /> <br/>
                      <input
                          id="pass"
                          onChange={(e) => {this.setState({password: e.target.value})}}
                          type="password"
                          placeholder="Enter your password"
                      /> <br/>
                      <p>{this.state.err}</p>
                      <button onClick={this.login}>Login</button>
                      <button
                          id="logout"
                          onClick={this.logout}
                          className={this.state.isLoggedIn ? '' : 'hide'}>Logout</button>
                      <br/>
                                    <img alt="3" src="/assets/3.jpg" responsive="true" />
                  </div>
              );
          }
      }

      class App extends Component {
        render() {
          return (
            <Router>
            <div>
              {/* <Navbar /> */}
              <Route exact path="/" component={Welcome} />
              <Route path="/search" component={SearchPage} />
              <Route path="/Admin" component={Admin} />
      
            </div>
             </Router>
             
          );
          
        }
      }
      
      
      export default Authen;
      