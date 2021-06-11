import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

const InfoBoxes = ({ title, cases, total }) => {
	return (
		<Card className="infoBox">
			<CardContent>
				<Typography className="infoBox__title" color="textSecondary">
					{title}
				</Typography>
			</CardContent>
			<h2 className="infoBox__cases">{cases} Cases</h2>
			<Typography className="infoBox__total" color="textSecondary">
				{total} Total
			</Typography>
		</Card>
	);
};

export default InfoBoxes;
