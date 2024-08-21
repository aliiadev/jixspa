import React from 'react';
import MainContainer from "../components/MainContainer";
import {Col, Row} from "react-bootstrap";
import BoxBarTabComic from "../components/BoxBarTabComic";
import NavLink from "../components/NavLink";
import styles from '../styles/pages/_App.module.scss'
import HelmetSEO from "../components/HelmetSEO";
import BreadCrumb from "../components/BreadCrumb";

const App = () => {
	return (
		<>
			<HelmetSEO seo={"Tải App"}/>
			<MainContainer>
				<BreadCrumb text={"Tải app"}/>
				<Row>
					<Col md={12} lg={8}>
						<div className={styles.module}>
							<div className={styles.head}>
								<h1 className={styles.page_title}>Tải App JixOne</h1>
								<div style={{minHeight:'650px'}}>
									<ol>
										<li>Dành cho android (Đang xây dựng)</li>
										<li>Dành cho ios (Đang xây dựng)</li>
									</ol>
									<h2 className={styles.title}>Dự kiến phiên bản 1.1.3</h2>
									<ul className={styles.box_content}>
										<li>Zoom ảnh với 2 ngón tay thay vì Double click</li>
										<li>Download theo thứ tự từ nhỏ tới lớn</li>
										<li>Đăng nhập bằng Google, Facebook</li>
										<li>Fix lỗi report chapter</li>
									</ul>
									<h2 className={styles.title}>Cập nhật phiên bản 1.1.2</h2>
									<ul className={styles.box_content}>
										<li>Zoom ảnh khi Double click</li>
										<li>Thêm truyện đề cử ở trang chủ</li>
										<li>Fix lỗi hiển thị Chưa có truyện theo dõi</li>
										<li>Đánh dấu chapter đã đọc</li>
										<li>Fix lỗi header ẩn hiện khi đọc truyện</li>
										<li>Và một số bổ sung khác...</li>
									</ul>
									<h2 className={styles.title}>Phiên bản 1.1.1</h2>
									<ul className={styles.box_content}>
										<li>Xem được truyện VIP free</li>
										<li>Download truyện và xem offline</li>
										<li>Thông báo khi truyện được cập nhật (đối với truyện đã theo dõi)</li>
										<li>Lịch sử đọc truyện được đánh dấu dễ theo dõi</li>
										<li>Hai loại giao diện: Sáng và Tối</li>
										<li>Không quảng cáo</li>
									</ul>
								</div>
							</div>
						</div>
					</Col>
					<Col md={12} lg={4}>
						<BoxBarTabComic/>
					</Col>
				</Row>
			</MainContainer>
		</>
	);
};

export default App;
