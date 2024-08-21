export default function lotteryRewardTime (type) {
	const cuDate = new Date();
	switch (type) {
		case 'mb':
			cuDate.setHours(18, 35, 0)
			return cuDate.getTime()
		case 'mt':
			cuDate.setHours(17, 42 , 0)
			return cuDate.getTime()
		case 'mn':
			cuDate.setHours(16, 40, 0)
			return cuDate.getTime()
		default:
			return cuDate.getTime()
	}
}