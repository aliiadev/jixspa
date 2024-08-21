import React from 'react';
import styles from "../styles/components/_breadCrumb.module.scss";
import {Link} from "react-router-dom";
import path from "../contants/path";
import {MdOutlineNavigateNext} from "react-icons/md";
import {useOpenMenu} from "../stores/useOpenMenu";

const BreadCrumb = ({
	text,
	src
}) => {

	const {setAct} = useOpenMenu(state => ({setAct: state.setAct}))

	return (
		<div className={styles.breadCrumb}>
			<ul>
				<li>
					<Link onClick={()=>setAct('HOME')} to={path.HOME}>
						<span>Trang chủ</span>
					</Link>
					<span>
						<MdOutlineNavigateNext style={{marginLeft:5, color:"#ccc"}}/>
						<MdOutlineNavigateNext style={{marginLeft:-12,color:"#ccc"}}/>
					</span>
				</li>
				{Array.isArray(text) ?
					text.map((v, index)=> (
						<li key={index}>
							<Link to={v.src}>
								<span style={{marginLeft:5}}>{v.text}</span>
							</Link>
							{!((text.length - 1) === index)?(
								<span>
									<MdOutlineNavigateNext style={{marginLeft:5, color:"#ccc"}}/>
									<MdOutlineNavigateNext style={{marginLeft:-12,color:"#ccc"}}/>
								</span>
							):null}
						</li>
					))
				:
					<li>
						<Link to={src}>
							<span style={{marginLeft:5}}>{text}</span>
						</Link>
					</li>
				}

			</ul>
		</div>
	);
};

export default BreadCrumb;
