import React from 'react';
import './Table.css';
import { formatNumber } from '../util';

const Table = ({ countries }) => {
	return (
		<div className="table">
			<thead>
				<th>Country</th>
				<th>Cases</th>
			</thead>
			{countries &&
				countries.map(({ country, cases }) => (
					<tr>
						<td>{country}</td>
						<td>
							<strong>{formatNumber(cases)}</strong>
						</td>
					</tr>
				))}
		</div>
	);
};

export default Table;
