import React from 'react';
import {Helmet} from "react-helmet-async";

const HelmetSEO = ({seo = '', children}) => {
	return (
		<Helmet>
			<title>{seo}</title>
			<meta name={'description'} content={seo}/>
			{children}
		</Helmet>
	);
};

export default HelmetSEO;
