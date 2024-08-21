import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useTopComicStore = create(set => ({
	getListTopComic: async (params = '0') => {
		set({loading: true})
		try {
			const response = await callService(apis.get_list_top_comic.uri + params, 'POST')
			set({listTopComic: response});
		} catch (e) {
			console.log(e)
		} finally {
			set({loading: false})
		}
	},
	listTopComic: [],
	loading:false
}))
