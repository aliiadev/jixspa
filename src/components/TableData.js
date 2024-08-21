import React from 'react';

const TableData = ({children}) => {
	return (
		<div className={'card'}>
			<div className={'card-body'}>
				<table className={'table table-bordered'}>
					{children}
				</table>
			</div>
		</div>
	);
};

export default TableData;
