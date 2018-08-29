import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import upload from 'superagent'
import { Table, Button, TableBody, TableRow, TableCell, TableHeader, Image } from 'semantic-ui-react'
import './styles/InputData.css'
class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      disabled: true,
      imageUrl: ''
    };
  }

  onDrop = (files) => {
    this.setState({ files });
  }
  // https://fierce-refuge-31884.herokuapp.com/upload
  // http://localhost:5000/upload

  handleOnSubmit = (event) => {
    upload.post('https://fierce-refuge-31884.herokuapp.com/upload')
      .attach('imageFile', this.state.files[0])
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      })
    this.setState({ imageUrl: `https://s3.eu-west-2.amazonaws.com/diskcovers/${this.state.files[0].name}` })
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
                <Button color="green" onClick={this.handleOnSubmit}>Submit</Button>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
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
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default InputData;