import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useComicStore = create(set => ({
	getListComicFollow: async (bodyParams) => {
		try {
			const response = await callService(apis.get_comic_follow.uri, 'POST', bodyParams)
			set({listComicFollow: response})
		} catch (e) {
			console.log(e)
		}
	},
	listComicFollow: []
}))
