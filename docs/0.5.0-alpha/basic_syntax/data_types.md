In Bash there is only one primitive data type, string, which internal implementation is represented by an array of characters `char*`. Amber extends on this data type to introduce a few more.

Amber supports five data types:
- `Text` - The textual data type. In other programming languages it can also be called "string".
- `Int` - Integer data type.
- `Num` - The numeric data type. It's basically any number.
- `Bool` - The boolean data type. It's value can be either `true` or `false`.
- `Null` - The _nothing_ data type.
- `[]` - The array data type.

## Text

`Text` data type is the most basic data type in Amber. It's just a string of characters and is also stored as a string of characters under the hood.

Text literal in Amber is contained between double quotes. Amber makes sure to prevent content inside from [globbing](https://en.wikipedia.org/wiki/Glob_%28programming%29). This prevents unexpected behaviors from happening.

```ab
// `Text` literal:
"Welcome to the jungle"
```

Just like in other programming languages, characters in `Text` literals can be escaped.

| Escape Sequence | Description |
| :-------------- | :---------- |
| `\n`            | Newline     |
| `\t`            | Tab         |
| `\r`            | Carriage return |
| `\0`            | Null byte   |
| `\{`            | Literal `{` |
| `\$`            | Literal `$` |
| `\'`            | Literal `'` |
| `\"`            | Literal `"` |
| `\\`            | Literal `\` |

Any other escape sequence not listed above will be treated as a literal escape sequence, similar to how Bash handles them. For instance, escaping `\c` will result in the literal `\c` being output.

## Integer

Under the hood its value is stored as a string of characters - the same way as it's done in Bash. However when performing operations the values are treated as 64-bit signed integers.

```ab
// `Int` data type
42
-123
```

This data type is the most performant way to compute integers. Later we will discover how `Num` data type can let us compute numbers using floating point arithmetic.

## Number

Similarly to `Int` its value is stored as a string of characters. The difference is that Amber applies standard commands to do operations on numbers that support _floating point_ values so that you can simply write operator sign instead.

> WARNING: The `Num` data type currently requires the `bc` command to be installed on your operating system when running compiled Amber code. For portability, it is recommended to use the `Int` data type whenever possible.

```ab
// `Num` data type
42.0
-123.456

// You can implicitly cast `Int` to `Num`
let variable = 12.12
// The variable keeps type of `Num`
variable = 24
```

We will learn more about variables in the upcoming chapters.

## Boolean

Boolean values are translated to `0` or `1` numerical values. These values can be easily [cast](/advanced_syntax/as_cast) to numbers `Num`.

> WARNING: Casting `Text` to `Bool` issues an "absurd cast" warning, indicating a potential logical issue. It's recommended to use explicit comparisons (e.g., `my_text == "true"`) for clarity.

```ab
// `Bool` data type
true
false
```

## Null

```ab
// `Null` data type
null
```

The most common use of this data type is to indicate that a function does not return a value. Currently, there is no practical real-world scenario where using a null literal is necessary, as it serves no functional purpose at this time.

## Array

Arrays in Amber and Bash are dynamically allocated. When creating an array literal it is important to specify of which data type the array should be made. Type signature of arrays can be represented with `[T]` where `T` is the value type that this array holds. Example: an array of type `Num` is `[Num]` (in C like languages it would be `Num[]`).

To create an array literal simply enclose a list of elements separated with a comma `,` with square brackets `[]`.

```ab
// `[Num]` data type
[1, 2, 3]
// `[Text]` data type
["apple", "banana", "orange"]
```

In a situation of empty array there is no value that can tell the compiler of what type it is. In this case we can simply use the type signature of it to represent an empty array.

```ab
// Example of a value that represents empty array of text
[Text]
```

> WARNING: Due to the bash's limitations it's pretty hard to implement 2D+ arrays to behave as regular arrays. As of right now Amber does not support nested arrays

```ab
[[Bool]]
// Error: Arrays cannot be nested due to the Bash limitations
```
