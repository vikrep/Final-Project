import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Input, Image, Rating, Pagination, Dropdown, Segment } from 'semantic-ui-react'
import flatten from 'lodash/flatten'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import './DataTable.css'


class DataTable extends Component {
	defaultPageLimit = 5
	options = [
		{ key: "1", value: '5', text: '5 per pages' },
		{ key: "2", value: '10', text: '10 per pages' },
		{ key: "3", value: '20', text: '20 per pages' },
		{ key: "4", value: '50', text: '50 per pages' },
	]

	constructor(props) {
		super(props)
		this.originalData = props.data
		this.data = props.data
		this.paginationLimit = props.pageLimit || this.defaultPageLimit

		const data = this.paginate(this.data)
		this.pagedData = data

		this.state = {
			index: 0,
			data: data[0],
			sortedData: {},
			column: null,
			direction: null,
			totalPages: this.pagedData.length,
			pageLimits: this.paginationLimit,


		}
		this.handleOnPerPage = this.handleOnPerPage.bind(this)
	}

	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
		pageLimit: PropTypes.number,
	};

	componentWillReceiveProps(newProps) {
		this.data = newProps.data
		this.renderRow = newProps.renderBodyRow
		this.renderHeader = newProps.renderHeaderRow
		this.columns = newProps.columns
		this.paginationLimit = newProps.pageLimit || this.defaultPageLimit

		const data = this.paginate(this.data)
		this.pagedData = data

		this.setState({
			index: 0,
			sortedData: {},
			column: null,
			direction: null,
			data: data[this.state.index],
			activePage: 1,
			totalPages: this.pagedData.length,
			pageLimits: this.paginationLimit
		});
	};

	// Changing page table for rendering
	handlePaginationChange = (e, { activePage }) => {
		let newIndex = activePage - 1
		this.setState({ activePage: activePage, index: newIndex, data: this.pagedData[newIndex] })
	}

	handleOnPerPage = (e, data) => {
		this.paginationLimit = parseInt(data.value, 10)
		console.log(this.paginationLimit)
		let newPagedData = flatten(this.pagedData)
		this.setPagedData(newPagedData)
		this.setState({
			pageLimits: parseInt(data.value, 10),
		})
	}

	// function search element - any data
	search = (data, query) => {
		let searchedData = data
		if (data && Array.isArray(data) && query && query !== '') {
			const regex = new RegExp(query, 'i')
			searchedData = data.filter(row => Object.values(row).some(prop => regex.test(prop)))
		} else {
			searchedData = this.originalData
			this.setState({
				column: null,
				direction: null,
				index: 0,
			})
		}
		return this.setPagedData(searchedData)
	};
	// function of partitioning table data into pages
	paginate = (data) => {
		const dataCopy = [...data]
		const pages = []
		while (dataCopy.length) pages.push(dataCopy.splice(0, this.paginationLimit))
		return pages
	};
	// function update paged data in state
	setPagedData = (data) => {
		data = this.paginate(data)
		this.pagedData = data
		this.setState({ index: 0, data: this.pagedData[0], totalPages: this.pagedData.length })
		return data
	};

	debouncedSearch = debounce((data, query) => (this.search(data, query)), 250) // function execution delay

	// function handler search
	onSearch = (event, term) => {
		this.setState(Object.assign(this.state, { query: term.value }))
		this.debouncedSearch(flatten(this.pagedData), this.state.query)
	};

	// function handler sort 
	handleSort = clickedColumn => () => {
		const { column, direction } = this.state
		let dataSort = flatten(this.pagedData)
		if (column !== clickedColumn) {
			dataSort = _.sortBy(dataSort, [clickedColumn]) //Lodash ascending sort
			const data = this.paginate(dataSort)
			this.pagedData = data
			this.setState({
				column: clickedColumn,
				data: this.pagedData[this.state.index],
				direction: 'ascending',
			})
			return
		}
		dataSort = flatten(this.pagedData)
		let dataReverse = dataSort.reverse()
		const data = this.paginate(dataReverse)
		this.pagedData = data
		this.setState({
			data: this.pagedData[this.state.index],
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	};

	render() {

		const { column, direction, activePage, totalPages, } = this.state; //sort
		// const for rendering table body
		const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
			key: `result-row-${i}`,
			cells: [
				<td width="1"><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
				{ content: artist, width: '4' },
				{ content: title },
				{ content: year, width: '1' },
				<td width="1"><Rating icon='star' rating={rating} maxRating={5}
					size='small' disabled /></td>,
				{ content: id, width: '1' }
			],
		});
		// const for rendering table header
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
				<Segment>
					<Input icon='search' value={this.state.query || ''} onChange={this.onSearch} placeholder='Search...' />
				</Segment>
				<Table singleLine sortable
					verticalAlign='middle' textAlign='center'
					headerRow={headerRow}
					renderBodyRow={renderBodyRow}
					tableData={this.state.data}
				/>
				<Dropdown selection placeholder='Per page...'
					onChange={this.handleOnPerPage}
					options={this.options}
				/>
				{this.pagedData.length > 1 &&
					<Pagination
						ActivePage={activePage}
						defaultActivePage={1}
						firstItem={{ content: <Icon name='angle double left' />, icon: true }}
						lastItem={{ content: <Icon name='angle double right' />, icon: true }}
						prevItem={{ content: <Icon name='angle left' />, icon: true }}
						nextItem={{ content: <Icon name='angle right' />, icon: true }}
						pointing
						secondary
						totalPages={totalPages}
						onPageChange={this.handlePaginationChange}
					/>
				}
			</div>
		)
	}
}
export default DataTable


