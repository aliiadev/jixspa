import React, {useState} from 'react';
import {AiOutlineUnorderedList} from 'react-icons/ai'
import {TiPlus, TiMinus} from 'react-icons/ti'
import {Col, Row} from "react-bootstrap";
import styles from '../styles/components/_listChapterComic.module.scss'
import {Link} from "react-router-dom";
import {formatDateSince} from "../utils/formatDate";
import formatNumber from "../utils/formatNumber";
import toNumber from "../utils/toNumber";
import path from "../contants/path";
import toSlug from "../utils/toSlug";
import {useSocket} from "../stores/useSocket";

const ListChapterComic = ({chapters = [],idTruyen,nameTruyen}) => {


	const [viewMore, setViewMore] = useState(false);

	return (
		<div >
			<h2 className={styles.list_title}>
				<AiOutlineUnorderedList/>  Danh sách chương
			</h2>
			<Row className={styles.heading}>
				<Col xs={5} className={styles.no_warp}>Số chương</Col>
				<Col xs={4} className={styles.no_warp && styles.center}>Cập nhật</Col>
				<Col xs={3} className={styles.no_warp && styles.center}>Lượt xem</Col>
			</Row>
			<div className={styles.box_chapter}>
				{chapters?.slice(0, viewMore?chapters.length:12).map(({name,slug, updated_at, view, _id})=>(
					<Row className={styles.lst_chapter} key={_id}>
						<Col xs={5} className={styles.chapter}><Link to={path.XEM + toSlug(nameTruyen) +'-'+ toSlug(slug) + '-' + idTruyen + '-' + _id}>{name?.toLowerCase()}</Link></Col>
						<Col xs={4} className={styles.update_at}>{formatDateSince(updated_at,'DD-MM-YYYY')}</Col>
						<Col xs={3} className={styles.view}>{formatNumber(toNumber(view))}</Col>
					</Row>
				))}
				<span onClick={()=>setViewMore(!viewMore)} className={styles.view_more}>
					 <span className={styles.button}>{viewMore?<TiMinus size={19}/>:<TiPlus size={19}/>}
						 {viewMore?'Thu gọn':'Xem thêm'}
					 </span>
				</span>
			</div>
		</div>
	);
};

export default ListChapterComic;
