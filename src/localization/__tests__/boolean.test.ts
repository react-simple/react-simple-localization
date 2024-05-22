import { CULTURE_INFO, formatBoolean, formatBooleanLocal, tryParseBoolean, tryParseBooleanLocal } from "localization";

it('tryParseBoolean.true', () => {
	expect(tryParseBooleanLocal("true")).toBe(true);
});

it('tryParseBoolean.false', () => {
	expect(tryParseBooleanLocal("false")).toBe(false);
});

it('tryParseBoolean.undefiend', () => {
	expect(tryParseBooleanLocal("xxx")).toBeUndefined();
});

it('tryParseBoolean.1', () => {
	expect(tryParseBooleanLocal(1)).toBe(true);
});

it('tryParseBoolean.0', () => {
	expect(tryParseBooleanLocal(0)).toBe(false);
});

it('tryParseBoolean.-1', () => {
	expect(tryParseBooleanLocal(-1)).toBeUndefined();
});

it('tryParseBoolean.2', () => {
	expect(tryParseBooleanLocal(-1)).toBeUndefined();
});

it('tryParseBoolean.yes', () => {
	expect(tryParseBooleanLocal("yes")).toBe(true);
});

it('tryParseBoolean.no', () => {
	expect(tryParseBooleanLocal("no")).toBe(false);
});

it('tryParseBoolean.cultureInfo.true', () => {
	expect(tryParseBoolean("igen", CULTURE_INFO.BOOLEAN_FORMATS.HU)).toBe(true);
});

it('tryParseBoolean.cultureInfo.false', () => {
	expect(tryParseBoolean("nem", CULTURE_INFO.BOOLEAN_FORMATS.HU)).toBe(false);
});

it('formatBoolean.true', () => {
	expect(formatBooleanLocal(true)).toBe("True");
});

it('formatBoolean.false', () => {
	expect(formatBooleanLocal(false)).toBe("False");
});

it('formatBoolean.customFormat.true', () => {
	expect(formatBoolean(true, { true_format: "x", false_format: "-" })).toBe("x");
});

it('formatBoolean.customFormat.false', () => {
	expect(formatBoolean(false, { true_format: "x", false_format: "-" })).toBe("-");
});

it('formatBoolean.cultureInfo.true', () => {
	expect(formatBoolean(true, CULTURE_INFO.BOOLEAN_FORMATS.HU)).toBe("Igen");
});

it('formatBoolean.cultureInfo.false', () => {
	expect(formatBoolean(false, CULTURE_INFO.BOOLEAN_FORMATS.HU)).toBe("Nem");
});
