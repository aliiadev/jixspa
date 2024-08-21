import React from 'react';
import ScrollTop from "react-scroll-to-top";
import styles from "../styles/components/_scrollToTop.module.scss"
import {MdKeyboardArrowUp} from "react-icons/md";
const ScrollToTop = () => {
	return (
		<div>
			<ScrollTop className={styles.scrollToTop} smooth component={<MdKeyboardArrowUp color='#ee2c74'/>}/>
		</div>
	);
};

export default ScrollToTop;
