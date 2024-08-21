import React from 'react';
import styles from '../styles/components/_comicHorizontal.module.scss';
import {Link} from "react-router-dom";
import path from "../contants/path";
import {Image} from "react-bootstrap";
import {GrFormClose} from "react-icons/gr"
import EnvironmentConfig from "../apis/environmentConfig";
import addDotsStr from "../utils/addDotsStr";

const ComicHorizontal = ({
	name = '',
	img,
	miniTextLeft,
	miniTextRight,
	isDelete = false,
	thumbStyle,
	path,
	onclick
}) => {
	const remove = <span onClick={onclick}><GrFormClose size={16}/>Xóa</span>

	return (
		<div className={styles.comicHorizontal}>
			<Link className={styles.thumb} style={thumbStyle} to={path} title={name}>
				<Image alt={name} src={EnvironmentConfig.BASE_URI + img}/>
			</Link>
			<div className={styles.wrapperContent}>
				<h3 className={styles.title}>
					<Link className={styles.titleText} to={path}>{addDotsStr(name.toLowerCase(), 30)}</Link>
				</h3>
				<div className={styles.chapter}>
					<Link className={styles.chapterTitle} to={path}>{miniTextLeft}</Link>
					<span className={styles.time}>{isDelete ? remove:miniTextRight}</span>
				</div>
			</div>
		</div>
	);
};

export default ComicHorizontal;
