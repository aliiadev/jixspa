import React, {useEffect, useState} from 'react';
import MainAdminLte from "../../components/MainAdminLte";
import {Col} from "react-bootstrap";
import ButtonBase from "../../components/ButtonBase";
import FormInput from "../../components/FormInput";
import toSlug from "../../utils/toSlug";
import CardForm from "../../components/CardForm";
import TableData from "../../components/TableData";
import GroupButtonAdmin from "../../components/GroupButtonAdmin";
import {useAuthor} from "../../stores/useAuthor";
import {useForm} from "react-hook-form";
import {callService} from "../../apis/baseRequest";

const AuthorAdmin = () => {

	const {author, getAuthor} = useAuthor(state => ({
		author: state.cate,
		getAuthor: state.getAuthor
	}))

	useEffect(()=> {
		if(author.length === 0) {
			getAuthor()
		}
	}, []);

	const {control, handleSubmit, reset, setValue} = useForm();

	const [isEdit, setIsEdit] = useState(false)

	const onSubmit = async (data) => {
		await callService('author', isEdit? 'PUT': 'POST', data, true)
		await getAuthor()
		reset({name: '', code: ''})
		if(isEdit) setIsEdit(false)
	}

	const onEdit = (id) =>  {
		if(!isEdit) setIsEdit(true)
		const auth = author.find(x=>x._id === id)
		reset({name: auth.name, code: auth.code, id})
	}

	const onDelete = async (id) => {
		await callService('author', 'DELETE', {id}, true)
		await getAuthor()
	}

	return (
		<MainAdminLte title={'Tác giả'}>
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
					{Array.isArray(author)&&(
						author.map(({name, _id, code}, index)=> (
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
							placeholder={'Nhập tên tác giả...'}
						/>
						<FormInput name={'code'} control={control} label={'Mã'} placeholder={'Nhập mã tác giả...'}/>
						<ButtonBase theme={'primary'} text={isEdit? 'Chỉnh sửa': 'Thêm mới'} type={'submit'}/>
					</form>
				</CardForm>
			</Col>
		</MainAdminLte>
	);
};

export default AuthorAdmin;
