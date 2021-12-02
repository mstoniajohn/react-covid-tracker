import React from 'react';
import { FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import { useGlobalContext } from '../context';

const Header = ({ country, onCountryChange, countries }) => {
	const { countries: c1 } = useGlobalContext();
	console.log(c1);
	return (
		<div className="flex justify-between">
			<Typography variant="h5">Covid-19 Tracker</Typography>
			<FormControl className="app__dropdown">
				<Select variant="standard" value={country} onChange={onCountryChange}>
					<MenuItem value="worldwide">Worldwide</MenuItem>

					{c1 &&
						c1.map((country) => (
							<MenuItem value={country.value}>{country.name}</MenuItem>
						))}
				</Select>
			</FormControl>
		</div>
	);
};

export default Header;
