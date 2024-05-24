import { ValueOrArray, ValueType, coalesce, isBoolean, isDate, isEmpty, isNullOrUndefined, isNumber } from "@react-simple/react-simple-util";
import { REACT_SIMPLE_LOCALIZATION } from "data";
import { DateTimeFormatOptions, NumberFormatOptions } from "localization/types";
import { CultureInfoBooleanFormat, CultureInfoDateFormat, CultureInfoNumberFormat } from "./types";
import { formatNumber, tryParseFloat } from "./number";
import { formatDate, formatDateTime, tryParseDate } from "./date";
import { formatBoolean, tryParseBoolean } from "./boolean";
import { CULTURE_INFO } from "./cultureInfo";

function formatValue_default(
	value: unknown,
	// CultureInfo can be specified here for 'format'
	format: {
		dateFormat: Pick<CultureInfoDateFormat, "dateFormat" | "dateTimeFormat">,
		numberFormat: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
		booleanFormat: Pick<CultureInfoBooleanFormat, "true_format" | "false_format">
	},
	options: Pick<DateTimeFormatOptions, "utc"> & NumberFormatOptions & { dateTime?: boolean }
): string {
	return (
		isEmpty(value) ? "" :
			isNumber(value) ? formatNumber(value, format.numberFormat, options) :
				isDate(value) ? (options.dateTime ? formatDateTime(value, format.dateFormat, options) : formatDate(value, format.dateFormat, options)) :
					isBoolean(value) ? formatBoolean(value, format.booleanFormat) :
						`${value}`
	);
}

REACT_SIMPLE_LOCALIZATION.DI.value.formatValue = formatValue_default;

export function formatValue(
	value: unknown,
	// CultureInfo can be specified here for 'format'
	format: {
		dateFormat: Pick<CultureInfoDateFormat, "dateFormat" | "dateTimeFormat">,
		numberFormat: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
		booleanFormat: Pick<CultureInfoBooleanFormat, "true_format" | "false_format">
	},
	options: Pick<DateTimeFormatOptions, "utc"> & NumberFormatOptions & { dateTime?: boolean } = {}
): string {
	return REACT_SIMPLE_LOCALIZATION.DI.value.formatValue(value, format, options, formatValue_default);
}

export function formatValueISO(
	value: unknown,
	options: Pick<DateTimeFormatOptions, "utc"> & NumberFormatOptions & { dateTime?: boolean } = {}
): string {
	return formatValue(value, CULTURE_INFO.cultures.ISO, options);
}

export function formatValueLocal(
	value: unknown,
	options: Pick<DateTimeFormatOptions, "utc"> & NumberFormatOptions & { dateTime?: boolean } = {}
): string {
	return formatValue(value, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current, options);
}

function tryParseValue_default(
	value: unknown,
	// CultureInfo can be specified here for 'format'
	format: {
		dateFormat: ValueOrArray<CultureInfoDateFormat>,
		numberFormat: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
		booleanFormat: ValueOrArray<Pick<CultureInfoBooleanFormat, "true_synonyms" | "false_synonyms">>
	},
	options: {
		forcedType?: "number" | "date" | "boolean" // type is recognized automatically by default, but it can be forced
	}
): ValueType | undefined {
	if (isNullOrUndefined(value)) {
		return undefined;
	}
	else if (isNumber(value)) {
		switch (options.forcedType) {
			case "boolean":
				return tryParseBoolean(value, format.booleanFormat);
			
			case "date":
				return new Date(value);

			// number, undefined
			default:
				return value;
		}
	}
	else if (isBoolean(value)) {
		switch (options.forcedType) {
			case "number":
				return value ? 1 : 0;

			case "date":
				return undefined;

			// boolean, undefined
			default:
				return value;
		}
	}
	else if (isDate(value)) {
		switch (options.forcedType) {
			case "number":
				return value.getTime();

			case "boolean":
				return undefined;

			// date, undefined
			default:
				return value;
		}
	}
	else {
		// value is string or not supported type
		switch (options.forcedType) {
			case "number":
				return tryParseFloat(value, format.numberFormat);

			case "boolean":
				return tryParseBoolean(value, format.booleanFormat);

			// string, undefined
			default:
				return coalesce<ValueType | undefined>(
					tryParseDate(value, format.dateFormat),
					tryParseFloat(value, format.numberFormat),					
					tryParseBoolean(value, format.booleanFormat),
					`${value}`
				);
		}
	}
}

REACT_SIMPLE_LOCALIZATION.DI.value.tryParseValue = tryParseValue_default;

export function tryParseValue(
	value: unknown,
	// CultureInfo can be specified here for 'format'
	format: {
		dateFormat: ValueOrArray<CultureInfoDateFormat>,
		numberFormat: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
		booleanFormat: ValueOrArray<Pick<CultureInfoBooleanFormat, "true_synonyms" | "false_synonyms">>
	},
	options: {
		forcedType?: "number" | "date" | "boolean" // type is recognized automatically by default, but it can be forced
	} = {}
): ValueType | undefined{
	return REACT_SIMPLE_LOCALIZATION.DI.value.tryParseValue(value, format, options, tryParseValue_default);
}

export function tryParseValueISO(
	value: unknown,
	options: {
		forcedType?: "number" | "date" | "boolean" // type is recognized automatically by default, but it can be forced
	} = {}
): ValueType | undefined {
	return tryParseValue(value, CULTURE_INFO.cultures.ISO, options);
}

export function tryParseValueLocal(
	value: unknown,
	options: {
		forcedType?: "number" | "date" | "boolean" // type is recognized automatically by default, but it can be forced
	} = {}
): ValueType | undefined{
	return tryParseValue(value, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current, options);
}
