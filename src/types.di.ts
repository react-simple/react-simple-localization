import { ValueOrArray, ValueType } from "@react-simple/react-simple-util";
import { CultureInfoBooleanFormat, CultureInfoDateFormat, CultureInfoNumberFormat } from "./localization/types";
import { DateTimeFormatOptions, NumberFormatOptions } from "localization/types";

export interface ReactSimpleLocalizationDependencyInjection {
	// set by localization/boolean.ts
	boolean: {
		tryParseBoolean: (
			value: unknown,
			formats: ValueOrArray<Pick<CultureInfoBooleanFormat, "true_synonyms" | "false_synonyms">>,
			defaultImpl: ReactSimpleLocalizationDependencyInjection["boolean"]["tryParseBoolean"]
		) => boolean | undefined;

		formatBoolean: (
			value: boolean,
			format: Pick<CultureInfoBooleanFormat, "true_format" | "false_format">,
			defaultImpl: ReactSimpleLocalizationDependencyInjection["boolean"]["formatBoolean"]
		) => string;
	};

	date: {
		tryParseDate: (
			value: unknown,
			formats: ValueOrArray<CultureInfoDateFormat>,
			defaultImpl: ReactSimpleLocalizationDependencyInjection["date"]["tryParseDate"]
		) => Date | undefined;

		formatDate: (
			value: Date,
			format: Pick<CultureInfoDateFormat, "dateFormat">,
			options: Pick<DateTimeFormatOptions, "utc">,
			defaultImpl: ReactSimpleLocalizationDependencyInjection["date"]["formatDate"]
		) => string;

		formatDateTime: (
			value: Date,
			format: Pick<CultureInfoDateFormat, "dateTimeFormat">,
			options: DateTimeFormatOptions,
			defaultImpl: ReactSimpleLocalizationDependencyInjection["date"]["formatDateTime"]
		) => string;
	};

	number: {
		tryParseFloat: (
			value: unknown,
			format: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
			defaultImpl: ReactSimpleLocalizationDependencyInjection["number"]["tryParseFloat"]
		) => number | undefined;

		formatNumber: (
			value: number,
			format: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
			options: NumberFormatOptions,
			defaultImpl: ReactSimpleLocalizationDependencyInjection["number"]["formatNumber"]
		) => string;
	};

	value: {
		formatValue: (
			value: unknown,
			// CultureInfo can be specified here for 'format'
			format: {
				dateFormat: Pick<CultureInfoDateFormat, "dateFormat" | "dateTimeFormat">,
				numberFormat: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
				booleanFormat: Pick<CultureInfoBooleanFormat, "true_format" | "false_format">
			},
			options: Pick<DateTimeFormatOptions, "utc"> & NumberFormatOptions & { dateTime?: boolean },
			defaultImpl: ReactSimpleLocalizationDependencyInjection["value"]["formatValue"]
		) => string;

		tryParseValue: (
			value: unknown,
			// CultureInfo can be specified here for 'format'
			format: {
				dateFormat: ValueOrArray<CultureInfoDateFormat>,
				numberFormat: Pick<CultureInfoNumberFormat, "decimalSeparator" | "thousandSeparator">,
				booleanFormat: ValueOrArray<Pick<CultureInfoBooleanFormat, "true_synonyms" | "false_synonyms">>
			},
			options: {
				forcedType?: "number" | "date" | "boolean" // type is recognized automatically by default, but it can be forced
			},
			defaultImpl: ReactSimpleLocalizationDependencyInjection["value"]["tryParseValue"]
		) => ValueType | undefined;
	}
}
