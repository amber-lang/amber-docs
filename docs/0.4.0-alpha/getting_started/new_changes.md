## Breaking Changes

This version introduces some changes that may impact existing codebases. We recommend reviewing the [Migration Guide](https://docs.amber-lang.com/getting_started/migration_guide) for a smooth transition. Notable changes include:
- **Standard Library Updates:** Several functions have been renamed for better consistency and usability.
- **Keyword Adjustments:** The keywords `unsafe` and `loop` for iterator loops have been renamed to improve code clarity and reduce potential ambiguity.

## Standard Library
- **`file_extract`:** Simplifies the process of extracting archive files ([#587](https://github.com/amber-lang/amber/pull/587)).
- **`file_glob`:** Enables efficient pattern-based file searches ([#511](https://github.com/amber-lang/amber/pull/511)).
- **`input_hidden`:** Allows for secure hidden input, ideal for passwords and secrets ([#492](https://github.com/amber-lang/amber/pull/492)).

## New Features
- **Windows Git Bash Support:** Amber now runs seamlessly on Git Bash for Windows users ([#501](https://github.com/amber-lang/amber/pull/501)).
- **Built-in Functions:** New built-ins such as `len`, `exit`, and `lines` enhance scripting capabilities
  ([#402](https://github.com/amber-lang/amber/pull/402) [#545](https://github.com/amber-lang/amber/pull/545) [#565](https://github.com/amber-lang/amber/pull/565)).
- **Trailing Comma Support:** Import statements now support trailing commas, aligning with modern programming conventions ([#602](https://github.com/amber-lang/amber/pull/602)).
- **Compile-Time Math for Ranges:** Enables mathematical operations on ranges at compile time ([#469](https://github.com/amber-lang/amber/pull/469)).
- **Array Slicing:** Use syntax like `array[i..j]` to extract slices of arrays easily ([#628](https://github.com/amber-lang/amber/pull/628)).
- **Constant Variables:** Define constants with the `const` keyword for immutability ([#423](https://github.com/amber-lang/amber/pull/423) [#630](https://github.com/amber-lang/amber/pull/630)).
- **CLI Enhancements:** A revamped CLI introduces subcommand support for more intuitive interaction ([#600](https://github.com/amber-lang/amber/pull/600)).
- **Generic Array Parameters:** Enables the definition of generic array types, improving flexibility in function definitions ([#472](https://github.com/amber-lang/amber/pull/472)).

## Bug Fixes
- **Escaping in `replace` Functions:** Improved handling of slashes in `replace` and `replace_one` ([#487](https://github.com/amber-lang/amber/pull/487)).
- **Echo Functions:** Enhanced reliability and consistency of echo-related helper functions ([#491](https://github.com/amber-lang/amber/pull/491)).

And many more changes that can be found on the [GitHub release page](https://github.com/amber-lang/amber/releases/tag/0.4.0-alpha).
