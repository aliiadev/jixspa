import React from 'react';
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {GrChapterAdd} from "react-icons/gr";

const GroupButtonAdmin = ({onEdit = () => {}, onDelete = () => {}, onAdd = () => {}, showAdd = false}) => {
	return (
		<div style={{display: 'flex', gap: 8}}>
			<AiFillEdit onClick={onEdit} style={{cursor: 'pointer'}} size={32} color={'blue'}/>
			<AiFillDelete onClick={onDelete} style={{cursor: 'pointer'}} size={32} color={'red'}/>
			{showAdd&&(
				<GrChapterAdd onClick={onAdd} style={{cursor: 'pointer'}} color={'green'} size={30}/>
			)}
		</div>
	);
};

export default GroupButtonAdmin;
