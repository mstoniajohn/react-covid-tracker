import React, { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';

const CovidMap = ({ country, flag, center, zoom }) => {
	// const [lat, setLat] = useState(null);
	// const [lng, setLng] = useState(null);

	// const { lat, lng } = center;

	// const [loading, setLoading] = useState(true);

	const [viewport, setViewport] = useState({
		latitude: center.lat || 40.712772,
		longitude: center.lng || -73.935242,
		zoom: zoom,
		width: '100%',
		height: '500px',
	});

	const curCountry = country === 'worldwide' ? 'worldwide' : country;

	return (
		<div>
			<ReactMapGl
				{...viewport}
				mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API_TOKEN}`}
				onViewportChange={(vp) => setViewport(vp)}
			>
				<Marker
					key={curCountry}
					latitude={viewport.latitude}
					longitude={viewport.longitude}
				>
					<FaMapPin className="pin-color" />
					<img src={flag ? flag : ''} alt={curCountry} height="25" />
				</Marker>
			</ReactMapGl>
		</div>
	);
};

export default CovidMap;
