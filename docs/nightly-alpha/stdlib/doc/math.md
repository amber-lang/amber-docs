## `math_abs`

```ab
pub fun math_abs(number) 
```

Returns the absolute value of a number

### Usage
```ab
import { math_abs } from "std/math"

let absolute = math_abs(-42)
echo absolute // 42
```

## `math_ceil`

```ab
pub fun math_ceil(number: Num): Int 
```

Returns the smallest integer greater than or equal to a number

### Usage
```ab
import { math_ceil } from "std/math"

let ceiled = math_ceil(3.1)
echo ceiled // 4
```

## `math_floor`

```ab
pub fun math_floor(number: Num): Int 
```

Returns the largest integer less than or equal to a number

### Usage
```ab
import { math_floor } from "std/math"

let floored = math_floor(3.9)
echo floored // 3
```

## `math_round`

```ab
pub fun math_round(number: Num): Int 
```

Returns a number, rounded to the nearest integer

### Usage
```ab
import { math_round } from "std/math"

let rounded = math_round(3.7)
echo rounded // 4
```

## `math_sum`

```ab
pub fun math_sum(list) 
```

Sums an array's contents

### Usage
```ab
import { math_sum } from "std/math"

let total = math_sum([1, 2, 3, 4, 5])
echo total // 15
```

