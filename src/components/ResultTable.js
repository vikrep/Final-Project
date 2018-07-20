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
        // style={{width:'50px'}}
        function imageFormatter(cell, row) {
            return (<img className="album" style={{ borderRadius: "50%" }} src={cell} />)
        }
        //rating is just for design purpose, not accepted
        function starFormatter(cell, row) {
            return <div>
                <span className="yellow">⭐</span><span>⭐</span><span>⭐</span><span>☆</span><span>☆</span>
            </div>}
               
        const columns = [
            {
                dataField: 'cover',
                text: 'Cover',
                align: 'center',
                events: {
                    onClick: () => alert('Go to another page to show the album')
                },
                formatter: imageFormatter,
                headerStyle: {
                    width: '14%',
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
                sort: true,
                headerStyle: {
                    width: '10%',
                }
            }, {
                dataField: 'rating',
                text: 'Rating',
                headerStyle: {
                    width: '20%',
                },
                formatter: starFormatter,
                // hidden:true

            }, {
                dataField: 'id',
                text: 'Catalog ID',
                headerStyle: {
                    width: '15%',
                }
            }
        ]
        return (
            <div>
                <FormExample />
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