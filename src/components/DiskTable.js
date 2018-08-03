import React, { Component } from 'react'
import { Table, Image, Rating, Button, TableBody, TableRow, TableCell, Segment, Header, Grid, List, Divider } from 'semantic-ui-react'


class DiskTable extends Component {


    render() {

        const itemContent = this.props.diskData
        const content = this.props.diskData.tracklist
        const time = this.props.diskData.tracktime
       
        return (
            <div>
                <Segment><Button basic onClick={() => this.props.backClickFunc()}>Return to the collection</Button></Segment>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell width="5">
                                <Image src={itemContent.cover} size="medium" bordered />
                            </TableCell>
                            <TableCell>
                                <TableRow>
                                    <TableCell>Artist: </TableCell>
                                    <TableCell>{itemContent.artist}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Title: </TableCell>
                                    <TableCell>{itemContent.title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Relased: </TableCell>
                                    <TableCell>{itemContent.year}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Label: </TableCell>
                                    <TableCell>{itemContent.label}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Genre: </TableCell>
                                    <TableCell>{itemContent.genre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Style: </TableCell>
                                    <TableCell>{itemContent.style}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Country: </TableCell>
                                    <TableCell>{itemContent.country}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Format: </TableCell>
                                    <TableCell>{itemContent.format}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rating: </TableCell>
                                    <TableCell><Rating icon='star' rating={itemContent.rating} maxRating={5} size='small' disabled /></TableCell>
                                </TableRow>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Header size="medium" dividing>Tracklist:</Header>    
                
                <Grid>
                    <Grid.Column floated='left' width={5}>
                    <List ordered items={content} />
                    </Grid.Column>
                    <Grid.Column floated='left' width={5}>
                    <List items={time} />
                    </Grid.Column>
                </Grid>
                <Divider />
            </div>
        )
    }
}

export default DiskTable


