import React, {useEffect, useState} from 'react';
import styles from '../styles/components/_pagination.module.scss'
import ReactPaginate from "react-paginate";
const Pagination = ({total, onClick = () => {}}) => {
	const [pageCount, setPageCount] = useState(0);
	useEffect(()=>  {
		setPageCount(Math.ceil(parseInt(total) / 36))
	}, [total])

	const onPageChange = (e) => {
		setPageCount(Math.ceil(parseInt(total) / 36))
		onClick(e.selected)
	}

	return (
		<ReactPaginate
			nextLabel=">"
			onPageChange={onPageChange}
			pageRangeDisplayed={3}
			marginPagesDisplayed={2}
			pageCount={pageCount}
			previousLabel="<"
			pageClassName="page-item"
			pageLinkClassName="page-link"
			previousClassName="page-item"
			previousLinkClassName="page-link"
			nextClassName="page-item"
			nextLinkClassName="page-link"
			breakLabel="..."
			breakClassName="page-item"
			breakLinkClassName="page-link"
			containerClassName={`${pageCount === 1 ? styles.display :styles.pagination}`}
			activeClassName="active"
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
