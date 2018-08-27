import React, { Component } from 'react';


class ImportData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false,
            imageURL: '',
        }
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }


    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch('https://fierce-refuge-31884.herokuapp.com/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ imageURL: `https://fierce-refuge-31884.herokuapp.com/${body.file}`, uploadStatus: true });
            });
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleUploadImage}>
                    <div className="form-group">
                        <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </div>

                    <button className="btn btn-success" type>Upload</button>

                </form>
            </div>
        )
    }
}


export default ImportData
