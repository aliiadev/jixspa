import React, {useEffect, useState} from 'react';
import styles from "../styles/pages/_findAdvancedStories.module.scss";
import {TiTick} from "react-icons/ti";
import {IoCloseOutline} from "react-icons/io5";
import {HiRefresh} from "react-icons/hi";
import {Col, Container, Form, Row} from "react-bootstrap";
import CheckBox from "../components/CheckBox";
import MainContainer from "../components/MainContainer";
import BreadCrumb from "../components/BreadCrumb";
import ButtonBase from "../components/ButtonBase";
import {useCategoryStore} from "../stores/useCategoryStore";
import Story from "../components/Story";
import {callService} from "../apis/baseRequest";
import {useForm} from "react-hook-form";
import {definesApi} from "../apis";
import totalNumberFormat from "../utils/totalNumberFormat";
import toNumber from "../utils/toNumber";
import Pagination from "../components/Pagination";
import SkeletonLoading from "../components/SkeletonLoading";

const totalViewComicBySort =  {
	'2': 'view_all',
	'3':  'view_month',
	'4': 'view_week',
	'5': 'view_day',
}

const FindAdvancedStories = () => {

	const [open, setOpen] = useState(true);

	const [comics, setComics] = useState([]);

	const [isLoading,setIsLoading] = useState(false)

	const {watch, getValues, reset} = useForm({
		defaultValues: {
			category_id: [],
			categories_ne: [],
			status: "0",
			sort: "0",
			more_chapter: 0,
		}})

	function refreshPage() {
		window.location.reload();
	}

	const {getCate, cate} = useCategoryStore(state => ({
		getCate: state.getCate,
		cate: state.cate
	}))

	useEffect(() => {
		async function fetchDataCategory() {
			if(cate.length === 0) await getCate()
			await fetchData()
		}
		fetchDataCategory()
	}, []);

	const fetchData = async (pageNumber) => {
		try {
			let data = getValues()
			data.page_number = pageNumber
			setIsLoading(true)
			const response = await callService(definesApi.find_comic.uri, 'POST', data)
			if(response){
				setComics(response)
				setIsLoading(false)
			}
		} catch (e) {
			console.log(e)
		}
	}
	const onCheckBoxCb = (data) => {
		const  {id, cb} = data
		let {category_id, categories_ne} = getValues();
		let ieq = category_id.indexOf(id)
		let ine = categories_ne.indexOf(id)
		let obj = {}
		switch (cb) {
			case '0':
				if(ine > -1) {
					obj.categories_ne = categories_ne.slice(ine, 0)
				}
				category_id.push(id)
				obj.category_id = category_id
				reset(Object.assign(getValues(), obj))
				break
			case '1':
				if(ieq > -1) {
					obj.category_id = category_id.slice(ieq, 0)
				}
				categories_ne.push(id)
				obj.categories_ne = categories_ne
				reset(Object.assign(getValues(), obj))
				break
			case '2':
				if(ieq > -1) {
					obj.category_id = category_id.slice(ieq, 0)
				}
				if(ine > -1) {
					obj.categories_ne = categories_ne.slice(ine, 0)
				}
				reset(Object.assign(getValues(), obj))
				break
		}
	}

	const renderListComic = (comics = []) => (
		comics.map((comic)=>(
			<Story
				key={comic?._id}
				id={comic?._id}
				hot={comic?.is_hot}
				listChapter={comic?.chapters}
				name={comic?.name}
				img={comic?.thumbnail}
				totalView={totalNumberFormat(toNumber(comic[totalViewComicBySort[watch().sort]??totalViewComicBySort['2']]))}
				totalComment={totalNumberFormat(toNumber(comic?.total_comment))}
				totalLike={totalNumberFormat(toNumber(comic?.total_follow))}
				newSize={true}
			/>
		))
	);

	const onSubmit = async () => {
		await fetchData()
	}

	const pagination =async (data) => {
		await fetchData(data)
		window.scrollTo({top: 0})
	}
	return (
		<MainContainer>
			<BreadCrumb text={'Tìm truyện'}/>
			<div className={styles.find}>
				<div className={styles.comicFilter}>
					<p className="text-center">Tìm truyện nâng cao</p>
				</div>
				<div className={styles.buttonContent}>
					<ButtonBase onClick={() => setOpen(!open)} text={open ? 'Ẩn' : 'Hiện'}
					            componentRight={'khung tìm kiếm'}/>
				</div>
				{open ?
					<div className={styles.advSearch}>
						<div className={styles.note}>
							<p className={styles.noteIt}>
								<span className={styles.icon}><TiTick size={18} color="#40C057"/>  </span>
								<span className={styles.text}>
									Tìm trong những thể loại này (Click 1 lần để lựa chọn)
								</span>
							</p>
							<p className={styles.noteIt}>
								<span className={styles.icon}><IoCloseOutline size={18} color="#FA5252"/> </span>
								<span className={styles.text}>
									Loại trừ những thể loại này (Click 2 lần để loại trừ)
								</span>
							</p>
							<p className={styles.noteIt}>
								<span className={styles.icon}><IoCloseOutline size={18} color="#F8F9FA"/> </span>
								<span className={styles.text}>
									Truyện có thể thuộc hoặc không thuộc thể loại này
								</span>
								<span className={styles.refresh}>
									<ButtonBase onClick={refreshPage} theme={'primary'} text={'Reset'}
									            componentLeft={<HiRefresh/>}/>
								</span>
							</p>
						</div>
						<Container>
							<Row className={styles.searchMain}>
								<Col sm={2} className={styles.label}>
									<label>Thể loại</label>
								</Col>
								<Col sm={10}>
									<Row>
										{Array.isArray(cate)&&(
											cate?.map(({name, _id}) => (
												<Col key={_id} sm={4} lg={3} xs={6}>
													<CheckBox id={_id} onClick={onCheckBoxCb} name={name}/>
												</Col>
											))
										)}
									</Row>
								</Col>
							</Row>
						</Container>
						<Row className={styles.selectStatus}>
							<Col sm={2} className={styles.selectLabel}>
								<label>Số lượng chapter</label>
							</Col>
							<Col sm={4}>
								<Form.Select onChange={(e)=>{
									reset(Object.assign(getValues(), {more_chapter: e.target.value}))
								}} defaultValue="0">
									<option value="0">{'> 0 chapter'}</option>
									<option value="50">{'>= 50 chapter'}</option>
									<option value="100">{'>= 100 chapter'}</option>
									<option value="200">{'>= 200 chapter'}</option>
									<option value="300">{'>= 300 chapter'}</option>
									<option value="400">{'>= 400 chapter'}</option>
									<option value="500">{'>= 500 chapter'}</option>
								</Form.Select>
							</Col>
							<Col sm={2} className={styles.selectLabel}>
								<label>Tình trạng</label>
							</Col>
							<Col sm={4}>
								<Form.Select onChange={(e)=> {
									const value = e.target.value
									if(value === '-1') {
										let obj = getValues()
										delete obj.status
										reset(obj)
									} else {
										reset(Object.assign(getValues(), {status: value}))
									}
								}} defaultValue="-1">
									<option value="0">Đang tiến hành</option>
									<option value="1">Đã hoàn thành</option>
									<option value="-1">Tất cả</option>
								</Form.Select>
							</Col>
						</Row>
						<Row className={styles.selectStatus}>
							<Col sm={2} className={styles.selectLabel}>
								<label>Dành cho</label>
							</Col>
							<Col sm={4}>
								<Form.Select defaultValue="-1">
									<option value="1">Con gái</option>
									<option value="2">Con trai</option>
									<option value="-1">Tất cả</option>
								</Form.Select>
							</Col>
							<Col sm={2} className={styles.selectLabel}>
								<label>Sắp xếp theo</label>
							</Col>
							<Col sm={4}>
								<Form.Select onChange={(e)=> {
									const value = e.target.value
									reset(Object.assign(getValues(), {sort: value}))
								}}>
									<option value="0">Chapter mới</option>
									<option value="1">Truyện mới</option>
									<option value="2">Xem nhiều nhất</option>
									<option value="3">Xem nhiều nhất tháng</option>
									<option value="4">Xem nhiều nhất tuần</option>
									<option value="5">Xem nhiều nhất hôm nay</option>
									<option value="6">Theo dõi nhiều nhất</option>
									<option value="7">Bình luận nhiều nhất</option>
									<option value="8">Số chapter nhiều nhất</option>
								</Form.Select>
							</Col>
						</Row>
						<Row className="pb-3">
							<Col sm={2}/>
							<Col sm={4}>
								<ButtonBase onClick={onSubmit} theme={'secondary'} text={'Tìm kiếm'}/>
							</Col>
							<Col sm={6}/>
						</Row>
					</div> : <div></div>
				}
				<Row>
					{isLoading?
						<SkeletonLoading/>:
						renderListComic(comics?.results)
					}
					<Container style={{textAlign:"center"}}>
						<Pagination onClick={pagination}  total={comics?.total}/>
					</Container>
				</Row>
			</div>
		</MainContainer>
	);
};

export default FindAdvancedStories;
