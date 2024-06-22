import { REACT_SIMPLE_LOCALIZATION } from "data";

// default is REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.default
export const getCulture = (cultureId: string, defaultCultureId?: string) => {
	return (
		REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.cultures[cultureId] ||
		REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.cultures[defaultCultureId || REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.default.cultureId]
	);
};

export const getISOCulture = () => REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.cultures["ISO"];
export const getDefaultCulture = () => REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.default;
