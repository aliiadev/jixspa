import React, {useState} from 'react';
import {TiTick} from "react-icons/ti";
import {IoCloseOutline} from "react-icons/io5";
import styles from "../styles/components/_checkBox.module.scss";

const CheckBox = ({name, id, onClick = ()=> {}}) => {

	const [active, setActive] = useState('2')

	const onActive = () => {
		switch (active) {
			case '0':
				setActive('1');
				onClick({id, cb: '1'})
				break
			case '1':
				setActive('2');
				onClick({id, cb: '2'})
				break
			case '2':
				setActive('0');
				onClick({id, cb: '0'})
				break
		}
	}

	const boxs = {
		'0': <TiTick size={18} color="#40C057"/>,
		'1': <IoCloseOutline size={18} color="#FA5252"/>,
		'2': <IoCloseOutline size={18} color="#F8F9FA"/>
	}

	return (
		<div className={styles.checkBox} onClick={onActive}>
			<span className={styles.borderBox}>
				{boxs[active]}
			</span>
			{name}
		</div>
	);
};

export default CheckBox;
