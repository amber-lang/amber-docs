This guide provides a step-by-step walkthrough for migrating code from 0.4.0-alpha to 0.5.0-alpha. Current version introduces several breaking changes. This document outlines modifications, explains how to adapt your code to maintain the same behavior, and highlights updated features. In this guide we will cover two main categories of changes:

1. **Language Features**: Changes and updates to the core language syntax and semantics.
2. **Standard Library Updates**: Modifications to existing standard library functions and their usage.

Follow along to ensure a smooth transition to the new version. Let’s get started!

# Introduction of `Int` data type

Since bash natively only supports integers, for portability reasons we recommend using `Int` data type wherever possible. You can [learn more about integers here](/basic_syntax/data_types#integer).

```ab
// Before
let num = 42 // This is `Num`
let num = 12.24 // This is `Num`

// After
let num = 42 // This is `Int`
let num = 12.24 // This is `Num`
```