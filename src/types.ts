import { CULTURE_INFO } from "internal";
import { CultureInfo } from "./localization/types";
import { ReactSimpleLocalizationDependencyInjection } from "types.di";

export interface ReactSimpleLocalization {
	readonly CULTURE_INFO: typeof CULTURE_INFO & {
		current: CultureInfo;
		default: CultureInfo;
	};

	// dependency injection; these methods are replacable with custom implementation
	DI: ReactSimpleLocalizationDependencyInjection;
}
