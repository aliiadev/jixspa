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
import SkeletonLoading from "../components/SkeletonLoading";
import Pagination from "../components/Pagination";
import BreadCrumb from "../components/BreadCrumb";

const ComicMan = () => { // Truyện con trai
	const [currentPage, setCurrenPage] = useState(0)

	const {listComicMan, getComicBySex, setListComicMan,loading} = useSexComicStore(state => (
		{listComicMan: state.listComicMan, getComicBySex: state.getComicBySex, setListComicMan: state.setListComicMan,loading: state.loading}
	));

	const {getProNomination, listNomination} =
		useProductStore(state => ({
			getProNomination: state.getProNomination,
			listNomination: state.listNomination,
		}))

	useEffect(()=> {
		getComicBySex({sex: 'man',page_number:currentPage}).then((data)=> {
			setListComicMan(data)
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
	const onChangPage = (e) =>{
		setCurrenPage(e)
		window.scrollTo({top: 0})
	}

	return (
		<>
			<HelmetSEO seo={'Truyện tranh dành cho con trai'}/>
			<MainContainer>
				<BreadCrumb text={"Con trai"}/>
				<Carousel arr={listNomination} title={'Truyện đề cử >'}/>
				<Row style={{padding: '16px 0'}}>
					<Col md={12} lg={8}>
						<div className={styles.items}>
							<div className="relative">
								<h1 className={styles.page_title}>{'Truyện con trai >'}</h1>
							</div>
							<div className={styles.container}>
								<Row>
									{loading?
										<SkeletonLoading/>:
										renderListComicSex(listComicMan?.results)
									}
								</Row>
							</div>
						</div>
						<Row className={'m-2'}>
							<Col xs={12} className={'d-flex justify-content-center'}>
								<Pagination total={listComicMan?.total} onClick={onChangPage}/>
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

export default ComicMan;
