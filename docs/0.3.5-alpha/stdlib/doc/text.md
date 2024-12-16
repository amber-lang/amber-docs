## `replace_once`

```ab
import { replace_once } from "std/text.ab"
```

```ab
pub fun replace_once(source, pattern, replacement) 
```

Finds the first occurrence of a pettern in the content and replaces it with provided replacement text



You can check the original tests for code examples:
* [replace_once.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/replace_once.ab)

## `replace`

```ab
import { replace } from "std/text.ab"
```

```ab
pub fun replace(source, pattern, replacement) 
```

Replaces all occurences of a pattern in the content with provided replacement text



You can check the original tests for code examples:
* [replace.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/replace.ab)
* [replace_once.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/replace_once.ab)
* [replace_regex.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/replace_regex.ab)

## `replace_regex`

```ab
import { replace_regex } from "std/text.ab"
```

```ab
pub fun replace_regex(source: Text, pattern: Text, replacement: Text): Text 
```

Replaces all occurences of a regex pattern in the content with provided replacement text

Function uses `sed`



You can check the original tests for code examples:
* [replace_regex.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/replace_regex.ab)

## `split`

```ab
import { split } from "std/text.ab"
```

```ab
pub fun split(text: Text, delimiter: Text): [Text] 
```

This function splits the input `text` into an array of substrings using the specified `delimiter`.



You can check the original tests for code examples:
* [split.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/split.ab)
* [split_multiline.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/split_multiline.ab)

## `lines`

```ab
import { lines } from "std/text.ab"
```

```ab
pub fun lines(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on newline characters.



You can check the original tests for code examples:
* [lines.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/lines.ab)

## `words`

```ab
import { words } from "std/text.ab"
```

```ab
pub fun words(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on space character.


## `join`

```ab
import { join } from "std/text.ab"
```

```ab
pub fun join(list: [Text], delimiter: Text): Text 
```

Merge a text using the delimeter specified



You can check the original tests for code examples:
* [join.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/join.ab)

## `trim_left`

```ab
import { trim_left } from "std/text.ab"
```

```ab
pub fun trim_left(text: Text): Text 
```

Trim the spaces at top of the text using `sed`



You can check the original tests for code examples:
* [trim_left.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/trim_left.ab)

## `trim_right`

```ab
import { trim_right } from "std/text.ab"
```

```ab
pub fun trim_right(text: Text): Text 
```

Trim the spaces at end of the text using `sed`



You can check the original tests for code examples:
* [trim_right.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/trim_right.ab)

## `trim`

```ab
import { trim } from "std/text.ab"
```

```ab
pub fun trim(text: Text): Text 
```

Trim the spaces from the text input



You can check the original tests for code examples:
* [trim.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/trim.ab)
* [trim_left.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/trim_left.ab)
* [trim_right.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/trim_right.ab)

## `lower`

```ab
import { lower } from "std/text.ab"
```

```ab
pub fun lower(text: Text): Text 
```

Lowercase the text input using `tr`



You can check the original tests for code examples:
* [lower.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/lower.ab)

## `upper`

```ab
import { upper } from "std/text.ab"
```

```ab
pub fun upper(text: Text): Text 
```

Lowercase the text input using `tr`



You can check the original tests for code examples:
* [upper.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/upper.ab)

## `parse`

```ab
import { parse } from "std/text.ab"
```

```ab
pub fun parse(text: Text): Num ? 
```

Attempts to parse a given text into a number, returning the parsed number or zero if parsing fails.



You can check the original tests for code examples:
* [parse.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/parse.ab)

## `chars`

```ab
import { chars } from "std/text.ab"
```

```ab
pub fun chars(text: Text): [Text] 
```

Splits a text into an array of individual characters.



You can check the original tests for code examples:
* [chars.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/chars.ab)

## `len`

```ab
import { len } from "std/text.ab"
```

```ab
pub fun len(value): Num 
```

Get the text or array length



You can check the original tests for code examples:
* [len_list.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/len_list.ab)
* [len_string.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/len_string.ab)

## `contains`

```ab
import { contains } from "std/text.ab"
```

```ab
pub fun contains(text: Text, phrase: Text): Bool 
```

Check if text contain the value



You can check the original tests for code examples:
* [contains.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/contains.ab)

## `reverse`

```ab
import { reverse } from "std/text.ab"
```

```ab
pub fun reverse(text: Text): Text 
```

Reverse a text using `rev`



You can check the original tests for code examples:
* [reverse.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/reverse.ab)

## `starts_with`

```ab
import { starts_with } from "std/text.ab"
```

```ab
pub fun starts_with(text: Text, prefix: Text): Bool 
```

Check if text starts with a value



You can check the original tests for code examples:
* [starts_with.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/starts_with.ab)

## `ends_with`

```ab
import { ends_with } from "std/text.ab"
```

```ab
pub fun ends_with(text: Text, suffix: Text): Bool 
```

Check if text ends with a value



You can check the original tests for code examples:
* [ends_with.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/ends_with.ab)

## `slice`

```ab
import { slice } from "std/text.ab"
```

```ab
pub fun slice(text: Text, index: Num, length: Num = 0): Text 
```

Returns a substring from `text` starting at the given `index` (0-based).
If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.
If `length` is provided, the substring will include `length` characters; otherwise, it slices to the end of `text`.
If `length` is negative, an empty string is returned.



You can check the original tests for code examples:
* [slice.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/slice.ab)

## `char_at`

```ab
import { char_at } from "std/text.ab"
```

```ab
pub fun char_at(text: Text, index: Num): Text 
```

Returns the character from `text` at the specified `index` (0-based).
If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.



You can check the original tests for code examples:
* [char_at.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/char_at.ab)

## `capitalize`

```ab
import { capitalize } from "std/text.ab"
```

```ab
pub fun capitalize(text: Text): Text 
```

Capitalize the first letter of the given `text`



You can check the original tests for code examples:
* [capitalize.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/capitalize.ab)

## `lpad`

```ab
import { lpad } from "std/text.ab"
```

```ab
pub fun lpad(text: Text, pad: Text, length: Num): Text 
```

Pads `text` with the specified `pad` character on left until it reaches the desired `length`.



You can check the original tests for code examples:
* [lpad.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/lpad.ab)

## `rpad`

```ab
import { rpad } from "std/text.ab"
```

```ab
pub fun rpad(text: Text, pad: Text, length: Num): Text 
```

Pads `text` with the specified `pad` character on the right until it reaches the desired `length`.



You can check the original tests for code examples:
* [rpad.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/rpad.ab)

## `zfill`

```ab
import { zfill } from "std/text.ab"
```

```ab
pub fun zfill(text: Text, length: Num): Text 
```

Pads `text` with zeros on the left until it reaches the desired `length`.



You can check the original tests for code examples:
* [zfill.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/zfill.ab)

