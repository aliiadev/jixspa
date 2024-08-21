import {Col, Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from 'react';
import styles from '../styles/pages/_detail.module.scss'
import title from '../styles/components/_listChapterComic.module.scss'
import path from "../contants/path";
import {Link, useParams,useNavigate} from "react-router-dom";
import {ImUser} from 'react-icons/im'
import {AiOutlineWifi,AiFillStar,AiOutlineFileText,AiOutlineRight} from 'react-icons/ai'
import {BsFillTagsFill} from 'react-icons/bs'
import {FaRegEye} from 'react-icons/fa'
import formatNumber from "../utils/formatNumber";
import ListChapterComic from "../components/ListChapterComic";
import HelmetSEO from "../components/HelmetSEO";
import BoxBarTabComic from "../components/BoxBarTabComic";
import {useProductStore} from "../stores/useProductStore";
import EnvironmentConfig from '../apis/environmentConfig'
import {formatDateSince} from "../utils/formatDate";
import constant from "../contants/constant";
import toNumber from "../utils/toNumber";
import NavLink from "../components/NavLink";
import ButtonBase from "../components/ButtonBase";
import toSlug from "../utils/toSlug";
import MainContainer from "../components/MainContainer";
import toCapitalize from "../utils/toCapitalize";
import {AiFillHeart, AiOutlineClose} from 'react-icons/ai'
import useLocalStorage from "use-local-storage";
import Comment from "../components/Comment";
import {useSocket} from "../stores/useSocket";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import StarRatings from 'react-star-ratings';
import BreadCrumb from "../components/BreadCrumb";

const Detail = () => {

	const [visited, setVisited] = useLocalStorage('visited-comics', [])

	const [viewMore,setViewMore] = useState(false)
	const [comicDetail, setDetail] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const {socket} = useSocket(state => ({socket: state.socket}))

	const {getDetailComic} = useProductStore(state => ({getDetailComic: state.getDetailComic}))

	const navigate = useNavigate()
	const {slug} = useParams()
	const [comicFollow, setComicFollow] = useLocalStorage('comic-follows', [])
	const [guiUID, setGuiUID] = useLocalStorage('guiUID', {})

	const splitSlug = slug.split('-')

	const [rating, setRating] = useState();

	useEffect(()=>{
		window.scrollTo({top: 0})
		setIsLoading(true)
		getDetailComic(splitSlug[splitSlug.length - 1])
			.then(r => {
				setDetail(r)
				socket.emit('onViewVote', {machine_id: guiUID['uuGuiID'], comic_id: r.comic._id});
				setIsLoading(false)
			})
			.catch(()=>setIsLoading(false))
	},[slug])

	useEffect(()=> {
		socket.on('onChangeComicRating_' + comicDetail?.comic?._id, (res) => {
			setRating(res)
		})
		socket.on('onVoteComicExits_' + comicDetail?.comic?._id, (res) => {
			Swal.fire({
				title: 'Thất bại',
				text: 'Bạn đã đánh giá truyện này rồi',
				icon: 'warning'
			})
			setUserRating(undefined)
		})
		return () => {
			socket.off('onChangeComicRating_'+comicDetail?.comic?._id);
			socket.off('onVoteComicExits_'+comicDetail?.comic?._id);
		}
	}, [comicDetail])

	const comic = comicDetail?.comic

	const chapterFirst = comic?.chapters[comic?.chapters.length-1];

	const chapterNew = comic?.chapters[0]

	const onSaveFollow = useCallback(() => {
		if(comicDetail) {
			const id = comicDetail?.comic?._id
			const exitsIndex = comicFollow.indexOf(id)
			let clone = {...comicDetail}
			if(exitsIndex > -1) {
				setComicFollow(comicFollow.filter(x=>x!==id))
				socket.emit('onComicFollow', {machine_id: guiUID['uuGuiID'], comic_id: id, unfollow: '-1'})
				clone.comic.total_follow = toNumber(clone.comic.total_follow ) - 1
			} else {
				setComicFollow([...comicFollow, id])
				socket.emit('onComicFollow', {machine_id: guiUID['uuGuiID'], comic_id: id, unfollow: '0'})
				clone.comic.total_follow = toNumber(clone.comic.total_follow ) + 1
			}
			setDetail(clone)
		}
	}, [comicDetail, comicFollow])

	const renderButtonFollow = useCallback((id) => {
		if(comicFollow.indexOf(id) > -1) {
			return (
				<ButtonBase theme={'danger'} componentLeft={<AiOutlineClose/>} text={'Bỏ theo dõi'} onClick={onSaveFollow}/>
			)
		}
		return <ButtonBase onClick={onSaveFollow} componentLeft={<AiFillHeart/>} theme={'secondary'} text={'Theo dõi'}/>
	},[comicFollow, comicDetail])

	const renderButtonReadContinue = () => {
		const value = visited?.find((v)=>v?._id === comic?._id)
		if(value)
			return(
				<ButtonBase text={"Xem tiếp "} componentRight={<AiOutlineRight/>} theme={'danger'} onClick={()=>navigate(path.XEM + value.url)}/>
			)
	}

	const [userRating, setUserRating] = useState();

	const onChangeRating = (data) => {
		setUserRating(data)
		socket.emit('onVoteComic', {machine_id: guiUID['uuGuiID'], comic_id: comicDetail?.comic?._id, rate: data})
	}

	return (
		<>
			<HelmetSEO seo={toCapitalize(comic?.name)}/>
			<MainContainer>
				<Row>
					<Col lg={8} md={12} sm={12} className={styles.center_side}>
						{/*<NavLink name={comic?.name}/>*/}
						<BreadCrumb text={comic?.name}/>
						<div className={styles.box_detail}>
							{isLoading?<Skeleton count={1} height={22}/>:<h1 className={styles.title_detail}>{comic?.name}</h1>}
							<time className={styles.time_small}>[Cập nhật lúc: {formatDateSince(comic?.updated_at,'DD-MM-YYYY')}]</time>
							<div className={styles.detail_info}>
								<Row>
									<Col sm={4} xs={12}  className={styles.col_image}>
										{isLoading?
											<Skeleton count={1} height={272} width={198}/>
										: <img
												src={EnvironmentConfig.BASE_URI + comic?.thumbnail}
												width={198}
												height={272}
												alt={comic?.name}
											/>}
									</Col>
									<Col sm={8} xs={12} className={styles.col_info}>
										<Row  className={styles.author}>
											<Row>
												<Col xs={4} >
													<span className={styles.icon}><ImUser/><span>Tác giả</span></span>
												</Col>
												<Col xs={8}>
													{isLoading? <Skeleton height={15}/>
														:
														comicDetail?.authors?.length === 0 ?
															<span>Đang cập nhật</span>:
															comicDetail?.authors?.map((it,index)=>(
																<span key={index}>{it}</span>
															))
													}
												</Col>
											</Row>
											<Row>
												<Col xs={4}>
													<span className={styles.icon}><AiOutlineWifi/><span>Tình trạng</span></span>
												</Col>
												<Col xs={8}>
													{isLoading? <Skeleton height={15}/> :
														<span>{constant.status[comic?.status]}</span>
													}
												</Col>
											</Row>
											<Row>
												<Col xs={4}>
													<span className={styles.icon}><BsFillTagsFill/> <span>Thể loại</span></span>
												</Col>
												<Col xs={8}>
													{isLoading? <Skeleton height={15}/> :
														<span className={styles.cate}>{
															comicDetail?.categories?.map((it)=>(
															<Link key={it?._id} to={path.TIM_TRUYEN +'-'+toSlug(it?.category?.name)+'-'+ it?.category?._id + '?sort=0'}>{it?.category.name}
																{comicDetail?.categories[comicDetail?.categories?.length-1]?._id === it?._id ? '':' - '}
															</Link>
															))}
														</span>
													}
												</Col>
											</Row>
											<Row>
												<Col xs={4}>
													<span className={styles.icon}><FaRegEye/> <span>Lượt xem </span></span>
												</Col>
												<Col xs={8}>
													{isLoading? <Skeleton height={15}/>:
														<span>{formatNumber(toNumber(comic?.view_all))}</span>}
												</Col>
											</Row>
										</Row>
										<div className={styles.vote}>
											<Link to={"/#"}>
												<span>{comic?.name}</span>
											</Link>
											<span> &nbsp;
												Xếp hạng: <span>{rating?.avg}</span> / <span>5</span> - <span>{rating?.count}</span> lượt đánh giá
											</span>
										</div>
										<div className={styles.rate}>
											<StarRatings
												rating={userRating || rating?.avg}
												starRatedColor={'#F0A700'}
												starHoverColor={'#F0A700'}
												changeRating={onChangeRating}
												numberOfStars={5}
												name={'rating'}
												starDimension={'20px'}
											/>
										</div>
										<div className={styles.follow}>
											{renderButtonFollow(comicDetail?.comic?._id)}
											{isLoading? <Skeleton width={200} height={15}/>:
												<div>
													<span className={styles.totalFollow}>{formatNumber(toNumber(comicDetail?.comic?.total_follow))} Lượt theo dõi</span>
												</div>
											}
										</div>
										<div className={styles.button}>
											<ButtonBase theme={"warning"} text={"Đọc từ đầu"} onClick={()=>
												navigate(path.XEM + toSlug(comic?.name) + '-' + chapterFirst?.slug +'-' +comic?._id +'-' + chapterFirst?._id)}/>
											<ButtonBase theme={"warning"} text={"Đọc mới nhất"}  onClick={()=>
												navigate(path.XEM + toSlug(comic?.name) + '-' + chapterFirst?.slug +'-' +comic?._id +'-' + chapterNew?._id)}/>
											{renderButtonReadContinue()}
										</div>
									</Col>
								</Row>
							</div>
							<div className={styles.content_info}>
								<h3 className={title.list_title}>
									<AiOutlineFileText/>Nội dung
								</h3>
								{isLoading? <Skeleton height={80}/> :
								<p className={viewMore?'':styles.shortened}>
									{comic?.description}
								</p>}
								<span className={styles.moreLink} onClick={()=>setViewMore(!viewMore)}>
									<span>{viewMore? 'Thu gọn':'Xem thêm'}<AiOutlineRight/></span>
								</span>
							</div>
							{isLoading ? <Skeleton height={300}/> :
								<ListChapterComic chapters={comic?.chapters} idTruyen={comic?._id}
								                  nameTruyen={comic?.name}/>
							}
						</div>
						<Comment comic_id={comic?._id}/>
					</Col>
					<Col lg={4} md={12} sm={12}>
						<BoxBarTabComic/>
					</Col>
				</Row>
			</MainContainer>
		</>
	);
};

export default React.memo(Detail);
