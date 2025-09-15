This guide provides a step-by-step walkthrough for migrating code from 0.4.0-alpha to 0.5.0-alpha. The current version introduces several breaking changes. This document outlines the modifications, explains how to adapt your code to maintain the same behavior, and highlights updated features. In this guide we will cover two main categories of changes:
1. **Language Features**: Changes and updates to the core language syntax and semantics.
2. **Standard Library Updates**: Modifications to existing standard library functions and their usage.

Follow along to ensure a smooth transition to the new version. Let’s get started!

# New integer `Int` data type

Previously, Amber supported only the Num type. This release introduces `Int`, which maps to Bash’s native integer arithmetic. To support this, we’ve updated parts of the language syntax.

## Array subscript

Expression in the subscript can only be of type `Int`.

```ab
// Before
arr[12.0] // Ok; although fails

// After
arr[12.0] // Error: array subscript can only be an integer
```

## Range

Expressions in range operator can only be of type `Int`.

```ab
// Before
10.0..15.0 // OK; although fails

// After
10.0..15.0 // Error: range can only be applied on integers
```

## Iterator

Iterator variable in for-loop is now of type `Int`.

```ab
// Before
for i, item in items {} // `i` is a `Num`

// After
for i, item in items {} // `i` is an `Int`
```

## Exit

Exit builtin now accepts only expressions of type `Int`.

```ab
// Before
exit 2.0 // Ok; although fails

// After
exit 2.0 // Error: exit accepts only `Int` type
```

## Status

Status builtin now returns value of type `Int`.

```ab
// Before
status // Returns `Num` value

// After
status // Returns `Int` value
```

# Redesigned `std/date`

The standard library’s Date module has been completely overhauled. We improved how its functions compose, removed obsolete ones, and repurposed others. The complete list of changes is below.

| Old Name | New Name | Description |
|:--|:--|:--|
| `date_posix` | `date_from_posix` | Converts textual representation in a default `YYYY-MM-DD HH:MM:SS` format to [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) |
| *new* | `date_format_posix` | Converts [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) to a textual representation. |
| `date_add` | `date_add` | Adds time to passed date. |
| *new* | `date_sub` | Subtracts time to passed date. |
| *removed* | `date_compare` | Compares two dates and returns value of a sign function |
