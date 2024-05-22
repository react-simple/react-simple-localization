import { CULTURE_INFO } from "./localization/cultureInfo";
import { ReactSimpleLocalization as ReactSimpleLocalization } from "./types";

// For depndency injection references. All stub references are set by the respective util files.
const stub: any = () => { };

export const REACT_SIMPLE_LOCALIZATION: ReactSimpleLocalization = {
	CULTURE_INFO: {
		CURRENT: CULTURE_INFO["EN-US"],
		DEFAULT: CULTURE_INFO["EN-US"]
	},
		
	DI: {
		// set by utils/array.ts
		boolean: {
			tryParseBoolean: stub,
			formatBoolean: stub
		},
		date: {
			tryParseDate: stub,
			formatDate: stub,
			formatDateTime: stub
		},
		number: {
			tryParseFloat: stub,
			formatNumber: stub
		},
		value: {
			formatValue: stub,
			tryParseValue: stub
		}
	}
};
