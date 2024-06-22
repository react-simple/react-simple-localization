# React Simple! Localization Utility Library
Basic utility functions for React application development. 

This documentation is for version 0.5.0.

Features:
- Supports **parsing and formatting** number, date and boolean values using **pre-defined cultures** (ISO, EN-US, HU) or **custom cultures** for localization and globalization
- Supports **min/max decimal places, min digits** and **thousand separators** for numbers
- Supports **custom date formats** by using templates and regular expressions for dates and datetimes
- Supports formatting and parsing booleans
- Parsing and formatting methods can use 
  - Format/culture parameter: tryParse&lt;*type*&gt;(*value, format*), format&lt;*type*&gt;(*value, format*)
  - Current culture from **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current**: tryParse&lt;*type*&gt;Local(*value*), format&lt;*type*&gt;Local(*value*)
  - ISO format: tryParse&lt;*type*&gt;ISO(*value*), format&lt;*type*&gt;ISO(*value*)
- **Dependency injection** for pluggable architecture. All the important methods can be replaced with custom implementation by setting REACT_SIMPLE_LOCALIZATION.DI members.
- See **Unit tests** for samples for all features

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

Members in the **REACT_SIMPLE_LOCALIZATION** object can be set to update the behavior of the provided functions.

### REACT_SIMPLE_LOCALIZATION.CULTURE_INFO

Contains the **current** and the **default** cultures. The **current** culture can be set and it is used by all
**parse&lt;*type*&gt;Local()** and **format&lt;*type*&gt;Local()** functions for dates, numbers and booleans.

### REACT_SIMPLE_LOCALIZATION.DI

Dependency injection references which will be called by the appropriate methods. For example **tryParseDate()** will 
call **REACT_SIMPLE_LOCALIZATION.DI.date.tryParseDate()**, so it can be easily replaced with a custom implementation. 
The custom callback will be called with all parameters and a callback to the default implementation (**tryParseDate_default()**), which makes wrapping the default behavior easier.

# Content

## Localization

### Summary
- **REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current** can be set to the desired default culture (EN-US by default).
- Formatting functions have *default*, *local* and *ISO* variants: **tryParseNumber(), tryParseNumberLocal(), tryParseNumberISO()**
- The local version uses the configured current cultur while the default version requires a format/culture parameter.
- For dates and booleans multiple formats (regular expressions) can be specified simoultaneously and the first matching one will be used.

### Types
- **NumberFormatOptions, DateFormatOptions, BooleanFormatOptions**: Parameters for formatting and parsing values.
- **CultureInfo, DateTimeFormat, NumberFormat, BooleanFormat**: Formatting specifiers for localization and globalization.

### Constants

#### CULTURE_INFO

Contains the predefined **dateFormats, numberFormats, booleanFormats** and **cultures**. 
- The **cultures** member contains the predefined cultures (**ISO, EN-US, HU** currently), but additional cultures can be defined easily.
- The **CultureInfo** type encapsulates the culture specific **DATE_FORMAT, NUMBER_FORMAT** and **BOOLEAN_FORMAT** instances.
- Example: **CULTURE_INFO.formats.dateFormats.ISO** equals to **CULTURE_INFO.cultures.ISO.dateFormat**

### Functions

#### Boolean

- **tryParseBoolean(), tryParseBooleanLocal(), tryParseBooleanISO()**: Parse boolean values from strings representation.
  - **tryParseBoolean(*value, format*)** expects the *format* parameter, see CULTURE_INFO.boolenFormats
  - **tryParseBooleanLocal(*value*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.booleanFormat
  - **tryParseBooleanISO(*value*)** uses CULTURE_INFO.booleanFormats.ISO

- **formateBoolean(), formatBooleanLocal(), formatBooleanISO()**: Format boolean values using specific formats.
  - **formatBoolean(*value, format*)** expects the *format* parameter
  - **formatBooleanLocal(*value*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.booleanFormat
  - **formatBooleanISO(*value*)** uses CULTURE_INFO.booleanFormats.ISO

#### Date

- **tryParseDate(), tryParseDateLocal(), tryParseDateISO(), tryParseDateLocalOrISO()**: Parse date values from string representation.
  - **tryParseDate(*value, formats*)** expects the *format* parameter (see CULTURE_INFO.dateFormats) and multiple formats can be specified. The first format (regular expression) successfully matched will be used.
  - **tryParseDateLocal(*value*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat
  - **tryParseDateISO(*value*)** uses CULTURE_INFO.dateFormats.ISO
  - **tryParseDateLocalOrISO(*value*)** understands the ISO date format or the date format of the currently set culture

- **formateDate(), formatDateLocal(), formatDateISO()**: Format dates without time portion using specific formats.
  - **formatDate(*value, format, options*)** expects the *format* parameter
  - **formatDateLocal(*value, options*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat
  - **formatDateISO(*value, options*)** uses CULTURE_INFO.dateFormats.ISO

- **formateDateTime(), formatDateTimeLocal(), formatDateTimeISO()**: Format dates with the time portion using specific formats.
  - **formatDateTime(*value, format, options*)** expects the *format* parameter
  - **formatDateTimeLocal(*value, options*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.dateFormat
  - **formatDateTimeISO(*value, options*)** uses CULTURE_INFO.dateFormats.ISO

#### Number

- **tryParseNumber(), tryParseNumberLocal(), tryParseNumberISO()**: 
Parse number values from string representation with decimal and thousand separators.
  - **tryParseNumber(*value, format*)** expects the *format* parameter, see CULTURE_INFO.numberFormats
  - **tryParseNumberLocal(*value*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.numberFormat
  - **tryParseNumberISO(*value*)** uses CULTURE_INFO.numberFormats.ISO

- **formateNumber(), formatNumberLocal(), formatNumberISO()**: Format numbers using specific formats and options (min/max decimal places, min digits, thousand separators yes/no).
  - **formatNumber(*value, format, options*)** expects the *format* parameter
  - **formatNumberLocal(*value, options*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current.numberFormat
  - **formatNumberISO*(*value, options*)** uses CULTURE_INFO.numberFormats.ISO

#### Value (ValueType)

- **tryParseValue(), tryParseValueLocal(), tryParseValueISO()**: Parse any value types (Date, number, boolean) from string representation by **automatically recognizing the type** or using the specified **forced type**.
  - **tryParseValue(*value, format, options*)** expects the *format* parameter, see CULTURE_INFO
  - **tryParseValueLocal(*value, options*)** uses REACT_SIMPLE_LOCALIZATION.CULTURE_INFO.current
  - **tryParseValueISO(*value, options*)** uses CULTURE_INFO.cultures.ISO
  - Multiple formats can be specified simoultaneously for dates (regular expressions) and the recognized one will be used
  - See **values.test.ts** for examples

- **formateValue(), formatValueLocal(), formatValueISO()**: Format values using the appropriate format method for the type.
  - **formatValue(*value, format, options*)**: Uses formatNumber(), formatDate() or formatBoolean()
  - **formatValueLocal(*value, options*)**: Uses formatNumberLocal(), formatDateLocal() or formatBooleanLocal()
  - **formatValueISO(*value, options*)**: Uses formatNumberISO(), formatDateISO() or formatBooleanISO()

# Links

- How to Set Up Rollup to Run React?: https://www.codeguage.com/blog/setup-rollup-for-react
- Creating and testing a react package with CRA and rollup: https://dev.to/emeka/creating-and-testing-a-react-package-with-cra-and-rollup-5a4l
- (react-scripts) Support for TypeScript 5.x: https://github.com/facebook/create-react-app/issues/13080
