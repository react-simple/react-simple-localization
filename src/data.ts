import { CULTURE_INFO } from "internal";
import { ReactSimpleLocalization as ReactSimpleLocalization } from "./types";

// For depndency injection references. All stub references are set by the respective util files.
const stub: any = () => { };

export const REACT_SIMPLE_LOCALIZATION: ReactSimpleLocalization = {
	CULTURE_INFO: {
		current: CULTURE_INFO.cultures["EN-US"],
		default: CULTURE_INFO.cultures["EN-US"],
		
		...CULTURE_INFO
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
