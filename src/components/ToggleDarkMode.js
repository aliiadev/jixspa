import React, {useEffect} from 'react';
import useLocalStorage from 'use-local-storage'
import {useDarkTheme} from "../stores/useDarkTheme";
import {FaRegLightbulb} from "react-icons/fa"
import styles from '../styles/layout/_header.module.scss'

const ToggleDarkMode = () => {

	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

	const {setIsDarkMode} = useDarkTheme(state => ({setIsDarkMode: state.setIsDarkMode}))

	const toggleThemeChange = () => {
		const toggle = theme === 'light' ? 'dark' : 'light'
		setTheme(toggle)
		setIsDarkMode(toggle === 'dark')
	}

	useEffect(()=> {
		setIsDarkMode(theme === 'dark')
	}, [])

	return (
		<div onClick={toggleThemeChange} className="dark-mode-switch">
			<FaRegLightbulb size={24} type="checkbox" className={styles.light} id="theme-toggle"/>
		</div>
	)
};

export default ToggleDarkMode;
