import React from 'react';
import create from "zustand";
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useAuthor = create(set => ({
	getAuthor: async () => {
		set({loading: true})
		try {
			const response = await callService(apis.getAuthor.uri, 'POST')
			set({cate: response});
		}catch (e) {

		}finally {
			set({loading: false})
		}

	},
	cate: [],
	loading:false
}))

