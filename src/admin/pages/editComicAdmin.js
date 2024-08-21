import React, {useEffect, useRef, useState} from 'react';
import MainAdminLte from "../../components/MainAdminLte";
import {useNavigate, useParams} from "react-router-dom";
import {callService} from "../../apis/baseRequest";
import {useForm} from "react-hook-form";
import {Col, Row} from "react-bootstrap";
import CardForm from "../../components/CardForm";
import FormInput from "../../components/FormInput";
import toSlug from "../../utils/toSlug";
import FormUploadThumbnail from "../components/FormUploadThumbnail";
import ButtonBase from "../../components/ButtonBase";
import {useCategoryStore} from "../../stores/useCategoryStore";
import Swal from "sweetalert2";
import {environmentConfig} from "../../apis";
import TableData from "../../components/TableData";
import GroupButtonAdmin from "../../components/GroupButtonAdmin";
import path from "../../contants/path";

const EditComicAdmin = () => {

	const {comic_id} = useParams();

	const {categories, getCategory} = useCategoryStore(state => ({categories: state.cate, getCategory: state.getCate}))

	useEffect(()=> {
		getCategory()
	}, [])

	const [comic, setComic] = useState(null);

	const {control, handleSubmit, setValue, reset, register} = useForm()

	useEffect(()=> {
		getComic()
	}, [comic_id])

	const getComic = () => {
		callService('comic/find-one/' + comic_id, 'POST', {}, true)
			.then((res)=> {
				setComic(res)
				const {comic, categories} = res

				reset({
					name: comic?.name,
					another_name: comic?.another_name,
					slug: comic?.slug,
					description: comic?.description,
					category_ids: categories?.map((x)=>x._id)
				})
			})
	};

	const onSubmit = async (data) => {
		try {
			data.id = comic_id
			await callService('comic', 'PUT', data, true)
			await Swal.fire({
				icon: 'success',
				title: 'Thành công'
			})
			formUploadRef.current?.reset()
			getComic()
		} catch (e) {
			console.log(e)
			alert(e)
		}
	}

	const onUploadThumbnail = (data) => {
		setValue('thumbnail', data)
	}

	const formUploadRef = useRef();

	const navigate = useNavigate()

	const onEditChapter = (id) => {
		navigate(path.EDIT_ADMIN_CHAPTER_BASE + id)
	}

	const onDeleteChapter = (id) => {

	}
	return (
		<MainAdminLte title={'Chỉnh sửa ' + comic?.comic?.name}>
			<Row>
				<CardForm title={'Chỉnh sửa'}>
					<form>
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
							<Col md={9} className={'d-flex'}>
								<div className={'mr-4'}>
									<span className={'mr-4'}>{'Ảnh hiện tại'}</span>
									<img
										style={{width: 151}} alt={comic?.comic?.name}
										src={environmentConfig.BASE_URI + comic?.comic?.thumbnail}
									/>
								</div>
								<FormUploadThumbnail ref={formUploadRef} onUpload={onUploadThumbnail}/>
							</Col>
							<Col md={12}>
								<FormInput
									control={control}
									name={'description'}
									label={'Nội dung'}
								/>
							</Col>
							<div>
								<ButtonBase type={'button'} onClick={handleSubmit(onSubmit)} text={'Chỉnh sửa'} />
							</div>
						</Row>
					</form>
				</CardForm>
				<CardForm title={'Danh sách chapter'}>
					<TableData>
						<thead>
							<tr>
								<th style={{width: 10}}>{'#'}</th>
								<th>{'Tên chapter'}</th>
								<th>{'Slug'}</th>
								<th>{'Hành động'}</th>
							</tr>
						</thead>
						<tbody>
							{comic?.comic?.chapters?.map(({_id, name, slug}, index)=> (
								<tr key={_id}>
									<td>{index+1}.</td>
									<td>{name}</td>
									<td>{slug}</td>
									<td>
										<GroupButtonAdmin onEdit={()=>onEditChapter(_id)} onDelete={()=>onDeleteChapter(_id)}/>
									</td>
								</tr>
							))}
						</tbody>
					</TableData>
				</CardForm>
			</Row>
		</MainAdminLte>
	);
};

export default EditComicAdmin;
