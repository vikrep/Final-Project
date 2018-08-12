import React, { Component } from 'react'
import { Table, Image, Rating, Button, TableBody, TableRow, TableCell, Segment, Header, Divider } from 'semantic-ui-react'


class DiskTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            titleId: props.titleId,
            diskData: [],
            isFetched: false,
            isLoading: false,
            error: '',
            diskItem: props.diskItem
        }
    }
// Ajax request
    componentDidMount() {
        if (this.state.isFetched === false) {
            this.setState({ isLoading: true });
            fetch(`http://localhost:5000/api/disk/${this.state.titleId}`) // fetch from Heroku database
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
                        diskData: data, // data.rows for local data
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

        // create row for  tracklist table
        const renderBodyRow = ({ track, time }, i) => ({
            key: `result-row-${i}`,
            cells: [
                { content: `${i+1} .` },
                { content: track },
                { content: time }
            ],
        });

        return (
            <div>
                <Segment><Button basic onClick={() => this.props.backClickFunc()}>Return to the collection</Button></Segment>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell width="5">
                                <Image src={this.state.diskItem.cover} size="medium" bordered />
                            </TableCell>
                            <TableCell>
                                <TableRow>
                                    <TableCell>Artist: </TableCell>
                                    <TableCell>{this.state.diskItem.artist}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Title: </TableCell>
                                    <TableCell>{this.state.diskItem.title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Relased: </TableCell>
                                    <TableCell>{this.state.diskItem.year}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Label: </TableCell>
                                    <TableCell>{this.state.diskItem.label}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Genre: </TableCell>
                                    <TableCell>{this.state.diskItem.genre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Style: </TableCell>
                                    <TableCell>{this.state.diskItem.style}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Country: </TableCell>
                                    <TableCell>{this.state.diskItem.country}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Format: </TableCell>
                                    <TableCell>{this.state.diskItem.format}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rating: </TableCell>
                                    <TableCell><Rating icon='star' rating={this.state.diskItem.rating} maxRating={5} size='small' disabled /></TableCell>
                                </TableRow>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Header size="medium" dividing>Tracklist:</Header>

                <Table singleLine collapsing basic="very"
                    textAlign='left'
                    renderBodyRow={renderBodyRow}
                    tableData={this.state.diskData}
                />
                <Divider />
            </div>
        )
    }
}

export default DiskTable


