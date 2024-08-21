import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from '../../styles/pages/_admin_login.module.scss'
import {Container} from "react-bootstrap";
import {useForm} from "react-hook-form";
import HelmetSEO from "../../components/HelmetSEO";
import FormInput from "../../components/FormInput";
import {useUserStore} from "../../stores/useUserStore";
import {Navigate, useNavigate} from "react-router-dom";
import path from "../../contants/path";
import {callService} from "../../apis/baseRequest";
import {definesApi} from "../../apis";

const LoginAdmin = () => {

	const {control, handleSubmit} = useForm();

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false)

	const {login, user, setUser} = useUserStore(state => ({login: state.login, user: state.user, setUser: state.setUser}))

	const onSubmit = async (data) => {
		if(!!data && !!data.email && !!data.password) {
			const isAuth = await login(data)
			if(isAuth) {
				navigate(path.ADMIN_HOME, {replace: true})
			} else {
				alert('Đăng nhập thất bại')
			}
		}
	}
	useLayoutEffect(()=>{
		if(!user) {
			if(localStorage.getItem('key')) {
				setIsLoading(true)
				callService(definesApi.reload.uri, 'POST', {}, true)
					.then((res)=>{
						setIsLoading(false)
						setUser(res)
					})
					.catch(()=> setIsLoading(false))
			}
		}
	},[])

	if(user?.email !== undefined) return (<Navigate to={path.ADMIN_HOME}/>)

	if(isLoading) return <div>Loading...</div>

	return (
		<Container className={`align-items-center justify-content-center d-flex ${styles.main}`}>
			<HelmetSEO seo={'Đăng nhập quản trị'}/>
			<h1>{'Đăng nhập'}</h1>
			<form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					placeholder={'Nhập tên đăng nhập...'}
					label={'Tên đăng nhập'}
					control={control}
					name={'email'}
				/>
				<FormInput
					placeholder={'Nhập mật khẩu...'}
					label={'Mật khẩu'}
					control={control}
					name={'password'}
					type={'password'}
				/>
				<button className={'btn btn-primary'}>{'Đăng nhập'}</button>
			</form>
		</Container>
	);
};

export default LoginAdmin;
