import React, { Component } from 'react'
import { Table, Rating, Image, Pagination } from 'semantic-ui-react'
import fakeAlbums from '../data/fakeAlbums.json'
import './TableElement.css'
import _ from 'lodash'
// import { Input, Segment } from 'semantic-ui-react'
import Search from './Search'


export default class TableElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			column: null,
			direction: null,
			searchName: '',
			data: fakeAlbums,
			currentPage: 1,
			// albumsPerPage: 5
		}
		this.handleSort = this.handleSort.bind(this)
		this.handleClickPage = this.handleClickPage.bind(this)
	}
	handleClickPage(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
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
	// updateSearch = (e) => {
	// 	this.setState({
	// 		search: e.target.value.substr(0, 20) //it accepts max 20 chars
	// 	})
	// 	let filteredData = this.state.data.filter(
	// 		(album) => {
	// 			return album.artist.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
	// 		}
	// 	)
	// 	this.setState({
	// 		data: filteredData
	// 	})
	// }
	setSearchName = (ev) => {
		const searchName = ev.target.value;
		this.setState({
			searchName
		})
	}
	searchByName = () => {
		const { searchName } = this.state
		const filteredData = this.getFilteredDataByName(searchName);
		this.setState({
			data: filteredData
		})
	}
	getFilteredDataByName = (name) => {
		let { data } = this.state;
		if (name !== '') {
			const returnData = data.filter(album => {
				return (album.artist.toLowerCase()) === this.state.searchName.toLowerCase();
			});
			return returnData;
		}
		else {
			return this.showAll;
		}
	}
	showAll = () => {
		this.setState({
			data: fakeAlbums,
			searchName: ''
		})
	}
	render() {
		const { data, currentPage, albumsPerPage } = this.state; //pagination 
		const { column, direction } = this.state; //sort

		// Logic for displaying current albums
		const indexOfLastAlbum = currentPage * albumsPerPage;
		const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
		const currentAlbums = data.slice(indexOfFirstAlbum, indexOfLastAlbum);

		const renderAlbums = currentAlbums.map((album, index) => {
			return <li key={index}>{album}</li>;
		});

		// Logic for displaying page numbers
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(data.length / albumsPerPage); i++) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<li
					key={number}
					id={number}
					onClick={this.handleClickPage}
				>
					{number}
				</li>
			);
		});

		const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
			key: `result-row-${i}`,
			cells: [
				<td><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
				{ content: artist, width: '1' },
				{ content: title },
				{ content: year, width: '1' },
				<td><Rating icon='star' defaultRating={rating} maxRating={5}
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
				{/* Search with simple React */}
				{/* <input type="text" placeholder="Search ..."
					value={this.state.search}
					onChange={this.updateSearch} /> */}

				{/* Search Component based on artist name */}
				<Search setSearchName={this.setSearchName}
					searchName={this.state.searchName}
					searchByName={this.searchByName}
					showAll={this.showAll} />

				<Table singleLine sortable
					verticalAlign='middle' textAlign='center'
					headerRow={headerRow}
					renderBodyRow={renderBodyRow}
					tableData={this.state.data}
				/>
				{/* Pagination */}
				{/* <Pagination defaultActivePage={1} totalPages={10} /> */}

				{/* Pagination with simple react */}
				<ul>
					{renderAlbums}
				</ul>
				<ul id="page-numbers">
					{renderPageNumbers}
				</ul>
			</div>
		)
	}
}

