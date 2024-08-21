export default function toNumber(numberLong) {
	if(typeof numberLong === 'object') {
		let {high, low} = numberLong
		high = high??0
		low = low??0
		return high * Math.pow(2, 32) + low
	}
	return numberLong
}
