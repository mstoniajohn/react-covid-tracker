import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import './Map.css';
import { showDataOnMap } from '../util';
import { useGlobalContext } from '../context';

const Map = ({ countries, casesType, center, zoom }) => {
	const { countries: c1 } = useGlobalContext();

	return (
		<div className="map">
			<MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{showDataOnMap(c1, casesType)}
			</MapContainer>
		</div>
	);
};

export default Map;
