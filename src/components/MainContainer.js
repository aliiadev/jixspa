import React from 'react';
import {Container} from "react-bootstrap";
import styles from '../styles/components/_mainContainer.module.scss'
import Header from "./Header";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";

const MainContainer = ({children, is_show_mobile_header = true}) => {
	return (
		<>
			<Header is_show_mobile={is_show_mobile_header}/>
			<NavBar/>
			<div className={styles.wrapperMain}>
				<Container className={styles.containerStyle}>
					{children}
				</Container>
			</div>
			<ScrollToTop/>
			<Footer/>
		</>
	);
};

export default MainContainer;
