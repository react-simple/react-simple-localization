export interface CultureInfoDateFormat {
	readonly formatId: string;

	// supports yyyy, yy, MM, M, dd, d
	readonly dateFormat: string;
	readonly dateFormatRegExp: RegExp; // must contain year, month, day named capturing groups

	readonly dateTimeFormat: {
		// supports H, HH, m, mm, s, ss
		readonly hourMinute: string;
		readonly hourMinuteSecond: string;
		readonly hourMinuteSecondMillisecond: string;
	};

	readonly dateTimeFormatRegExp: RegExp; // must contain year, month, day, hour, (seconds, milliseconds) named capturing groups
}

export interface CultureInfoNumberFormat {
	readonly formatId: string;
	readonly decimalSeparator: string;
	readonly thousandSeparator: string | undefined;
}

export interface CultureInfoBooleanFormat {
	readonly formatId: string;
	readonly true_format: string;
	readonly false_format: string;
	readonly true_synonyms: string[]; // see tryParseBoolean(), must contain true_format, lowercase
	readonly false_synonyms: string[]; // see tryParseBoolean(), must contain true_format, lowercase
}

export interface CultureInfo {
	readonly cultureId: string;
	readonly dateFormat: CultureInfoDateFormat;
	readonly numberFormat: CultureInfoNumberFormat;
	readonly booleanFormat: CultureInfoBooleanFormat;
}

export interface DateTimeFormatOptions {
	readonly seconds?: boolean;
	readonly milliseconds?: boolean;

	// shift time zone offset before converting
	// - specifying 'true' results the same behavior how date.toString() works
	// - specifying 'false' results the same behavior how date.toLocalDateString() works
	readonly utc?: boolean;
}

export interface NumberFormatOptions {
	readonly minIntegerDigits?: number; // specify 2 and 3 will become "03", maximum value: 100
	readonly radix?: number; // default is 10
	readonly minDecimalDigits?: number; // zeroes will be added to reach this length
	readonly maxDecimalDigits?: number; // fractional part will be cut over this part (note: there is no rounding!)
	readonly thousandSeparators?: boolean; // default is 'true'
}
