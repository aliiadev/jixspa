import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useSexComicStore = create(set => ({

	getComicBySex: async (bodyParams = {}) => {
		set({loading: true})
		try {
			return await callService(apis.get_comic_by_sex.uri, 'POST', bodyParams)
		} catch (e) {
			console.log(e)
			return null
		} finally {
			set({loading: false})
		}
	},

	listComicMan: null,
	setListComicMan: (data) => {set({listComicMan: data})},

	listComicWoman: null,
	setListComicWoman: (data) => {set({listComicWoman: data})},

	loading:false
}))
