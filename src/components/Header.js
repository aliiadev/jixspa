import React, {useEffect, useRef, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import images from "../assets/images/images";
import styles from '../styles/layout/_header.module.scss';
import {Link} from "react-router-dom";
import path from "../contants/path";
import {IoIosSearch, IoIosClose} from 'react-icons/io'
import {FaSearch, FaBars} from 'react-icons/fa'
import ToggleDarkMode from "./ToggleDarkMode";
import {useOpenMenu} from "../stores/useOpenMenu";
import ItemSearch from "./ItemSearch";
import {useProductStore} from "../stores/useProductStore";
import useOutside from "../hooks/useOutside";

const Header = ({
	is_show_mobile = true
}) => {
	const [data, setData] = useState([])

	const {getPro} = useProductStore(state => ({
		getPro: state.getComicByKey
	}))
	const {setOpen, open} = useOpenMenu(state => ({
		setOpen: state.setOpen,
		open: state.open
	}))
	const onchange = async (e) =>{
		const value = e.target.value
		if (!!value){
			const res = await getPro(value)
			setData(res)
		}
		else {
			setData([])
		}
	}
	if(is_show_mobile) {
		let prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
			const currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				document.getElementById("header").style.top = "0";
			} else {
				document.getElementById("header").style.top = "-50px";
			}
			prevScrollpos = currentScrollPos;
		}
	}
	const wrapperSearchRef = useRef(null);
	useOutside(wrapperSearchRef, ()=> {
		setData([])
	});

	const hostname = window.location.hostname

	return (
		<header id={is_show_mobile?'header':undefined} className={styles.header} style={{backgroundImage: `url(${images.background_header})`,}}>
			<div className={"container"}>
				<Row className={'align-items-center'}>
					<Col md={3} sm={4} xs={5}>
						<div className={styles.navHeader}>
							<Link to={path.HOME}>
								<img src={hostname === 'jixone.com' ? images.logo : images.logo2} alt={'logo-jixone.png'}/>
							</Link>
						</div>
					</Col>
					<Col md={4} className={styles.display}>
						<div ref={wrapperSearchRef} className={styles.wrapperSearch}>
							<input onChange={(e)=>onchange(e)} className={styles.inputSearch} placeholder={'Tìm truyện...'}/>
							<IoIosSearch className={styles.iconWrapperSearch} size={20}/>
							<ItemSearch data={data}/>
						</div>
					</Col>
					<Col md={2} sm={4} xs={4} className={styles.light_chat}>
						<ToggleDarkMode/>
					</Col>
					<Col md={0} sm={4} xs={3}>
						<div className={styles.responsive_search}>
							<div><FaSearch size={23} className={styles.iconSearch}/></div>
							<div onClick={() => setOpen(!open)} className={styles.bar}>{open ? <IoIosClose size={23}/> :
								<FaBars size={23}/>}</div>
						</div>
					</Col>
				</Row>
			</div>
		</header>
	);
};

export default Header;
