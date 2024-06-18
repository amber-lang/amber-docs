# Data types

Amber supports 5 data types:
- `Text` - The textual data type. In other programming languages it can also be called "string".
- `Num` - The numeric data type. It's basically any number.
- `Bool` - The boolean data type. It's value can be either `true` or `false`.
- `Null` - The _nothing_ data type.
- `[]` - The array data type.

## Text

`Text` data type is the most basic data type in Amber. It's just a string of characters and is also stored as a string of characters under the hood.

```ab
// `Text` literal:
"Welcome to the jungle"
```

## Number

Under the hood its value is stored as a string of characters - the same way as it's done in Bash. The difference is that Amber applies standard commands to do operations on numbers that support _floating point_ values so that you can simply write operator sign instead.

```ab
// `Num` data type
// Can be an integer
42
// or a floating point
-123.456
```

## Boolean

```ab
// `Bool` data type
true
false
```

Under the hood these values are stored as either `1` or `0`.

## Null

```ab
// `Null` data type
null
```

The most common use of this data type is when you want to declare that some function does not return any value. There is no real world example why someone might want to `null` literal as it serves no purpose right now.

## Array

When dealing with arrays you probably want to define of which data type you want to create the array. In that case simply put the data type inside of the square brackets. For example an array of type `Num` is `[Num]` (in C like languages it would be `Num[]`)

```ab
// `[Num]` data type
[1, 2, 3]
```

If you want to create an empty array, you have to specify the data type that it's going to contain. In order to do that simply pass the type to the inside of the array as if it was a value.

```ab
// Example of a value that represents empty array of text
[Text]
```

> WARNING: Due to the bash's limitations it's pretty hard to implement 2D+ arrays to behave as regular arrays. As of right now Amber does not support nested arrays

```ab
[[Bool]]
// Error: Arrays cannot be nested due to the Bash limitations
```
