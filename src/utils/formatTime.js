
export default function formatTime (sec) {
	let hours = Math.floor(sec / 3600);
	(hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
	let min = Math.floor(sec / 60);
	(min >= 1) ? sec = sec - (min*60) : min = '00';
	(sec < 1) ? sec='00' : void 0;

	(min.toString().length === 1) ? min = '0'+min : void 0;
	(sec.toString().length === 1) ? sec = '0'+sec : void 0;

	return min+':'+sec;
}