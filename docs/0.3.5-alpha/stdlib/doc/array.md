## `array_first_index`

```ab
import { array_first_index } from "std/array.ab"
```

```ab
pub fun array_first_index(array, value): Num 
```

Returns index of the first value found in the specified array
If the value is not found, the function returns -1



You can check the original tests for code examples:
* [array_first_index.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/array_first_index.ab)

## `array_search`

```ab
import { array_search } from "std/array.ab"
```

```ab
pub fun array_search(array, value): [Num] 
```

Search the value in array and return an array with the index of the various items



You can check the original tests for code examples:
* [array_search.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/array_search.ab)

## `includes`

```ab
import { includes } from "std/array.ab"
```

```ab
pub fun includes(array, value) 
```

Check if the value is in the array



You can check the original tests for code examples:
* [includes_empty_num_array.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/includes_empty_num_array.ab)
* [includes_empty_text_array.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/includes_empty_text_array.ab)
* [includes_exact_match.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/includes_exact_match.ab)
* [includes_partial_match_with_expanded_element.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/includes_partial_match_with_expanded_element.ab)
* [includes_prefix_match.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/includes_prefix_match.ab)
* [includes_text_array.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/includes_text_array.ab)

