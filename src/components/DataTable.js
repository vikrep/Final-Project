import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Menu, Icon, Segment, Input, Image, Rating } from 'semantic-ui-react'
import flatten from 'lodash/flatten'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import './DataTable.css'

class DataTable extends Component {
	defaultPageLimit = 10

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
			direction: null
		}
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
			data: data[this.state.index]
		});
	};
	// helper function to set state
	// setStateHelper(newPageIndex) {
	// 	this.setState({ data: this.pagedData[newPageIndex], index: newPageIndex });
	// };

	// Changing page table for rendering
	pageChange(clickedPageNumber) {
		 const currentPage = this.state.index;
		console.log("hi pageChange is called",clickedPageNumber)
		 if (clickedPageNumber === 'next') this.setState({ data: this.pagedData[currentPage + 1], index: currentPage + 1 })
		 if (clickedPageNumber === 'back') this.setState({ data: this.pagedData[currentPage - 1], index: currentPage - 1 })
		 if (clickedPageNumber !== currentPage) this.setState({ data: this.pagedData[clickedPageNumber], index: clickedPageNumber })

		// let newPage = this.state.index;  //suppose newpage is currentpage

		// if (clickedPageNumber === newPage) return  //stop execution of this function
		// else if (clickedPageNumber === 'next') newPage++ //go to nextpage of currentPage
		// else if (clickedPageNumber === 'back') newPage-- //go to previouspage of currentPage
		// else newPage = clickedPageNumber //go to pageNumber which is clicked on 

		// this.setState({ data: this.pagedData[newPage], index: newPage })
	};
	// function search element - any data
	search = (data, query) => {
		let searchedData = data //make a safe copy of data
		if (data && Array.isArray(data) && query && query !== '') {
			const regex = new RegExp(query, 'i')
			searchedData = data.filter(row => Object.values(row).some(prop => regex.test(prop)))
		} else {
			searchedData = this.originalData
			this.setState({
				column: null,
				direction: null,
			})
		}
		return this.setPagedData(searchedData)
	};
	// function of partitioning table data into pages
	paginate = (data) => {
		const dataCopy = [...data] //copy of an array
		const pages = []
		while (dataCopy.length) pages.push(dataCopy.splice(0, this.paginationLimit))
		return pages
	};
	// function update paged data in state
	setPagedData = (data) => {
		data = this.paginate(data)
		this.pagedData = data
		this.setState( { index: 0, data: this.pagedData[0] })
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

		const { column, direction } = this.state; //sort
		// const for rendering table body
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
		];

		return (

			<div>
				<Segment attached='top' floated="left">
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
								<PaginationNav currentPage={this.state.index} pagedData={this.pagedData} clickHandler={(index) => this.pageChange(index)} />
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				}
			</div>
		)
	}
}
export default DataTable


class PaginationNav extends React.Component {
	render() {
		return (<Menu floated='right' pagination>
			{this.props.currentPage !== 0 && this.props.pagedData.length > 1 &&
				<Menu.Item onClick={() => this.props.clickHandler('back')} as='a' icon>
					<Icon name='left chevron' />
				</Menu.Item>
			}
			{this.props.pagedData.map((dataSet, index) => {
				const active = index === this.props.currentPage //active is a boolean variable
				return (
					<Menu.Item key={index} active={active} onClick={() => this.props.clickHandler(index)} as='a'>
						{index + 1}
					</Menu.Item>
				)
			})}
			{this.props.currentPage + 1 < this.props.pagedData.length &&
				<Menu.Item onClick={() => this.props.clickHandler('next')} as='a' icon>
					<Icon name='right chevron' />
				</Menu.Item>
			}
		</Menu>
		)
	}
}