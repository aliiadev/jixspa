import React from 'react';
import styles from '../styles/component/_historyBox.module.scss'
import {Link} from "react-router-dom";
import images from "../assets/images/images";
import {BiChevronRight} from 'react-icons/bi'
import {TiTimes} from 'react-icons/ti'
const HistoryBox = () => {
	const item = [
		{name:"Võ luyện đỉnh phong",chapter:"Đọc tiếp chapter 1",img:images.img_hisBox},
	]
	return (
		<div className={styles.box}>
			<h2>Lịch sử đọc truyện
				<span className={styles.viewAll}>Xem tất cả</span>
			</h2>
			<ul>
				{item.map((it,index)=>(
					<li key={index}>
						<div className={styles.item}>
							<Link to={"/#"} className={styles.thumb}>
								<img src={it?.img}  alt=""/>
							</Link>
							<h3>
								<Link to={'/#'}>
									{it?.name}
								</Link>
							</h3>
							<p className={styles.chapter}>
								<Link to={"/#"}>{it?.chapter}
									<BiChevronRight/>
								</Link>
								<span className={styles.view}>
									<Link to={"/#"}><TiTimes/>Xóa</Link>
								</span>
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HistoryBox;
