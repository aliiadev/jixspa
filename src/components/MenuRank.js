import React from 'react';
import styles from "../styles/layout/_navbar.module.scss";
import {Link, useNavigate, createSearchParams} from "react-router-dom";
import {FaCloudUploadAlt, FaRegEye, FaSignal} from "react-icons/fa";
import {BiLike, BiRefresh} from "react-icons/bi";
import path from "../contants/path";
import {useOpenMenu} from "../stores/useOpenMenu";

const MenuRank = ({hideDropdownRank, showRank}) => {
	const rank = [
		{value:'2',code:'ALL',name: 'Top all',icon: <FaRegEye/>},
		{value:'7',code:'FULL',name: 'Bình luận',icon: <FaSignal/>},
		{value:'3',code:'MONTHS',name: 'Top tháng',icon: <FaRegEye/>},
		{value:'6',code:'LIKE',name: 'Theo dõi',icon: <BiLike/>},
		{value:'4',code:'WEEK',name: 'Top tuần',icon: <FaRegEye/>},
		{value:'0',code:'UPDATE',name: 'Mới cập nhật',icon: <BiRefresh/>},
		{value:'5',code:'DAY',name: 'Top ngày',icon: <FaRegEye/>},
		{value:'1',code:'NEW',name: 'Truyện mới',icon: <FaCloudUploadAlt/>},
	]
	const {setOpen} = useOpenMenu(state => ({
		setOpen: state.setOpen
	}))

	const navigate = useNavigate()

	return (
		<div className={`${showRank ? styles.rankShow: styles.rank}`} onMouseLeave={hideDropdownRank}>
			{rank.map((it,index)=>(
				<Link to={path.TIM_TRUYEN + '?sort='+it.value} onClick={()=> {
					setOpen(false)
					// navigate({pathname: path.TIM_TRUYEN, search: createSearchParams({sort: it.value}).toString})
				}} key={index}
				      className={`${it.code === 'FULL' ? styles.full:''}`}
				      style={{display:'flex',gap:'5px'}}>
					<span>{it.icon}</span><span>{it.name}</span>
				</Link>
			))}
		</div>
	);
};

export default MenuRank;
