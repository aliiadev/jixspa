const apis = {
	login: {
		uri: 'auth/login'
	},
	reload: {
		uri:'user/get-user-info'
	},
	logout: {
		uri: 'user/logout'
	},
	getCate:{
		uri: 'category/find-all'
	},
	get_pro_new_ud:{
		uri: 'comic/new-updated'
	},
	get_pro_nomination:{
		uri: 'comic/nominations'
	},
	get_detail_comic:{
		uri: 'comic/detail-comic/'
	},
	get_list_top_comic : {
		uri: 'comic/top/'
	},
	read_comic:{
		uri:"comic/read-comic/"
	},
	get_comic_new_update: {
		uri: 'comic/new-updated'
	},
	get_comic_follow: {
		uri: 'comic/list-follow'
	},
	get_comic_by_sex: {
		uri: 'comic/find-by-sex'
	},
	find_comic: {
		uri: 'comic/find'
	},
	find_comic_by_key: {
		uri: 'comic/find-by-name/'
	},
	getAuthor:{
		uri:'author/find-all'
	},
	refresh_token: {
		uri: 'auth/refresh'
	}
}
export default apis
