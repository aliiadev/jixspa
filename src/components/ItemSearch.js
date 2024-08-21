import React from 'react';
import {Link} from "react-router-dom";
import styles from "../styles/components/_itemSearch.module.scss";
import url from "../apis/environmentConfig"
import path from "../contants/path";
import toSlug from "../utils/toSlug";

const ItemSearch = ({
	data = []
}) => {
	return (
		<div className={styles.suggestSearch}>
			<ul>
				{data?.map((it)=>(
					<li className={styles.itemSearch}>
						<Link to={path.TRUYEN_TRANH+toSlug(it?.name)+'-'+it?._id}>
							<img src={url.BASE_URI + it?.thumbnail} alt={it?.name}/>
							<div className={styles.titleItem}>
								<h3>{it?.name}</h3>
								<h4>
									<i>{it?.chapters?.length > 0 ? it?.chapters[0]?.name:''}</i>
								</h4>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ItemSearch;
