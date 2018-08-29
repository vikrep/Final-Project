import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import upload from 'superagent'
import { Table, Button, TableBody, TableRow, TableCell, TableHeader } from 'semantic-ui-react'
import './styles/InputData.css'
class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      disabled: true
    };
  }

  onDrop = (files) => {
    this.setState({ files });
  }
  handleOnSubmit = (event) => {
    upload.post('https://fierce-refuge-31884.herokuapp.com/upload')
      .attach('imageFile', this.state.files[0])
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      })
  }
  onDragOver = (event) => {
    console.log("onDragOver")
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
                <div className="dropzone" onMouseOver={this.onDragOver}>
                  <Dropzone accept="image/jpeg" onDrop={this.onDrop} multiple={false}
                    className="dropzone-cell">
                    <div className="dropzone-cell-div">
                      <h2>+</h2>
                      <h3>Upload image</h3>
                      <h4>Drag and drop file or clic to browse</h4>
                    </div>
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