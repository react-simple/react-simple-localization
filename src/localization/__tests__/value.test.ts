import { sameDates } from "@react-simple/react-simple-util";
import { tryParseValueLocal } from "localization";

it('tryParseValue.number', () => {
	expect(tryParseValueLocal(123.456)).toBe(123.456);
	expect(tryParseValueLocal("123.456")).toBe(123.456);
});

it('tryParseValue.boolean', () => {
	expect(tryParseValueLocal(true)).toBe(true);
	expect(tryParseValueLocal("true")).toBe(true);
	expect(tryParseValueLocal(1, { forcedType: "boolean" })).toBe(true); // by default 1 is understood as a number

	expect(tryParseValueLocal(false)).toBe(false);
	expect(tryParseValueLocal("false")).toBe(false);
	expect(tryParseValueLocal(0, { forcedType: "boolean" })).toBe(false);
});

it('tryParseValue.date', () => {
	const date = new Date(2000, 0, 2, 3, 4, 5, 6);
	expect(tryParseValueLocal(date)).toBe(date);
	expect(sameDates(tryParseValueLocal("1/2/2000 3:4:5.6") as Date, date)).toBe(true);
	expect(sameDates(tryParseValueLocal(date.getTime(), { forcedType: "date" }) as Date, date)).toBe(true); // by default it's understood as a number
});
