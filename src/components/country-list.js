import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getFlagsAction } from '../redux/flagsDucks'
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

	const countryListByName = useSelector(
		(store) => store.flags.countryListByName
	)

	const countryList = useSelector((store) => {
		if (store.flags.filterByRegion !== '' && countryListByName.length === 0) {
			return store.flags.coutryFilteredByRegion
		}
		if (countryListByName.length > 0) {
			return countryListByName
		}

		return store.flags.countryList
	})

	useEffect(() => {
		dispatch(getFlagsAction())
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
