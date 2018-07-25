import React, { Component } from 'react'
import { Table, Menu, Icon, Segment, Input, Image, Rating } from 'semantic-ui-react'
import flatten from 'lodash/flatten'
import debounce from 'lodash/debounce'
import _ from 'lodash'
import './TableElement.css'


class DataTable extends Component {
	defaultPageLimit = 10

	constructor(props) {
		super(props)
		this.data = props.data
		this.paginationLimit = props.pageLimit || this.defaultPageLimit

		const data = this.paginate(this.data)

		this.orignalPagedData = data
		this.pagedData = data

		this.state = {
			index: 0,
			data: data[0],
			column: null,
			direction: null
		}
	}

	// componentWillReceiveProps(newProps) {
	// 	this.data = newProps.data
	// 	this.renderRow = newProps.renderBodyRow
	// 	this.renderHeader = newProps.renderHeaderRow
	// 	this.columns = newProps.columns
	// 	this.paginationLimit = newProps.pageLimit || this.defaultPageLimit

	// 	const data = this.paginate(this.data)

	// 	this.orignalPagedData = data
	// 	this.pagedData = data

	// 	this.setState({
	// 		index: 0,
	// 		sort: {},
	// 		data: data[this.state.index]
	// 	})
	// }

	pageChange = index => {
		let newIndex = this.state.index

		if (index === newIndex) return null
		else if (index === 'next') newIndex++
		else if (index === 'back') newIndex--
		else newIndex = index

		this.setState({ data: this.pagedData[newIndex], index: newIndex })
	}


	search = (data, query) => {
		let searchedData = data

		if (data && Array.isArray(data) && query && query !== '') {
			const regex = new RegExp(query, 'i')
			searchedData = data.filter(row => Object.values(row).some(prop => regex.test(prop)))
		} else {
			searchedData = this.data
		}

		return this.setPagedData(searchedData)
	}

	paginate = (data) => {
		const dataCopy = [...data]
		const pages = []

		while (dataCopy.length) pages.push(dataCopy.splice(0, this.paginationLimit))

		return pages
	}

	setPagedData = (data) => {
		data = this.paginate(data)
		this.pagedData = data
		this.setState(Object.assign(this.state, { data: this.pagedData[this.state.index] }))
		return data
	}

	debouncedSearch = debounce((data, query) => (this.search(data, query)), 250)

	onSearch = (event, term) => {
		this.setState(Object.assign(this.state, { query: term.value }))
		this.debouncedSearch(flatten(this.pagedData), this.state.query)
	}

	handleSort = clickedColumn => () => {
		const { column, data, direction } = this.state
		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [clickedColumn]),
				direction: 'ascending',
			})
			return
		}
		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	}

	render() {

		const { column, direction } = this.state; //sort

		const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
			key: `result-row-${i}`,
			cells: [
				<td width="1"><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
				{ content: artist, width: '4' },
				{ content: title },
				{ content: year, width: '1' },
				<td width="1"><Rating icon='star' defaultRating={rating} maxRating={5}
					size='small' disabled='true' /></td>,
				{ content: id, width: '1' }
			],
		});
		const headerRow = [
			{ content: 'Cover' },
			{
				content: 'Artist', sorted: column === 'artist' ? direction : null,
				onClick: this.handleSort('artist'),
				className: column === 'artist' ? `sorted ${direction}` : `sorted ${null}`
			},
			{
				content: 'Title', sorted: column === 'title' ? direction : null,
				onClick: this.handleSort('title'),
				className: column === 'title' ? `sorted ${direction}` : `sorted ${null}`
			},
			{
				content: 'Year', sorted: column === 'year' ? direction : null,
				onClick: this.handleSort('year'),
				className: column === 'year' ? `sorted ${direction}` : `sorted ${null}`
			},
			{ content: 'Rating' },
			{ content: 'Catalog #' }
		]

		return (

			<div>
				<Segment attached='top' floated="right">
					<Input icon='search' value={this.state.query || ''} onChange={this.onSearch} placeholder='Search...' />
				</Segment>
				<Table singleLine sortable
					verticalAlign='middle' textAlign='center'
					headerRow={headerRow}
					renderBodyRow={renderBodyRow}
					tableData={this.state.data}
				/>
				{this.pagedData.length > 1 &&
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell>
								<Menu floated='right' pagination>
									{this.state.index !== 0 && this.pagedData.length > 1 &&
										<Menu.Item onClick={() => this.pageChange('back')} as='a' icon>
											<Icon name='left chevron' />
										</Menu.Item>
									}
									{this.pagedData.map((dataSet, index) => {
										const active = index === this.state.index
										return (
											<Menu.Item key={index} active={active} onClick={() => this.pageChange(index)} as='a'>
												{index + 1}
											</Menu.Item>
										)
									})}
									{this.state.index + 1 < this.pagedData.length &&
										<Menu.Item onClick={() => this.pageChange('next')} as='a' icon>
											<Icon name='right chevron' />
										</Menu.Item>
									}
								</Menu>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				}

			</div>
		)
	}
}
export default DataTable