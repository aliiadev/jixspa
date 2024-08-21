import React, {useEffect, useState} from 'react';
import HelmetSEO from "../components/HelmetSEO";
import MainContainer from "../components/MainContainer";
import Carousel from "../components/Carousel";
import styles_Story from "../styles/pages/StoryHot.module.scss";
import styles from "../styles/pages/_home.module.scss";
import {useProductStore} from "../stores/useProductStore";
import {Col, Row} from "react-bootstrap";
import BoxBarTabComic from "../components/BoxBarTabComic";
import Story from "../components/Story";
import createArray from "../utils/createArray";
import BoxBarComicFollows from "../components/BoxBarComicFollows";
import totalNumberFormat from "../utils/totalNumberFormat";
import toNumber from "../utils/toNumber";
import {AiOutlineDoubleRight} from "react-icons/ai";
import path from "../contants/path";
import SkeletonLoading from "../components/SkeletonLoading";
import Pagination from "../components/Pagination";
import BreadCrumb from "../components/BreadCrumb";

const pageName = 'Truyện hot'
const StoryHot = () => {

	const {getProNomination, listNomination, getComicNewUpdate,isLoadingGetComicNewUpdate} = useProductStore(state => ({
		getProNomination: state.getProNomination,
		listNomination: state.listNomination,
		getComicNewUpdate: state.getComicNewUpdate,
		isLoadingGetComicNewUpdate: state.isLoadingGetComicNewUpdate
	}))

	const [currentPage, setCurrenPage] = useState(0);

	const [listComicNewUpdate, setListComicNewUpdate] = useState(null)

	useEffect(()=>{
		getProNomination()
	},[]);

	useEffect(()=> {
		getComicNewUpdate({page_number: currentPage, is_hot: true}).then((res)=>setListComicNewUpdate(res))
	}, [currentPage])

	const renderListComicNewUpdate = (comics = []) => (
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
				hot={is_hot}
				key={_id}
				id={_id}
				listChapter={chapters}
				name={name}
				img={thumbnail}
				totalView={totalNumberFormat(toNumber(view_all))}
				totalComment={totalNumberFormat(toNumber(total_comment))}
				totalLike={totalNumberFormat(toNumber(total_follow))}
			/>
		))
	);
	const onPagination =async (data) =>{
		setCurrenPage(data)
		window.scrollTo({top: 0})
	}
	return (
		<>
			<HelmetSEO seo={'Truyện hot'}/>
			<MainContainer>
				<BreadCrumb text={"Hot"}/>
				<Carousel arr={listNomination} title={'Truyện đề cử >'} />
				<Row style={{padding: '16px 0'}}>
					<Col md={8}>
						<div className={styles.items}>
							<div className="relative">
								<h1 className={styles.page_title}>{'Truyện hot nhất >'}</h1>
							</div>
							<div className={styles.container}>
								<Row>
									{isLoadingGetComicNewUpdate ?
										<SkeletonLoading/>:
										renderListComicNewUpdate(listComicNewUpdate?.results)
									}
								</Row>
							</div>
						</div>
						<Row className={'m-2'}>
							<Col xs={12} className={'d-flex justify-content-center'}>
								<Pagination total={listComicNewUpdate?.total} onClick={onPagination}/>
							</Col>
						</Row>
					</Col>
					<Col md={4}>
						<BoxBarComicFollows/>
						<BoxBarTabComic/>
					</Col>
				</Row>
			</MainContainer>
		</>
	);
};

export default StoryHot;
