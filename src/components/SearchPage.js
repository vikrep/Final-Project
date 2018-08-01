import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './SearchPage.css'
import DataTable from './DataTable'
import 'font-awesome/css/font-awesome.min.css';
import fakeAlbums from '../data/fakeAlbums.json'

// import databaseInterface from './helpers/myDbClass'


export default class SearchPage extends Component {
    render() {

        // const fakeAlbums= databaseInterface.getAlbumsFromSqlLite3();

        return (
            <div>
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

                <DataTable data={fakeAlbums} />
            
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