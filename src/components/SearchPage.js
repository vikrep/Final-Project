import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css'
import TableElement from './TableElement'
import 'font-awesome/css/font-awesome.min.css';
import { Input,Segment} from 'semantic-ui-react'

export default class SearchPage extends Component {
    render() {

        // test eventHandler for semantic Search 
        const findIt = (e) => {
            console.log("sth typed in semantic");
        }

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
                {/* Search with semantic UI */}
                <Segment inverted>
                <Input action={{ icon: 'search' }} 
                onChange={findIt} size='large' 
                placeholder='Search...' />
                </Segment>

                <TableElement />

                {/* Footer: social medias */}
                <div className="social">
                    <a href="http://www.google.com"><i className="fa fa-skype fa-2x skype"></i></a>
                    <a href="http://www.google.com"><i className="fa fa-envelope fa-2x gmail"></i></a>
                    <a href="http://www.google.com"><i className="fa fa-facebook-square fa-2x facebook"></i> </a>
                    <p> <strong>Follow me on:</strong> </p>
                </div>
            </div>
        )

    }

}