import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useCategoryStore = create(set => ({
	getCate: async () => {
		set({loading: true})
		try {
			const response = await callService(apis.getCate.uri, 'POST')
			set({cate: response});
		}catch (e) {

		}finally {
			set({loading: false})
		}

	},
	cate: [],
	loading:false
}))
