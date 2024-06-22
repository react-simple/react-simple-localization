import { ValueOrArray, isArray, isString } from "@react-simple/react-simple-util";
import { REACT_SIMPLE_LOCALIZATION } from "data";
import { CultureInfoBooleanFormat } from "./types";
import { getISOCulture } from "./cultureInfo";

// understands true, 1, yes, y, on, checked, enabled in different casing, string/number/boolean as TRUE
function tryParseBoolean_default(
	value: unknown,
	formats: ValueOrArray<Pick<CultureInfoBooleanFormat, "true_synonyms" | "false_synonyms">>
): boolean | undefined {
	if (value === false || value === 0) {
		return false;
	}
	else if (value === true || value === 1) {
		return true;
	}
	else if (!isString(value)) {
		return undefined;
	}
	else {
		const valueStr = value.trim().toLowerCase();

		if (isArray(formats)) {
			return (
				formats.some(t => t.true_synonyms.includes(valueStr)) ? true :
					formats.some(t => t.false_synonyms.includes(valueStr)) ? false :
						undefined
			);
		} else {
			return (				
				formats.true_synonyms.includes(valueStr) ? true :
					formats.false_synonyms.includes(valueStr) ? false :
						undefined
			);
		}
	}
}

REACT_SIMPLE_LOCALIZATION.DI.boolean.tryParseBoolean = tryParseBoolean_default;

// understands true, 1, yes, y, on, checked, enabled in different casing, string/number/boolean as TRUE
export function tryParseBoolean(
	value: unknown,
	formats: ValueOrArray<Pick<CultureInfoBooleanFormat, "true_synonyms" | "false_synonyms">>
): boolean | undefined {
	return REACT_SIMPLE_LOCALIZATION.DI.boolean.tryParseBoolean(value, formats, tryParseBoolean_default);
}

export function tryParseBooleanISO(value: unknown): boolean | undefined {
	return tryParseBoolean(value, getISOCulture().booleanFormat);
}

export function tryParseBooleanLocal(value: unknown): boolean | undefined {
	return tryParseBoolean(value, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.booleanFormat);
}

export function tryParseBooleanLocalOrISO(value: unknown): boolean | undefined {
	return tryParseBoolean(value, [getISOCulture().booleanFormat, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.booleanFormat]);
}

function formatBoolean_default(value: boolean, format: Pick<CultureInfoBooleanFormat, "true_format" | "false_format">): string {
	return value ? format.true_format : format.false_format;
}

REACT_SIMPLE_LOCALIZATION.DI.boolean.formatBoolean = formatBoolean_default;

export const formatBoolean = (value: boolean, format?: Pick<CultureInfoBooleanFormat, "true_format" | "false_format">) => {
	return REACT_SIMPLE_LOCALIZATION.DI.boolean.formatBoolean(
		value,
		format || REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.booleanFormat,
		formatBoolean_default
	);
};

export const formatBooleanISO = (value: boolean) => {
	return formatBoolean(value, getISOCulture().booleanFormat);
};

export const formatBooleanLocal = (value: boolean) => {
	return formatBoolean(value, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.booleanFormat);
};
