import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import styles from '../styles/layout/_navbar.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {FaHome, FaSearch} from 'react-icons/fa'
import path from "../contants/path";
import {useCategoryStore} from "../stores/useCategoryStore";
import {useOpenMenu} from "../stores/useOpenMenu";
import MegaMenu from "./MegaMenu";
import MenuRank from "./MenuRank";
import ItemSearch from "./ItemSearch";
import {useProductStore} from "../stores/useProductStore";
import axios from 'axios';

const menus = [
	{code:'TH',name: 'TRUYỆN HOT', path: path.TRUYEN_HOT,},
	{code:'TL',name: 'THỂ LOẠI', path: path.TIM_TRUYEN + '?sort='+0},
	{code:'FOLLOW',name: 'ĐANG THEO DÕI', path: path.THEO_DOI, },
	{code:'RANK',name: 'XẾP HẠNG', path: path.TIM_TRUYEN},
	{code:'FIND',name: 'TÌM TRUYỆN', path: path.TIM_KIEM_NANG_CAO},
	{code:"CT", name: 'CON TRAI', path: path.TRUYEN_CON_TRAI},
	{code:'CG',name: 'CON GÁI', path: path.TRUYEN_CON_GAI},
	{code:'APP',name: 'TẢI APP', path: path.APP}
]

const NavBar = () => {

	const [showGenre, setShowGenre] = useState(false);

	const [showRank, setShowRank] = useState(false);

	const {open,setOpen, act, setAct} = useOpenMenu(state => ({
		open: state.open,
		setOpen: state.setOpen,
		act: state.act,
		setAct: state.setAct,
	}))

	const {getCate,cate} = useCategoryStore(state => ({
		getCate: state.getCate,
		cate: state.cate
	}));

	useEffect(()=>{
		async function fetchData(){
			await getCate()
		}
		fetchData()
	},[]);

	const showMegaMenu = (code) => {
		switch (code) {
			case 'TL':
				setShowGenre(!showGenre)
				break
			case 'RANK':
				setShowRank(!showRank);
				break
		}
	}

	const hideMegaMenu = (code) => {
		switch (code) {
			case 'TL':
				setShowGenre(false)
				break
			case 'RANK':
				setShowRank(false);
				break
		}
	}

	const renderMegaMenu = (code) => {
		switch (code) {
			case 'TL':
				return (
					<MegaMenu
						width={'25%'}
						cate={cate}
						hideDropdown={()=>hideMegaMenu(code)}
						showGenre={showGenre}
					/>
				)
			case 'RANK':
				return (
					<MenuRank
						hideDropdown={()=>hideMegaMenu(code)}
						showRank={showRank}
					/>
				)
		}
	}

	const navigate = useNavigate()

	const renderMenu = () => (
		menus.map(({code, path, name}, index)=> (
			<li key={index}
			    className={`${code === "CT" || code ==="CG" ? styles.hide:''} ${act === code ? styles.act:''}`}
			    onMouseEnter={()=> showMegaMenu(code)}
			    onClick={()=>{
					showMegaMenu(code)
				    setAct(code)
				    if(code !== 'TL' && code !== 'RANK') {
					    navigate(path)
				    }
				}}
			    onMouseLeave={()=> hideMegaMenu(code)}
			>
				<Link
					to={code === "TL" || code === 'RANK'? '/tim-truyen' + '?sort=0' : path}
				    onClick={()=> setOpen(false)}
				    className={`${styles.topLinkMega} ${code === "TL" || code === 'RANK'? "dropdown-toggle" :''}`}
				>
					{name}
				</Link>
				{renderMegaMenu(code)}
			</li>
		))
	)

	const [data,setData] = useState()

	const {getPro} = useProductStore(state => ({
		getPro: state.getComicByKey
	}))
	const onchange = async (e) =>{
		if (e.target.value){
			const res = await getPro(e.target.value)
			if(res){
				setData(res)
			}
		}
		else {
			setData([])
		}
	}

	return (
		<>
			<nav className={styles.mainNav}>
				<Container>
					<ul className={styles.mainMenu}>
						<li className={`${act === "HOME" ? styles.act:''}`} onClick={()=>{
							setAct("HOME")
							navigate(path.HOME)
						}}>
							<Link className={styles.topLinkMega} to={path.HOME}>
								<FaHome size={20}/>
							</Link>
						</li>
						{renderMenu()}
						<li className={`${styles.hide} ${act === "GROUP" ? styles.act:''}`} onClick={()=>setAct("GROUP")}>
							<a className={styles.topLinkMega} target={'_blank'} href={'https://www.facebook.com/profile.php?id=100086238262854'}>
								GROUP
							</a>
						</li>
					</ul>
				</Container>
			</nav>
			{/*nav mobile*/}
			<div className={`${open? styles.navShow: styles.navHide}`}>
				<div className={styles.search_box}>
					<div className={styles.input_group}>
						<input onChange={(e)=>onchange(e)} type="text" className={`form-control ${styles.search_input}`} placeholder={"Tìm truyện..."}/>
						<span className={styles.box_icon}><FaSearch className={styles.icon}/></span>
						<ItemSearch data={data}/>
					</div>
				</div>
				<div className={styles.module_content}>
					<ul>
						{renderMenu()}
						<li className={`${styles.hide} ${act === "GROUP" ? styles.act:''}`} onClick={()=>setAct("GROUP")}>
							<a className={styles.topLinkMega} target={'_blank'} href={'https://www.facebook.com/profile.php?id=100086238262854'}>
								GROUP
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default NavBar;
