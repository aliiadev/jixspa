import React from 'react';
import styles from '../styles/components/_wrapperComicHorizontal.module.scss'

const WrapperComicHorizontal = ({children, ...rest}) => {
	return (
		<div className={styles.main} {...rest}>
			{children}
		</div>
	);
};

export default WrapperComicHorizontal;
