import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import Country from './country'

const CountryListStyled = styled.div`
	display: grid;
	grid-row-gap: 2.3rem;
	grid-auto-flow: columns;
	grid-column-gap: 66px;
	grid-template-columns: repeat(auto-fill, 270px);
	justify-content: center;
	padding: 3rem 0;
	background-color: var(--background);
`

const CountryList = () => {
	const dispatch = useDispatch()

	const countryListByName = useSelector((state) => state.countryListByName)

	const countryList = useSelector((state) => {
		if (state.filterByRegion !== '' && countryListByName.length === 0) {
			return state.coutryFilteredByRegion
		}
		if (countryListByName.length > 0) {
			return countryListByName
		}

		return state.countryList
	})

	useEffect(() => {
		fetch('https://restcountries.eu/rest/v2/all')
			.then((res) => res.json())
			.then((data) =>
				dispatch({
					type: 'SET_COUNTRY_LIST',
					payload: data,
				})
			)
			.catch((err) => {
				console.log(err)
			})
	}, [dispatch])

	//const [countryList, setCountryList] = useState([]);

	return (
		<CountryListStyled>
			{countryList.map(
				({ flag, name, population, region, capital, alpha2Code }) => {
					return (
						<Country
							key={name}
							flag={flag}
							name={name}
							population={population}
							region={region}
							capital={capital}
							alpha2Code={alpha2Code}
						/>
					)
				}
			)}
		</CountryListStyled>
	)
}

export default CountryList
