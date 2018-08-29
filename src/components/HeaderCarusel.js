import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './styles/HeaderCarusel.css';

class HeaderCarusel extends Component {

    render() {
        return (
            <div id="carousel">
                <Carousel>
                    <Carousel.Item>
                        <img alt="1" src="/assets/1.jpg" responsive="true" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt="2" src="/assets/2.jpg" responsive="true" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt="3" src="/assets/3.jpg" responsive="true" />
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default HeaderCarusel