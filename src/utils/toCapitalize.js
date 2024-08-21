export default function capitalize(s){
	return s?.toLowerCase().split(' ').map(function (i) {
		if (i.length > 2) {
			return i.charAt(0).toUpperCase() + i.substring(1);
		}
		return i;
	}).join(' ');
};
