import {
	ValueOrArray, dateAdd, getDaysInMonth, getResolvedArray, getToday, isDate, isEmpty, isNumber, isString, roundDown
 } from "@react-simple/react-simple-util";
import { REACT_SIMPLE_LOCALIZATION } from "data";
import { CultureInfoDateFormat, DateTimeFormatOptions } from "./types";
import { formatNumberISO, formatNumberLocal, tryParseFloatISO } from "./number";
import { getISOCulture } from "./cultureInfo";

// uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT or the specified format/culture to parse
function tryParseDate_default(value: unknown, formats: ValueOrArray<CultureInfoDateFormat>): Date | undefined {
	if (!value) {
		return undefined;
	}
	else if (isDate(value)) {
		return value;
	}
	else if (isNumber(value)) {
		return new Date(value);
	}
	else if (!isString(value)) {
		return undefined;
	}
	else {
		for (const format of getResolvedArray(formats)) {
			const dateFormat = format || REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat;

			const dateMatch = (
				(dateFormat.dateTimeFormatRegExp && value.match(dateFormat.dateTimeFormatRegExp)) ||
				(dateFormat.dateFormatRegExp && value.match(dateFormat.dateFormatRegExp))
			);

			if (dateMatch?.groups) {
				let year = tryParseFloatISO(dateMatch.groups["year"]);
				const month = tryParseFloatISO(dateMatch.groups["month"]);
				const day = tryParseFloatISO(dateMatch.groups["day"]);
				const hour = tryParseFloatISO(dateMatch.groups["hour"]);
				const minute = tryParseFloatISO(dateMatch.groups["minute"]);
				const second = tryParseFloatISO(dateMatch.groups["second"]);
				const millisecond = tryParseFloatISO(dateMatch.groups["millisecond"]);

				if (
					(!isEmpty(year) && year >= 0 && year <= 9999) &&
					(month && month >= 1 && month <= 12) &&
					(day && day >= 1 && day <= getDaysInMonth(month - 1))
				) {
					if (year < 100) {
						year += roundDown(getToday().getFullYear(), 1000); // 2000 for a while
					}

					if (
						(!isEmpty(hour) && hour >= 0 && hour <= 23) &&
						(!isEmpty(minute) && minute >= 0 && minute <= 59) &&
						(!isEmpty(second) && second >= 0 && second <= 59)
					) {
						// with time
						try {
							return new Date(
								year, month - 1, day,
								hour, minute, second,
								millisecond && tryParseFloatISO(millisecond.toString().substring(0, 3)) || 0
							);
						}
						catch {
						}
					}
					else {
						// without time
						try {
							return new Date(year, month - 1, day);
						}
						catch {
						}
					}
				}
			}
		}
	}

	return undefined;
}

REACT_SIMPLE_LOCALIZATION.DI.date.tryParseDate = tryParseDate_default;

export function tryParseDate(value: unknown, formats: ValueOrArray<CultureInfoDateFormat>): Date | undefined {
	return REACT_SIMPLE_LOCALIZATION.DI.date.tryParseDate(value, formats, tryParseDate_default);
}

// uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT or the specified format/culture to parse
export function tryParseDateISO(value: unknown): Date | undefined {
	return tryParseDate(value, getISOCulture().dateFormat);
}

export function tryParseDateLocal(value: unknown): Date | undefined {
	return tryParseDate(value, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat);
}

export function tryParseDateLocalOrISO(value: unknown): Date | undefined {
	return tryParseDate(value, [getISOCulture().dateFormat, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat]);
}

function formatDate_default(
	value: Date,
	format: Pick<CultureInfoDateFormat, "dateFormat">,
	options: Pick<DateTimeFormatOptions, "utc"> = {}
): string {
	if (options.utc) {
		value = dateAdd(value, "minute", value.getTimezoneOffset());
	}

	return (format || REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat).dateFormat
		.replaceAll("yyyy", value.getFullYear().toString())
		.replaceAll("yy", (value.getFullYear() % 100).toString())
		.replaceAll("MM", formatNumberLocal(value.getMonth() + 1, { minIntegerDigits: 2 }))
		.replaceAll("M", (value.getMonth() + 1).toString())
		.replaceAll("dd", formatNumberLocal(value.getDate(), { minIntegerDigits: 2 }))
		.replaceAll("d", value.getDate().toString())
		.replaceAll("H", "")
		.replaceAll("m", "")
		.replaceAll("s", "")
		.replaceAll("f", "")
		.replaceAll("Z", options.utc ? "Z" : "");
}

REACT_SIMPLE_LOCALIZATION.DI.date.formatDate = formatDate_default;

export function formatDate(
	value: Date,
	format: Pick<CultureInfoDateFormat, "dateFormat">,
	options: Pick<DateTimeFormatOptions, "utc"> = {}
): string {
	return REACT_SIMPLE_LOCALIZATION.DI.date.formatDate(value, format, options, formatDate_default);
}

export function formatDateISO(value: Date, options: Pick<DateTimeFormatOptions, "utc"> = {}): string {
	return formatDate(value, getISOCulture().dateFormat, options);
}

export function formatDateLocal(value: Date): string {
	return formatDate(value, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat);
}

function formatDateTime_default(
	value: Date,
	format: Pick<CultureInfoDateFormat, "dateTimeFormat">,
	options: DateTimeFormatOptions = {}
): string {
	const dateTimeFormat = (format || REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat).dateTimeFormat;

	if (options.utc) {
		value = dateAdd(value, "minute", value.getTimezoneOffset());
	}

	return (
		options.milliseconds ? dateTimeFormat.hourMinuteSecondMillisecond :
			options.seconds ? dateTimeFormat.hourMinuteSecond :
				dateTimeFormat.hourMinute
	)
		.replace("yyyy", value.getFullYear().toString())
		.replace("yy", (value.getFullYear() % 100).toString())
		.replace("MM", formatNumberISO(value.getMonth() + 1, { minIntegerDigits: 2 }))
		.replace("M", (value.getMonth() + 1).toString())
		.replace("dd", formatNumberISO(value.getDate(), { minIntegerDigits: 2 }))
		.replace("d", value.getDate().toString())
		.replace("HH", formatNumberISO(value.getHours(), { minIntegerDigits: 2 }))
		.replace("H", value.getHours().toString())
		.replace("mm", formatNumberISO(value.getMinutes(), { minIntegerDigits: 2 }))
		.replace("m", value.getMinutes().toString())
		.replace("ss", formatNumberISO(value.getSeconds(), { minIntegerDigits: 2 }))
		.replace("s", value.getSeconds().toString())
		.replace("fff", formatNumberISO(value.getMilliseconds(), { minIntegerDigits: 3 }))
		.replace("ff", formatNumberISO(value.getMilliseconds(), { minIntegerDigits: 2 }))
		.replace("f", formatNumberISO(value.getMilliseconds(), { minIntegerDigits: 1 }))
		.replace("Z", options.utc ? "Z" : "");
}

REACT_SIMPLE_LOCALIZATION.DI.date.formatDateTime = formatDateTime_default;

export function formatDateTime(
	value: Date,
	format: Pick<CultureInfoDateFormat, "dateTimeFormat">,
	options: DateTimeFormatOptions = {}
): string {
	return REACT_SIMPLE_LOCALIZATION.DI.date.formatDateTime(value, format, options, formatDateTime_default);
}

export function formatDateTimeISO(value: Date, options: Pick<DateTimeFormatOptions, "utc"> = {}): string {
	return formatDateTime(value, getISOCulture().dateFormat, { seconds: true, milliseconds: true, utc: options.utc });
}

export function formatDateTimeLocal(value: Date, options: DateTimeFormatOptions = {}): string {
	return formatDateTime(value, REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat, options);
}

const getDateHasTime = (d: Date) => {
	return !!(d.getHours() || d.getMinutes() || d.getSeconds() || d.getMilliseconds());
};

// if time portion is zero formats value as date, otherwise as date-time
export function formatDateOrDateTime(
	value: Date,
	format: Pick<CultureInfoDateFormat, "dateFormat" | "dateTimeFormat">,
	options: DateTimeFormatOptions = {}
): string {
	return getDateHasTime(value)
		? formatDateTime(value, format, options)
		: formatDate(value, format, options);
}

// if time portion is zero formats value as date, otherwise as date-time
export function formatDateOrDateTimeISO(
	value: Date,
	options: DateTimeFormatOptions = {}
): string {
	return getDateHasTime(value)
		? formatDateTimeISO(value, options)
		: formatDateISO(value, options);
}

// if time portion is zero formats value as date, otherwise as date-time
export function formatDateOrDateTimeLocal(
	value: Date,
	options: DateTimeFormatOptions = {}
): string {
	return getDateHasTime(value)
		? formatDateTimeLocal(value, options)
		: formatDateLocal(value);
}
