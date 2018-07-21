import React from 'react'
import { Header, Table, Rating, Image } from 'semantic-ui-react'
import fakeAlbums from '../data/fakeAlbums.json'
import './TableElement.css'

const headerRow = ['Cover', 'Artist', 'Title', 'Year', 'Rating', 'Catalog_Id']

const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
	cells: [
		<td><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
		artist ? { key: 'artist', content: artist } : 'Artist',
		title ? { key: 'title', content: title  } : 'Title',
		year ? { key: 'year', content: year,  width: '1' } : 'Year',
		<td><Rating icon='star' defaultRating={rating} maxRating={5} size='small' /></td>,
		id ? { key: 'id', content: id, width: '1' } : 'Catalog_id'
	],})


const SearchTable = () => (
	<Table singleLine verticalAlign='middle' textAlign='center' headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={fakeAlbums} />
)


export default SearchTable
