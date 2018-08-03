import React, { Component } from 'react'
import { Table, Image, Rating, Button, TableBody, TableRow, TableCell, Segment } from 'semantic-ui-react'
// import './DiskTable.css'

class DiskTable extends Component {


    render() {
        return (
            <div>
               <Segment><Button basic onClick={() => this.props.backClickFunc()}>Return to the collection</Button></Segment>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell width="5">
                                <Image src={this.props.diskData[0].cover} size="medium" bordered />
                            </TableCell>
                            <TableCell>
                                <TableRow>
                                    <TableCell>Artist: </TableCell>
                                    <TableCell>{this.props.diskData[0].artist}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Title: </TableCell>
                                    <TableCell>{this.props.diskData[0].title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Relased: </TableCell>
                                    <TableCell>{this.props.diskData[0].year}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Label: </TableCell>
                                    <TableCell>{this.props.diskData[0].label}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Genre: </TableCell>
                                    <TableCell>{this.props.diskData[0].genre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Style: </TableCell>
                                    <TableCell>{this.props.diskData[0].style}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Country: </TableCell>
                                    <TableCell>{this.props.diskData[0].country}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Format: </TableCell>
                                    <TableCell>{this.props.diskData[0].format}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rating: </TableCell>
                                    <TableCell><Rating icon='star' rating={this.props.diskData[0].rating} maxRating={5} size='small' disabled /></TableCell>
                                </TableRow>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default DiskTable


