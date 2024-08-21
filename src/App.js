import React, {useEffect, useLayoutEffect, useRef} from 'react';
import './styles/_global.scss';
import './App.css'

import {HelmetProvider} from 'react-helmet-async';
import {
	Routes as ListRoute,
	useNavigate,
	Route, Navigate
} from 'react-router-dom';
import {routes, privateRoutes} from './routes';
import {useDarkTheme} from './stores/useDarkTheme';
import path from "./contants/path";
import {useUserStore} from "./stores/useUserStore";
import {v4} from 'uuid'
import useLocalStorage from "use-local-storage";
import ScrollToTop from './hooks/ScrollToTop'
import randomName from "./utils/randomName";

const App = () => {

	const {isDarkMode} = useDarkTheme(state => ({isDarkMode: state.isDarkMode}));

	const [guiUID, setGuiUID] = useLocalStorage('guiUID', {})

	useLayoutEffect(()=> {
		if(guiUID['uuGuiID'] === undefined) {
			let ud = {...guiUID}
			ud.uuGuiID = v4()
			setGuiUID(ud)
		}
		if(guiUID['gName'] === undefined) {
			let ud = {...guiUID}
			ud.gName = randomName()
			setGuiUID(ud)
		}
		if(guiUID['gAv'] === undefined) {
			let ud = {...guiUID}
			ud.gAv = Math.floor(Math.random() * 3) + 1
			setGuiUID(ud)
		}

	}, [])

	// const navigate = useNavigate()

	// useEffect(()=> {
	// 	const host = window.location.href
	// 	navigate(host.split(window.location.origin)[1])
	// }, [])

	const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;

	useEffect(() => {
		if(reloadCount < 1) {
			sessionStorage.setItem('reloadCount', String(reloadCount + 1));
			window.location.reload();
		}
	}, []);

	return (
		<div data-theme={isDarkMode? 'dark': 'light'} >
			<HelmetProvider>
				<ScrollToTop/>
				<ListRoute>
					{routes.map((route)=>(
						<Route key={route.path} element={route.component} path={route.path} exact/>
					))}
					{privateRoutes.map((it)=>(
						<Route key={it.path} exact path={it.path}
							element={
								<RequireAuth>
									{it.component}
								</RequireAuth>}
						/>
					))}
				</ListRoute>
			</HelmetProvider>
		</div>
	);
};

function RequireAuth ({children}) {
	const {user} = useUserStore(state => ({
		user: state.user,
	}))

	if (user?.email === undefined) {
		return <Navigate to={path.ADMIN_LOGIN}/>
	}
	return children
}


export default App;
