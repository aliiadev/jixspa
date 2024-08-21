import React from 'react';

const CardForm = ({children, title, headerComponent}) => {
	return (
		<div className={'card'}>
			<div className={'card-header'}>
				<h3 className={'card-title mr-4'}>{title}</h3>
				{headerComponent}
			</div>
			<div className={'card-body'}>
				{children}
			</div>
		</div>
	);
};

export default CardForm;
