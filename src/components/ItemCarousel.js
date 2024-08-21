import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/components/_itemCarousel.module.scss';
import {formatDateSince} from "../utils/formatDate";
import BASE_URI from "../apis/environmentConfig"
import {Link} from "react-router-dom";
import path from "../contants/path";
import toSlug from "../utils/toSlug";
import {FiClock} from 'react-icons/fi'
import useWindowDimensions from "../hooks/useWindowDimensions";

const ItemCarousel = ({
	id,
	img,
	name = '',
	lastChapter,
	updatedAt
}) => {
	name = name.toLowerCase();

	const ref = useRef();
	const [width, setWidth] = useState(0);

	const {windowWidth} = useWindowDimensions()

	useEffect(() => {
		if(ref.current?.clientWidth !== width) setWidth(ref.current?.clientWidth)
	}, [ref.current?.clientWidth, windowWidth]);

	const onImgLoad = (e) => {
		setWidth(e.target.offsetWidth)
	}

	return (
		<div className={styles.main}>
			<Link aria-hidden={true} to={path.TRUYEN_TRANH + toSlug(name) + '-' + id} className={styles.wrapperImage}>
				<img onLoad={onImgLoad} ref={ref} src={BASE_URI.BASE_URI + img} alt={name}/>
			</Link>
			<div className={styles.footerCaption} style={{width: width}}>
				<h3 className={styles.titleName}>{name}</h3>
				<div className={styles.content}>
					<Link to={path.TRUYEN_TRANH + toSlug(name) + '-' + id}>{lastChapter?lastChapter.name:'Chapter...'}</Link>
					<h3 style={{display:'flex',alignItems:"center",gap:"5px"}}><FiClock/> <span>{formatDateSince(updatedAt)}</span></h3>
				</div>
			</div>
		</div>
	);
};



export default React.memo(ItemCarousel);
