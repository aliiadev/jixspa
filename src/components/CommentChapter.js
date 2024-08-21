import React, {useEffect, useState} from 'react';
import {useSocket} from "../stores/useSocket";
import {useForm} from "react-hook-form";
import FormInput from "./FormInput";
import useLocalStorage from "use-local-storage";
import styles from '../styles/components/_comment.module.scss'
import images from "../assets/images/images";
import ButtonBase from "./ButtonBase";
import Avatar from "./Avatar";
import {formatDateSince} from "../utils/formatDate";
import {v4} from "uuid";
import randomName from "../utils/randomName";
import {callService} from "../apis/baseRequest";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

const CommentChapter = ({comic_id, chapter_id}) => { // Bình luận

	const {socket} = useSocket(state => ({socket: state.socket}))

	const {control, handleSubmit, reset} = useForm();

	const [messages, setMessages] = useState([]);

	const [guiUID, setGuiUID] = useLocalStorage('guiUID', {})

	useEffect(()=> {
		if(guiUID['uuGuiID'] === undefined) {
			let ud = {...guiUID}
			ud.uuGuiID = v4()
			setGuiUID(ud)
		}
		if(guiUID['gName'] === undefined) {
			let ud = {...guiUID}
			ud.gName = randomName()
			setGuiUID(ud)
		}

		if(guiUID['gAv'] === undefined) {
			let ud = {...guiUID}
			ud.gAv = Math.floor(Math.random() * 3) + 1
			setGuiUID(ud)
		}

		socket.emit('onOpenChattingChapter', {comic_id, chapter_id})
		socket.on('initMessagesChapter_'+comic_id+'_'+chapter_id, (messages)=> {
			setMessages(messages)
		})

		const eventListener = (data) => {
			setMessages((list) => [data, ...list]);
		};

		socket.on('onMessageChapter_'+comic_id+'_'+chapter_id, eventListener)
		return () => {
			socket.off('initMessagesChapter_'+comic_id+'_'+chapter_id);
			socket.off('onMessageChapter_'+comic_id+'_'+chapter_id)
		}
	}, [comic_id, chapter_id])

	const onSendMessage = (data) => {
		if(data.text){
			if(data.text.length > 120) {
				Swal.fire({
					title: 'Cảnh báo',
					icon: 'warning',
					text: 'Không bình luận dài quá 120 ký tự'
				})
				return;
			}
			data.name = guiUID['gName']
			data.machine_id = guiUID['uuGuiID']
			data.avt = guiUID['gAv']
			data.comic = comic_id
			data.chapter = chapter_id
			socket.emit('onMessageArrivedChapter', data)
			data.text = ''
			reset(data)
		}
	};

	const cvName = (str, uid) => str + '(' + uid?.substring(uid?.length - 5) + ')';

	const [isLimitLoadComment, setIsLimitLoadComment] = useState(false);

	const [isCommentLoading, setIsCommentLoading] = useState(false)

	const onReadMoreComment = () => {
		setIsCommentLoading(true)
		callService('base/comments', 'POST', {current_page_size: messages.length, comic_id, chapter_id})
			.then((res)=> {
				if(res.length > 0) setMessages([...messages, ...res])
				else setIsLimitLoadComment(true)
				setIsCommentLoading(false)
			})
			.catch(()=>setIsCommentLoading(false))
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSendMessage)}>
				<div className={styles.wrapper_form}>
					<h4 className={styles.nameField}>{`Nickname: ${cvName(guiUID['gName'], guiUID['uuGuiID'])}`}</h4>
					<div>
						<div className={styles.wrapper_form_input}>
							<Avatar src={images['av' + guiUID['gAv']]}/>
							<FormInput
								control={control}
								name={'text'}
								placeholder={'Nhập bình luận...'}
							/>
						</div>
						<ButtonBase type={'submit'} theme={'warning'} text={'Bình luận'}/>
					</div>
				</div>
			</form>
			{
				messages.map(({_id, machine_id, name, avt, text, created_at})=> (
					<div className={styles.main_message} key={_id}>
						<Avatar src={images['av' + avt]}/>
						<div className={styles.wrapper_message}>
							<div className={styles.message}>
								<span className={styles.name}>{cvName(name, machine_id)}</span>
								<div className={styles.text}>{text}</div>
							</div>
							<div className={styles.created_at}>{formatDateSince(created_at)}</div>
						</div>
					</div>
				))
			}
			{!isLimitLoadComment&&
				<div className={styles.btn_read_more}>
					{isCommentLoading?
						<div className={styles.wrapper_loading_comment}>
							<div className={styles.avatar}>
								<Skeleton width={40} circle height={'100%'}/>
							</div>
							<div>
								<Skeleton width={100} count={3}/>
							</div>
						</div>
						: <span onClick={onReadMoreComment}>{'Xem thêm bình luận'}</span>
					}
				</div>
			}
		</div>
	);
};

export default CommentChapter;
