import { CultureInfoBooleanFormat } from "localization/types";

// Internal artifacts are not exported
const DEFAULT_TRUE_SYNONYMS = ["true", "yes", "y", "1", "on", "checked", "enabled", "active"];
const DEFAULT_FALSE_SYNONYMS = ["false", "no", "n", "0", "off", "unchecked", "disabled", "inactive", "passive"];

const ISO: CultureInfoBooleanFormat = {
	formatId: "ISO",
	true_format: "true",
	false_format: "false",
	true_synonyms: DEFAULT_TRUE_SYNONYMS,
	false_synonyms: DEFAULT_FALSE_SYNONYMS
};

const EN_US: CultureInfoBooleanFormat = {
	formatId: "EN-US",
	true_format: "True",
	false_format: "False",
	true_synonyms: DEFAULT_TRUE_SYNONYMS,
	false_synonyms: DEFAULT_FALSE_SYNONYMS
};

const HU: CultureInfoBooleanFormat = {
	formatId: "HU",
	true_format: "Igen",
	false_format: "Nem",
	true_synonyms: [...DEFAULT_TRUE_SYNONYMS, "igen", "i", "be", "aktív"],
	false_synonyms: [...DEFAULT_FALSE_SYNONYMS, "nem", "ki", "passzív", "inaktív"]
};

export const getBoolenFormats = () => ({
	ISO,
	'EN-US': EN_US,
	HU
});
