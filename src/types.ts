import { CultureInfo } from "./localization/types";
import { ReactSimpleLocalizationDependencyInjection } from "types.di";

export interface ReactSimpleLocalization {
	readonly CULTURE_INFO: {
		CURRENT: CultureInfo;
		readonly DEFAULT: CultureInfo;
	};

	// dependency injection; these methods are replacable with custom implementation
	DI: ReactSimpleLocalizationDependencyInjection;
}
