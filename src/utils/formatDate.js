import moment from "moment";

export function formatDateWithFormatStr(dateStr,format)
{
	let dateFormatted = moment(dateStr).format(format);
	if(dateFormatted === 'Invalid date')
		return '';
	return dateFormatted;
}
export function formatDate(s)
{
	if((new Date(s) !== "Invalid Date") && !isNaN(new Date(s))) {
		const date = new Date(s)
		return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' +  date.getFullYear();
	}
	return ''
}

const CONFIG_NEW = {
	future: "trong %s",
	past: "%s trước",
	s: "1 giây",
	ss: "%s giây",
	m: "1 phút",
	mm: "%d phút",
	h: "1 giờ",
	hh: "%d giờ",
	d: "1 ngày",
	dd: "%d ngày",
	M: "tháng",
	MM: "%d tháng",
	y: "năm",
	yy: "%d năm"
};


export function formatDateSince(d)
{
	moment.updateLocale("en", { relativeTime: CONFIG_NEW });
	return moment.utc(d).fromNow();
}
export function formatDateNowTo(d)
{
	let dateFormatted = moment().to(moment(d));
	if(dateFormatted === 'Invalid date')
		return '';
	return dateFormatted;
}
