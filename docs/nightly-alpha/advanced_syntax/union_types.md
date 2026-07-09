# Union Types {#union_types}

Union types provide a flexible way to define function parameters and return types that can accept values of multiple distinct types. 

## Function Parameters

One of the most common use cases for union types is defining flexible function parameters. This allows functions to accept different types without resorting to dynamic typing:

```ab
fun print_value(val: Int | Text | Bool) {
    echo(val)
}

print_value(42)       // Valid
print_value("Amber")  // Valid
print_value(true)     // Valid
```

You can also use union types with multiple parameters:

```ab
fun describe(a: Int | Text, b: Bool | Num) {
    echo("First: {a}, Second: {b}")
}

describe(10, true)           // Valid
describe("hello", 3.14)     // Valid
describe("test", false)      // Valid
```

You can also use match expressions for more complex type narrowing:

```ab
fun analyze(data: Int | Text | Bool) {
    if {
        data is Int: echo("Got an integer")
        data is Text: echo("Got text: {data}")
        data is Bool: echo("Got a boolean")
    }
}
```

## Return Types

Union types are also useful for function return types, allowing functions to return different types based on their execution:

```ab
fun parse_input(input: Text): Int | Text {
    if input == "" {
        return "Empty input"
    }
    return 0
}

let result = parse_input("42")
```

## Arrays

Union types work seamlessly with arrays, allowing you to pass different types of arrays:

```ab

fun array_type(items: [Int] | [Text]): Text {
    if items is [Int] {
        return "Int array: {items}"
    } else {
        return "Text array: {items}"
    }
}

echo(array_type([1, 2, 3]))
// Returns: Int array: 1 2 3
```

---

For more information on related topics, see [Type System](/advanced_syntax/type_system), [Data Types](/basic_syntax/data_types), and [Functions](/basic_syntax/functions).