import React from 'react';
import {formatDateSince} from "../utils/formatDate";
import styles from "../styles/components/_Chapter.module.scss"

const Chapter = ({
	name,
	update_at= new Date(),
	active = false
}) => {
	return (
		<div className={styles.main}>
			<h2 className={`${styles.h2_name} ${active&&styles.h2_name_active}`}>{name}</h2>
			<span className={styles.h2_update_at}>{formatDateSince(update_at)}</span>
		</div>
	);
};

export default Chapter;
