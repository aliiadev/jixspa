import React, {useEffect, useState} from 'react';
import {useSexComicStore} from "../stores/useSexComicStore";
import HelmetSEO from "../components/HelmetSEO";
import MainContainer from "../components/MainContainer";
import Carousel from "../components/Carousel";
import {useProductStore} from "../stores/useProductStore";
import {Col, Row} from "react-bootstrap";
import styles from "../styles/pages/_home.module.scss";
import createArray from "../utils/createArray";
import BoxBarComicFollows from "../components/BoxBarComicFollows";
import BoxBarTabComic from "../components/BoxBarTabComic";
import Story from "../components/Story";
import totalNumberFormat from "../utils/totalNumberFormat";
import toNumber from "../utils/toNumber";
import Pagination from "../components/Pagination";
import SkeletonLoading from "../components/SkeletonLoading";
import BreadCrumb from "../components/BreadCrumb";

const ComicWoman = () => { // Truyện con gái

	const [currentPage, setCurrenPage] = useState(0)

	const {listComicWoman, getComicBySex, setListComicWoman,loading} = useSexComicStore(state => (
		{listComicWoman: state.listComicWoman, getComicBySex: state.getComicBySex, setListComicWoman: state.setListComicWoman,loading:state.loading}
	));

	const {getProNomination, listNomination} =
		useProductStore(state => ({
			getProNomination: state.getProNomination,
			listNomination: state.listNomination,
		}))

	useEffect(()=> {
		getComicBySex({sex: 'woman',page_number:currentPage}).then((data)=> {
			setListComicWoman(data)
		})
		if(listNomination.length === 0) {
			getProNomination()
		}
	}, [currentPage])

	const renderListComicSex = (comics = []) => (
		comics.map(({
        chapters,
        name,
        thumbnail,
        view_all,
        total_comment,
        total_follow,
        _id,
        is_hot
		   })=>(
			<Story
				key={_id}
				id={_id}
				hot={is_hot}
				listChapter={chapters}
				name={name}
				img={thumbnail}
				totalView={totalNumberFormat(toNumber(view_all))}
				totalComment={totalNumberFormat(toNumber(total_comment))}
				totalLike={totalNumberFormat(toNumber(total_follow))}
			/>
		))
	);
	const onChangePage = (e) =>{
		setCurrenPage(e)
		window.scrollTo({top: 0})
	}
	return (
		<>
			<HelmetSEO seo={'Truyện con gái, tình cảm & lãng mạn - JixOne'}/>
			<MainContainer>
				<BreadCrumb text={"Con gái"}/>
				<Carousel arr={listNomination} title={'Truyện đề cử >'}/>
				<Row style={{padding: '16px 0'}}>
					<Col md={12} lg={8}>
						<div className={styles.items}>
							<div className="relative">
								<h1 className={styles.page_title}>{'Truyện con gái >'}</h1>
							</div>
							<div className={styles.container}>
								<Row>
									{loading?
										<SkeletonLoading/>:
										renderListComicSex(listComicWoman?.results)
									}
								</Row>
							</div>
						</div>
						<Row className={'m-2'}>
							<Col xs={12} className={'d-flex justify-content-center'}>
								<Pagination total={listComicWoman?.total} onClick={onChangePage}/>
							</Col>
						</Row>
					</Col>
					<Col md={12} lg={4}>
						<BoxBarComicFollows/>
						<BoxBarTabComic/>
					</Col>
				</Row>
			</MainContainer>
		</>
	);
};

export default ComicWoman;
