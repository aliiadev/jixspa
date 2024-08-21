import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import MainAdminLte from "../../components/MainAdminLte";
import {Col, Row} from "react-bootstrap";
import CardForm from "../../components/CardForm";
import FormInput from "../../components/FormInput";
import {useForm} from "react-hook-form";
import toSlug from "../../utils/toSlug";
import ButtonBase from "../../components/ButtonBase";
import FormUploadChapter from "../components/FormUploadChapter";
import {callService} from "../../apis/baseRequest";
import Swal from "sweetalert2";
import {Editor} from '@tinymce/tinymce-react';

const AddChapterAdmin = () => {

	const {comic_id} = useParams();

	const [isTextComic, setIsTextComic] = useState(false)

	useEffect(()=> {

	}, [comic_id])

	const {control, handleSubmit, setValue, reset} = useForm();

	const [chapterId, setChapterId] = useState()

	const onSubmitChapter = async (data) => {
		data.comic_id = comic_id
		try {
			const response = await callService('chapter', 'POST', data, true)
			setChapterId(response.id)
		} catch (e) {
			alert(e)
		}
	}

	const onFinishUpload = (data) => {
		reset({name: '', slug: ''})
		setChapterId(undefined)
		if(data)
			Swal.fire({
				title: 'Thành công',
				icon: 'success'
			})
	}

	const editorRef = useRef(null);
	const onSubmitEditor = () => {
		if (editorRef.current) {
			let uri = 'base/upload-comic?chapter_id='+chapterId+'&is_text=OK'
			callService(uri, 'POST', {source: editorRef.current.getContent()}, true)
				.then((res)=> {
					Swal.fire({
						title: 'Thành công',
						icon: 'success'
					})
					reset({name: '', slug: ''})
					setChapterId(undefined)
				})
				.catch((error) => {

				})
		}
	};

	return (
		<MainAdminLte title={'Thêm tập cho truyện'}>
			<Row>
				<Col md={3}>
					<CardForm title={'Tập'} headerComponent={<p style={{fontSize: 12, color: 'red'}}>{' hãy xác nhận tập truyện trước khi thêm nội dung'}</p>}>
						<form>
							<FormInput
								label={'Tên tập'}
								placeholder={'Chapter ...'}
								name={'name'}
								control={control}
								onKeyUp={(e)=>setValue('slug', toSlug(e.target.value))}
							/>
							<FormInput
								label={'Slug'}
								control={control}
								name={'slug'}
							/>
							<ButtonBase disable={chapterId !== undefined} type={'button'} text={'Xác nhận'} onClick={handleSubmit(onSubmitChapter)}/>
						</form>
					</CardForm>
				</Col>
				<Col md={9}>
					<CardForm title={'Ảnh tập'} headerComponent={<ButtonBase style={{margin: '8px 0'}} text={'Đổi phần mềm'} onClick={()=>setIsTextComic(!isTextComic)}/>}>
						{!isTextComic&& <FormUploadChapter chapter_id={chapterId} onUpload={onFinishUpload}/>}
					</CardForm>
				</Col>
				{isTextComic&&
					<Col md={12}>
						<Editor
							apiKey={'yjedrhb5hbanx1ia49xdbxfjhe9ahsdw349w8j88k7sft5is'}
							onInit={(evt, editor) => editorRef.current = editor}
							init={{
								height: 500,
								menubar: false,
								plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect',
								toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
								content_style: 'body { font-family: Tahoma, Arial, sans-serif; font-size:14px }',
							}}
						/>
						<ButtonBase disable={chapterId===undefined} onClick={onSubmitEditor}  style={{margin: '8px 0'}} text={'Xác nhận nội dung'}/>
					</Col>
				}
			</Row>
		</MainAdminLte>
	);
};

export default AddChapterAdmin;
