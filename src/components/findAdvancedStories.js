import React, {useState} from 'react';
import styles from "../styles/pages/_findAdvancedStories.module.scss";
import {TiTick} from "react-icons/ti";
import {IoCloseOutline} from "react-icons/io5";
import {Container} from "react-bootstrap";

const FindAdvancedStories = () => {
	const [open, setOpen] = useState(true);
	return (
		<Container className={styles.boder}>
			<div className={styles.find}>
				<div className={styles.comicFilter}>
					<p className="text-center">Tìm truyện nâng cao</p>
				</div>
				<div className={styles.buttonContent}>
					<button className="btn btn-primary" onClick={() => setOpen(!open)}>
						{open ? 'Ẩn' : 'Hiện'} khung tìm kiếm
					</button>
				</div>
				{open ?
					<div className={styles.advSearch}>
						<div className={styles.note}>
							<p className={styles.noteIt}>
								<span className={styles.icon}><TiTick color="#40C057"/>  </span>
								<span className={styles.text}>
									Tìm trong những thể loại này(Click 1 lần để lựa chọn)
								</span>
							</p>
							<p className={styles.noteIt}>
								<span className={styles.icon}><IoCloseOutline color="#FA5252"/>  </span>
								<span className={styles.text}>
									Loại trừ những thể loại này(Click 2 lần để loại trừ)
								</span>
							</p>
							<p className={styles.noteIt}>
								<span className={styles.icon}><IoCloseOutline color="#FA5252"/>  </span>
								<span className={styles.text}>
									Truyện có thể thuộc hoặc không thuộc thể loại này
								</span>
							</p>
						</div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div> : <div></div>
				}
			</div>
		</Container>
	);
};
export default FindAdvancedStories;