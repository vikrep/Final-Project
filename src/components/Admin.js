import React, { Component } from 'react';
import superagent from 'superagent'
// import firebase from "firebase"
import './styles/Admin.css'

// let config = {
// apiKey: "AIzaSyAjBd4hamvW4AsYwymdJOE5Tiw2BHlLZLQ",
// authDomain: "collection-69f45.firebaseapp.com",
// databaseURL: "https://collection-69f45.firebaseio.com",
// projectId: "collection-69f45",
// storageBucket: "collection-69f45.appspot.com",
// messagingSenderId: "775971698132"
// };

// let config = {
//     apiKey: "AIzaSyCIINtFQvyR8V2uXTsw8Zd4wa4Oa0p5fgQ",
//     authDomain: "final-project-53d92.firebaseapp.com",
//     databaseURL: "https://final-project-53d92.firebaseio.com",
//     projectId: "final-project-53d92",
//     storageBucket: "final-project-53d92.appspot.com",
//     messagingSenderId: "445822412503"
// };

// firebase.initializeApp(config);

class Authen extends Component {
    state = {
        email: '',
        password: '',
        err: '',
        isLoggedIn: false,
    };

    handleKeyPress = (target) => {
        if(target.charCode === 13){
          this.login()
        };
      } ;

    login = (event) => {
        const username = this.state.email;
        const password = this.state.password;
        // const auth = firebase.auth();
        // const promise = auth.signInWithEmailAndPassword(email, password);
        
            if (this.state.email && this.state.password) {
              superagent.post('http://localhost:5000/admin')
                .type('form')
                .send({
                  username, password
                })
                .end((err, res) => {
                  if (err) console.log(err);
                  this.props.onLogin({
                    username: 'this.state.email',
                    password: 'this.state.password'
                });
                }) 
          }

        // promise.then(user => {
        //     let message = 'Welcome, you are now logged in!';
        //     this.setState({ err: message, isLoggedIn: true });
        //     firebase.auth().onAuthStateChanged(user => {
        //         if (user) {
        //             this.props.onLogin({
        //                 username: 'this.state.email',
        //                 password: 'this.state.password'
        //             });
        //             // window.location = 'input'; //After successful login, user will be redirected to search
        //         }
        //     });

        // });

        // promise.catch(e => {
        //     let err = e.message;
        //     this.setState({ err });
        // })
    };

    
    render() {
        return (
            <div className="container backg">
                <div className="row">
                    <div className="Absolute-Center is-Responsive">
                        <div className="col-sm-12 col-md-10 col-md-offset-1">
                            <form action="" >
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input className="form-control" name='username' id="email"
                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                                        type="email"
                                        placeholder="Enter your email" />
                                </div>
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input className="form-control" name='password' id="pass"
                                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                                        type="password"
                                        placeholder="Enter your password" onKeyPress={this.handleKeyPress} />
                                </div>
                                <div className="form-group">
                                    <p>{this.state.err}</p>
                                    <button type="button" className="btn btn-def btn-block btn-dark login" onClick={this.login}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Authen;