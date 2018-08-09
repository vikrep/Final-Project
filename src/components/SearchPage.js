import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import DataTable from './DataTable';
import 'font-awesome/css/font-awesome.min.css';
// import fakeAlbums from '../data/fakeAlbums.json';
// import fakeDisk from '../data/fakeDisk.json';
import './SearchPage.css';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeAlbums: [],
            fakeDisk: [],
            isFetched: false,
            isLoading: false,
            error: ''
        }
    }
  
    // Ajax request
    componentDidMount() {
		if (this.state.isFetched === false) {
			this.setState({ isLoading: true });
			fetch(`https://fierce-refuge-31884.herokuapp.com/api/albums`) // fetch from Heroku database
				.then((response) => {
					if (response.status >= 200 && response.status < 300) {
						return response;
					} else {
						throw new Error('HTTP error');
					}
				})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this.setState({
						fakeAlbums: data, // data.rows for local data
						isFetched: true,
						isLoading: false
					});
				})
				.catch((err) => {
					this.setState({
						isLoading: false,
						error: err.toString()
					});
				});
		}
	}



    render() {
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

                        <DataTable data={this.state.fakeAlbums}  />

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
export default SearchPage