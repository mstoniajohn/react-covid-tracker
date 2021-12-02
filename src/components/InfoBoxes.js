import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

const InfoBoxes = ({ title, cases, total }) => {
	return (
		<Card className="p-2 mb-1 shadow text-center">
			<CardContent>
				<Typography variant="h6" color="textSecondary">
					{title}
				</Typography>
			</CardContent>
			<Typography variant="h6" className="font-bold">
				{cases} Cases
			</Typography>
			<Typography className="" color="textSecondary">
				{total} Total
			</Typography>
		</Card>
	);
};

export default InfoBoxes;
