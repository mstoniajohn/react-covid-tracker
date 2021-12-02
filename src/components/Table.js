import React from 'react';
import './Table.css';
import { formatNumber } from '../util';

const Table = ({ countries }) => {
	return (
		<div className="h-72 bg-gray-100 overflow-scroll">
			<thead className="flex justify-between text-l">
				<th>Country</th>
				<th>Cases</th>
			</thead>
			{countries &&
				countries.map(({ country, cases }, i) => (
					<tr
						className={`flex p-1 justify-between ${
							i % 2 === 0 ? 'bg-white' : ''
						}`}
					>
						<td> {country}</td>
						<td>
							<strong>{formatNumber(cases)}</strong>
						</td>
					</tr>
				))}
		</div>
	);
};

export default Table;
