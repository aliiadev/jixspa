import React from 'react';
import MainContainer from "../components/MainContainer";
import {Col, Container, Row} from "react-bootstrap";
import NavLink from "../components/NavLink";
import BoxBarTabComic from "../components/BoxBarTabComic";
import styles from "../styles/components/_history.module.scss"
import {AiOutlineRight} from 'react-icons/ai'
import {FaTimes} from 'react-icons/fa'
import {Link} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import url from '../apis/environmentConfig'
import path from "../contants/path";
import toSlug from "../utils/toSlug";
import Pagination from "../components/Pagination";
import HelmetSEO from "../components/HelmetSEO";
import BreadCrumb from "../components/BreadCrumb";

const History = () => {
	const [visited, setVisited] = useLocalStorage('visited-comics')
	const handleDelete = (data) =>{
		let comicHasRead = visited.find(v => v._id === data)
		let filterResult = visited.filter(function(element){
			return element !== comicHasRead;
		});
		setVisited(filterResult)
	}
	return (
		<>
			<HelmetSEO seo={"Lịch sử đọc truyện"}/>
			<MainContainer>
				<Row>
					<Col lg={8} md={12} sm={12}>
						<BreadCrumb text={"Lịch sử đọc truyện"}/>
						<div className={styles.module}>
							<div className={styles.module_content}>
								<h1 className={styles.page_title}>
									Lịch sử đọc truyện
									<AiOutlineRight/>
								</h1>
								<p>Lịch sử đọc truyện được lưu khi bạn đọc hết chapter</p>
							</div>
						</div>
						<div className={styles.visited_comics}>
							<Container>
								<Row>
									{visited?.map((it,index)=>(
										<Col md={3} sm={4} xs={6} key={index}>
											<div className={styles.item}>
												<div className={styles.image}>
													<Link to={path.XEM + it?.url}><img src={url.BASE_URI + it?.image} alt=""/></Link>
													<div className={styles.button_view}>
												<span className={styles.visited_remove} onClick={()=>handleDelete(it?._id)}>
													<FaTimes/> xóa
												</span>
													</div>
												</div>
												<div className={styles.title}>
													<h3>
														<Link to={path.XEM + it?.url}>{it?.name}</Link>
													</h3>
													<ul>
														<li>
															<Link to={path.XEM + it?.url}>Đọc tiếp {it?.chapterName} <AiOutlineRight/></Link>
														</li>
													</ul>
												</div>
											</div>
										</Col>
									))}
								</Row>
							</Container>
						</div>
					</Col>
					<Col lg={4} md={12} sm={12}>
						<BoxBarTabComic/>
					</Col>
				</Row>
			</MainContainer>
		</>
	);
};

export default History;
