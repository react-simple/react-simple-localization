import { CultureInfo } from "localization/types";
import { getDateFormats } from "./dateFormat";
import { getNumberFormats } from "./numberFormat";
import { getBoolenFormats } from "./booleanFormat";

const dateFormats = getDateFormats();
const numberFormats = getNumberFormats();
const booleanFormats = getBoolenFormats();

const ISO: CultureInfo = {
	cultureId: "ISO",
	dateFormat: dateFormats.ISO,
	numberFormat: numberFormats.ISO,
	booleanFormat: booleanFormats.ISO
};

const EN_US: CultureInfo = {
	cultureId: "EN-US",
	dateFormat: dateFormats["EN-US"],
	numberFormat: numberFormats["EN-US"],
	booleanFormat: booleanFormats["EN-US"]
};

const HU: CultureInfo = {
	cultureId: "HU",
	dateFormat: dateFormats.HU,
	numberFormat: numberFormats.HU,
	booleanFormat: booleanFormats.HU
};

export const CULTURE_INFO = {
	formats: {
		dateFormats: dateFormats,		
		numberFormats: numberFormats,
		boolenFormats: booleanFormats
	},

	cultures: <Record<string, CultureInfo>>{
		ISO,
		'EN-US': EN_US,
		HU
	}
};
