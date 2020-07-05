import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const CountryStyled = styled.div`
	text-align: left;
	border-radius: 5px;
	box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.03);
	overflow: hidden;
	cursor: pointer;
	img {
		width: 100%;
		height: 160px;
		object-fit: cover;
		vertical-align: top;
	}
	.details {
		padding: 1.5rem;
		background-color: var(--white);
	}
	h2 {
		margin: 0;
		margin-bottom: 1rem;
		font-size: 18px;
		font-weight: 700;
	}
	p {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}
`

const Country = ({ flag, name, population, region, capital, alpha2Code }) => {
	const history = useHistory()
	const handleClick = () => {
		history.push(`/country/${alpha2Code}`)
	}
	return (
		<CountryStyled onClick={handleClick}>
			<img loading='lazy' src={flag} alt='' />
			<div className='details'>
				<h2>{name}</h2>
				<p>
					<strong>Population:</strong> {population}
				</p>
				<p>
					<strong>Population:</strong> {population}
				</p>
				<p>
					<strong>Region:</strong> {region}
				</p>
				<p>
					<strong>Capital:</strong> {capital}
				</p>
			</div>
		</CountryStyled>
	)
}

export default Country
