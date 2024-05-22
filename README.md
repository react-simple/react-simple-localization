# React Simple! Localization Utility Library
Basic utility functions for React application development. This documentation is for version 0.5.0.
Supports parsing and formatting number, date and boolean values using pre-defined (ISO, EN-US, HU) and custom cultures for localization and globalization. 
Any format can be specified by using templates and regular expressions. 

# Usage

## Installation
npm -i @react-simple/react-simple-localization

## Build
npm run build

## Test
npm run test

## Import
import { ... } from "@react-simple/react-simple-localization";

# Configuration
## REACT_SIMPLE_LOCALIZATION

Members in the REACT_SIMPLE_LOCALIZATION object can be set to update the behavior of the provided functions.

### REACT_SIMPLE_LOCALIZATION.CULTURE_INFO

- Contains all pre-defined cultures: **ISO, EN-US, HU** atm.
- Provides shortucts to all pre-defined **DATE_FORMATS, NUMBER_FORMATS** and **BOOLEAN_FORMATS**. 
(For example: CULTURE_INFO.DATE_FORMATS.ISO is the same object as CULTURE_INFO.ISO.DATE_FORMAT.)
- Contains the **CURRENT** and the **DEFAULT** cultures. The **CURRENT** culture can be set and it is used by all
*parse...Local*() and *format...Local*() functions for dates, numbers and booleans (see later).

### REACT_SIMPLE_LOCALIZATION.DI

Dependency injection references which will be called by the appropriate methods. For example **tryParseDate()** will 
call **REACT_SIMPLE_LOCALIZATION.DI.date.tryParseDate**, so it can be easily replaced with a custom implementation. 
The custom callback will be called with all parameters and a callback to the default implementation in case it only acts as a wrapper.

# Content

## Localization

### Summary
- **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** can be set to the desired default culture (EN-US by default).
- Formatting functions have *default*, *local* and *ISO* variants: *tryParseNumber*(), *tryParseNumberLocal*(), *tryParseNumberISO*()).
- The local version uses the CURRENT culture and the default version requies a format/culture parameter.
- For dates and booleans multiple formats can be specified simoultaneously and the matching one will be recognized automatically.

### Types
- **NumberFormatOptions, DateFormatOptions, BooleanFormatOptions**: Parameters for formatting and parsing values.
- **CultureInfo (DateTimeFormat, NumberFormat, BooleanFormat**: Formatting specifiers for localization and globalization.

### Constants
- **DATE_FORMATS, NUMBER_FORMATS, BOOLEAN_FORMATS** and **CULTURE_INFO** contains predefined formats (**ISO, EN-US, HU** atm.),
but additional formats can be defined.

### Functions

#### Boolean

- **tryParseBoolean(), tryParseBooleanLocal(), tryParseBooleanISO()**: While *tryParseBoolean*() expects the format parameter (see CULTURE_INFO and BOOLEAN_FORMATS),
*tryParseBooleanLocal*() will automatically use **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *tryParseBooleanISO*() is using **BOOLEAN_FORMATS.ISO**.
- **formateBoolean(), formatBooleanLocal(), formatBooleanISO()**: Format boolean values using specific formats. *formatBoolean*() expects the format parameter,
*formatBooleanLocal*() uses **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *formatBooleanISO*() uses **BOOLEAN_FORMATS.ISO**.

#### Date

##### Date Localization

- **tryParseDate(), tryParseDateLocal(), tryParseDateISO(), tryParseDateLocalOrISO()**: While *tryParseDate*() expects the format parameter (see CULTURE_INFO and DATE_FORMATS),
*tryParseDateLocal*() will automatically use **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *tryParseDateISO*() is using **DATE_FORMATS.ISO**.
Multiple formats can be used simoultaneously (regular expressions) and the recognized one will be used.
- **formateDate(), formatDateLocal(), formatDateISO()**: Format dates without time portion using specific formats. *formatDate*() expects the format parameter,
*formatDateLocal*() uses **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *formatDateISO*() uses **DATE_FORMATS.ISO**.
- **formateDateTime(), formatDateTimeLocal(), formatDateTimeISO()**: Same as *formatDate*() methods but supports the time portion.

#### Number

- **tryParseNumber(), tryParseNumberLocal(), tryParseNumberISO()**: While *tryParseNumber*() expects the format parameter (see CULTURE_INFO and NUMBER_FORMATS),
*tryParseNumberLocal*() will automatically use **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *tryParseNumberISO*() is using **NUMBER_FORMATS.ISO**.
- **formateNumber(), formatNumberLocal(), formatNumberISO()**: Format numbers using specific formats. *formatNumber*() expects the format parameter,
*formatNumberLocal*() uses **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *formatNumberISO*() uses **NUMBER_FORMATS.ISO**.

#### Value (ValueType)

- **tryParseValue(), tryParseValueLocal(), tryParseValueISO()**: While *tryParseValue*() expects the format parameter (see CULTURE_INFO),
*tryParseValueLocal*() will automatically use **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *tryParseValueISO*() is using **CULTURE_INFO.ISO**.
  - Multiple formats can be used simoultaneously (regular expressions) and the recognized one will be used. 
  - Supports ValueType types which are number, boolean, Date and string.
  - Automatically tries to detect the type or the format.
  - If string was passed it tries to parse it as a Date, number or boolean using the current or the specified CultureInfo.
  - Type can be forced in which case considers converting to that type only.
  - See *values.test.ts* for examples.

- **formateValue(), formatValueLocal(), formatValueISO()**: Format values using the appropriate *formatNumber(), formatDate()* or *formatBoolean()* methods.
*formatValueLocal*() uses **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.CURRENT** and *formatValueISO*() uses **CURRENT_FORMAT.ISO**.

# Links

- How to Set Up Rollup to Run React?: https://www.codeguage.com/blog/setup-rollup-for-react
- Creating and testing a react package with CRA and rollup: https://dev.to/emeka/creating-and-testing-a-react-package-with-cra-and-rollup-5a4l
- (react-scripts) Support for TypeScript 5.x: https://github.com/facebook/create-react-app/issues/13080
