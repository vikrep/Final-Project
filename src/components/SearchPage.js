import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css'
export default class SearchPage extends Component {
    render() {
        return (
            <div>
                <div id="carousel">
                    <Carousel>
                        <Carousel.Item>
                            <img alt="1" src="/assets/1.jpg" responsive />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="2" src="/assets/2.jpg" responsive />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="3" src="/assets/3.jpg" responsive />
                        </Carousel.Item>
                    </Carousel>;
                </div>
                <h1>SEARCH PAGE</h1>
                <Link to="/test">
                    <Button className="btn btn-lg btn-secondary">Go to Test page</Button>
                </Link>
            </div>

        )

    }

}