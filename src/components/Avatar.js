import React from 'react';
import styles from '../styles/components/_avatar.module.scss'

const Avatar = ({src}) => {
	return (
		<div className={styles.main}>
			<img src={src} alt={'avatar'}/>
		</div>
	);
};

export default Avatar;
