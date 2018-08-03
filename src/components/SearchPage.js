import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import DataTable from './DataTable';
import DiskTable from './DiskTable';
import 'font-awesome/css/font-awesome.min.css';
import fakeAlbums from '../data/fakeAlbums.json';
import fakeDisk from '../data/fakeDisk.json';
import './SearchPage.css';

class SearchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            diskTable: true,
        }
    }
    handleDiskTable = (rowid) => {
        console.log(rowid)
        this.setState({
            diskTable: false,
        })
    }
    handleBack = () => {
        console.log("Hello back")
        this.setState({
            diskTable: true,
        })
    }
    render() {
        return (
            <div>
                {this.state.diskTable &&
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

                        <DataTable data={fakeAlbums} tableRowClickFunc={this.handleDiskTable} />

                        {/* Footer: social medias */}

                        <div className="social">
                            <a href="http://www.google.com"><i className="fa fa-skype fa-2x skype"></i></a>
                            <a href="http://www.google.com"><i className="fa fa-envelope fa-2x gmail"></i></a>
                            <a href="http://www.google.com"><i className="fa fa-facebook-square fa-2x facebook"></i> </a>
                            <p> <strong>Follow me on:</strong> </p>
                        </div>

                    </div>
                }

                <DiskTable disk={fakeDisk} backClickFunc={this.handleBack} />

            </div>
        )
    }
}
export default SearchPage