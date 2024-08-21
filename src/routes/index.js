import paths from "../contants/path";
import Home from "../pages/home";
import LoginAdmin from "../admin/pages/loginAdmin";
import HomeAdmin from "../admin/pages/homeAdmin";
import Detail from "../pages/Detail";
import DocTruyen from "../pages/DocTruyen";
import FindAdvancedStories from "../pages/FindAdvancedStories";
import ComicFollow from "../pages/ComicFollow";
import History from "../pages/History";
import ComicMan from "../pages/ComicMan";
import ComicWoman from "../pages/ComicWoman";
import SearchComic from "../pages/SearchComic";
import StoryHot from "../pages/StoryHot";
import CategoryAdmin from "../admin/pages/categoryAdmin";
import ComicAdmin from "../admin/pages/comicAdmin";
import AddComicAdmin from "../admin/pages/addComicAdmin";
import AuthorAdmin from "../admin/pages/authorAdmin";
import AddChapterAdmin from "../admin/pages/addChapterAdmin";
import EditComicAdmin from "../admin/pages/editComicAdmin";
import EditChapterAdmin from "../admin/pages/editChapterAdmin";
import App from "../pages/App";


const routes = [
	{path: paths.HOME, component: <Home/>},
	{path: paths.ADMIN_LOGIN, component: <LoginAdmin/>},
	{path: paths.TRUYEN_TRANH, component: <Detail/>},
	{path: paths.TRUYEN_TRANH_DETAIL, component: <Detail/>},
	{path: paths.XEM, component: <DocTruyen/>},
	{path: paths.TRUYEN_TRANH_VIEW, component: <DocTruyen/>},
	{path: paths.THEO_DOI, component: <ComicFollow/>},
	{path: paths.HISTORY, component: <History/>},
	{path: paths.TRUYEN_HOT, component: <StoryHot/>},
	{path: paths.TIM_KIEM_NANG_CAO, component: <FindAdvancedStories/>},
	{path: paths.THEO_DOI, component: <ComicFollow/>},
	{path: paths.TRUYEN_CON_TRAI, component: <ComicMan/>},
	{path: paths.TRUYEN_CON_GAI, component: <ComicWoman/>},
	{path: paths.TIM_TRUYEN, component: <SearchComic/>},
	{path: paths.TIM_TRUYEN_VIEW, component: <SearchComic/>},
	{path: paths.APP, component: <App/>}
]

const privateRoutes = [
	{path: paths.ADMIN_HOME, component: <HomeAdmin/>},
	{path: paths.ADMIN_CATEGORY, component: <CategoryAdmin/>},
	{path: paths.ADMIN_COMIC, component: <ComicAdmin/>},
	{path: paths.ADD_ADMIN_COMIC, component: <AddComicAdmin/>},
	{path: paths.ADMIN_TAC_GIA, component: <AuthorAdmin/>},
	{path: paths.ADD_ADMIN_CHAPTER, component: <AddChapterAdmin/>},
	{path: paths.EDIT_ADMIN_COMIC, component: <EditComicAdmin/>},
	{path: paths.EDIT_ADMIN_CHAPTER, component: <EditChapterAdmin/>},
]

export {routes, privateRoutes}
