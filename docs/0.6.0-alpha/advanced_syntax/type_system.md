# Type System {#type_system}

Amber combines static type safety with powerful type inference, creating a flexible system that generates efficient, type-specific code at compile time. 

## Union Types

Union types allow a single variable to hold values of multiple types. This is covered in detail in the [Union Types](/advanced_syntax/union_types) documentation.

## Type Inference

Amber automatically infers types from usage, eliminating the need for explicit type annotations in many cases. The compiler analyzes how values are used throughout your code to determine their types.

### Variable Type Inference

When you assign a value to a variable, Amber infers the type from the right-hand side:

```ab
let message = "Hello"           // Inferred as Text
let count = 42                  // Inferred as Int
let price = 19.99               // Inferred as Num
let flags = true                // Inferred as Bool
```

### Inference from Operations

The compiler tracks types through operations and function calls:

```ab
let x = 10              // Int
let y = x + 5           // Int (result of Int + Int)
let text = "Number: "   // Text
let combined = text + y // Text (Text + Int → Text)
```

### Empty Arrays

An empty array creates a Generic array which later resolves to the type of the first key:

```ab
let empty_ints: [Int] = []    // Type annotation required
let empty_text: [Text] = []   // Type annotation required
```

However, once you populate an array, type inference works normally:

```ab
var items = [1, 2, 3]         // Inferred as [Int]
items + = [4]                 // Still [Int]
```

### Function Parameter Inference

Function parameters can often omit type annotations when the compiler can determine usage:

```ab
fun double(x) {              // Type inferred from usage
    return x * 2
}

let result = double(5)       // x is inferred as Int
let text = double("a")       // ERROR: cannot multiply Text
```

## Generics and Type Specialization

Amber uses monomorphization—a compile-time process that generates type-specific versions of generic code. This approach combines the flexibility of generics with the performance of statically typed code.

### How Monomorphization Works

When you call a function without explicit type declarations, Amber generates a specialized version for each unique type combination used:

```ab
fun identity(x) {
    return x
}

let num = identity(42)        // Generates: identity_Int
let txt = identity("hello")   // Generates: identity_Text
let flag = identity(true)    // Generates: identity_Bool
```

The compiler creates separate functions for each type, resulting in direct, efficient code without runtime type checking.

### Type-Specific Variants

Each variant is optimized for its specific type:

```ab
fun add(a, b) {
    return a + b
}

// These calls generate three separate functions
let int_result = add(1, 2)      // add_Int(Int, Int) -> Int
let num_result = add(1.5, 2.5)  // add_Num(Num, Num) -> Num
let text_result = add("a", "b") // add_Text(Text, Text) -> Text
```

### Variant Caching

The compiler caches generated variants. If multiple calls use identical type signatures, no new code is generated:

```ab
fun process(data) {
    return data
}

// Called with Int multiple times - only one variant generated
let a = process(1)
let b = process(2)
let c = process(3)

// Only one Int variant exists in the final code
```

This caching prevents code bloat while maintaining performance benefits.

### Explicit Type Declarations

You can explicitly specify types to control specialization:

```ab
fun increment(x: Int): Int {
    return x + 1
}

fun greet(name: Text): Text {
    return "Hello, " + name
}
```

Explicit declarations are useful when you want to ensure a specific type is used or when the type cannot be inferred from usage.

## Overloading

Amber supports function overloading—multiple functions with the same name but different type signatures. Each overloaded version becomes a separate compiled variant.

### Automatic Overloading

When you define functions with different type signatures, Amber alert about a redeclaration error:

```ab
fun format(value: Int): Text {
    return "Number: " + value
}

fun format(value: Text): Text {
    return "\"" + value + "\""
}

WRONG!
```

### Overloading and Type Inference

The compiler selects the appropriate variant based on argument types:

```ab
fun combine(a, b) {
    return a + b
}

// Type inference determines which variant to call
let num = combine(1, 2)           // combine_Int_Int
let txt = combine("a", "b")      // combine_Text_Text
let mixed = combine(1, "x")      // combine_Int_Text
```

### Best Practices for Overloading

1. **Use distinct signatures** - Ensure overloaded functions have unambiguously different parameter types
2. **Document behavior** - When overloaded functions behave differently, document the variations
3. **Prefer explicit types** - For complex scenarios, use explicit type annotations to make intent clear

## Type Narrowing

Type narrowing is the process of refining a variable's type within a specific code path, typically within conditionals. Amber provides mechanisms to determine and narrow types at runtime.

### Type Checking

Use `is` keyword to check the runtime type of a value:

```ab
fun describe(value: Int | Text) {
    if value is Int {
        echo("Got an integer")
    } else {
        echo("Got text")
    }
}
```

### Safe Type Casting

After narrowing, use the `as` operator to cast to the narrowed type:

```ab
fun process(value: Int | Text) {
    if value is Int {
        let num = value as Int
        echo("Doubled: {num * 2}")
    } else {
        let txt = value as Text
        echo("Uppercase: {txt}")
    }
}
```

The `as` operator is only safe when dealing with specific type combinations where it's allowed, e.g. cast Int as Text or Bool as Int, otherwise the compiler will show a warning.

For unsupported type conversions, check [absurd cast](/advanced_syntax/as_cast#absurd-cast)

### Match Expressions for Narrowing

For more complex scenarios, use if-chain with type checking:

```ab
fun analyze(value: Int | Text | Bool) {
    if {
        value is Int {
            echo("Integer: {value}")
        }
        value is Text {
            echo("Text length: {len(value)}")
        } 
        value is Bool {
            echo("Boolean: {value}")
        }
    }
}
```

---

For more information on related topics, see [Union Types](/advanced_syntax/union_types), [Data Types](/reference/data_types), and [Functions](/reference/functions).