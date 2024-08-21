import React, {useEffect, useRef, useState} from 'react';
import MainAdminLte from "../../components/MainAdminLte";
import {useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import CardForm from "../../components/CardForm";
import FormInput from "../../components/FormInput";
import toSlug from "../../utils/toSlug";
import ButtonBase from "../../components/ButtonBase";
import FormUploadChapter from "../components/FormUploadChapter";
import {useForm} from "react-hook-form";
import {callService} from "../../apis/baseRequest";
import {environmentConfig} from "../../apis";
import Swal from "sweetalert2";
import {Editor} from '@tinymce/tinymce-react';

const EditChapterAdmin = () => { // Chỉnh sửa tập truyện

	const {chapter_id} = useParams();

	const [isTextComic, setIsTextComic] = useState(false)

	const [chapters, setChapters] = useState([]);

	const {control, handleSubmit, setValue, reset, getValues} = useForm()

	useEffect(()=> {
		getChapter()
	}, [chapter_id])

	const getChapter = () => {
		callService('chapter/find-one/'+chapter_id, 'POST', {}, true)
			.then((res)=> {
				const {chapters, chapter} = res
				setChapters(chapters)
				reset({name: chapter.name, slug: chapter.slug})
			})
	}

	const onFinishUpload = () => {
		getChapter()
	}

	const onSubmitChapter = async (data) => {
		data.id = chapter_id
		try {
			await callService('chapter', 'PUT', data, true)
			await Swal.fire({
				title: 'Thành công',
				icon: 'success'
			})
			getChapter()
		} catch (e) {
			alert(e)
		}
	}

	const editorRef = useRef(null);

	const onSubmitEditor = () => {
		if (editorRef.current) {
			let uri = 'base/upload-comic?chapter_id='+chapter_id+'&is_text=OK'+'&is_edit=ok'
			callService(uri, 'POST', {source: editorRef.current.getContent()}, true)
				.then((res)=> {
					Swal.fire({
						title: 'Thành công',
						icon: 'success'
					})
				})
				.catch((error) => {

				})
		}
	};

	return (
		<MainAdminLte title={'Chỉnh sửa tập truyện ' + getValues()?.name}>
			<Row>
				<Col md={3}>
					<CardForm title={'Tập'}>
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
							<ButtonBase type={'button'} text={'Sửa'} onClick={handleSubmit(onSubmitChapter)}/>
						</form>
					</CardForm>
				</Col>
				<Col md={9}>
					<ButtonBase style={{margin: '8px 0'}} text={'Đổi phần mềm'} onClick={()=>setIsTextComic(!isTextComic)}/>
					{!isTextComic&&(
						<Row>
							<Col md={6}>
								<CardForm title={'Ảnh tập hiện tại'}>
									{chapters.length > 0&&
										chapters.map((chap, index)=> (
											<div key={index}>
												<div>{'Ảnh số ' + (index + 1)}</div>
												<img className={'mr-3 mb-2'} alt={'ảnh số '+index} width={300} src={environmentConfig.BASE_URI + chap.source}/>
											</div>
										))
									}
								</CardForm>
							</Col>
							<Col md={6}>
								<CardForm title={'Ảnh mới'}>
									<FormUploadChapter is_edit={true} chapter_id={chapter_id} onUpload={onFinishUpload}/>
								</CardForm>
							</Col>
						</Row>
					)}
				</Col>
				{isTextComic&&(
					<Col md={12}>
						<Editor
							initialValue={chapters[0]?.source}
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
						<ButtonBase onClick={onSubmitEditor}  style={{margin: '8px 0'}} text={'Xác nhận nội dung'}/>
					</Col>
				)}
			</Row>
		</MainAdminLte>
	);
};

export default EditChapterAdmin;
