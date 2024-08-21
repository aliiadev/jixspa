import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import ButtonBase from "../../components/ButtonBase";
import {useForm} from "react-hook-form";
import {callService} from "../../apis/baseRequest";

const FormUploadThumbnail = forwardRef((props, ref) => {

	const {onUpload} = props;

	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	const [isSubmit, setIsSubmit] = useState(false)

	useImperativeHandle(ref, ()=> ({
		reset: () => {setPreview(undefined); setSelectedFile(undefined); setIsSubmit(false); inputRef.current.value = ""}
	}))

	const onSelectFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}
		setSelectedFile(e.target.files[0])
	}

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}
		const objectUrl = URL.createObjectURL(selectedFile)
		setPreview(objectUrl)
		return () => URL.revokeObjectURL(objectUrl)
	}, [selectedFile]);

	const onSubmit = async (data) => {
		setIsSubmit(true)
		try {
			const formData = new FormData();
			formData.append('upload', selectedFile)
			const response = await callService('base/upload-thumbnail', 'POST', formData, true, null, true);
			onUpload(response)
			alert('Upload ảnh bìa thành công')
		} catch (e) {
			onUpload(null)
			alert(e)
		}
	}

	const inputRef = useRef()

	return (
		<form>
			<label className={'card-title mr-2'}>{'Chọn ảnh bìa'}</label>
			<input type={'file'} ref={inputRef} accept={'image/*'} onChange={onSelectFile}/>
			<div className={'mt-2'}>
				{selectedFile&&
					<div>
						<img className={'mr-3 mb-2'} alt={'preview.png'} width={151} src={preview}/>
						<ButtonBase disable={isSubmit} text={'Xác nhận chọn ảnh'} onClick={onSubmit} type={'button'} theme={'warning'}/>
					</div>
				}
			</div>
		</form>
	);
});

export default FormUploadThumbnail;
