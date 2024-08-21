import React, {useEffect, useRef, useState} from 'react';
import MainAdminLte from "../../components/MainAdminLte";
import {Col, Row} from "react-bootstrap";
import CardForm from "../../components/CardForm";
import FormInput from "../../components/FormInput";
import {useFieldArray, useForm} from "react-hook-form";
import Switch from "../components/Switch";
import ButtonBase from "../../components/ButtonBase";
import FormUploadThumbnail from "../components/FormUploadThumbnail";
import {useCategoryStore} from "../../stores/useCategoryStore";
import toSlug from "../../utils/toSlug";
import {callService} from "../../apis/baseRequest";
import Swal from "sweetalert2";

const AddComicAdmin = () => {

	const {control, setValue, register, handleSubmit, reset} = useForm({
		defaultValues: {
			thumbnail: null
		}
	});

	const {categories, getCategory} = useCategoryStore(state => ({categories: state.cate, getCategory: state.getCate}))

	useEffect(()=> {
		getCategory()
	}, [])

	const onSubmit = async (data) => {
		if(data.thumbnail === null) {
			alert('Chưa có ảnh bìa')
			return;
		}
		try {
			await callService('comic', 'POST', data, true)
			let timerInterval
			await Swal.fire({
				title: 'Thành công',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading()
					const b = Swal.getHtmlContainer().querySelector('b')
					timerInterval = setInterval(() => {
						b.textContent = Swal.getTimerLeft()
					}, 100)
				},
				willClose: () => {
					clearInterval(timerInterval)
					reset({thumbnail: null})
					formUploadRef.current?.reset()
				}
			})
		}catch (e) {
			alert(e)
		}
	}

	const onUploadThumbnail = (data) => {
		setValue('thumbnail', data)
	}

	const formUploadRef = useRef()
	return (
		<MainAdminLte title={'Thêm mới truyện'}>
			<Row>
				<CardForm title={'Thêm mới truyện'}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Row>
							<Col md={4}>
								<FormInput
									control={control}
									name={'name'}
									label={'Tên'}
									onKeyUp={(e)=>setValue('slug', toSlug(e.target.value))}
								/>
							</Col>
							<Col md={4}>
								<FormInput
									control={control}
									name={'another_name'}
									label={'Tên khác'}
								/>
							</Col>
							<Col md={4}>
								<FormInput
									control={control}
									name={'slug'}
									label={'Slug'}
								/>
							</Col>
							<Col md={3}>
								<label>{'Danh mục'}</label>
								<select {...register('category_ids')} multiple className="form-select">
									<option disabled={true} selected>{'Chọn danh mục'}</option>
									{Array.isArray(categories)&&(
										categories.map(({_id, name})=> (
											<option key={_id} value={_id}>{name}</option>
										))
									)}
								</select>
							</Col>
							<Col md={12}>
								<FormInput
									control={control}
									name={'description'}
									label={'Nội dung'}
								/>
							</Col>
							<Col md={12}>
								<FormUploadThumbnail ref={formUploadRef} onUpload={onUploadThumbnail}/>
							</Col>
							<div>
								<ButtonBase type={'submit'} text={'Thêm mới'} />
							</div>
						</Row>
					</form>
				</CardForm>
			</Row>
		</MainAdminLte>
	);
};

export default AddComicAdmin;
