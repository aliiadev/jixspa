import numeral from "numeral";

export default function totalNumberFormat(number) {
	return numeral(number).format('0a')
}
