import React, { Component } from 'react';
import { Grid, Col, Image } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './ResultTable.css';
import FormExample from './FormExample';
import fakeAlbums from '../data/fakeAlbums.json'
// import columns from '../data/columns.json'

export default class ResultTable extends React.Component {
     render() {
    //     (cover) => {
    //         return <div><img src="http://25.io/smaller/img/smaller_256x256.png"/></div>},
        const columns = [
            {
                dataField: 'cover', 
                text:'Cover',
                align:'center',
                events: {
                    onClick: () => alert('Go to another page to show the album')
                  }
            }, {
                dataField: 'artist',
                text: 'Artist',
                sort: true,
                headerStyle: {
                    // fontSize: '1.9rem'
                }
            }, {
                dataField: 'title',
                text: 'Title',
                sort: true
            }, {
                dataField: 'year',
                text: 'Year',
                sort: true
            }, {
                dataField: 'rating',
                text: 'Rating'
            }, {
                dataField: 'id',
                text: 'Catalog ID'
            }
        ]
        return (
            <div>
                <FormExample />
                {/* <Image src="https://image.ibb.co/h3GdjJ/Webp_net_resizeimage.jpg" responsive/>
                <div className="rating">
<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
</div> */}
                <BootstrapTable keyField='id' data={fakeAlbums} columns={columns}
                    pagination={paginationFactory()}
                    headerClasses="header-class" rowClasses="custom-row-class" />

                <div className="social">
                    <a href="http://www.google.com"><i className="fa fa-skype fa-2x skype"></i></a>
                    <a href="http://www.google.com"><i className="fa fa-envelope fa-2x gmail"></i></a>
                    <a href="http://www.google.com"><i className="fa fa-facebook-square fa-2x facebook"></i> </a>
                    <p> <strong>Follow me on:</strong> </p>
                </div>
            </div>
        );
    }
}