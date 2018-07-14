import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import 'icheck/skins/all.css'; // or single skin css
import {Checkbox} from 'react-icheck';

import validator from 'validator';

import "../../css/third-party/bootstrap-social.css"
import "./css/login_and_register.css"
import {login} from '../../actions/authActions'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentWillMount() {
        const {isAuthenticated} = this.props;
        if (isAuthenticated) {
            this.context.router.push('/loggedin');
        }
    }

    componentDidUpdate() {
        const {isAuthenticated} = this.props;
        if (isAuthenticated) {
            this.context.router.push('/loggedin');
        }
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    validateInput(formData) {
        let errors = {};
        if (!validator.isEmail(formData.email)) errors.email = "Not a valid email address";
        if (validator.isEmpty(formData.password)) errors.password = "Enter a password";

        this.setState({errors});

        return !errors.email && !errors.password;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.validateInput(this.state)) {
            this.setState({errors:{}, isLoading:true});
            this.props.login({...this.state, username: this.state.email}).then(
                (response) => {},
                (response) => {
                    response.json().then(function(json) {
                        this.setState({isLoading:false, errors: {server: json.error}});
                    }.bind(this))
                }
            );
        }
    }

    render() {

        const {errors} = this.state;

        return (
            <div className="login-box">
                <div className="login-logo">
                    <Link to="/"><b>Admin</b>LTE</Link>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    {
                        errors &&
                        errors.server &&
                            <p className="login-server-error">
                                {errors.server}
                            </p>
                    }

                    <form onSubmit={this.onSubmit} method="post">
                        <div className="form-group has-feedback">
                            <input onChange={this.onChange} type="text" className="form-control" placeholder="Email" name="email" />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                            {errors && errors.email && <span className="form-input-error-message">{errors.email}</span>}
                        </div>
                        <div className="form-group has-feedback">
                            <input onChange={this.onChange} type="password" className="form-control" placeholder="Password" name="password" />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                            {errors && errors.password && <span className="form-input-error-message">{errors.password}</span>}
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                <Checkbox
                                    checkboxClass="icheckbox_square-blue"
                                    label=" Checkbox" />
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <button disabled={this.state.isLoading} type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                            </div>
                        </div>
                    </form>

                    <div className="social-auth-links text-center">
                        <p>- OR -</p>
                        <a href="#" className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook"></i> Sign in using
                            Facebook</a>
                        <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign in using
                            Google+</a>
                    </div>

                    <a href="#">I forgot my password</a><br/>
                    <Link to="/signup"><span className="text-center">Register a new membership</span></Link>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, {login})(Login);