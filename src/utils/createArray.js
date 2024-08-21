export default function createArray(N, startAt = 1){
	return [...Array((N) + 1).keys()].slice(startAt)
}