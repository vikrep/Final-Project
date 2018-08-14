import React, { Component } from 'react';
import firebase from "firebase"
import './Admin.css'

// let config = {
// apiKey: "AIzaSyAjBd4hamvW4AsYwymdJOE5Tiw2BHlLZLQ",
// authDomain: "collection-69f45.firebaseapp.com",
// databaseURL: "https://collection-69f45.firebaseio.com",
// projectId: "collection-69f45",
// storageBucket: "collection-69f45.appspot.com",
// messagingSenderId: "775971698132"
// };

let config = {
    apiKey: "AIzaSyCIINtFQvyR8V2uXTsw8Zd4wa4Oa0p5fgQ",
    authDomain: "final-project-53d92.firebaseapp.com",
    databaseURL: "https://final-project-53d92.firebaseio.com",
    projectId: "final-project-53d92",
    storageBucket: "final-project-53d92.appspot.com",
    messagingSenderId: "445822412503"
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
            this.setState({ err: message, isLoggedIn: true });
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.props.onLogin({
                        username: this.state.email,
                        password: this.state.password
                    });
                    // window.location = 'input'; //After successful login, user will be redirected to search
                }
            });

        });

        promise.catch(e => {
            let err = e.message;
            this.setState({ err });
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
                this.setState({ err });
            })
            .catch(e => {
                let err = e.message;
                this.setState({ err });
            });
    };

    logout = () => {
        let promise = firebase.auth().signOut();
        promise.then(() => {
            let message = 'You are now logged out!';
            this.setState({ err: message, isLoggedIn: false });
        }).catch(err => {
            this.setState({ err: err.message });
        });
    };

    render() {
        return (
            // <div className="backg">
            <div class="container backg">
                <div class="row">
                    <div class="Absolute-Center is-Responsive">
                        <div class="col-sm-12 col-md-10 col-md-offset-1">
                            <form action="" >
                                <div class="form-group input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input class="form-control" name='username' id="email"
                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                                        type="email"
                                        placeholder="Enter your email" />
                                </div>
                                <div class="form-group input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                    <input class="form-control" name='password' id="pass"
                                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                                        type="password"
                                        placeholder="Enter your password" />
                                </div>
                                <div class="form-group">
                                    <p>{this.state.err}</p>
                                    <button type="button" class="btn btn-def btn-block btn-dark login" onClick={this.login}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}

export default Authen;
