import { sameDates } from "@react-simple/react-simple-util";
import { REACT_SIMPLE_LOCALIZATION } from "data";
import {
	formatDate, formatDateLocal, formatDateTime, formatDateTimeLocal, getCulture, tryParseDate, tryParseDateISO, tryParseDateLocal 
} from "localization";

it('tryParseDateISO.date', () => {
	expect(sameDates(tryParseDateISO("2000-01-02"), new Date(2000, 0, 2))).toBe(true);
});

it('tryParseDateISO.dateTime	', () => {
	expect(sameDates(tryParseDateISO("2000-01-02T09:10:11.12345"), new Date(2000, 0, 2, 9, 10, 11, 123))).toBe(true);
});

it('tryParseDateLocal.date', () => {
	expect(sameDates(tryParseDateLocal("1/2/2000"), new Date(2000, 0, 2))).toBe(true);
});

it('tryParseDateLocal.date.twodigityear', () => {
	expect(sameDates(tryParseDateLocal("1/2/00"), new Date(2000, 0, 2))).toBe(true);
	expect(sameDates(tryParseDateLocal("1/2/10"), new Date(2010, 0, 2))).toBe(true);
});

it('tryParseDateLocal.dateTime', () => {
	expect(sameDates(tryParseDateLocal("1/2/2000 3:4:5.6789"), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
});

it('tryParseDateLocal.dateTime.twodigityear', () => {
	expect(sameDates(tryParseDateLocal("1/2/00 3:4:5.6789"), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
	expect(sameDates(tryParseDateLocal("1/2/10 3:4:5.6789"), new Date(2010, 0, 2, 3, 4, 5, 678))).toBe(true);
});

it('tryParseDate.cultureInfo.date', () => {
	expect(sameDates(tryParseDate("2000.1.2.", getCulture("HU").dateFormat), new Date(2000, 0, 2))).toBe(true);
});

it('tryParseDate.cultureInfo.dateTime', () => {
	expect(sameDates(tryParseDate("2000.1.2. 3:4:5.6789", getCulture("HU").dateFormat), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
});

it('formatDateLocal', () => {
	expect(formatDateLocal(new Date(2000, 0, 2, 3, 4, 5, 678))).toBe("01/02/2000");
});

it('formatDateLocal.midnight', () => {
	expect(formatDateLocal(new Date(2000, 0, 2))).toBe("01/02/2000");
});

it('formatDateTimeLocal.hourMinute', () => {
	expect(formatDateTimeLocal(new Date(2000, 0, 2, 3, 4, 5, 678))).toBe("01/02/2000 03:04");
});

it('formatDateTimeLocal.hourMinute.midnight', () => {
	expect(formatDateTimeLocal(new Date(2000, 0, 2))).toBe("01/02/2000 00:00");
});

it('formatDateTimeLocal.hourMinuteSecond', () => {
	expect(formatDateTimeLocal(new Date(2000, 0, 2, 3, 4, 5, 678), { seconds: true })).toBe("01/02/2000 03:04:05");
});

it('formatDateTimeLocal.hourMinuteSecondMillisecond', () => {
	expect(formatDateTimeLocal(new Date(2000, 0, 2, 3, 4, 5, 678), { milliseconds: true })).toBe("01/02/2000 03:04:05.678");
});

it('formatDate.cultureInfo', () => {
	expect(formatDate(new Date(2000, 0, 2, 3, 4, 5, 678), getCulture("HU").dateFormat)).toBe("2000.01.02.");
});

it('formatDateTime.cultureInfo.hourMinute', () => {
	expect(formatDateTime(new Date(2000, 0, 2, 3, 4, 5, 678), getCulture("HU").dateFormat)).toBe("2000.01.02. 03:04");
});

it('formatDateTime.cultureInfo.hourMinuteSecond', () => {
	expect(formatDateTime(new Date(2000, 0, 2, 3, 4, 5, 678), getCulture("HU").dateFormat, { seconds: true })).toBe("2000.01.02. 03:04:05");
});

it('formatDateTime.cultureInfo.hourMinuteSecondMillisecond', () => {
	expect(formatDateTime(new Date(2000, 0, 2, 3, 4, 5, 678), getCulture("HU").dateFormat, { milliseconds: true })).toBe("2000.01.02. 03:04:05.678");
});

it('tryParseDate.allCultureInfo.date', () => {
	const format = Object.values(REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.formats.dateFormats);

	expect(sameDates(tryParseDate("1/2/2000", format), new Date(2000, 0, 2))).toBe(true);
	expect(sameDates(tryParseDate("2000-01-02", format), new Date(2000, 0, 2))).toBe(true);
	expect(sameDates(tryParseDate("2000-1-2", format), new Date(2000, 0, 2))).toBe(true);
	expect(sameDates(tryParseDate("2000.1.2", format), new Date(2000, 0, 2))).toBe(true);
});

it('tryParseDate.allCultureInfo.dateTime', () => {
	const format = Object.values(REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.formats.dateFormats);

	expect(sameDates(tryParseDate("1/2/2000 3:4:5.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
	expect(sameDates(tryParseDate("2000-01-02T03:04:05.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
	expect(sameDates(tryParseDate("2000-1-2T3:4:5.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
	expect(sameDates(tryParseDate("2000.1.2 3:4:5.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
});

it('tryParseDate.allDateFormats.date', () => {
	const format = Object.values(REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.formats.dateFormats);

	expect(sameDates(tryParseDate("1/2/2000", format), new Date(2000, 0, 2))).toBe(true);
	expect(sameDates(tryParseDate("2000-01-02", format), new Date(2000, 0, 2))).toBe(true);
	expect(sameDates(tryParseDate("2000-1-2", format), new Date(2000, 0, 2))).toBe(true);
	expect(sameDates(tryParseDate("2000.1.2", format), new Date(2000, 0, 2))).toBe(true);
});

it('tryParseDate.allDateFormats.dateTime', () => {
	const format = Object.values(REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.formats.dateFormats);

	expect(sameDates(tryParseDate("1/2/2000 3:4:5.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
	expect(sameDates(tryParseDate("2000-01-02T03:04:05.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
	expect(sameDates(tryParseDate("2000-1-2T3:4:5.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
	expect(sameDates(tryParseDate("2000.1.2 3:4:5.6789", format), new Date(2000, 0, 2, 3, 4, 5, 678))).toBe(true);
});
