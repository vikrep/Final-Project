import React, { Component } from 'react';
import { Table, Button, TableBody, TableRow, TableCell, Form, Icon, Popup } from 'semantic-ui-react'
import './styles/InputTrackList.css'

class InputTrackList extends Component {

    render() {
        return (
            <div>
                <Table>
                    <TableBody>
                        {this.props.tracklist.map((newdata, i) =>
                            <TableRow key={`track-row-${i}`}>
                                <TableCell>
                                    <Form>
                                        <Form.Group widths='5'>
                                            <Form.Input id={i} width='1' type="number" min="1" max="20" label='Track #' placeholder='#' name='pos' onChange={(e) => this.props.changeTrack(e)} value={this.props.tracklist[i].pos} />
                                            <Form.Input id={i} width='9' type="text" label='Title' placeholder='Title' name='track' onChange={(e) => this.props.changeTrack(e)} value={this.props.tracklist[i].track} />
                                            <Form.Input id={i} width='1' type="text" label='Duration:' placeholder='0:00' name='time' onChange={(e) => this.props.changeTrack(e)} value={this.props.tracklist[i].time} />
                                            <Form.Input id={i} width='5' type="text" label='Credits' placeholder='Credits' name='disk_credits' onChange={(e) => this.props.changeTrack(e)} value={this.props.tracklist[i].disk_credits} />
                                            <Popup
                                                trigger={<Button icon className="delete" onClick={() => this.props.handleDeleteRow(i)}><Icon name='trash alternate' /></Button>}
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
                    trigger={<Button icon className="plus-track" floated='right' color='olive' onClick={() => this.props.handleAddRow()}><Icon name="plus square" /></Button>}
                    content="Add new track"
                />


            </div>
        )
    }
}

export default InputTrackList;