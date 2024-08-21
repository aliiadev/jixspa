import React from 'react';
import styles from "../styles/components/_buttonBase.module.scss";

const ButtonBase = ({
	theme = 'primary',
	text,
	componentLeft,
	componentRight,
	isLoading = false,
	onClick,
	disable,
	...rest
}) => {

	if (isLoading === true) {
		text = 'loading';
		disable = true
	}
	if (disable === true) {

	}

	return (
		<button
			onClick={onClick}
			disabled={disable}
			className={`${styles[theme]} ${styles.btn} ${disable ? styles.disable : ''}`}
			{...rest}
		>
			{componentLeft} {text} {componentRight}
		</button>
	);
};

export default ButtonBase;
