import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Input, Image, Rating, Pagination, Dropdown, Header, Button, TableBody, TableRow, TableCell } from 'semantic-ui-react'
import flatten from 'lodash/flatten'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import './DiskTable.css'

class DiskTable extends Component {


    render() {

        return (
            <div>
                <Button onClick={() => this.props.backClickFunc()}>Return to the collection</Button>
            </div>
        )
    }
}

export default DiskTable