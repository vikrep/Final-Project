import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input, Image, Rating, Pagination, Dropdown, Header, Button, TableBody, TableRow, TableCell } from 'semantic-ui-react'
import flatten from 'lodash/flatten';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import DiskTable from './DiskTable';
import './DataTable.css'


class DataTable extends Component {
	defaultPageLimit = 5

	// options for pagination
	options = [
		{ key: "1", value: '10', text: '10 per pages' },
		{ key: "2", value: '20', text: '20 per pages' },
		{ key: "3", value: '50', text: '50 per pages' },
	]

	constructor(props) {
		super(props)

		this.data = props.data // input data collection
		this.paginationLimit = this.defaultPageLimit
		this.twentyLastRows = this.twentyLastData(this.data)
		const data = this.paginate(this.twentyLastRows)
		this.pagedData = data
		this.disk = []

		this.state = {
			index: 0,
			data: data[0],
			column: null,
			direction: null,
			totalPages: this.pagedData.length,
			pageLimits: this.paginationLimit,
			headerOn: true,
			diskTable: false,
			titleId: ''
		}
		this.handleOnPerPage = this.handleOnPerPage.bind(this)
		this.handleOnAllRecords = this.handleOnAllRecords.bind(this)
		this.tableRowClickFunc = this.tableRowClickFunc.bind(this)
	}

	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
		pageLimit: PropTypes.number,
	};

	

	// Changing page table for rendering
	handlePaginationChange = (e, { activePage }) => {
		let newIndex = activePage - 1
		this.setState({ activePage: activePage, index: newIndex, data: this.pagedData[newIndex] })
	}
	// handler changing amount rows per page in the table
	handleOnPerPage = (e, data) => {
		this.paginationLimit = parseInt(data.value, 10)
		let newPagedData = flatten(this.pagedData)
		this.setPagedData(newPagedData)
		this.setState({
			pageLimits: parseInt(data.value, 10),
		})
	};

	// handler show all records 
	handleOnAllRecords = (e) => {
		const data = this.paginate(this.data)
		this.pagedData = data
		this.setState({
			index: 0,
			data: this.pagedData[0],
			totalPages: this.pagedData.length,
			headerOn: false,
			column: null,
			direction: null,
		})
	}
	// function search element - any data
	search = (data, query) => {
		let searchedData = data
		if (data && Array.isArray(data) && query && query !== '') {
			const regex = new RegExp(query, 'i')
			searchedData = data.filter(row => Object.values(row).some(prop => regex.test(prop)))
		} else {
			searchedData = this.data
			this.setState({
				column: null,
				direction: null,
				index: 0,
				headerOn: false
			})
		}
		this.setState({
			column: null,
			direction: null,
			index: 0,
			headerOn: false
		})
		return this.setPagedData(searchedData)
	};
	// function of partitioning table data into pages
	paginate = (data) => {
		const dataCopy = [...data]
		const pages = []
		while (dataCopy.length) pages.push(dataCopy.splice(0, this.paginationLimit))
		return pages
	};

	// function initially sliced last twenty records
	twentyLastData = (data) => {
		const slicedData = data.slice(-20)
		return slicedData
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
		this.debouncedSearch(this.data, this.state.query)
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
	tableRowClickFunc = (rowid) => {
		const data = _.find(this.data, function (item){
			return item.id ===  rowid});
		this.disk = data
		this.setState({
			diskTable: true,
			titleId: rowid
		})
		
	}
	handleBack = () => {
		this.setState({
			diskTable: false,
		})
	}

	render() {

		const { column, direction, activePage, totalPages } = this.state; //sort
		let totalFound = flatten(this.pagedData).length

		// const for rendering table body
		const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
			key: `result-row-${i}`,
			cells: [
				<td key='td-row-1' width="1" onClick={() => this.tableRowClickFunc(id)}><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
				{ content: artist, width: '4', onClick: () => this.tableRowClickFunc(id) },
				{ content: title, onClick: () => this.tableRowClickFunc(id) },
				{ content: year, width: '1', onClick: () => this.tableRowClickFunc(id) },
				<td key='td-row-2' width="1" onClick={() => this.tableRowClickFunc(id)}><Rating icon='star' rating={rating} maxRating={5}
					size='small' disabled /></td>,
				{ content: id, width: '1', onClick: () => this.tableRowClickFunc(id) }
			],
		});
		// const for rendering table header
		const headerRow = [
			{ key: 'header-1', content: 'Cover' },
			{
				key: 'header-2',
				content: 'Artist', sorted: column === 'artist' ? direction : null,
				onClick: this.handleSort('artist'),
				className: column === 'artist' ? `sorted ${direction}` : `sorted ${null}`
			},
			{
				key: 'header-3',
				content: 'Title', sorted: column === 'title' ? direction : null,
				onClick: this.handleSort('title'),
				className: column === 'title' ? `sorted ${direction}` : `sorted ${null}`
			},
			{
				key: 'header-4',
				content: 'Year', sorted: column === 'year' ? direction : null,
				onClick: this.handleSort('year'),
				className: column === 'year' ? `sorted ${direction}` : `sorted ${null}`
			},
			{ key: 'header-5', content: 'Rating' },
			{ key: 'header-6', content: 'Catalog #' }
		]

		return (
			<div key="wrap-key">
				{!this.state.diskTable && 
					<div key="wrap-table-key">
						<Table celled textAlign="center">
							<TableBody>
								<TableRow>
									<TableCell>
										<Input icon='search' value={this.state.query || ''} onChange={this.onSearch} placeholder='Search...' />
									</TableCell>
									<TableCell>
										Found in search table: {totalFound}
									</TableCell>
									<TableCell>
										Total records in the collection : {this.data.length}
									</TableCell>
									<TableCell>
										<Button basic onClick={this.handleOnAllRecords}>Show all records</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						{this.state.headerOn &&
							<Header size="medium" dividing>20 last added records</Header>
						}
						<Table singleLine sortable selectable
							verticalAlign='middle' textAlign='center'
							headerRow={headerRow}
							renderBodyRow={renderBodyRow}
							tableData={this.state.data}
						/>

						<Dropdown compact selection placeholder='Per page...'
							onChange={this.handleOnPerPage}
							options={this.options}
						/>
						{this.pagedData.length > 1 &&
							<Pagination
								activePage={activePage}
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
				}
				{this.state.diskTable &&
					<DiskTable titleId={this.state.titleId} backClickFunc={this.handleBack} diskItem={this.disk} />
				}
			</div>
		)
	}
}
export default DataTable


