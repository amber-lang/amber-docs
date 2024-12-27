## `array_contains`

```ab
import { array_contains } from "std/array"
```

```ab
pub fun array_contains(array, value) 
```

Checks if a value is in the array.



You can check the original tests for code examples:
* [array_contains_empty_num_array.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_contains_empty_num_array.ab)
* [array_contains_empty_text_array.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_contains_empty_text_array.ab)
* [array_contains_exact_match.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_contains_exact_match.ab)
* [array_contains_partial_match_with_expanded_element.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_contains_partial_match_with_expanded_element.ab)
* [array_contains_prefix_match.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_contains_prefix_match.ab)
* [array_contains_text_array.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_contains_text_array.ab)

## `array_extract_at`

```ab
import { array_extract_at } from "std/array"
```

```ab
pub fun array_extract_at(ref array, index) 
```

Removes an element at the index from the array, and returns it; if the
index is negative or beyond the end, the return value is undefined, but
the array will be unchanged.



You can check the original tests for code examples:
* [array_extract_at.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_extract_at.ab)

## `array_find`

```ab
import { array_find } from "std/array"
```

```ab
pub fun array_find(array, value): Num 
```

Returns index of the first value found in the specified array.

If the value is not found, the function returns -1.



You can check the original tests for code examples:
* [array_find.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_find.ab)
* [array_find_all.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_find_all.ab)

## `array_find_all`

```ab
import { array_find_all } from "std/array"
```

```ab
pub fun array_find_all(array, value): [Num] 
```

Searches for a value in an array and returns an array with the index of the various items.



You can check the original tests for code examples:
* [array_find_all.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_find_all.ab)

## `array_first`

```ab
import { array_first } from "std/array"
```

```ab
pub fun array_first(array) 
```

Returns the first element in the array; if the array is empty, the return
value is undefined.



You can check the original tests for code examples:
* [array_first.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_first.ab)

## `array_last`

```ab
import { array_last } from "std/array"
```

```ab
pub fun array_last(array) 
```

Returns the last element in the array; if the array is empty, the return
value is undefined.



You can check the original tests for code examples:
* [array_last.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_last.ab)

## `array_pop`

```ab
import { array_pop } from "std/array"
```

```ab
pub fun array_pop(ref array) 
```

Removes the last element from the array, and returns it; if the array
is empty, the return value is undefined, but the array will be unchanged.



You can check the original tests for code examples:
* [array_pop.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_pop.ab)

## `array_remove_at`

```ab
import { array_remove_at } from "std/array"
```

```ab
pub fun array_remove_at(ref array: [], index: Num): Null 
```

Removes an element at the index from the array; if the index is negative
or beyond the end, the return value is undefined, but the array will be
unchanged.



You can check the original tests for code examples:
* [array_remove_at.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_remove_at.ab)

## `array_shift`

```ab
import { array_shift } from "std/array"
```

```ab
pub fun array_shift(ref array) 
```

Removes the first element from the array, and returns it; if the array
is empty, the return value is undefined, but the array will be unchanged.



You can check the original tests for code examples:
* [array_shift.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/array_shift.ab)

