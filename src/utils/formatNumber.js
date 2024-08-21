// eslint-disable-next-line import/no-anonymous-default-export
export default function (num, extension = ' VNĐ') {
	return String(num).replace(/\B(?=(\d{3})+(?!\d))/g,'.')
}
