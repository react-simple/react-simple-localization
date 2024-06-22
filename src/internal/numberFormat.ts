import { CultureInfoNumberFormat } from "localization/types";

// Internal artifacts are not exported
const ISO: CultureInfoNumberFormat = {
	formatId: "ISO",
	decimalSeparator: ".",
	thousandSeparator: ","
};

const EN_US: CultureInfoNumberFormat = {
	formatId: "EN-US",
	decimalSeparator: ".",
	thousandSeparator: ","
};

const HU: CultureInfoNumberFormat = {
	formatId: "HU",
	decimalSeparator: ",",
	thousandSeparator: "."
};

export const getNumberFormats = () => ({
	ISO,
	'EN-US': EN_US,
	HU
});
