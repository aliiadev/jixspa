import React, {useEffect, useState} from 'react';
import styles from '../styles/layout/_footer.module.scss'
import {Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import path from "../contants/path";
import images from "../assets/images/images";

const Footer = () => {

	const [openPage, setOpenPage] = useState(false)

	useEffect(() => {
		if (window.FB && openPage) {
			window.FB.XFBML.parse();
		}
		if(!openPage) {
			setTimeout(()=> {
				setOpenPage(true)
			}, 2000)
		}
	},[openPage]);

	const hostname = window.location.hostname

	return (
		<footer className={styles.footer}>
			<Container>
				<Row>
					<Col lg={4} md={5} sm={4} style={{overflow: 'hidden'}}>
						<div className={styles.wrapper_logo}>
							<Link to={path.HOME}>
								<Image alt={'logo-jixone.png'} src={hostname === 'jixone.com' ? images.logo : images.logo2}/>
							</Link>
						</div>
						{openPage&&(
							<div className="fb-page" data-href="https://www.facebook.com/profile.php?id=100086238262854"
							data-tabs="timeline" data-width="375" data-height="76" data-small-header="true"
							data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
								<blockquote cite="https://www.facebook.com/profile.php?id=100086238262854"
											className="fb-xfbml-parse-ignore"><a
									href="https://www.facebook.com/profile.php?id=100086238262854">Jixone.com - Truyện Tranh
									Online</a></blockquote>
							</div>
						)}
						
						{/* <div className="fb-page" data-href=" https://www.facebook.com/profile.php?id=100086688826621"
						     data-tabs="timeline" data-width="375" data-height="76" data-small-header="true"
						     data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
							<blockquote cite=" https://www.facebook.com/profile.php?id=100086688826621"
							            className="fb-xfbml-parse-ignore"><a
								href="https://www.facebook.com/profile.php?id=100086238262854">Jixlove.com - Truyện Tranh
								Online</a></blockquote>
						</div> */}


						<div className={styles.wrapper_copy}>
							<a>{'Liên hệ bản quyền'}</a>
							<p>Copyright © JixOne.com</p>
						</div>
					</Col>
					<Col lg={8} md={9} sm={8}>
						<div className={styles.link_footer}>
							<h4>{'Từ khóa'}</h4>
							<ul>
								<li><a target="_blank" href="https://jixone.com">Jixone</a></li>
								<li><a target="_blank" href="https://jixlove.com">Jixlove</a></li>
								<li><a target="_self" href="/">Truyện tranh</a></li>
								<li><a target="_self" href="/">Truyen tranh online</a></li>
								<li><a target="_self" href="/">Đọc truyện tranh</a></li>
								<li><a target="_self" href="/">Truyện tranh hot</a></li>
								<li><a target="_self" href="/">Truyện tranh hay</a></li>
								<li><a target="_self" href="/">Truyện ngôn tình</a></li>
								<li><a target="_self" href="/">Manhwa</a></li>
								<li><a target="_self" href="/">Manga</a></li>
								<li><a target="_self" href="/">Manhua</a></li>
								<li><a target="_self" href="/">Manga</a></li>
								<li><a target="_self" href="/">Manga truyện tranh</a></li>
								<li><a target="_self" href="/">Truyện anime</a></li>
								<li><a target="_self" href="/">Truyện full</a></li>
								<li><a target="_self" href="/">Web đọc truyện</a></li>
								<li><a target="_self" href="/">Tìm truyện</a></li>
								<li><a target="_self" href="/">đọc truyện</a></li>
								<li><a target="_self" href="/">Truyện ngôn tình</a></li>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
