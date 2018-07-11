import React, { Component } from 'react';
import { Grid, Col, Image, PageHeader, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TestPage.css'
export default class TestPage extends Component {
    render() {
        return (
            <div id="carousel">
                HElllo I am test page
             <Carousel>
                    <Carousel.Item>
                        <img  alt="900x500" src="/assets/1.jpg" responsive />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt="900x500" src="/assets/2.jpg" responsive/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img  alt="900x500" src="/assets/3.jpg" responsive/>
                    </Carousel.Item>
                    {/* <Carousel.Item>
                    <Image src="/assets/welcome.jpg" responsive />
                        </Carousel.Item> */}
                </Carousel>;
                HElllo I am test page
                 {/* <div className="hero-image">
                    <div className="hero-text">
                        <h1 > ffsf sfsfsf</h1>
                        <p>And ddf sdffdaf sfdafsdafsdf </p>
                        <p>And ddf sdffdaf sfdafsdafsdf </p>
                       
                    </div>
                </div> */}

                <Grid>
                       <p>the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      <Col xs={12} sm={8} smOffset={2}>
                   </Col>
                    <Link to="/test">
                        <Button className="btn btn-lg btn-secondary">Go to Test page</Button>
                    </Link>

                </Grid>
            </div>
            

        )

    }

}