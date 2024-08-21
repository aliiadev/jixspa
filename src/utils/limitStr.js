export default function limitStr(str, limit = 12) {
	return str.slice(0, limit)+'...';
}