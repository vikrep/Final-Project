import React, { Component } from 'react';
// import superagent from 'superagent'
import { Table, Button, TableBody, TableRow, TableCell, Form, Icon, Popup } from 'semantic-ui-react'
import './styles/InputTrackList.css'

class InputTrackList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tracklist: []
        }
    }

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
        if(this.props.albumNum){
        var newdata = { pos: '', track: '', time: '', credits: '',  disk: '', idrecord: this.props.albumNum }
        this.setState({ tracklist: this.state.tracklist.concat(newdata) });}
        else { alert('!!! Enter Catalog# before create new track !!!')}
    }

    // Handler for deleting tracklist row
    handleDeleteRow = (i) => {
        this.setState((prevState) => ({ tracklist: prevState.tracklist.filter((item, index) => (i !== index)) }))
    }

    render() {

        return (
            <div>
                <Table>
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
                                            <Popup
                                                trigger={<Button icon className="delete" onClick={() => this.handleDeleteRow(i)}><Icon name='trash alternate' /></Button>}
                                                content="Delete this track"
                                            />
                                        </Form.Group>
                                    </Form>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
                <Popup
                    trigger={<Button icon className="plus-track" floated='right' color='olive' onClick={this.handleAddRow}><Icon name="plus square" /></Button>}
                    content="Add new track"
                />


            </div>
        )
    }
}

export default InputTrackList;