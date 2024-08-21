import Constant from "../contants/constant";

export default function isLotteryThreeNumber (typeGame) { // Kiểu chơi
	if(typeGame.split('_')[0] === Constant.BA_CANG) return true
	if(typeGame.split('_')[0] === Constant.XIU_CHU) return true
	return typeGame === Constant.LO_3_SO;
}