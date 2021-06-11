import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
// import { useGlobalContext } from '../context';

const Header = ({ country, onCountryChange, countries }) => {
	// const { countries } = useGlobalContext();
	return (
		<div className="app__header">
			<h1>Covid-19 Tracker</h1>
			<FormControl className="app__dropdown">
				<Select variant="outlined" value={country} onChange={onCountryChange}>
					<MenuItem value="worldwide">Worldwide</MenuItem>

					{countries &&
						countries.map((country) => (
							<MenuItem value={country.value}>{country.name}</MenuItem>
						))}
				</Select>
			</FormControl>
		</div>
	);
};

export default Header;
