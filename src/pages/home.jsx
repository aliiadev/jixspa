import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Carousel from "../components/Carousel";
import Story from "../components/Story";
import {useProductStore} from "../stores/useProductStore";
import BoxBarTabComic from "../components/BoxBarTabComic";
import styles from "../styles/pages/_home.module.scss";
import HelmetSEO from "../components/HelmetSEO";
import MainContainer from "../components/MainContainer";
import BoxBar from "../components/BoxBar";
import path from "../contants/path";
import totalNumberFormat from "../utils/totalNumberFormat";
import toNumber from "../utils/toNumber";
import BoxBarComicFollows from "../components/BoxBarComicFollows";
import ComicHorizontal from "../components/ComicHorizontal";
import useLocalStorage from "use-local-storage";
import Pagination from "../components/Pagination";
import SkeletonLoading from "../components/SkeletonLoading";
import {FcFilledFilter} from "react-icons/fc"
import {Link} from "react-router-dom";
import WrapperComicHorizontal from "../components/WrapperComicHorizontal";


const Home = () => {
	const [visited,setVisited] = useLocalStorage('visited-comics', [])


	const {getProNomination, listNomination, getComicNewUpdate,isLoadingGetComicNewUpdate} =
		useProductStore(state => ({
			getProNomination: state.getProNomination,
			listNomination: state.listNomination,
			getComicNewUpdate: state.getComicNewUpdate,
			isLoadingGetComicNewUpdate:state.isLoadingGetComicNewUpdate
		}))

	const [currentPage, setCurrenPage] = useState(0)
	const [listComicNewUpdate, setListComicNewUpdate] = useState(null)

	useEffect(()=>{
		getProNomination()
	},[]);

	useEffect(()=> {
		getComicNewUpdate({page_number: currentPage})
			.then((res)=>{
				setListComicNewUpdate(res)
			})
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

	const handleDelete = (data) =>{
		let comicHasRead = visited.find(v => v._id === data)
		let filterResult = visited.filter(function(element){
			return element !== comicHasRead;
		});
		setVisited(filterResult)
	}
	const paginationPage = async (data) =>{
		setCurrenPage(parseInt(data))
		window.scrollTo({top: 0})
	}


	return (
		<>
			<HelmetSEO seo={'Đọc truyện tranh online - Truyện tranh bản quyền - JixOne'}/>
			<MainContainer>
				<Carousel arr={listNomination} title={'Truyện đề cử >'}/>
				<Row style={{padding: '16px 0'}}>
					<Col md={12} lg={8}>
						<div className={styles.items}>
							<div className={`relative ${styles.relative}`}>
								<h1 className={styles.page_title}>{'Truyện mới cập nhật >'}</h1>
								<Link to={path.TIM_KIEM_NANG_CAO}>
									<FcFilledFilter size={20}/>
								</Link>
							</div>
							<div className={styles.container}>
								<Row>
									{isLoadingGetComicNewUpdate?
										<SkeletonLoading/>:
										renderListComicNewUpdate(listComicNewUpdate?.results)
									}
								</Row>
							</div>
						</div>
						<Row className={'m-2'}>
							<Col xs={12} className={'d-flex justify-content-center'}>
								<Pagination total={parseInt(listComicNewUpdate?.total)} onClick={paginationPage}/>
							</Col>

						</Row>
					</Col>
					<Col md={12} lg={4}>
						{visited?.length > 0 &&(
							<BoxBar style={{marginBottom: 16}} title={"Lịch sử đọc truyện"} src={path.HISTORY}>
								{visited?.map((it)=>(
									<WrapperComicHorizontal key={it?._id}>
										<ComicHorizontal
											path={path.XEM + it?.url}
											onclick={()=>handleDelete(it?._id)}
											name={it?.name}
											img={it?.image}
											isDelete={true}
											miniTextLeft={'Đọc tiếp '+ it?.chapterName}
										/>
									</WrapperComicHorizontal>
								))}
							</BoxBar>
						)}
						<BoxBarComicFollows/>
						<BoxBarTabComic/>
					</Col>
				</Row>
			</MainContainer>
		</>
	);
};

export default Home;

