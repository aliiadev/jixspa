import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";
import Cookies from 'js-cookie'

export const useUserStore = create(set => ({
	login: async (bodyParameters) => {
		set({loading: true})
		try {
			const loginResponse = await callService(apis.login.uri, 'POST', bodyParameters);
			const reloadResponse = await callService(apis.reload.uri, 'POST',
				{}, true, loginResponse.accessToken)
			set({user: reloadResponse, loading: false});
			localStorage.setItem('key', loginResponse.accessToken)
			Cookies.set('sess', loginResponse.refreshToken, { expires: 2 })
			return true
		} catch (e) {
			set({loading: false})
			return false
		}
	},
	setUser: (data) => {set({user: data})},
	reload: async ()=>{
		set({loading:true})
		try {
			const response = await callService(apis.reload.uri,'POST', {},true)
			set({user:response});
			set({loading:false});
			return response
		}catch (e) {
			set({loading:false})
			return null
		}
	},
	logout: async ()=>{
		try {
			set({user: undefined});
			Cookies.remove('sess')
			localStorage.removeItem('key')
			await callService(apis.logout.uri,'POST', {}, true);
		} catch (e) {
			// console.log(e)
		}
	},
	user: undefined,
	loading: false,
}))
