import React from 'react';
import styles from "../styles/components/_navLink.module.scss";
import {Link} from "react-router-dom";
import {AiOutlineDoubleRight} from "react-icons/ai";
import path from "../contants/path";
import toSlug from "../utils/toSlug";

const NavLink = ({chapter, name,id,display}) => {
	return (
		<div className={styles.box_link}>
			<ul>
				<li><Link to={'/#'}>Trang chủ</Link><AiOutlineDoubleRight size={10}/></li>
				{!!display ? '' : <li><Link to={path.TIM_TRUYEN + '?sort=0'}>Thể loại</Link><AiOutlineDoubleRight size={10}/></li>}
				<li><Link to={path.TRUYEN_TRANH + toSlug(name) + '-' + id} style={{textTransform: 'capitalize'}}>{name?.toLowerCase()}</Link></li>
				<li>{chapter? <Link to={'/#'}><AiOutlineDoubleRight size={10}/>{chapter}</Link>:''}</li>
			</ul>
		</div>
	);
};

export default NavLink;
