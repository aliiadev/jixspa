import React, {useEffect, useRef, useState} from 'react';
import MainAdminLte from "../../components/MainAdminLte";
import {callService} from "../../apis/baseRequest";
import {Row} from "react-bootstrap";
import TableData from "../../components/TableData";
import {environmentConfig} from "../../apis";
import Switch from "../components/Switch";
import GroupButtonAdmin from "../../components/GroupButtonAdmin";
import {formatDateWithFormatStr} from "../../utils/formatDate";
import ButtonBase from "../../components/ButtonBase";
import {Link, useNavigate} from "react-router-dom";
import path from "../../contants/path";
import {GrChapterAdd} from 'react-icons/gr'
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";

const ComicAdmin = () => {

	const [comics, setComics] = useState(null);

	const currentPage = useRef(0)

	useEffect(()=> {
		getComic()
	}, [])

	const getComic = (params = {}) => {
		callService('comic/find-all', 'POST', params, true)
			.then((response)=> {
				setComics(response)
			})
	}

	const onDelete = async (id) => {
		const {isConfirmed} = await Swal.fire({
			title: 'Xác nhận',
			text: 'Bạn chắc  chắn muốn xóa ' + comics.results.find((x)=>x._id === id).name,
			showCancelButton: true,
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Đồng ý'
		})
		if(isConfirmed) {
			await handleToggle({is_hidden: true, id})
		}
	}

	const onEdit = (id) => {
		navigate(path.EDIT_ADMIN_COMIC_BASE + id)
	}

	const onAddChapter = (id) => {
		navigate(path.ADD_ADMIN_CHAPTER_BASE + id)
	}

	const navigate = useNavigate();

	const onChangePage = (page) => {
		getComic({page_number: page})
		currentPage.current = page
	}

	const handleToggle = async (data) => {
		try {
			await callService('comic/multiple-toggle', 'POST', data, true)
			let update = {...comics}
			update.results = update.results.map((x)=> {
				if(x._id === data.id) {
					let obj = {...x}
					delete data.id
					obj = Object.assign(obj, data)
					return obj
				}
				return x
			})
			setComics(update)
		} catch (e) {
			alert(e)
		}
	}

	return (
		<MainAdminLte title={'Quản lý truyện'}>
			<Row md={12}>
				<div>
					<ButtonBase onClick={()=>navigate(path.ADD_ADMIN_COMIC, {replace: true})} text={'Thêm mới'} theme={'primary'}/>
				</div>
				<TableData>
					<thead>
						<tr>
							<th style={{width: 10}}>{'#'}</th>
							<th style={{width: 75}}>{'Ảnh bìa'}</th>
							<th style={{width: 200}}>{'Tên truyện'}</th>
							<th style={{width: 200}}>{'Slug'}</th>
							<th style={{width: 20}}>{'Tổng Chapter'}</th>
							<th style={{width: 10}}>{'Con gái'}</th>
							<th style={{width: 10}}>{'Hot'}</th>
							<th style={{width: 10}}>{'Đề cử'}</th>
							<th style={{width: 20}}>{'Ngày tạo'}</th>
							<th style={{width: 20}}>{'Cập nhật'}</th>
							<th style={{width: 20}}>{'Hành động'}</th>
						</tr>
					</thead>
					<tbody>
						{comics&&(
							comics?.results?.map(({_id, name, another_name, slug, description, thumbnail, is_woman, is_hot, is_nominations, created_at, updated_at, chapters, is_hidden}, index)=>{
								if(!is_hidden)
									return (<tr key={_id}>
										<td>{index + 1}.</td>
										<td>
											<img width={70} src={environmentConfig.BASE_URI + thumbnail} alt={name} loading={'lazy'}/>
										</td>
										<td style={{textTransform: 'capitalize'}}>{name.toLowerCase()}</td>
										<td>{slug}</td>
										<td>{chapters.length}</td>
										<td>
											<Switch
												isOn={is_woman}
												handleToggle={()=>handleToggle({is_woman: !is_woman, id: _id})}
											/>
										</td>
										<td>
											<Switch
												isOn={is_hot}
												handleToggle={()=>handleToggle({is_hot: !is_hot, id: _id})}
											/>
										</td>
										<td>
											<Switch
												isOn={is_nominations}
												handleToggle={()=>handleToggle({is_nominations: !is_nominations, id: _id})}
											/>
										</td>
										<td>{formatDateWithFormatStr(created_at, 'DD-MM-YYYY')}</td>
										<td>{formatDateWithFormatStr(updated_at, 'DD-MM-YYYY')}</td>
										<td>
											<GroupButtonAdmin onAdd={()=>onAddChapter(_id)} showAdd={true} onDelete={()=>onDelete(_id)} onEdit={()=>onEdit(_id)}/>
										</td>
									</tr>)}
							)
						)}
					</tbody>
				</TableData>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<Pagination total={comics?.total} onClick={onChangePage}/>
				</div>
			</Row>
		</MainAdminLte>
	);
};

export default ComicAdmin;
