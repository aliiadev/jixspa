import React, {useCallback, useState} from 'react';
import styles from "../styles/components/_Story.module.scss"
import {BsFillEyeFill} from "react-icons/bs"
import {BsFillChatFill} from "react-icons/bs"
import {BsHeartFill} from "react-icons/bs"
import {IoClose} from "react-icons/io5"
import {BsCheckLg} from "react-icons/bs"
import Chapter from "./Chapter";
import environmentConfig from "../apis/environmentConfig"
import images from "../assets/images/images";
import {Link, useNavigate} from "react-router-dom";
import path from "../contants/path";
import toSlug from "../utils/toSlug";
import {Col, Row} from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import {useSocket} from "../stores/useSocket";

const Story = ({
	id,
	name = '',
	totalView = '',
	totalComment = '',
	totalLike = '',
	img = '',
	listChapter = [],
	hot = false,
	showFollow = false,
	setChange,
	newSize = false
}) => {

	const [comicFollow, setComicFollow] = useLocalStorage('comic-follows', [])
	const [visitedComics, setVisitedComics] = useLocalStorage('visited-comics', [])
	const {socket} = useSocket(state => ({socket: state.socket}))
	const [guiUID, setGuiUID] = useLocalStorage('guiUID', {})


	const onUnFollow = (() => {
		setComicFollow(comicFollow.filter(x=>x!==id))
		socket.emit('onComicFollow', {machine_id: guiUID['uuGuiID'], comic_id: id, unfollow: '-1'})
		setChange(comicFollow.filter(x=>x!==id))
	})

	let nameComic = name.toLowerCase()

	return (
		<div className={`item ${newSize&&'item-2'}`}>
			<div className={styles.item}>
				<div className={styles.wrapperImage}>
					<Link to={path.TRUYEN_TRANH + toSlug(name) + '-' + id}>
						{hot && (
							<span className={styles.icon_hot} style={{backgroundImage: `url(${images.icon_hot})`}}/>
						)}
						<img src={environmentConfig.BASE_URI + img} alt={name}/>
						<div className={styles.view_clearfix}>
							<div className={styles.col_icon}>
								<div className={styles.item_col_icon}>
									<BsFillEyeFill className={styles.icon}/>
									<h2 className={styles.text_icon}>{totalView}</h2>
								</div>
								<div className={styles.item_col_icon}>
									<BsFillChatFill className={styles.icon}/>
									<h2 className={styles.text_icon}>{totalComment}</h2>
								</div>
								<div className={styles.item_col_icon}>
									<BsHeartFill className={styles.icon}/>
									<h2 className={styles.text_icon}>{totalLike}</h2>
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className={styles.footer_item}>
						{showFollow &&
							<Row>
								<Col>
									<p className={styles.btnSuccess}>
										<BsCheckLg size={12}/>
										Đang đọc
									</p>
								</Col>
								<Col onClick={onUnFollow}>
									<p className={styles.btnError}>
										<IoClose size={15}/>
										Bỏ theo dõi
									</p>
								</Col>
							</Row>
						}
					<Link to={path.TRUYEN_TRANH + toSlug(name) + '-' + id}>
						<h2 className={styles.title_text}>{name.toLowerCase()}</h2>
					</Link>
					{listChapter.map(({name, updated_at, _id, slug}) => (
						<Link to={path.XEM + toSlug(nameComic) + '-' + slug + '-' + id + '-' +_id} key={_id} className={styles.chapterItem}>
							<Chapter active={visitedComics?.find(x=>x._id === id)?.chapterId?.indexOf(_id) > -1} name={name} update_at={updated_at}/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Story;
