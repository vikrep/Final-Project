import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import upload from 'superagent'
import { Table, Button, TableBody, TableRow, TableCell, TableHeader, Image, Form } from 'semantic-ui-react'
import './styles/InputData.css'
class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      disabled: true,
      imageUrl: '',
      artist: '',
      title: '',
      year: 0,
      rating: 1,
      id: '',
      country: '',
      label: '',
      format: '',
      genre: '',
      style: '',
      credits: '',
      notes: ''
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onDrop = (files) => {
    this.setState({ files });
  }
  // https://fierce-refuge-31884.herokuapp.com/upload
  // http://localhost:5000/upload

  handleOnSubmitImage = (event) => {
    upload.post('https://fierce-refuge-31884.herokuapp.com/upload')
      .attach('imageFile', this.state.files[0])
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      })
    this.setState({ imageUrl: `https://s3.eu-west-2.amazonaws.com/diskcovers/${this.state.files[0].name}` })
  }
  handleOnSubmitForm = (event) => {
    upload.post('https://fierce-refuge-31884.herokuapp.com/upload/form')
      .type('form')
      .send({
        cover: this.state.imageUrl, artist: this.state.artist,
        title: this.state.title, year: this.state.year, rating: this.state.rating,
        id: this.state.id, country: this.state.country, label: this.state.label,
        format: this.state.format, genre: this.state.genre, style: this.state.style,
        credits: this.state.credits, notes: this.state.notes
      })
      .end((err, res) => {
        if (err) console.log(err);
        alert('Form uploaded!');
      })
  }

  onMouseOver = (event) => {
    console.log(this.state.imageUrl)
    this.setState({ disabled: !this.state.disabled })
  }

  render() {
    return (
      <div id="subform">
        <Table className="subform-table">
          <TableHeader className="table-header-align-right" >
            <TableRow>
              <TableCell>
                <Button color="blue">Save Draft</Button>
                <Button color="green" onClick={this.handleOnSubmitImage}>Submit Image</Button>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key="dropzone">
              <TableCell>
                <div className="dropzone" onMouseOver={this.onMouseOver}>
                  <Dropzone accept="image/jpeg" onDrop={this.onDrop} multiple={false}
                    className="dropzone-cell">
                    {!this.state.imageUrl &&
                      <div className="dropzone-cell-div">
                        <h2>+</h2>
                        <h3>Upload image</h3>
                        <h4>Drag and drop file or clic to browse</h4>
                      </div>}
                    <Image src={this.state.imageUrl} size="medium" bordered />
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
            <TableRow key="artist-title">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='equal'>
                    <Form.Input label='Artist' placeholder='Artist' name='artist' onChange={this.handleChange} />
                    <Form.Input label='Title' placeholder='Title' name='title' onChange={this.handleChange} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="year-rating-id">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='equal'>
                    <Form.Input type='number' label='Year' placeholder='Year' name='year' onChange={this.handleChange} />
                    <Form.Input type='number' max='5' min='1' label='Rating' placeholder='Rating' name='rating' onChange={this.handleChange} />
                    <Form.Input label='Catalog#' placeholder='Catalog#' name='id' onChange={this.handleChange} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="country-label-format">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='equal'>
                    <Form.Input label='Country' placeholder='Country' name='country' onChange={this.handleChange} />
                    <Form.Input label='Label' placeholder='Label' name='label' onChange={this.handleChange} />
                    <Form.Input label='Format' placeholder='Format' name='format' onChange={this.handleChange} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="genre-style-credits">
              <TableCell>
                <Form>
                  <Form.Group unstackable widths='3'>
                    <Form.Input label='Genre' placeholder='Genre' width='3' name='genre' onChange={this.handleChange} />
                    <Form.Input label='Style' placeholder='Style' width='3' name='style' onChange={this.handleChange} />
                    <Form.Input label='Notes' placeholder='Notes' width='10' name='notes' onChange={this.handleChange} />
                  </Form.Group>
                </Form>
              </TableCell>
            </TableRow>
            <TableRow key="credits">
              <TableCell>
                <Form>
                  <Form.Input label='Credits' placeholder='Credits' widths='equal' name='credits' onChange={this.handleChange} />
                </Form>
              </TableCell>
            </TableRow>
            <TableRow className="table-header-align-right">
              <TableCell>
                <Button color="blue">Save Draft</Button>
                <Button color="green" onClick={this.handleOnSubmitForm}>Submit Form</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default InputData;