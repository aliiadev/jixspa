import React, {useEffect, useState} from 'react';
import MainAdminLte from "../../components/MainAdminLte";
import {useCategoryStore} from "../../stores/useCategoryStore";
import {Col} from "react-bootstrap";
import TableData from "../../components/TableData";
import GroupButtonAdmin from "../../components/GroupButtonAdmin";
import {useForm} from "react-hook-form";
import FormInput from "../../components/FormInput";
import CardForm from "../../components/CardForm";
import ButtonBase from "../../components/ButtonBase";
import {callService} from "../../apis/baseRequest";
import toSlug from "../../utils/toSlug";

const CategoryAdmin = () => {

	const {categories, getCategory} = useCategoryStore(state => ({categories: state.cate, getCategory: state.getCate}))

	useEffect(()=> {
		if(categories.length === 0) {
			getCategory()
		}
	}, []);

	const {control, handleSubmit, reset, setValue} = useForm();

	const [isEdit, setIsEdit] = useState(false)

	const onSubmit = async (data) => {
		await callService('category', isEdit? 'PUT': 'POST', data, true)
		await getCategory()
		reset({name: '', code: '',description:''})
		if(isEdit) setIsEdit(false)
	}

	const onEdit = (id) =>  {
		if(!isEdit) setIsEdit(true)
		const category = categories.find(x=>x._id === id)
		reset({name: category.name, code: category.code, id, description: category.description})
	}

	const onDelete = async (id) => {
		await callService('category', 'DELETE', {id}, true)
		await getCategory()
	}

	return (
		<MainAdminLte title={'Quản lý danh mục'}>
			<Col md={6}>
				<TableData>
					<thead>
						<tr>
							<th style={{width: 10}}>{'#'}</th>
							<th>{'Tên'}</th>
							<th>{'Mã'}</th>
							<th style={{width: 110}}>{'Hành động'}</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(categories)&&(
							categories.map(({name, _id, code}, index)=> (
								<tr key={_id}>
									<td>{index+1}.</td>
									<td>{name}</td>
									<td>{code}</td>
									<td>
										<GroupButtonAdmin onDelete={()=>onDelete(_id)} onEdit={()=>onEdit(_id)}/>
									</td>
								</tr>
							))
						)}
					</tbody>
				</TableData>
			</Col>
			<Col md={6}>
				<CardForm title={isEdit? 'Chỉnh sửa': 'Thêm mới'}
				          headerComponent={isEdit&&(<ButtonBase text={'Đổi sang thêm mới'} onClick={()=>{
							  reset({name: '', code: ''})
							  setIsEdit(false)
				          }}/>)}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormInput
							onKeyUp={(e)=>setValue('code', toSlug(e.target.value))}
						    name={'name'}
							control={control}
							label={'Tên'}
							placeholder={'Nhập tên danh mục...'}
						/>
						<FormInput name={'code'} control={control} label={'Mã'} placeholder={'Nhập mã danh mục...'}/>
						<FormInput name={'description'} control={control} label={"Mô tả"} placeholder={'Nhập mô tả danh mục'}/>
						<ButtonBase theme={'primary'} text={isEdit? 'Chỉnh sửa': 'Thêm mới'} type={'submit'}/>
					</form>
				</CardForm>
			</Col>
		</MainAdminLte>
	);
};

export default CategoryAdmin;
