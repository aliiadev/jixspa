import React, {useEffect, useState} from 'react';
import MainContainer from "../components/MainContainer";
import HelmetSEO from "../components/HelmetSEO";
import {Col, Row} from "react-bootstrap";
import styles from '../styles/pages/_comic_follow.module.scss'
import {useComicStore} from "../stores/useComicStore";
import useLocalStorage from "use-local-storage";
import BreadCrumb from "../components/BreadCrumb";
import Story from "../components/Story";
import BoxBarTabComic from "../components/BoxBarTabComic";
import BoxBar from "../components/BoxBar";
import path from "../contants/path";
import ComicHorizontal from "../components/ComicHorizontal";
import totalNumberFormat from "../utils/totalNumberFormat";
import toNumber from "../utils/toNumber";

const pageName = 'Truyện đang theo dõi'

const ComicFollow = () => {

	const [visited,setVisited] = useLocalStorage('visited-comics')

	const [comicFollow, setComicFollow] = useLocalStorage('comic-follows', []);

	const [change, setChange] = useState()

	useEffect(()=> {
		if(change) {
			getListComicFollow({follow_ids: change})
		} else {
			getListComicFollow({follow_ids: comicFollow})
		}

	}, [change])

	const {getListComicFollow, listComicFollow} =
		useComicStore(state => ({
			listComicFollow: state.listComicFollow,
			getListComicFollow: state.getListComicFollow
		}))

	const handleDelete = (data) =>{
		let comicHasRead = visited.find(v => v._id === data)
		let filterResult = visited.filter(function(element){
			return element !== comicHasRead;
		});
		setVisited(filterResult)
	}

	return (
		<MainContainer>
			<HelmetSEO seo={pageName}/>
			<BreadCrumb text={"Theo dõi"}/>
			<Row>
				<Col lg={8} md={12}>
					<h1 className={styles.page_title}>{pageName}{'>'}</h1>
					<Row className={styles.comicFollow}>
						{listComicFollow.map(({_id, name, chapters, thumbnail,total_comment,view_all,total_follow})=> (
							<Story
								key={_id}
								totalView={totalNumberFormat(toNumber(view_all))}
								totalLike={totalNumberFormat(toNumber(total_follow))}
								totalComment={totalNumberFormat(toNumber(total_comment))}
							    name={name}
								listChapter={chapters}
								img={thumbnail}
								id={_id}
								showFollow={true}
								setChange={setChange}
							/>
						))}
					</Row>
				</Col>
				<Col lg={4} className="d-none d-lg-block">
					{visited?.length > 0 &&(
						<BoxBar style={{marginBottom: 16}} title={"Lịch sử đọc truyện"} src={path.HISTORY}>
							{visited?.map((it)=>(
								<ComicHorizontal key={it._id} path={path.XEM + it?.url} onclick={()=>handleDelete(it?._id)} name={it?.name} img={it?.image} isDelete={true} miniTextLeft={'Đọc tiếp '+ it?.chapterName}/>
							))}
						</BoxBar>
					)}
					<BoxBarTabComic/>
				</Col>
			</Row>
		</MainContainer>
	);
};

export default ComicFollow;
