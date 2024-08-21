import React from 'react';
import createArray from "../utils/createArray";
import Skeleton from "react-loading-skeleton";

const SkeletonLoading = () => {
	return (
		createArray(11, 0).map((i)=> (
			<div key={i} className={'item'}>
				<div>
					<Skeleton
						count={1}
						// wrapper={InlineWrapperWithMargin}
						inline
						// width={'100%'}
						height={200}
					/>
				</div>
				<div>
					<Skeleton
						count={1}
						height={35}
					/>
				</div>
				<div>
					<Skeleton
						count={3}
					/>
				</div>
			</div>
		))
	);
};

export default SkeletonLoading;