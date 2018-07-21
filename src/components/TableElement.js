import React from 'react'
import { Header, Table, Rating, Image } from 'semantic-ui-react'
import fakeAlbums from '../data/fakeAlbums.json'
import './TableElement.css'

const headerRow = ['Cover', 'Artist', 'Title', 'Year', 'Rating', 'Catalog_Id']
const newHead = props => (
	<th>
		<td>Cover</td>
		<td>Cover</td>
		<td>Cover</td>
		<td>Cover</td>
		<td>Cover</td>
		<td>Cover</td>
		</th>
)

const handler = e => console.log('click');
const altHead = [
	{ content: 'hello', onClick: handler },
	{ content: 'hello' },
	{ content: 'hello' },
	{ content: 'hello' },
	{ content: 'hello' },
	{ content: 'hello' }
]

const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
	key: `result-row-${i}`,
	cells: [
		<td><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
		{ content: artist },
		{ content: title },
		{ content: year, width: '1' },
		<td><Rating icon='star' defaultRating={rating} maxRating={5} size='small' /></td>,
		{ content: id, width: '1' }
	],
})


const SearchTable = () => (
	<Table singleLine verticalAlign='middle' textAlign='center'
	 headerRow={altHead} renderBodyRow={renderBodyRow} tableData={fakeAlbums} />
)


export default SearchTable
