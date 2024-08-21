import React, {useEffect} from 'react';
import '../styles/admin/adminlte.css'
import {Link} from "react-router-dom";
import path from "../contants/path";
import {useUserStore} from "../stores/useUserStore";
import {callService} from "../apis/baseRequest";
import {definesApi} from "../apis";
import admin from "../routes/admin";

const MainAdminLte = ({children, title}) => {

	const {user, setUser} = useUserStore(state => ({user: state.user, setUser: state.setUser}));

	useEffect(()=>{
		if(!user) {
			if(localStorage.getItem('key')) {
				callService(definesApi.reload.uri, 'POST', {}, true)
					.then((res)=>setUser(res))
			}
		}
	},[])

	return (
		<div className="wrapper">
				{/* Main Sidebar Container */}
			<aside className="main-sidebar sidebar-dark-primary elevation-4">
				{/* Brand Logo */}
				<Link to={path.ADMIN_HOME} className="brand-link">
					<span className="brand-text font-weight-light">AdminLTE 3</span>
				</Link>
				{/* Sidebar */}
				<div className="sidebar">
					<div className="user-panel mt-3 pb-3 mb-3 d-flex">
						<div className="info">
							<Link to={path.ADMIN_HOME} className="d-block">{user?.name}</Link>
						</div>
					</div>
					<nav className="mt-2">
						<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
							{admin.map(({name, path}, index)=> (
								<li className="nav-item" key={index}>
									<Link to={path} className="nav-link">
										<p>
											{name}
										</p>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</aside>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">{title}</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item active">Dashboard v1</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				<section className="content">
					<div className="container-fluid">
						<div className="row">
							{children}
						</div>
					</div>
				</section>
			</div>
			<footer className="main-footer">
				<strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
				All rights reserved.
				<div className="float-right d-none d-sm-inline-block">
					<b>Version</b> 3.2.0
				</div>
			</footer>
		</div>
	);
};

export default MainAdminLte;
