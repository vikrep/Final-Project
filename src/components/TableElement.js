import React, { Component } from 'react'
import { Header, Table, Rating, Image } from 'semantic-ui-react'
import fakeAlbums from '../data/fakeAlbums.json'
import './TableElement.css'
import _ from 'lodash'

export default class SearchPage extends Component {
	render() {
		const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
			key: `result-row-${i}`,
			cells: [
				<td><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
				{ content: artist, width: '1' },
				{ content: title },
				{ content: year, width: '1' },
				<td><Rating icon='star' defaultRating={rating} maxRating={5} size='small' disabled='true' /></td>,
				{ content: id, width: '1' }
			],
		})
		this.state = {
			column: null,
			data: fakeAlbums,
			direction: null,
		}
		const { column, data, direction } = this.state;
		this.handleSort = clickedColumn => () => {
			const { column, data, direction } = this.state
		
			if (column !== clickedColumn) {
			  this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [clickedColumn]),
				direction: 'ascending',
			  })
		
			  return
			}
		}
		const altHead = [
			{ content: 'Cover' },
			{ content: 'Artist', sorted: column === 'artist' ? direction : null, onClick: this.handleSort('artist') },
			{ content: 'Title', sorted: column === 'title' ? direction : null, onClick: this.handleSort('title') },
			{ content: 'Year', sorted: column === 'year' ? direction : null, onClick: this.handleSort('year') },
			{ content: 'Rating' },
			{ content: 'catalog #' }
		]
		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		  })

		return (
			<Table singleLine
				verticalAlign='middle' textAlign='center'
				headerRow={altHead}
				renderBodyRow={renderBodyRow}
				tableData={fakeAlbums} sortable/>
		)
	}
}
