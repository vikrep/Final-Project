import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './WelcomePage.css';

export default class WelcomePage extends Component {
    render() {
        return (
            <Grid>
                <div className="bg">
                    {/* <Image src="/assets/welcome.jpg" responsive /> */}
                </div>
                {/* <div class="wrapper">
                </div> */}
                <Jumbotron>
                    <h1>Welcome to my Music Land</h1>
                    <p>
                        I have thousands of CDs in my collection since 1980 to 2018,<br />welcome to my music world
                    </p>
                    <Link to="/search">
                        <Button className="btn btn-lg btn-secondary">Go to Search</Button>
                    </Link>
                </Jumbotron>
            </Grid>
            
        )
    }
}
