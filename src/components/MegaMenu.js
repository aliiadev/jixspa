import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from "../styles/layout/_navbar.module.scss";
import {Link} from "react-router-dom";
import path from "../contants/path";
import toSlug from "../utils/toSlug";
import {useOpenMenu} from "../stores/useOpenMenu";
import createArray from "../utils/createArray";
import {callService} from "../apis/baseRequest";

const MegaMenu = ({showGenre, hideDropdown, cate = [], width}) => {

	const {setOpen} = useOpenMenu(state => ({
		setOpen: state.setOpen
	}))
	const [isHovering, setIsHovering] = useState(false);
	const [id, setId] = useState(null);

	const [activeList, setActiveList] = useState([])

	const handleMouseOver = (e) => {
		setId(e)
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
		setId(null)
	};

	useEffect(()=> {
		callService('category/get-category-active', 'POST')
			.then((res)=> {
				setActiveList(res)
			})
	}, [])

	if(Array.isArray(cate))
		return (
			<>
				<ul className={`${showGenre ? styles.megaMenuShow : styles.megaMenu}`} onMouseLeave={hideDropdown}>
					<li style={{display:'flex',flexWrap:'wrap', marginLeft:"20px"}}>
						<div className={styles.wrapperChild}>
							<ul className={styles.child}>
								<Link className={styles.red} onClick={()=>setOpen(false)} to={path.TIM_TRUYEN + '?sort=0'}>Tất cả</Link>
							</ul>
						</div>
						{Array.isArray(cate)&&(
							cate?.map((it,index)=>(
								<div className={styles.wrapperChild} key={index} >
									<ul className={styles.child}
									    onMouseOver={()=>handleMouseOver(it?._id)}
									    onMouseOut={()=>handleMouseOut}
									>
										<Link
											className={`${activeList.indexOf(it._id) > -1&&styles.red}`}
											onClick={()=>setOpen(false)}
											to={path.TIM_TRUYEN +'-'+ toSlug(it?.name) +'-'+ it?._id + '?sort=0'}>
											{it?.name}
										</Link>
									</ul>
								</div>
							))
						)}
					</li>
					<li className={`${isHovering ? styles.desShow: styles.desHide}`}>
						<p className={`${styles.tip} ${styles.separator}`}>{cate.find(v => v._id === id)?.description}</p>
					</li>
				</ul>

			</>
		);
};

export default MegaMenu;
