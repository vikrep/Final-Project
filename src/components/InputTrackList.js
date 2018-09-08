import React, { Component } from 'react';
// import superagent from 'superagent'
import { Table, Button, TableBody, TableRow, TableCell, TableHeader, Form, Input, TableHeaderCell, Icon } from 'semantic-ui-react'
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
                    time: '',
                    credits: ''
                },
                {
                    pos: '2',
                    track: '',
                    time: '',
                    credits: ''
                },
                {
                    pos: '3',
                    track: '',
                    time: '',
                    credits: ''
                }
            ]
        }
    }

    // Handler for changing input form 
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    // Handler for changing tracklist form 
    handleChangeTrack = (e) => {
        e.preventDefault()
        let newstate = this.state.tracklist
        newstate[e.target.id][e.target.name] = e.target.value
        this.setState({ tracklist: newstate })
    }

    // Handler for activate form by press Enter
    handleKeyPressLoad = (target) => {
        if (target.charCode === 13) {
            this.handleOnLoadRecord()
        }
    }

    // Handler for adding new tracklist row
    handleAddRow = () => {
        var newdata = { pos: '', track: '', time: '', credits: '' }
        this.setState({ tracklist: this.state.tracklist.concat(newdata) });
    }

    // Handler for deleting tracklist row
    handleDeleteRow = (i) => {
        this.setState((prevState) => ({ tracklist: prevState.tracklist.filter((item, index) => (i !== index)) }))
    }



    render() {

        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>
                                <Input placeholder='TrackList by Catalog#' name='idrecord' onKeyPress={this.handleKeyPressLoad} onChange={this.handleChange} value={this.state.idrecord} />
                                <Button icon className="download" color='grey' onClick={this.handleOnLoadTrackList}><Icon name="download" /></Button>
                                <Button icon floated='right' color="green" onClick={this.handleOnSubmitTrackList}><Icon name="upload" /></Button>
                                <Button icon floated='right' color='red' onClick={this.handleOnDeleteTrackList}><Icon name="trash alternate" /></Button>
                                <Button icon floated='right' color='olive' onClick={this.handleOnUpdateTrackList}><Icon aria-label="Delete track" name="save outline" /></Button>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.tracklist.map((newdata, i) =>
                            <TableRow key={`track-row-${i}`}>
                                <TableCell>
                                    <Form>
                                        <Form.Group widths='5'>
                                            <Form.Input id={i} width='1' type="number" min="1" max="20" label='Track #' placeholder='#' name='pos' onChange={this.handleChangeTrack} value={this.state.tracklist[i].pos} />
                                            <Form.Input id={i} width='9' type="text" label='Title' placeholder='Title' name='track' onChange={this.handleChangeTrack} value={this.state.tracklist[i].track} />
                                            <Form.Input id={i} width='1' type="text" label='Duration:' placeholder='0:00' name='time' onChange={this.handleChangeTrack} value={this.state.tracklist[i].time} />
                                            <Form.Input id={i} width='5' type="text" label='Credits' placeholder='Credits' name='credits' onChange={this.handleChangeTrack} value={this.state.tracklist[i].credits} />
                                            <Button icon className="delete" onClick={() => this.handleDeleteRow(i)}><Icon name='trash alternate' /></Button>
                                        </Form.Group>
                                    </Form>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
                <Button icon className="plus-track" floated='right' color='olive' onClick={this.handleAddRow}><Icon name="plus square" /></Button>
            </div>
        )
    }
}

export default InputTrackList;