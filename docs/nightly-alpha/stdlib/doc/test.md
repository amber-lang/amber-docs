## `assert`

```ab
pub fun assert(condition: Bool) 
```

Asserts that a boolean condition is true. Fails the test with exit code `1` if false.
### Usage
```ab
import { assert } from "std/test"

let user_age = 18
assert(user_age >= 18)
```

## `assert_eq`

```ab
pub fun assert_eq(left, right) 
```

Asserts that two values are equal. Fails the test with exit code `1` if they are not equal.
### Usage
```ab
import { assert_eq } from "std/test"

let expected = [1, 2, 3]
let actual = [1, 2, 3]
assert_eq(expected, actual)
```

## `refute`

```ab
pub fun refute(condition: Bool) 
```

Asserts that a boolean condition is false. Fails the test with exit code `1` if true.
### Usage
```ab
import { refute } from "std/test"

let user_age = 17
refute(user_age >= 18)
```

