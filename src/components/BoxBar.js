import React from 'react';
import styles from '../styles/components/_boxBar.module.scss'
import {Link} from "react-router-dom";

const BoxBar = ({
	src,
	title,
	titleRight = 'Xem tất cả',
	children,
	...rest
}) => {
	return (
		<div className={styles.boxBar} {...rest}>
			<div className={styles.headerBoxBar}>
				<h2>{title}</h2>
				<Link to={src}>{titleRight}</Link>
			</div>
			<div className={styles.mainBox}>
				{children}
			</div>
		</div>
	);
};

export default BoxBar;
