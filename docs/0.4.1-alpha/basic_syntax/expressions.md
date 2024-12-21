Data type literals can be combined using operators, but these operators only function with values of **the same** data type. For example, attempting to add a `Text` value to a `Num` value will result in an error, as this is an unsupported operation. To combine different types of values into a single text, consider using [string interpolation](/basic_syntax/expressions#text-interpolation) instead.

## Addition Operator `+`

Addition can be performed on number, text and array. This operator applied on different data types yields different results:

- `Num` - Arithmetic sum
- `Text` - String concatenation
- `[]` - Array join

```ab
12 + 42 // 54
"Hello " + "World!" // "Hello World!"
[1, 2] + [3, 4] // [1, 2, 3, 4]
```

## Arithmetic Operations

Arithmetic operations can only be used on `Num` data type. Here is the list of all available ones:
- `+` Arithmetic sum
- `-` Substraction
- `*` Multiplication
- `/` Division
- `%` Modulo operation

```ab
((12 + 34) * 9) % 4
```

There is also an unary operator that negates the value stored in [variable](/basic_syntax/variables).

```ab
let value = 12
echo -value // Outputs: -12
```

## Comparison Operations

The equality `==` and inequality `!=` operations can be applied to any data type as long as both sides have the same type.

```ab
"foo" != "bar"
42 == 42
true != false
"equal" == "equal"
```

The remaining comparison operations can only be used on the `Num` data type. These are basically the same as in other modern programming languages: `>`, `<`, `>=`, `<=`.

```ab
42 != 24
```

## Logical Operations

Logical operations can only be used on `Bool` data type. As opposed to C-like family of programming languages we've chosen to go for more Pythonic approach with literal names instead of symbols, as it suits the nature of the scripting programming language better: `and`, `or`, `not`.

```ab
18 >= 12 and not false
```

## Shorthand Operator

The addition operator, along with any arithmetic operator combined with the `=` symbol, can be used to automatically update the value of an existing variable with the calculated result.

```ab
let age = 18
age += 5
echo age // Outputs: 23
```

## Text Interpolation

Text interpolation is a form of embedding various values into the text literal that are combined with their textual representations.

```ab
echo "State: {false}" // Outputs: "State: 0"
// It's possible to also nest interpolation
echo "1 {" 2 {"3"} 4"} 5" // Outputs: "1 2 3 4 5"
```

In the following table we can see how the interpolation behaves for various data types:

Type  |Description          |Before         |After
------|---------------------|---------------|---------
`Text`|Identity             |`"{"Text"}"`   |`"Text"`
`Num` |Identity             |`"{12.34}"`    |`"12.34"`
`Bool`|`1` or `0`           |`"{true}"`     |`"1"`
`[]`  |Spaces between values|`"{[1, 2, 3]}"`|`"1 2 3"`

```ab
let name = "John"
let age = 18
echo "Hi, I'm {name}. I'm {age} years old."
// Outputs: Hi, I'm John. I'm 18 years old
```
