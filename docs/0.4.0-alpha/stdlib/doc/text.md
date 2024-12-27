## `capitalized`

```ab
import { capitalized } from "std/text"
```

```ab
pub fun capitalized(text: Text): Text 
```

Capitalize the first letter of the given `text`.


## `char_at`

```ab
import { char_at } from "std/text"
```

```ab
pub fun char_at(text: Text, index: Num): Text 
```

Returns the character from `text` at the specified `index` (0-based).

If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.


## `ends_with`

```ab
import { ends_with } from "std/text"
```

```ab
pub fun ends_with(text: Text, suffix: Text): Bool 
```

Checks if text ends with a value.


## `join`

```ab
import { join } from "std/text"
```

```ab
pub fun join(list: [Text], delimiter: Text): Text 
```

Merges text using the delimeter specified.


## `lowercase`

```ab
import { lowercase } from "std/text"
```

```ab
pub fun lowercase(text: Text): Text 
```

Makes the text input lowercase using `tr`.


## `lpad`

```ab
import { lpad } from "std/text"
```

```ab
pub fun lpad(text: Text, pad: Text, length: Num): Text 
```

Pads `text` with the specified `pad` character on left until it reaches the desired `length`.


## `match_regex`

```ab
import { match_regex } from "std/text"
```

```ab
pub fun match_regex(source: Text, search: Text, extended: Bool = false): Bool 
```

Match all occurences of a regex pattern.

Function uses `sed`


## `match_regex_any`

```ab
import { match_regex_any } from "std/text"
```

```ab
pub fun match_regex_any(text: Text, terms: [Text]): Bool 
```

Checks if an array value (with regular expression) is in the text.


## `parse_number`

```ab
import { parse_number } from "std/text"
```

```ab
pub fun parse_number(text: Text): Num ? 
```

Attempts to parse a given text into a number, returning the parsed number or zero if parsing fails.


## `replace`

```ab
import { replace } from "std/text"
```

```ab
pub fun replace(source, search, replace) 
```

Replaces all occurences of a pattern in the content with the provided replace text.


## `replace_one`

```ab
import { replace_one } from "std/text"
```

```ab
pub fun replace_one(source, search, replace) 
```

Replaces the first occurence of a pattern in the content with the provided replace text.


## `replace_regex`

```ab
import { replace_regex } from "std/text"
```

```ab
pub fun replace_regex(source: Text, search: Text, replace: Text, extended: Bool = false): Text 
```

Replaces all occurences of a regex pattern in the content with the provided replace text.

Function uses `sed`


## `reversed`

```ab
import { reversed } from "std/text"
```

```ab
pub fun reversed(text: Text): Text 
```

Reverses text using `rev`.


## `rpad`

```ab
import { rpad } from "std/text"
```

```ab
pub fun rpad(text: Text, pad: Text, length: Num): Text 
```

Pads `text` with the specified `pad` character on the right until it reaches the desired `length`.


## `slice`

```ab
import { slice } from "std/text"
```

```ab
pub fun slice(text: Text, index: Num, length: Num = 0): Text 
```

Returns a substring from `text` starting at the given `index` (0-based).

If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.
If `length` is provided, the substring will include `length` characters; otherwise, it slices to the end of `text`.
If `length` is negative, an empty string is returned.


## `split`

```ab
import { split } from "std/text"
```

```ab
pub fun split(text: Text, delimiter: Text): [Text] 
```

Splits the input `text` into an array of substrings using the specified `delimiter`.


## `split_chars`

```ab
import { split_chars } from "std/text"
```

```ab
pub fun split_chars(text: Text): [Text] 
```

Splits a text into an array of individual characters.


## `split_lines`

```ab
import { split_lines } from "std/text"
```

```ab
pub fun split_lines(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on newline characters.


## `split_words`

```ab
import { split_words } from "std/text"
```

```ab
pub fun split_words(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on space character.


## `starts_with`

```ab
import { starts_with } from "std/text"
```

```ab
pub fun starts_with(text: Text, prefix: Text): Bool 
```

Checks if text starts with a value.


## `text_contains`

```ab
import { text_contains } from "std/text"
```

```ab
pub fun text_contains(text: Text, phrase: Text): Bool 
```

Checks if some text contains a value.



You can check the original tests for code examples:
* [text_contains.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/text_contains.ab)
* [text_contains_all.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/text_contains_all.ab)
* [text_contains_any.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/text_contains_any.ab)

## `text_contains_all`

```ab
import { text_contains_all } from "std/text"
```

```ab
pub fun text_contains_all(text: Text, terms: [Text]): Bool 
```

Checks if all the arrays values are in the string



You can check the original tests for code examples:
* [text_contains_all.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/text_contains_all.ab)

## `text_contains_any`

```ab
import { text_contains_any } from "std/text"
```

```ab
pub fun text_contains_any(text: Text, terms: [Text]): Bool 
```

Checks if an array value is in the text.



You can check the original tests for code examples:
* [text_contains_any.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/text_contains_any.ab)

## `trim`

```ab
import { trim } from "std/text"
```

```ab
pub fun trim(text: Text): Text 
```

Trims the spaces from the text input.


## `trim_left`

```ab
import { trim_left } from "std/text"
```

```ab
pub fun trim_left(text: Text): Text 
```

Trims the spaces at top of the text using `sed`.


## `trim_right`

```ab
import { trim_right } from "std/text"
```

```ab
pub fun trim_right(text: Text): Text 
```

Trims the spaces at end of the text using `sed`.


## `uppercase`

```ab
import { uppercase } from "std/text"
```

```ab
pub fun uppercase(text: Text): Text 
```

Makes the text input uppercase using `tr`.


## `zfill`

```ab
import { zfill } from "std/text"
```

```ab
pub fun zfill(text: Text, length: Num): Text 
```

Pads `text` with zeros on the left until it reaches the desired `length`.


