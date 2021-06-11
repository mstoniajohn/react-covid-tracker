import React, { useState, useContext, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [countries, setCountries] = useState([]);
	const openSidebar = () => {
		setIsSidebarOpen(true);
	};
	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const getCountries = async () => {
		// setLoading();

		const res = await fetch('https://disease.sh/v3/covid-19/countries');
		const data = await res.json();
		const countries = data.map((country) => ({
			name: country.country,
			value: country.countryInfo.iso2,
		}));
		setCountries(countries);
	};
	useEffect(() => {
		getCountries();
	}, []);

	return (
		<AppContext.Provider
			value={{
				isSidebarOpen,
				isModalOpen,
				closeModal,
				openModal,
				openSidebar,
				closeSidebar,
				getCountries,
				countries,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// custom hook
export const useGlobalContext = () => {
	return useContext(AppContext);
};
export { AppContext, AppProvider };
