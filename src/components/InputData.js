import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent'
import { Icon, Table, Button, TableBody, TableRow, TableCell, TableHeader, Image, Form, Input, TableHeaderCell, Divider } from 'semantic-ui-react'
import InputTrackList from './InputTrackList.js';
import './styles/InputData.css'

class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      disabled: true,
      cover: '',
      artist: '',
      title: '',
      year: '',
      rating: '',
      id: '',
      country: '',
      label: '',
      format: '',
      genre: '',
      style: '',
      credits: '',
      notes: '',
      idrecord: ''
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleKeyPressLoad = (target) => {
    if (target.charCode === 13) {
      console.log("target", target.charCode)
      this.handleOnLoadRecord()
    }
  }

  onDrop = (files) => {
    this.setState({ files });
  }
  // https://fierce-refuge-31884.herokuapp.com/upload
  // http://localhost:5000/upload

  handleOnSubmitImage = (event) => {
    superagent.post('https://fierce-refuge-31884.herokuapp.com/upload')
      .attach('imageFile', this.state.files[0])
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      })
    this.setState({ cover: `https://s3.eu-west-2.amazonaws.com/diskcovers/${this.state.files[0].name}` })
  }

  handleOnSubmitForm = (event) => {
    const { cover, artis, title, year, rating, id, country, label, format, genre, style, credits, notes } = this.state
    if (this.state.id) {
      superagent.post('https://fierce-refuge-31884.herokuapp.com/upload/form')
        .type('form')
        .send({
          cover, artis, title, year, rating, id, country, label, format, genre, style, credits, notes
        })
        .end((err, res) => {
          if (err) console.log(err);
          alert('Form uploaded!');
        })
    } else { alert('Catalog# is required!') }
  }

  onMouseOver = (event) => {
    this.setState({ disabled: !this.state.disabled })
  }

  handleOnLoadRecord = (event) => {
    superagent.get(`https://fierce-refuge-31884.herokuapp.com/loadrecord/${this.state.idrecord}`)
      .end((err, res) => {
        if (!err && res) {
          const data = res.body[0];
          this.setState({
            artist: data.artist, title: data.title, year: data.year, rating: data.rating,
            id: data.id, country: data.country, label: data.label, format: data.format, genre: data.genre,
            style: data.style, credits: data.credits, notes: data.notes
          })
        } else {
          console.log('There was an error fetching from Database', err)
        }
      })
  }

  handleOnUpdateRecord = (event) => {
    const { cover, artis, title, year, rating, id, country, label, format, genre, style, credits, notes } = this.state
    superagent.put(`https://fierce-refuge-31884.herokuapp.com/loadrecord`)
      .type('form')
      .send({
        cover, artis, title, year, rating, id, country, label, format, genre, style, credits, notes
      })
      .end((err, res) => {
        if (err) console.log(err);
        alert(`Record ${this.state.id} updated!`);
      })
  }

  handleOnDeleteRecord = (event) => {
    superagent.delete(`https://fierce-refuge-31884.herokuapp.com/loadrecord`)
      .type('form')
      .send({ id: this.state.id })
      .end((err, res) => {
        if (err) console.log(err);
        alert(`Record ${this.state.id} deleted!`);
      })
  }

  render() {
    return (
      <div id="subform">
      <Divider horizontal><h4>Upload Cover Image</h4></Divider>
        <Table className="subform-table">
          <TableHeader className="table-header-align-right" >
            <TableRow>
              <TableHeaderCell>
                {/* <Button icon color="blue"><Icon name="save outline" /></Button> */}
                <Button icon color="green" onClick={this.handleOnSubmitImage}><Icon name="upload" /></Button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key="dropzone">
              <TableCell>
                <div className="dropzone" onMouseOver={this.onMouseOver}>
                  <Dropzone accept="image/jpeg" onDrop={this.onDrop} multiple={false}
                    className="dropzone-cell">
                    {!this.state.cover &&
                      <div className="dropzone-cell-div">
                        <h2>+</h2>
                        <h3>Upload image</h3>
                        <h4>Drag and drop file or clic to browse</h4>
                      </div>}
                    <Image src={this.state.cover} size="medium" bordered />
                  </Dropzone>
                </div>
                <aside>
                  <h3>Dropped files</h3>
                  <ul>
                    {
                      this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                  </ul>
                </aside>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Divider horizontal><h4>Main Table</h4></Divider>
        <Table>
          <TableHeader>
            <TableRow key='button-header'>
              <TableHeaderCell>
                <Input placeholder='Enter record by Catalog#' name='idrecord' onKeyPress={this.handleKeyPressLoad} onChange={this.handleChange} value={this.state.idrecord} />
                <Button icon className="download" color='grey' onClick={this.handleOnLoadRecord}><Icon name="download" /></Button>
                <Button icon floated='right' color="green" onClick={this.handleOnSubmitForm}><Icon name="upload" /></Button>
                <Button icon floated='right' color='red' onClick={this.handleOnDeleteRecord}><Icon name="trash alternate" /></Button>
                <Button icon floated='right' color='olive' onClick={this.handleOnUpdateRecord}><Icon name="save outline" /></Button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key="artist-title">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='equal'>
                    <Form.Input label='Artist' placeholder='Artist' name='artist' onChange={this.handleChange} value={this.state.artist} />
                    <Form.Input label='Title' placeholder='Title' name='title' onChange={this.handleChange} value={this.state.title} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="year-rating-id">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='equal'>
                    <Form.Input type='number' min='1900' label='Year' placeholder='Year' name='year' onChange={this.handleChange} value={this.state.year} />
                    <Form.Input type='number' max='5' min='1' label='Rating' placeholder='Rating' name='rating' onChange={this.handleChange} value={this.state.rating} />
                    <Form.Input required label='Catalog#' placeholder='Catalog#' name='id' onChange={this.handleChange} value={this.state.id} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="country-label-format">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='equal'>
                    <Form.Input label='Country' placeholder='Country' name='country' onChange={this.handleChange} value={this.state.country} />
                    <Form.Input label='Label' placeholder='Label' name='label' onChange={this.handleChange} value={this.state.label} />
                    <Form.Input label='Format' placeholder='Format' name='format' onChange={this.handleChange} value={this.state.format} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="genre-style-notes">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='3'>
                    <Form.Input label='Genre' placeholder='Genre' width='3' name='genre' onChange={this.handleChange} value={this.state.genre} />
                    <Form.Input label='Style' placeholder='Style' width='3' name='style' onChange={this.handleChange} value={this.state.style} />
                    <Form.Input label='Notes' placeholder='Notes' width='10' name='notes' onChange={this.handleChange} value={this.state.notes} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="credits">
              <TableCell>
                <Form>
                  <Form.Input label='Credits' placeholder='Credits' widths='equal' name='credits' onChange={this.handleChange} value={this.state.credits} />
                </Form>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Divider horizontal><h4>Track List</h4></Divider>
        <InputTrackList />
      </div>
    );
  }
};

export default InputData;