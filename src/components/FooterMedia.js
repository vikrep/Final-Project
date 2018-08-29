import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './styles/FooterMedia.css';
import { Divider } from 'semantic-ui-react'


class FooterMedia extends Component {

    render() {
        return (
            <div className="social">
                <Divider />
                <a href="http://www.google.com"><i className="fa fa-skype fa-2x skype"></i></a>
                <a href="http://www.google.com"><i className="fa fa-envelope fa-2x gmail"></i></a>
                <a href="http://www.google.com"><i className="fa fa-facebook-square fa-2x facebook"></i> </a>
                <p> <strong>Follow me on:</strong> </p>
            </div>
        )
    }
}

export default FooterMedia




