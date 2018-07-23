import React, { Component } from 'react';
import { Grid, Col, Image, PageHeader, Button, Carousel, Jumbotron } from 'react-bootstrap';
import './TestPage.css'
export default class TestPage extends Component {
    render() {
        var background = { backgroundSize: 'cover' };
        var textStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%'
        };
        return (
            <div>
                HElllo I am test page
                HElllo I am test page
            <div style={{ width: 'auto' }}>
                    <Image
                        style={background} responsive
                        src="/assets/welcome.jpg">
                    </Image>
                    <h1 style={textStyle}>Text over image</h1>
                </div>
                {/* <div className="bg">
          
            </div> */}
                <Jumbotron>
                    HIIIIIIIIIIIII
                <p>djsfdjglg jfljfl jaslf jasflsajfasfjaslfjas jlas fasjl fjaslfasfjas</p>
                </Jumbotron>
            </div>

// const headerRow = ['Cover', 'Artist', 'Title', 'Year', 'Rating', 'Catalog_Id']
// const newHead = props => (
// 	<th>
// 		<td>Cover</td>
// 		<td>Cover</td>
// 		<td>Cover</td>
// 		<td>Cover</td>
// 		<td>Cover</td>
// 		<td>Cover</td>
// 		</th>
// )
// const handler = e => console.log('click');

        )

    }

}