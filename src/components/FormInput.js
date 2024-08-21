import React from 'react';
import {useController} from "react-hook-form";
import styles from '../styles/components/_form_input.module.scss'
import toSlug from "../utils/toSlug";

const FormInput = props => {

	const {name, placeholder, label, rules, control, infoTxt, username, defaultValue = '', autoSlug = false, ...inputProps} = props

	const {field, fieldState} = useController({name, control, rules, defaultValue})

	const {error} = fieldState;

	return (
		<>
			<p className={styles.formLabel}>{label}</p>
			{infoTxt&&(<p style={{margin: 0, fontSize: '11px', color: '#0984e3'}}>{infoTxt}</p>)}
			<input
				className={styles.formInput}
				name={name}
				onChange={field.onChange}
				onBlur={field.onBlur}
				placeholder={placeholder}
				value={field.value}
				{...inputProps}
			/>
			{error&&<p className={'error-message'} style={{color: 'red', fontSize: '12px', margin: '0'}}>{
				error.message.split(" ").map((it,index)=>(
					<span key={index} style={{'--active-s': `0.${index+1}s`}}>{it}</span>
				))}</p>
			}
		</>
	);
};

export default FormInput;
