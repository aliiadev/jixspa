import React, {useEffect} from 'react';
import BoxBar from "./BoxBar";
import useLocalStorage from "use-local-storage";
import {useComicStore} from "../stores/useComicStore";
import ComicHorizontal from "./ComicHorizontal";
import WrapperComicHorizontal from "./WrapperComicHorizontal";
import {formatDateSince} from "../utils/formatDate";
import path from "../contants/path";
import toSlug from "../utils/toSlug";

const BoxBarComicFollows = () => {

	const [comicFollows, setComicFollows] = useLocalStorage('comic-follows', []);

	const {getListComicFollow, listComicFollow} =
		useComicStore(state => ({
			listComicFollow: state.listComicFollow,
			getListComicFollow: state.getListComicFollow
		}))

	useEffect(()=> {
		getListComicFollow({follow_ids: comicFollows})
	}, [comicFollows])

	if(listComicFollow.length === 0) return <div/>

	return (
		<BoxBar style={{marginBottom: 16}} title={'Truyện đang theo dõi'} src={path.THEO_DOI}>
			{listComicFollow.slice(Math.max(listComicFollow.length - 5, 0)).map(({_id, name, chapters, thumbnail})=> (
				<WrapperComicHorizontal key={_id}>
					<ComicHorizontal
						path={path.TRUYEN_TRANH + toSlug(name) + '-' + _id}
						name={name}
						img={thumbnail}
						miniTextLeft={chapters.length > 0 ? chapters[chapters.length - 1].name : 'Chapter...'}
						miniTextRight={chapters.length > 0 ? formatDateSince(chapters[chapters.length - 1].updated_at) : 'Đang cập nhật'}
						thumbStyle={{width: 70, height: 60}}
					/>
				</WrapperComicHorizontal>
			))}
		</BoxBar>
	);
};

export default BoxBarComicFollows;
