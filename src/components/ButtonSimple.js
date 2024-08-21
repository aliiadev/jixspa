import React from 'react';
import styles from "../styles/components/_buttonSimple.module.scss"

const ButtonSimple = ({
	text,
	active=false,
	onclick
  }) => {
	return (
		<button
			className={active? styles.active:styles.default}
			onClick={onclick}>
			{text}
		</button>
	);
};

export default ButtonSimple;