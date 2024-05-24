import { BOOLEAN_FORMATS, DATE_FORMATS, NUMBER_FORMATS } from "internal";
import { CultureInfo } from "./types";

const ISO: CultureInfo = {
	cultureId: "ISO",
	dateFormat: DATE_FORMATS.ISO,
	numberFormat: NUMBER_FORMATS.ISO,
	booleanFormat: BOOLEAN_FORMATS.ISO
};

const EN_US: CultureInfo = {
	cultureId: "EN-US",
	dateFormat: DATE_FORMATS["EN-US"],
	numberFormat: NUMBER_FORMATS["EN-US"],
	booleanFormat: BOOLEAN_FORMATS["EN-US"]
};

const HU: CultureInfo = {
	cultureId: "HU",
	dateFormat: DATE_FORMATS.HU,
	numberFormat: NUMBER_FORMATS.HU,
	booleanFormat: BOOLEAN_FORMATS.HU
};

export const CULTURE_INFO: {
	readonly formats: {
		readonly dateFormats: typeof DATE_FORMATS;
		readonly boolenFormats: typeof BOOLEAN_FORMATS;
		readonly numberFormats: typeof NUMBER_FORMATS;
	};

	readonly cultures: {
		readonly ISO: CultureInfo;
		readonly 'EN-US': CultureInfo;
		readonly HU: CultureInfo;
		readonly ALL: CultureInfo[];
	}
} = {
	formats: {
		dateFormats: DATE_FORMATS,
		boolenFormats: BOOLEAN_FORMATS,
		numberFormats: NUMBER_FORMATS
	},

	cultures: {
		ISO,
		'EN-US': EN_US,
		HU,
		ALL: [ISO, EN_US, HU]
	}
};
