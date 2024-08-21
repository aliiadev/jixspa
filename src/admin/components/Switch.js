import React, {useId} from 'react';

const Switch = ({isOn, handleToggle = () => {}, colorTwo = '#EF476F', colorOne = '#06D6A0' }) => {

	const id = useId()

	return (
		<>
			<input
				checked={isOn}
				onChange={handleToggle}
				className="switch-checkbox"
				id={`switch` + id}
				type="checkbox"
			/>
			<label
				style={{ background: isOn ? colorOne : colorTwo }}
				className="switch-label"
				htmlFor={`switch` + id}
			>
				<span className={`switch-button`} />
			</label>
		</>
	);
};

export default Switch;
