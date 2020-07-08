import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import generateStore from './redux/store'
import ActionList from './components/action-list'
import Header from './components/header'
import CountryPage from './components/country-page'
import CountryList from './components/country-list'

const store = generateStore()

function App() {
	const [darkMode, setDarkMode] = useState(false)
	const [checked, setChecked] = useState(false)
	const mainClass = darkMode ? 'is-dark-mode' : 'is-light-mode'

	function changeMedia(mq) {
		setDarkMode(mq.matches)
		setChecked(mq.matches)
	}

	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)')
		mq.addListener(changeMedia)
		setDarkMode(mq.matches)
		setChecked(mq.matches)
		return () => {
			mq.removeListener(changeMedia)
		}
	}, [])

	return (
		<main className={mainClass}>
			<Provider store={store}>
				<Router>
					<Header setDarkMode={setDarkMode} darkMode={darkMode} />
					<Switch>
						<Route path='/country/:id' component={CountryPage} />
						<Route path='/'>
							<ActionList />
							<CountryList />
						</Route>
					</Switch>
				</Router>
			</Provider>
		</main>
	)
}

export default App
