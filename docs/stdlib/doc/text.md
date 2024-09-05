## `replace_once`
```ab
pub fun replace_once(source, pattern, replacement) 
```

Finds the first occurrence of a pettern in the content and replaces it with provided replacement text


## `replace`
```ab
pub fun replace(source, pattern, replacement) 
```

Replaces all occurences of a pattern in the content with provided replacement text


## `replace_regex`
```ab
pub fun replace_regex(source: Text, pattern: Text, replacement: Text): Text 
```

Replaces all occurences of a regex pattern in the content with provided replacement text

Function uses `sed`


## `split`
```ab
pub fun split(text: Text, delimiter: Text): [Text] 
```

This function splits the input `text` into an array of substrings using the specified `delimiter`.


## `lines`
```ab
pub fun lines(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on newline characters.


## `words`
```ab
pub fun words(text: Text): [Text] 
```

Splits a `text` into an array of substrings based on space character.


## `join`
```ab
pub fun join(list: [Text], delimiter: Text): Text 
```

Merge a text using the delimeter specified


## `trim_left`
```ab
pub fun trim_left(text: Text): Text 
```

Trim the spaces at top of the text using `sed`


## `trim_right`
```ab
pub fun trim_right(text: Text): Text 
```

Trim the spaces at end of the text using `sed`


## `trim`
```ab
pub fun trim(text: Text): Text 
```

Trim the spaces from the text input


## `lower`
```ab
pub fun lower(text: Text): Text 
```

Lowercase the text input using `tr`


## `upper`
```ab
pub fun upper(text: Text): Text 
```

Lowercase the text input using `tr`


## `parse`
```ab
pub fun parse(text: Text): Num ? 
```

Attempts to parse a given text into a number, returning the parsed number or zero if parsing fails.


## `chars`
```ab
pub fun chars(text: Text): [Text] 
```

Splits a text into an array of individual characters.


## `len`
```ab
pub fun len(value): Num 
```

Get the text or array length


## `contains`
```ab
pub fun contains(text: Text, phrase: Text): Bool 
```

Check if text contain the value


## `reverse`
```ab
pub fun reverse(text: Text): Text 
```

Reverse a text using `rev`


## `starts_with`
```ab
pub fun starts_with(text: Text, prefix: Text): Bool 
```

Check if text starts with a value


## `ends_with`
```ab
pub fun ends_with(text: Text, suffix: Text): Bool 
```

Check if text ends with a value


## `slice`
```ab
pub fun slice(text: Text, index: Num, length: Num = 0): Text 
```

Returns a substring from `text` starting at the given `index` (0-based).
If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.
If `length` is provided, the substring will include `length` characters; otherwise, it slices to the end of `text`.
If `length` is negative, an empty string is returned.


## `char_at`
```ab
pub fun char_at(text: Text, index: Num): Text 
```

Returns the character from `text` at the specified `index` (0-based).
If `index` is negative, the substring starts from the end of `text` based on the absolute value of `index`.


## `capitalize`
```ab
pub fun capitalize(text: Text): Text 
```

Capitalize the first letter of the given `text`


## `lpad`
```ab
pub fun lpad(text: Text, pad: Text, length: Num): Text 
```

Pads `text` with the specified `pad` character on left until it reaches the desired `length`.


## `rpad`
```ab
pub fun rpad(text: Text, pad: Text, length: Num): Text 
```

Pads `text` with the specified `pad` character on the right until it reaches the desired `length`.


## `zfill`
```ab
pub fun zfill(text: Text, length: Num): Text 
```

Pads `text` with zeros on the left until it reaches the desired `length`.


