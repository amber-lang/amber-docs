## `bash_version`

```ab
fun bash_version(): [Int] 
```

## `capitalized`

```ab
pub fun capitalized(text: Text): Text 
```

Capitalize the first letter of the given `text`.

### Usage
```ab
import { capitalized } from "std/text"

const cap = capitalized("hello")
echo(cap) // "Hello"
```

## `char_at`

```ab
pub fun char_at(text: Text, index: Int): Text 
```

Returns the character from `text` at the specified `index` (0-based).

If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.

### Usage
```ab
import { char_at } from "std/text"

const ch = char_at("hello", 1)
echo(ch) // "e"
```

## `count_chars`

```ab
pub fun count_chars(text: Text): Int 
```

Counts the number of characters in the given text.

### Usage
```ab
import { count_chars } from "std/text"

const count = count_chars("hello")
echo(count) // 5
```

## `count_lines`

```ab
pub fun count_lines(text: Text): Int 
```

Counts the number of lines in the given text.

### Usage
```ab
import { count_lines } from "std/text"

const count = count_lines("one\ntwo\nthree")
echo(count) // 3
```

## `count_words`

```ab
pub fun count_words(text: Text): Int 
```

Counts the number of words in the given text.

### Usage
```ab
import { count_words } from "std/text"

const count = count_words("hello world foo")
echo(count) // 3
```

## `ends_with`

```ab
pub fun ends_with(text: Text, suffix: Text): Bool 
```

Checks if text ends with a value.

### Usage
```ab
import { ends_with } from "std/text"

if ends_with("hello world", "world") {
    echo("Ends with world!")
}
```

## `join`

```ab
pub fun join(list: [Text], delimiter: Text): Text 
```

Merges text using the delimiter specified.

### Usage
```ab
import { join } from "std/text"

const joined = join(["a", "b", "c"], ",")
echo(joined) // "a,b,c"
```

## `lowercase`

```ab
pub fun lowercase(text: Text): Text 
```

Makes the text input lowercase using `tr`.

### Usage
```ab
import { lowercase } from "std/text"

const lower = lowercase("HELLO")
echo(lower) // "hello"
```

## `lpad`

```ab
pub fun lpad(text: Text, pad: Text, length: Int): Text 
```

Pads `text` with the specified `pad` character on left until it reaches the desired `length`.

### Usage
```ab
import { lpad } from "std/text"

const padded = lpad("42", "0", 5)
echo(padded) // "00042"
```

## `match_regex`

```ab
pub fun match_regex(source: Text, search: Text, extended: Bool = false): Bool 
```

Match all occurrences of a regex pattern.

Function uses `sed`

### Usage
```ab
import { match_regex } from "std/text"

if match_regex("test123", "[0-9]+", true) {
    echo("Contains numbers!")
}
```

## `match_regex_any`

```ab
pub fun match_regex_any(text: Text, terms: [Text]): Bool 
```

Checks if an array value (with regular expression) is in the text.

### Usage
```ab
import { match_regex_any } from "std/text"

if match_regex_any("test123", ["[a-z]+", "[0-9]+"]) {
    echo("Matches at least one pattern!")
}
```

## `parse_int`

```ab
pub fun parse_int(text: Text): Int? 
```

Attempts to parse a given text into an `Int` number.

### Usage
```ab
import { parse_int } from "std/text"

const num = parse_int("42")?
echo(num) // 42
```

## `parse_num`

```ab
pub fun parse_num(text: Text): Num? 
```

Attempts to parse a given text into a `Num` number.

### Usage
```ab
import { parse_num } from "std/text"

const num = parse_num("3.14")?
echo(num) // 3.14
```

## `replace`

```ab
pub fun replace(source, search, replace) 
```

Replaces all occurrences of a pattern in the content with the provided replace text.

### Usage
```ab
import { replace } from "std/text"

const result = replace("Hello world", "world", "universe")
echo(result) // "Hello universe"
```

## `replace_one`

```ab
pub fun replace_one(source, search, replace) 
```

Replaces the first occurrence of a pattern in the content with the provided replace text.

### Usage
```ab
import { replace_one } from "std/text"

const result = replace_one("foo foo foo", "foo", "bar")
echo(result) // "bar foo foo"
```

## `replace_regex`

```ab
pub fun replace_regex(source: Text, search: Text, replace_text: Text, extended: Bool = false): Text 
```

Replaces all occurrences of a regex pattern in the content with the provided replace text.
Function uses `sed` and supports capture groups syntax in extended mode.

### Usage
```ab
import { replace_regex } from "std/text"

const result = replace_regex("test123", "[0-9]+", "456", true)
echo(result) // "test456"
// Also supports replace regex
echo(replace_regex("Put number 255 in brackets", "([0-9]+)", "(\1)", true)); // Put number (255) in brackets
```

## `reversed`

```ab
pub fun reversed(text: Text): Text 
```

Reverses text using `rev`.

### Usage
```ab
import { reversed } from "std/text"

const reversed_text = reversed("hello")
echo(reversed_text) // "olleh"
```

## `rpad`

```ab
pub fun rpad(text: Text, pad: Text, length: Int): Text 
```

Pads `text` with the specified `pad` character on the right until it reaches the desired `length`.

### Usage
```ab
import { rpad } from "std/text"

const padded = rpad("42", "0", 5)
echo(padded) // "42000"
```

## `sed_version`

```ab
fun sed_version(): Int 
```

## `slice`

```ab
pub fun slice(text: Text, index: Int, length: Int = 0): Text 
```

Returns a substring from `text` starting at the given `index` (0-based).

If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.
If `length` is provided, the substring will include `length` characters; otherwise, it slices to the end of `text`.
If `length` is negative, an empty string is returned.

### Usage
```ab
import { slice } from "std/text"

const sub = slice("hello world", 6, 5)
echo(sub) // "world"
```

## `sort_lines`

```ab
pub fun sort_lines(text: Text, desc: Bool = false, numeric: Bool = false): Text 
```

Sorts lines of text in ascending, descending or numerial order.

### Usage
```ab
import { sort_lines } from "std/text"

let sorted = sort_lines("banana\napple\ncherry")
echo(sorted) // "apple\nbanana\ncherry"

sorted = sort_lines("banana\napple\ncherry", true) // Sorts lines of text in descending order
echo(sorted) // "cherry\nbanana\napple"

sorted = sort_lines("10\n2\n1", false, true) // Sorts lines of text numerically
echo(sorted) // "1\n2\n10"
```

## `split`

```ab
pub fun split(text: Text, delimiter: Text): [Text] 
```

Splits the input `text` into an array of substrings using the specified `delimiter`.

### Usage
```ab
import { split } from "std/text"

const parts = split("a,b,c", ",")
echo(parts[0]) // "a"
```

## `split_chars`

```ab
pub fun split_chars(text: Text): [Text] 
```

Splits a text into an array of individual characters.

### Usage
```ab
import { split_chars } from "std/text"

const chars = split_chars("hello")
echo(chars[0]) // "h"
```

## `split_lines`

```ab
pub fun split_lines(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on newline characters.

### Usage
```ab
import { split_lines } from "std/text"

const lines = split_lines("line1\nline2\nline3")
echo(lines[0]) // "line1"
```

## `split_words`

```ab
pub fun split_words(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on space character.

### Usage
```ab
import { split_words } from "std/text"

const words = split_words("hello world example")
echo(words[1]) // "world"
```

## `starts_with`

```ab
pub fun starts_with(text: Text, prefix: Text): Bool 
```

Checks if text starts with a value.

### Usage
```ab
import { starts_with } from "std/text"

if starts_with("hello world", "hello") {
    echo("Starts with hello!")
}
```

## `text_contains`

```ab
pub fun text_contains(source: Text, search: Text): Bool 
```

Checks if some text contains a value.

### Usage
```ab
import { text_contains } from "std/text"

if text_contains("hello world", "world") {
    echo("Found!")
}
```

## `text_contains_all`

```ab
pub fun text_contains_all(source: Text, searches: [Text]): Bool 
```

Checks if all the arrays values are in the string

### Usage
```ab
import { text_contains_all } from "std/text"

if text_contains_all("hello world", ["hello", "world"]) {
    echo("All found!")
}
```

## `text_contains_any`

```ab
pub fun text_contains_any(source: Text, searches: [Text]): Bool 
```

Checks if an array value is in the text.

### Usage
```ab
import { text_contains_any } from "std/text"

if text_contains_any("hello world", ["foo", "world", "bar"]) {
    echo("Found at least one!")
}
```

## `trim`

```ab
pub fun trim(text: Text): Text 
```

Trims the spaces from the text input.

### Usage
```ab
import { trim } from "std/text"

const trimmed = trim("   hello   ")
echo(trimmed) // "hello"
```

## `trim_left`

```ab
pub fun trim_left(text: Text): Text 
```

Trims the spaces at top of the text using `sed`.

### Usage
```ab
import { trim_left } from "std/text"

const trimmed = trim_left("   hello")
echo(trimmed) // "hello"
```

## `trim_right`

```ab
pub fun trim_right(text: Text): Text 
```

Trims the spaces at end of the text using `sed`.

### Usage
```ab
import { trim_right } from "std/text"

const trimmed = trim_right("hello   ")
echo(trimmed) // "hello"
```

## `uniq_lines`

```ab
pub fun uniq_lines(text: Text, remove_all: Bool = false): Text 
```

Removes duplicate lines from text.

### Usage
```ab
import { uniq_lines } from "std/text"

let result = uniq_lines("foo\nfoo\nbar\nbar\nbaz")
echo(result) // "foo\nbar\nbaz"

let result = uniq_lines("foo\nbar\nfoo\nbaz\nbar", true) /// Removes all duplicate lines from text (not just consecutive)
echo(result) // "foo\nbar\nbaz"
```

## `uppercase`

```ab
pub fun uppercase(text: Text): Text 
```

Makes the text input uppercase using `tr`.

### Usage
```ab
import { uppercase } from "std/text"

const upper = uppercase("hello")
echo(upper) // "HELLO"
```

## `zfill`

```ab
pub fun zfill(text: Text, length: Int): Text 
```

Pads `text` with zeros on the left until it reaches the desired `length`.

### Usage
```ab
import { zfill } from "std/text"

const padded = zfill("42", 5)
echo(padded) // "00042"
```

