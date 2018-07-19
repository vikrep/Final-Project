import React, { Component } from 'react';
import { Image,Jumbotron } from 'react-bootstrap';
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
                {/* <Image src=https://image.ibb.co/h3GdjJ/Webp_net_resizeimage.jpg responsive/>
                <BootstrapTable data={fakeAlbums} striped hover condensed pagination search headerStyle={ { background: '#B0C4DE' } } options={ options } >
                    <TableHeaderColumn dataField='cover' width='20%'>Cover</TableHeaderColumn>
                    <TableHeaderColumn dataField='artist' dataSort={ true } width='20%'>Artist</TableHeaderColumn>
                    <TableHeaderColumn dataField='title' width='20%'>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='year' width='10%'>Year</TableHeaderColumn>
                    <TableHeaderColumn dataField='rating'width='20%'>Rating</TableHeaderColumn>
                    <TableHeaderColumn dataField='id' isKey width='10%'>Catalog ID</TableHeaderColumn>
                </BootstrapTable> */}
                <p>hi </p>
                {/* const options = {
             defaultSortName: 'artist',
             defaultSortOrder: 'asc',
            clearSearch: true
               }; */}

            </div>


        )

    }

}