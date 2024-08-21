import React, {useEffect, useRef, useState} from 'react';
import MainContainer from "../components/MainContainer";
import styles from "../styles/pages/_search_comic.module.scss";
import BreadCrumb from "../components/BreadCrumb";
import {Col, Form, Row} from "react-bootstrap";
import {useCategoryStore} from "../stores/useCategoryStore";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import path from "../contants/path";
import {ImEye} from "react-icons/im";
import {AiFillHeart, AiOutlineMenuFold} from "react-icons/ai";
import {FaComment} from "react-icons/fa";
import Story from "../components/Story";
import {useProductStore} from "../stores/useProductStore";
import totalNumberFormat from "../utils/totalNumberFormat";
import toNumber from "../utils/toNumber";
import toSlug from "../utils/toSlug";
import Pagination from "../components/Pagination";
import SkeletonLoading from "../components/SkeletonLoading";
import HelmetSEO from "../components/HelmetSEO";

const buttonArr = [
	{value:'',name: 'Tất cả'},
	{value:'1', name: 'Hoàn thành'},
	{value:'0',name: 'Đang tiến hành'},
]

const sortBy = [
	{name: 'Ngày cập nhật', icon: ''},
	{name: 'Truyện mới', icon: ''},
	{name: 'Top all', icon: <ImEye/>},
	{name: 'Top tháng', icon: <ImEye/>},
	{name: 'Top tuần', icon: <ImEye/>},
	{name: 'Top ngày', icon: <ImEye/>},
	{name: 'Theo dõi', icon: <AiFillHeart/>},
	{name: 'Bình luận', icon: <FaComment/>},
	{name: 'Số chapter', icon: <AiOutlineMenuFold/>},
]

const totalViewComicBySort =  {
	'2': 'view_all',
	'3':  'view_month',
	'4': 'view_week',
	'5': 'view_day',
}

const SearchComic = () => {
	const navigate = useNavigate()

	const {id} = useParams()
	const splitSlug = id?.split('-')

	const [searchParams] = useSearchParams();

	const sortStr = searchParams.get('sort')

	const [data, setData] = useState([])

	const [status, setStatus] = useState('')
	const [sort, setSort] = useState(null)

	const [catActive, setCatActive] = useState('-1');
	const [cateName, setCatName] = useState();

	const cat = (index) => {
		setCatActive(index.toString());
	};

	const {getCate, cate} = useCategoryStore(state => ({
		getCate: state.getCate,
		cate: state.cate
	}))

	const {getComic, isLoadingGetComicByCate} = useProductStore(state => ({
		getComic: state.getComicByCate,
		isLoadingGetComicByCate: state.isLoadingGetComicByCate
	}))

	useEffect(() => {
		if(!!sortStr) {
			setSort(sortStr)
		} else {
			navigate(path.TIM_TRUYEN + '?sort=0')
		}
	}, [sortStr]);

	useEffect(()=> {
		fetchData()
	}, [id, sort])

	const fetchData = async (pageNumber) => {
		setCatActive(id?splitSlug[splitSlug.length-1]:'-1')
		const res = await getComic({
			category_id : id?[splitSlug[splitSlug.length-1]]:[],
			status:status,
			sort : searchParams.get('sort'),
			more_chapter: "0",
			page_number : pageNumber
		})
		if(res){
			setData(res)
		}
		if (cate) {
			await getCate()
		}
	}

	const cateIf = id?cate.find((c)=>c._id === splitSlug[splitSlug.length-1]):''

	const onChangeStatus = async (data) =>{
		setData([])
		const res = await getComic({
			category_id : id?[splitSlug[splitSlug.length-1]]:[],
			status: data,
			sort : searchParams.get('sort'),
			more_chapter: 0
		})
		if(res){
			setData(res)
		}
		// navigate(path.TIM_TRUYEN + cateIf?.code + '-' + cateIf?.name + "?sort="+e.target.value)
	}

	const onChangeCategory = (e) =>{
		const value = e.target.value
		if(value !== '-1'){
			const cateInfo = value.split('-')
			const uri = '-' + toSlug(cateInfo[cateInfo.length-2]) + '-' + cateInfo[cateInfo.length-1]
			navigate(path.TIM_TRUYEN + uri + '?sort=' + sort)
		} else {
			navigate(path.TIM_TRUYEN + '?sort=' + sort)
		}
	}

	const pagination = async (data) =>{
		await fetchData(data)
		window.scrollTo({top: 0})
	}

	const onSortChange = (e) => {
		// console.log("XSSS1`11"+cateIf)
		navigate(path.TIM_TRUYEN + '-'+ cateIf?.code + '-' + cateIf?._id + "?sort="+e.target.value)
	}

	// console.log("XXX", totalViewComicBySort[searchParams.get('sort')?.toString()]??totalViewComicBySort['2'])

	return (
		<>
			<HelmetSEO seo={"Tìm truyện tranh online"}/>
			<MainContainer>
				<BreadCrumb text={"Thể loại"}/>
				<Row className={styles.searchComic}>
					<Col lg={8} xs={12} className={styles.filterComic}>
						{cateIf?
							<h1>Truyện thể loại {cateIf?.name}</h1>:
							<h1>Tìm truyện tranh</h1>
						}
						<div className="d-lg-none mb-2 mt-2">
							<Form.Select value={null} onChange={onChangeCategory}>
								<option value={'-1'}>Tất cả thể loại</option>
								{Array.isArray(cate)&&(
									cate?.map((it, index) => (
										<option key={index} value={it?.name+"-"+it._id}>{it.name}</option>
									))
								)}
							</Form.Select>
						</div>
						<div className="mb-2 mt-2">
							<div className={styles.info}>Tất cả thể loại truyện tranh</div>
						</div>
						<ul className={styles.navTabs}>
							{buttonArr.map(({name,value}, index) => (
								<li key={index}>
								<span
									className={status === value ? styles.active : styles.navItem}
									onClick={() => {setStatus(value.toString())
										onChangeStatus(value.toString())
									}}
								>
									{name}
								</span>
							</li>
						))}
					</ul>
					<Row className="mt-2 mb-2">
						<Col md={3} className="mb-2 mt-2">
							<div className={styles.title_sort}>Sắp xếp theo:</div>
						</Col>
						<Col md={9} className="mb-2 mt-2">
							<div className={`d-md-block d-none ${styles.button}`}>
								{sortBy.map((it, index) => (
									<span
										className={sort === index.toString() ? styles.sortActive : styles.sortItem}
										onClick={() =>
											splitSlug === undefined?
												navigate(path.TIM_TRUYEN+'?sort=' + index):
												navigate(path.TIM_TRUYEN +'-'+ toSlug(cateIf?.name) + '-' + catActive + '?sort=' + index)
										}
										key={index}>
										{it.icon} {it.name}
									</span>
								))}
							</div>
							<div className="d-block d-md-none">
								<Form.Select value={sort} onChange={onSortChange}>
									{sortBy.map((it, index) => (
										<option value={index} key={index}>{it.name}</option>
									))}
								</Form.Select>
							</div>
						</Col>
					</Row>
					<Row>
						{isLoadingGetComicByCate?
							<SkeletonLoading/>
							:
							data?.results?.map((it)=>(
								<Story
									id={it?._id}
									key={it?._id} name={it?.name}
									img={it?.thumbnail}
									totalView={totalNumberFormat(toNumber(it[totalViewComicBySort[searchParams.get('sort')?.toString()]??totalViewComicBySort['2']]))}
									totalComment={totalNumberFormat(toNumber(it?.total_comment))}
									totalLike={totalNumberFormat(toNumber(it?.total_follow))}
									hot={it?.is_hot}
									listChapter={it?.chapters}
								/>
							))
						}
					</Row>
					<div className={styles.pagination}>
						<Pagination onClick={pagination} total={data?.total}/>
					</div>
				</Col>
				<Col lg={4} className="d-none d-lg-block">
					<div className={styles.boxRight}>
						<h2 className={styles.moduleTitle}>
							<b>Thể loại</b>
						</h2>
						<ul className="nav">
							<li onClick={() => cat('-1')} className="w-100">
								<Link
									className={catActive === '-1' ? styles.moduleActive:''}
									to={path.TIM_TRUYEN + '?sort='+sort}>Tất cả thể loại</Link>
							</li>
							{cate?.map((it, index) => (
								<li key={index}
								    onClick={() => cat(index)}>
									<Link onClick={()=>setCatName(it?.name)}
										className={catActive === it?._id ? styles.moduleActive:''}
										to={path.TIM_TRUYEN +'-' + toSlug(it?.name) + '-' + it?._id + '?sort='+sort}>
										{it.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</Col>
				</Row>
			</MainContainer>
		</>
	);
};

export default SearchComic;
