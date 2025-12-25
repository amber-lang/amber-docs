## `array_contains`

```ab
pub fun array_contains(array, value) 
```

Checks if a value is in the array.

### Usage
```ab
import { array_contains } from "std/array"

array_contains([1, 2, 3], 2) // Outputs true
```

## `array_extract_at`

```ab
pub fun array_extract_at(ref array: [], index: Int) 
```

Removes an element at the index from the array, and returns it; if the
index is negative or beyond the end, the function fails.

### Usage
```ab
import { array_extract_at } from "std/array"

let array = [1, 2, 3]
let element = array_extract_at(array, 1)
echo element // Outputs 2
echo(array) // Outputs [1, 3]
```

## `array_filled`

```ab
pub fun array_filled(size, value = 0) 
```

Returns an array of length `size` with each element set to `value`; if `size`
is less than zero an empty array is returned

### Usage
```ab
import { array_filled } from "std/array"

let array = array_filled(5, 1)
echo(array) // Outputs [1, 1, 1, 1, 1]
```

## `array_find`

```ab
pub fun array_find(array, value): Int 
```

Returns index of the first value found in the specified array.

If the value is not found, the function returns -1.

### Usage
```ab
import { array_find } from "std/array"

array_find([1, 2, 3], 2) // Outputs 2
```

## `array_find_all`

```ab
pub fun array_find_all(array, value): [Int] 
```

Searches for a value in an array and returns an array with the index of the various items.

### Usage
```ab
import { array_find_all } from "std/array"

array_find_all([1, 2, 3, 2], 2) // Outputs [1, 3]
```

## `array_first`

```ab
pub fun array_first(array) 
```

Returns the first element in the array; if the array is empty, the function
fails.

### Usage
```ab
import { array_first } from "std/array"

array_first([1, 2, 3]) // Outputs 1
```

## `array_last`

```ab
pub fun array_last(array) 
```

Returns the last element in the array; if the array is empty, the function
fails.

### Usage
```ab
import { array_last } from "std/array"

array_last([1, 2, 3]) // Outputs 3
```

## `array_pop`

```ab
pub fun array_pop(ref array) 
```

Removes the last element from the array, and returns it; if the array
is empty, the function fails, and the array will be unchanged.

### Usage
```ab
import { array_pop } from "std/array"

let array = [1, 2, 3]
let element = array_pop(array)
echo(element) // Outputs 3
echo(array) // Outputs [1, 2]
```

## `array_remove_at`

```ab
pub fun array_remove_at(ref array: [], index: Int): Null 
```

Removes an element at the index from the array; if the index is negative
or beyond the end, the array will be unchanged.

### Usage
```ab
import { array_remove_at } from "std/array"

let array = [1, 2, 3]
array_remove_at(array, 1)
echo(array) // Outputs [1, 3]
```

## `array_shift`

```ab
pub fun array_shift(ref array) 
```

Removes the first element from the array, and returns it; if the array
is empty, the function fails, and the array will be unchanged.

### Usage
```ab
import { array_shift } from "std/array"

let array = [1, 2, 3]
let element = array_shift(array)
echo(element) // Outputs 1
echo(array) // Outputs [2, 3]
```

## `sort`

```ab
pub fun sort(ref array: [], desc: Bool = false, version_sort: Bool = false): Null 
```

Sort the array in-place.
Pass `desc` value `true` for descending order.
Pass `version_sort` value `true` for version sort,
this only applies to text arrays.

### Usage
```ab
import { sort } from "std/array"

let array = ["15","-3","foo","bar"]
sort(array)
echo(array) // Outputs ["-3", "15", "bar", "foo"]
```

## `sorted`

```ab
pub fun sorted(array: [], desc: Bool = false, version_sort: Bool = false): [] 
```

Return the sorted array, leaving the original array unchanged.
Pass `desc` value `true` for descending order.
Pass `version_sort` value `true` for version sort,
this only applies to text arrays.

### Usage
```ab
import { sorted } from "std/array"

echo(sorted([-3,15,7,2], true)) // Outputs [-3, 2, 7, 15]
```

