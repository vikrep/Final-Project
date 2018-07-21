import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css'
// import SearchTable from './SearchTable'
import TableElement from './TableElement'


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
                    </Carousel>
                </div>
                <TableElement />
            </div>

        )

    }

}