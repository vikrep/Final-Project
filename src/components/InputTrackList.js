import React, { Component } from 'react';
// import superagent from 'superagent'
import { Table, Button, TableBody, TableRow, TableCell, TableHeader, Form, Input, TableHeaderCell } from 'semantic-ui-react'
import './styles/InputTrackList.css'

class InputTrackList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idrecord: '',
            tracklist: [
                {
                    pos: '1',
                    track: '',
                    time: ''
                },
                {
                    pos: '2',
                    track: '',
                    time: ''
                },
                {
                    pos: '3',
                    track: '',
                    time: ''
                }
            ]
        }
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleChangeTrack = (e) => {
        e.preventDefault()
        let newstate = this.state.tracklist
        newstate[e.target.id][e.target.name] = e.target.value
        this.setState({ tracklist: newstate })
    }

    handleKeyPressLoad = (target) => {
        if (target.charCode === 13) {
            this.handleOnLoadRecord()
        }
    }
    handleAddRow = () => {
        var newdata = { pos: '', track: '', time: '' }
        this.setState({ tracklist: this.state.tracklist.concat(newdata) });
    }

    render() {

        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>
                                <Input placeholder='TrackList by Catalog#' name='idrecord' onKeyPress={this.handleKeyPressLoad} onChange={this.handleChange} value={this.state.idrecord} />
                                <Button color='grey' onClick={this.handleOnLoadTrackList}>Load Tracklist</Button>
                                <Button floated='right' color='red' onClick={this.handleOnDeleteTrackList}>Delete TrackList</Button>
                                <Button floated='right' color='olive' onClick={this.handleOnUpdateTrackList}>Update TrackList</Button>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Button floated='right' color="green" onClick={this.handleOnSubmitTrackList}>Submit TrackList</Button>
                                <Button floated='right' color='blue'>Save Draft TrackList</Button>
                            </TableCell>
                        </TableRow>
                        {this.state.tracklist.map((newdata, i) =>
                            <TableRow key={`track-row-${i}`}>
                                <TableCell>
                                    <Form>
                                        <Form.Group unstackable widths='3'>
                                            <Form.Input id={i} width='2' type="number" min="1" max="20" label='Track #' placeholder='#' name='pos' onChange={this.handleChangeTrack} value={this.state.tracklist[i].pos} />
                                            <Form.Input id={i} width='14' type="text" label='Title' placeholder='Title' name='track' onChange={this.handleChangeTrack} value={this.state.tracklist[i].track} />
                                            <Form.Input id={i} width='2' type="text" label='Duration:' placeholder='0:00' name='time' onChange={this.handleChangeTrack} value={this.state.tracklist[i].time} />
                                        </Form.Group>
                                    </Form>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
                <Button floated='right' color='olive' onClick={this.handleAddRow}>Add track</Button>
            </div>
        )
    }
}

export default InputTrackList;