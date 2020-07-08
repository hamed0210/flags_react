const initialState = {
	countryList: [],
	countryListByName: [],
	coutryFilteredByRegion: [],
	filterByRegion: '',
}

// Types

const SET_COUNTRY_LIST = 'SET_COUNTRY_LIST'
const SET_COUNTRY_BY_NAME = 'SET_COUNTRY_BY_NAME'
const FILTER_BY_REGION = 'FILTER_BY_REGION'

const flagReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COUNTRY_LIST:
			return {
				...state,
				countryList: action.payload,
			}

		case SET_COUNTRY_BY_NAME: {
			let list
			state.filterByRegion !== ''
				? (list = state.coutryFilteredByRegion)
				: (list = state.countryList)

			const countryListByName = list.filter((country) =>
				country.name.toLowerCase().includes(action.payload.toLowerCase())
			)
			return { ...state, countryListByName }
		}

		case FILTER_BY_REGION: {
			const { regionSelected } = action.payload

			if ('' === regionSelected)
				return { ...state, coutryFilteredByRegion: [], filterByRegion: '' }

			const coutryFilteredByRegion = state.countryList.filter(
				(country) => country.region === regionSelected
			)

			return {
				...state,
				coutryFilteredByRegion,
				filterByRegion: regionSelected,
			}
		}

		default:
			return state
	}
}

export default flagReducer

//Acciones

export const getFlagsAction = () => async (dispath, getState) => {
	try {
		const res = await fetch('https://restcountries.eu/rest/v2/all')
		const data = await res.json()
		dispath({
			type: SET_COUNTRY_LIST,
			payload: data,
		})
	} catch (error) {
		console.log(error)
	}
}
