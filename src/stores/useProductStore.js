import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useProductStore = create(set => ({
	getProNomination: async () => {
		set({loading: true})
		try {
			const response = await callService(apis.get_pro_nomination.uri, 'POST')
			set({data: response});
			set({listNomination: response});
		} catch (e) {
			console.log(e)
		} finally {
			set({loading: false})
		}
	},
	getDetailComic: async (params) => {
		set({isLoadingGetDetailComic:true})
		try {
			return await callService(apis.get_detail_comic.uri + params, 'POST')
		} catch (e) {
			return null
		}finally {
			set({isLoadingGetDetailComic:false})
		}
	},
	isLoadingGetDetailComic:false,
	listNomination: [],
	loading: false,
	readingPro: async (params) => {
		set({loading: true})
		try {
			return await callService(apis.read_comic.uri + params, 'POST')
		} catch (e) {
			console.log(e)
			return null
		}

	},
	dataRS:[],

	getComicNewUpdate: async (bodyParameters) => {
		set({isLoadingGetComicNewUpdate: true})
		try {
			return await callService(apis.get_comic_new_update.uri, 'POST', bodyParameters)
		} catch (e) {
			console.log(e)
		} finally {
			set({isLoadingGetComicNewUpdate: false})
		}
	},
	isLoadingGetComicNewUpdate:false,
	listComicNewUpdate: [],

	getComicByCate: async (bodyParameters) => {
		set({isLoadingGetComicByCate: true})
		try{
			return await callService(apis.find_comic.uri,"POST",bodyParameters)
		}catch (e) {
			return null
		} finally {
			set({isLoadingGetComicByCate:false})
		}
	},

	getComicByKey: async (params) =>{
		try{
			return await callService(apis.find_comic_by_key.uri + params,"POST")
		}catch (e) {
			return null
		}
	},
	isLoadingGetComicByCate: false
}))
