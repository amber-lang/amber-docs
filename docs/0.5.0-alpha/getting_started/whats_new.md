Featuring a new compiler backend that improves readability, reliability, and performance of bash output, new `Int` data type and more.

## More readable bash output

![Bash output comparison]{"width": "100%"}(/images/bash-output-comparison-light.webp)(/images/bash-output-comparison-dark.webp)

## Integer type

New integer `Int` data type that is now the only supported type for:
- **Array subscript** - `i` in `arr[i]` can only be of type `Int`
- **Range** - `a` and `b` in `a..b` range operator can only be `Int`
- **Iterator** - `i` in `for i, item in items` is `Int` instead of `Num`.

## Comparison

Comparison operator now supports lexical comparison of `Text` data type.

```ab
echo "file.txt" < "file_new.txt"
```

It also works for lexical comparison of array types `[Text]` and `[Int]`.

```ab
let left = ["apple", "banana", "cherry"]
let right = ["apple", "bananas", "dates"]

echo left > right // True
```


## Optimizer

Optimizer removes redundant and unused variables in the bash output. It can significantly reduce the shell code size. Let's take this example:

```ab
let my_array = [1, 2, 3]
echo my_array
```

Now this simple code example would compile to the following result:

```sh
__array_0=(1 2 3)
my_array="${__array_0[@]}"
echo "${my_array[@]}"
```

Why does this code introduce a seemingly redundant variable? Because Bash can’t use array literals directly in expressions, so we must reference a variable. That's why we create an intermediate one. Here is the code after optimization:

```sh
my_array=(1 2 3)
echo "${my_array[@]}"
```

For now, this optimizer works for simple expressions, but it will be improved as we continue to develop Amber.

## Reversed range support

Previously, the range function required `start < end`. Now it supports any numeric order.

```ab
echo 0..3 // [0, 1, 2]
echo 6..3 // [6, 5, 4]

echo 0..=3 // [0, 1, 2, 3]
echo 6..=3 // [6, 5, 4, 3]
```

## Standard library

- New standard library function `bash_version` (in `std/env`) that returns currently installed version of bash.
- New `temp_dir_create` function that properly creates a temporary directory on linux and macOS. Thanks [@lens0021](https://github.com/lens0021)

### `std/date`

Improved date library by replacing old functions with new ones.

#### Removed functions:

| Name | Description |
|:--|:--|
| `date_posix` | By default reads date in a  `YYYY-MM-DDTHH:MM:SST` format and stores in a platform dependent representation |
| `date_add` | Adds time to already parsed date |
| `date_compare` | Compares two dates and returns value of a sign function |

#### Introduced functions:

| Name | Description |
|:--|:--|
| `date_from_posix` | Converts textual representation in a default `YYYY-MM-DD HH:MM:SS` format to [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) |
| `date_format_posix` | Converts [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) to a textual representation. |
| `date_add` | Adds time to passed date. |
| `date_sub` | Subtracts time to passed date. |

How to compare dates now? Since date is now stored as milliseconds since epoch, we can simply compare them with `>`, `>=`, `<` and `<=` operators.

## Bugfixes

- Duplicate argument names are not allowed. Thanks [@MuhamedMagdi](https://github.com/MuhamedMagdi)
- Standard library `replace_regex` now properly works on macOS and Linux musl. Thanks [@Aleksanaa](https://github.com/Aleksanaa)
- Casting `Text` to `Bool` now raises an absurd cast warning. Thanks [@lens0021](https://github.com/lens0021)
- Fixed escaping of backticks in text literals.
