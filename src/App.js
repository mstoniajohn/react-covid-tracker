import { useEffect, useState } from 'react';
import Header from './components/Header';
import InfoBoxes from './components/InfoBoxes';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './util';
// import Map from './components/Map';
import { Card, CardContent } from '@material-ui/core';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';
import CovidMap from './components/CovidMap';
function App() {
	// const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState('cases');
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
	const [mapZoom, setMapZoom] = useState();
	const [mapCountries, setMapCountries] = useState([]);
	const [countryName, setCountryName] = useState('worldwide');
	const [flag, setFlag] = useState('');
	const onCountryChange = async (e) => {
		const countryCode = e.target.value;

		setCountry(countryCode);
		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryName(data.country);
				setCountryInfo(data);
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setFlag(data.countryInfo.flag);
				setMapZoom(8);
			});
		// const res = await fetch(url);
		// const data = await res.json();
		// setCountry(countryCode);
		// setCountryInfo(data);
		// setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
		// setMapZoom(4);
	};

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((res) => res.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);
	useEffect(() => {
		const getCountries = async () => {
			// setLoading();

			const res = await fetch('https://disease.sh/v3/covid-19/countries');
			const data = await res.json();
			const countries = data.map((country) => ({
				name: country.country,
				value: country.countryInfo.iso2,
			}));
			setCountries(countries);
			const sortedData = sortData(data);
			setTableData(sortedData);
			setMapCountries(data);
		};
		getCountries();
	}, []);
	// console.log(country);

	return (
		<div className="app">
			<div className="app__left">
				<Header
					country={country}
					onCountryChange={onCountryChange}
					countries={countries}
				/>

				<div className="app__stats">
					<InfoBoxes
						onClick={(e) => setCasesType('cases')}
						title="Coronavirus Cases"
						isRed
						active={casesType === 'cases'}
						cases={prettyPrintStat(countryInfo.todayCases)}
						total={numeral(countryInfo.cases).format('0.0a')}
					/>
					<InfoBoxes
						onClick={(e) => setCasesType('recovered')}
						title="Recovered"
						active={casesType === 'recovered'}
						cases={prettyPrintStat(countryInfo.todayRecovered)}
						total={numeral(countryInfo.recovered).format('0.0a')}
					/>
					<InfoBoxes
						onClick={(e) => setCasesType('deaths')}
						title="Deaths"
						isRed
						active={casesType === 'deaths'}
						cases={prettyPrintStat(countryInfo.todayDeaths)}
						total={numeral(countryInfo.deaths).format('0.0a')}
					/>
				</div>
				{/* <Map
					countries={mapCountries}
					mapCenter={mapCenter}
					center={mapCenter}
					zoom={mapZoom}
				/> */}
				<CovidMap
					countries={mapCountries}
					country={countryName}
					center={mapCenter}
					zoom={mapZoom}
					flag={flag}
				/>
			</div>
			<Card className="app__right">
				<CardContent>
					<div className="app__information">
						<h3>Live Cases by Country</h3>
						<Table countries={tableData} />
						<h3>Worldwide new {casesType}</h3>
						<LineGraph casesType={casesType} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
