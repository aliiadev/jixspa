import React, {useCallback, useEffect, useState} from 'react';
import HelmetSEO from "../components/HelmetSEO";
import {Link, useParams,useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import styles from '../styles/pages/_xem.module.scss'
import {useProductStore} from "../stores/useProductStore";
import environmentConfig from "../apis/environmentConfig"
import MainContainer from "../components/MainContainer";
import {BsInfoCircle} from "react-icons/bs"
import {FaHome,FaList} from "react-icons/fa"
import {GoChevronLeft,GoChevronRight} from "react-icons/go"
import path from "../contants/path";
import Form from 'react-bootstrap/Form';
import ButtonBase from "../components/ButtonBase";
import NavLink from "../components/NavLink";
import {formatDateSince} from "../utils/formatDate";
import toSlug from "../utils/toSlug";
import useLocalStorage from "use-local-storage";
import {AiFillHeart, AiOutlineClose} from "react-icons/ai";
import {useSocket} from "../stores/useSocket";
import Skeleton from "react-loading-skeleton";
import BreadCrumb from "../components/BreadCrumb";
import CommentChapter from "../components/CommentChapter";

const _ = require('lodash');

const DocTruyen = () => {

	const navigate = useNavigate()
	const {socket} = useSocket(state => ({socket: state.socket}))

	const [comicDetail, setComicDetail] = useState(null)
	const [chapters, setChapters] = useState(null)
	const [visited, setVisited] = useLocalStorage('visited-comics', [])
	const [machine, setMachine] = useLocalStorage('guiUID', {})
	const {slug} = useParams()
	const splitSlug = slug?.split('-')
	const split = slug?.split('/')

	const [comicFollow, setComicFollow] = useLocalStorage('comic-follows', [])

	const comic = comicDetail?.comic

	const {reading, getDetail,isLoadingGetDetailComic} = useProductStore(state => ({
		reading: state.readingPro,
		getDetail: state.getDetailComic,
		isLoadingGetDetailComic: state.isLoadingGetDetailComic
	}))

	const [isShowChapters, setIsShowChapters] = useState(false);

	const handleScroll = () => {
		const position = window.pageYOffset
		if(position >= 350 && !isShowChapters) setIsShowChapters(true);
		else if(position && position < 350) setIsShowChapters(false);
	};

	let prevScrollpos = window.pageYOffset;
	useEffect(() => {
		const onScroll = () =>{
			const currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos && currentScrollPos >= 350) {
				setIsShowChapters(true);
			} else if(currentScrollPos < 350 || currentScrollPos > prevScrollpos){
				setIsShowChapters(false);
			}
			prevScrollpos = currentScrollPos;
			let comicRead = visited.find(v => v._id === comic?._id)
			if(comicRead){
				comicRead.y = currentScrollPos
				setVisited(visited.map((v)=> v._id === comic._id ? comicRead : v))
			}
		}
		// clean up code
		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		// window.addEventListener('scroll', _.debounce(() => { onScroll() }, 1000))
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(()=>{
		fetchData()
	},[slug]);

	const fetchData = async () => {
		socket.emit('onReadComic', {
			chapter_id: splitSlug[splitSlug.length-1],
			comic_id: splitSlug[splitSlug.length-2],
			machine_id: machine.uuGuiID
		})
		const res = await getDetail(splitSlug[splitSlug?.length-2])
		if(res){
			setComicDetail(res)
		}
		const response = await reading(splitSlug[splitSlug?.length-1])
		setChapters(response)
		const chapter = res?.comic?.chapters.find(v => v._id === splitSlug[splitSlug.length-1])
		let comicHasRead = visited.find(v => v._id === res?.comic?._id)
		if(comicHasRead) {
			const indexChapterHasRead = comicHasRead.chapterId.indexOf(chapter?._id)
			if(indexChapterHasRead === -1) {
				comicHasRead.chapterId.push(chapter?._id)
			}
			comicHasRead.chapterName = chapter?.name
			comicHasRead.url = split[0]
			setVisited(visited.map((v)=> v._id === res?.comic._id ? comicHasRead : v))
			window.scrollTo({top: comicHasRead.y, behavior: 'smooth'})
		} else {
			comicHasRead = {}
			comicHasRead.chapterName = chapter?.name
			comicHasRead.chapterId = [chapter?._id]
			comicHasRead.image = res?.comic?.thumbnail
			comicHasRead._id = res?.comic?._id
			comicHasRead.name = res?.comic?.name
			comicHasRead.url = split[0]
			setVisited([...visited, comicHasRead])
		}
	}

	const handleChange = async (data) =>{
		setChapters([])
		setComicDetail({})
		navigate(path.XEM + toSlug(comic?.name) + '-' + comic?._id + '-' + data?.target?.value)
	}

	const onSaveFollow = useCallback(() => {
		if(comic) {
			const id = comic._id
			const exitsIndex = comicFollow.indexOf(id)
			if(exitsIndex > -1) {
				setComicFollow(comicFollow.filter(x=>x!==id))
			} else {
				setComicFollow([...comicFollow, id])
			}
		}
	}, [comic, comicFollow])

	const renderButtonFollow = useCallback((id) => {
		if(comicFollow.indexOf(id) > -1) {
			return (
				<ButtonBase theme={'danger'} componentLeft={<AiOutlineClose/>} onClick={onSaveFollow}/>
			)
		}
		return <ButtonBase onClick={onSaveFollow} componentLeft={<AiFillHeart/>} theme={'secondary'}/>
	},[comicFollow, comicDetail])

	const indexChap = comic?.chapters.findIndex(x => x._id === splitSlug[splitSlug.length-1])

	const chapFirst = comic?.chapters[comic?.chapters.length-1]
	// const chap = chapters?.length > 0 ? chapters[0].chapter : {}
	const onclick = async ({type}) =>{
		if(type === 'prev'){
			if(indexChap !== -1){
				navigate(path.XEM + toSlug(comic?.name) + '-' + comic?._id +'-' + comic?.chapters[indexChap + 1]?._id, {replace: true})
			}else {
				navigate(-1)
			}
		}else{
			if(indexChap !== -1){
				navigate(path.XEM + toSlug(comic?.name) +'-'+ comic?._id +'-' + comic?.chapters[indexChap - 1]?._id, {replace: true})
			}else {
				navigate(-1)
			}

		}
	}

	const chap = comic?.chapters.find(v => v._id === splitSlug[splitSlug.length-1])

	return (
		<div>
			<HelmetSEO seo={comic?.name + ' ' + chap?.name}/>
			<MainContainer is_show_mobile_header={false}>
				<Row>
					<Col sm={12} className={styles.col}>
						<div className={styles.reading}>
							<Container>
								<BreadCrumb text={[{src: path.TRUYEN_TRANH + toSlug(comic?.name) + '-' + comic?._id, text: comic?.name}, {src: '/', text: chap?.name}]}/>
								<div className={styles.top}>
									<h1 className={styles.txtPrimary}>
										<Link to={path.TRUYEN_TRANH + toSlug(comic?.name) + '-' + comic?._id}>{comic?.name} </Link>-
										<span> {chap?.name}</span>
									</h1>
									<i>[cập nhật lúc: {formatDateSince(chapters?.length > 0 ? chapters[0]?.updated_at : new Date())}]</i>
								</div>
								<div className={styles.read_control}>
									<div className={styles.alert}>
										<BsInfoCircle size={14}/>&nbsp;
										<em>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
									</div>
									<div className={`${isShowChapters&&styles.nav}`}>
										<div className={styles.chapter_nav}>
											<Link to={path.HOME}><FaHome size={23}/></Link>
											<Link to={path.TRUYEN_TRANH + toSlug(comic?.name)+'-'+ comic?._id}><FaList size={23}/></Link>
											<span className={`${chapFirst?._id === splitSlug[splitSlug.length-1]? styles.prev:styles.a_prev}`} onClick={()=>onclick({type:"prev"})}>
												<GoChevronLeft size={20}/>
											</span>
											<Form.Select value={splitSlug[splitSlug.length-1]} onChange={handleChange} className={styles.select_chapter}>
												{comic?.chapters?.map((it)=>(
													<option  key={it?._id} value={it?._id}>{it?.name}</option>
												))}
											</Form.Select>
											<span className={`${indexChap === 0 ? styles.next:styles.a_next}`} onClick={()=>onclick({type:'next'})}>
												<GoChevronRight size={20}/>
											</span>
											{renderButtonFollow(comic?._id)}
											{/*<ButtonBase text={'Theo dõi'} theme={"secondary"} componentLeft={<HiHeart/>}/>*/}
										</div>
									</div>
								</div>
							</Container>
							<div className={styles.box_read}>
								{isLoadingGetDetailComic?
									<div style={{display:'flex',justifyContent:'center'}}><Skeleton  count={1} inline width={750} height={2000}/></div>:
									chapters?.map((it)=>(
										<div key={it?._id}>
											{
												it?.is_text ?
													<div className={styles.wrapperTextReading}>
														<div dangerouslySetInnerHTML={{__html: it?.source}}></div>
													</div>
													:
												<div className={styles.page_chapter}>
													<img src={environmentConfig.BASE_URI + it?.source} alt={comic?.name + ' ' + chap?.name + it?.stt}/>
												</div>
											}
										</div>
									))
								}
							</div>
							<Container>
								<div className={styles.top && styles.bottom}>
									<div className={styles.button_bottom}>
										<ButtonBase disable={`${chapFirst?._id === splitSlug[splitSlug?.length-1] ? true:''}`}
										            onClick={()=>onclick({type:'prev'})}
										            componentLeft={<GoChevronLeft/>} text={"Chap trước"} theme={"danger"}/>
										<ButtonBase disable={`${indexChap === 0 ? true:''}`} componentRight={<GoChevronRight/>} text={"Chap sau"} theme={'danger'} onClick={()=>onclick({type:'next'})}/>
									</div>
									<BreadCrumb text={[{src: path.TRUYEN_TRANH + toSlug(comic?.name) + '-' + comic?._id, text: comic?.name}, {src: '/', text: chap?.name}]}/>
								</div>
								<CommentChapter comic_id={comic?._id} chapter_id={chap?._id}/>
							</Container>
						</div>
					</Col>
				</Row>
			</MainContainer>
		</div>
	);
};

export default DocTruyen;
