import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {callService} from "../../apis/baseRequest";
import ButtonBase from "../../components/ButtonBase";
import Swal from "sweetalert2";

const FormUploadChapter =  forwardRef((props, ref) => {

	const {onUpload, chapter_id, is_edit} = props;

	const [selectedFiles, setSelectedFiles] = useState();
	const [previews, setPreviews] = useState([]);

	useImperativeHandle(ref, ()=> ({
		reset: () => {setSelectedFiles(undefined)}
	}))

	const onSelectFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFiles(undefined)
			return
		}
		setSelectedFiles(e.target.files)
		const targetFiles = e.target.files;
		const targetFilesObject = [...targetFiles]
		setPreviews(targetFilesObject.map((file)=>URL.createObjectURL(file)));
	}

	const onSubmit = async () => {
		if(chapter_id === undefined) {
			await Swal.fire({
				title: 'Lỗi',
				text: 'Vui lòng xác nhận tập cho ảnh trước',
				icon: 'error'
			})
			return;
		}
		try {
			const formData = new FormData();
			for (let i = 0; i < selectedFiles.length; i++) {
				formData.append(`uploads[${i}]`, selectedFiles[i])
			}
			let uri = 'base/upload-comic?chapter_id='+chapter_id + '&is_text=NO'
			if(is_edit) {
				uri += '&is_edit=ok'
			}
			await callService(uri, 'POST', formData, true, null, true);
			onUpload('OK')
			setPreviews([])
			setSelectedFiles(undefined)
			refInput.current.value = ""
		} catch (e) {
			onUpload(null)
			alert(e)
		}
	}

	const refInput = useRef()

	return (
		<form>
			<label className={'card-title mr-2'}>{'Chọn ảnh'}</label>
			<input ref={refInput} type={'file'} accept={'image/*'} multiple={true} onChange={onSelectFile}/>
			<ButtonBase disable={previews.length === 0 || chapter_id === undefined} text={'Xác nhận'} type={'button'} onClick={onSubmit}/>
			<div className={'mt-2'} style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
				{previews.length > 0 &&
					previews.map((file, index) => (
						<div key={index}>
							<div>{'Ảnh số ' + (index + 1)}</div>
							<img className={'mr-3 mb-2'} alt={'preview' + index} width={300} src={file}/>
						</div>
					))
				}
			</div>
		</form>
	);
});

export default FormUploadChapter
