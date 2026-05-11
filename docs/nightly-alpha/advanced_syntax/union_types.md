# Union Types {#union_types}

Union types provide a flexible way to define variables, function parameters, and return types that can accept values of multiple distinct types. 

## Basic Syntax

Union types are defined using the `|` operator to combine multiple types. The syntax is straightforward:

```ab
let value: Int | Text = "Hello"
let number: Int | Num = 42
let mixed: Bool | Int | Text = true
```

When declaring a union type, you can combine any valid Amber types including primitives, collections, and custom types.

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

## Type Narrowing

When working with union types, you'll often need to determine which type you're dealing with. Amber provides type narrowing through pattern matching and type checks:

```ab
fun process(value: Int | Text) {
    if type(value) == "Int" {
        let num = value as Int
        echo("Integer doubled: {num * 2}")
    else
        let text = value as Text
        echo("Text length: {len(text)}")
    }
}

process(5)        // Outputs: Integer doubled: 10
process("hello")  // Outputs: Text length: 5
```

You can also use match expressions for more complex type narrowing:

```ab
fun analyze(data: Int | Text | Bool) {
    match type(data) {
        "Int" -> echo("Got an integer")
        "Text" -> echo("Got text: {data}")
        "Bool" -> echo("Got a boolean")
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
    return parse(input) ?? 0
}

let result = parse_input("42")
```

For failable functions, you can combine union types with the optional marker:

```ab
fun find_user(id: Int): User | Text? {
    let users = [
        {id: 1, name: "Alice"},
        {id: 2, name: "Bob"}
    ]
    
    for user in users {
        if user.id == id {
            return user
        }
    }
    
    return "User not found"
}
```

## Arrays

Union types work seamlessly with arrays, allowing you to create collections of mixed but specific types:

```ab
let mixed: [Int | Text] = [1, "two", 3, "four"]

fun filter_integers(items: [Int | Text]): [Int] {
    var result: [Int] = []
    for item in items {
        if type(item) == "Int" {
            result.push(item as Int)
        }
    }
    return result
}

let numbers = filter_integers([1, "hello", 2, "world", 3])
// Returns: [1, 2, 3]
```

You can also use union types with other collection types:

```ab
let mapping: {Text: Int | Bool} = {
    "active": true,
    "count": 42
}
```

## Best Practices

1. **Keep union types focused** - Prefer specific, small unions over generic ones. Too many types in a union can make code harder to reason about.

2. **Use type narrowing early** - When you receive a union type value, narrow it to the specific type as early as possible in your function.

3. **Document behavior** - When a function accepts union types, document what happens for each possible type.

4. **Prefer dedicated types over unions** - If you find yourself using the same union frequently, consider creating a dedicated type alias:

```ab
type Numeric = Int | Num

fun calculate(value: Numeric) {
    // ...
}
```

5. **Be careful with mutability** - When using union types with mutable variables, ensure type safety is maintained throughout the code.

---

For more information on related topics, see [Type System](/advanced_syntax/type_system), [Data Types](/reference/data_types), and [Functions](/reference/functions).