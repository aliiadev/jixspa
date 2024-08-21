export default function addDotsStr (value, numberSplit) {
	let sub = value;
	return sub.length > numberSplit ? `${sub.substring(0, numberSplit)}...`:sub
}
