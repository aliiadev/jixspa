import React, {useState,useEffect} from 'react';
import styles from "../styles/components/_boxBarTabComic.module.scss";
import {Link, useNavigate} from "react-router-dom";
import path from "../contants/path";
import {Col, Row} from "react-bootstrap";
import {useTopComicStore} from "../stores/useTopComicStore";
import ComicHorizontal from "./ComicHorizontal";
import toNumber from "../utils/toNumber";
import {AiOutlineEye} from 'react-icons/ai';
import totalNumberFormat from "../utils/totalNumberFormat";
import WrapperComicHorizontal from "./WrapperComicHorizontal";
import toSlug from "../utils/toSlug";

const tabArr = [
	{name: 'Top tháng'},
	{name: 'Top tuần'},
	{name: 'Top ngày'},
]

const views = {
	'0': 'view_month',
	'1': 'view_week',
	'2': 'view_day',
}

const BoxBarTabComic = () => { // Hiển thị top tháng tuần ngày
	const [topActive, setTopActive] = useState('0');

	const tab = (index) => {
		setTopActive(index.toString());
	};

	const {getListTopComic, listTopComic} = useTopComicStore(state => ({
		getListTopComic: state.getListTopComic,
		listTopComic: state.listTopComic
	}))

	useEffect(()=>{
		async function fetchData(){
			await getListTopComic(topActive)
		}
		fetchData()
	},[topActive]);

	const navigate = useNavigate()

	return (
		<div className={styles.boxBarTabComic}>
			<Row className={styles.tabNav}>
				{tabArr.map(({name}, index)=>(
					<Col
						key={index}
						className={topActive === index.toString() ? styles.active : styles.navItem}
					    onClick={() => tab(index)}>
						<a className={styles.navLink}>
							{name}
						</a>
					</Col>
				))}
			</Row>
			<div className={styles.baxBarContent}>
				{
					Array.isArray(listTopComic)&&(
						listTopComic.map((comic, index)=> (
							<WrapperComicHorizontal onClick={()=> navigate(path.TRUYEN_TRANH + toSlug(comic?.name) + '-' + comic?._id, {replace: true})} key={comic?._id}>
								<span className={`${styles.txtRank} ${styles['top'+index]}`}>0{index + 1}</span>
								<ComicHorizontal
									path={path.TRUYEN_TRANH + toSlug(comic?.name) + '-' + comic?._id}
									thumbStyle={{width: 55, height: 45}}
									key={comic?._id}
									img={comic?.thumbnail}
									name={comic?.name}
									miniTextRight={
										<span>
									<AiOutlineEye/>
											{totalNumberFormat(toNumber(comic[views[topActive]]))}
								</span>
									}
									miniTextLeft={comic?.chapters[0]?comic.chapters[0]?.name:'Chapter...'}
								/>
							</WrapperComicHorizontal>
						))
					)
				}
			</div>
		</div>
	);
};

export default BoxBarTabComic;
