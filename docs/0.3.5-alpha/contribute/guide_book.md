# Overview
Amber consists of the following layers:

1. [CLI Interface](#1-cli-interface)
2. [Compiler](#2-compiler)
   1. [Parser & tokenizer](#21-parser--tokenizer)
   2. [Translator](#22-translator)
   2. [Built-in](#23-built-in-creation)
3. [Runtime libraries](#3-runtime-libraries)
   1. [`stdlib`](#31-stdlib)
4. [Tests](#4-tests)

## 1. CLI Interface
All CLI interface is in [`main.rs`](src/main.rs). [`clap`](https://crates.io/crates/clap) handles argument parsing.

## 2. Compiler
Compiler consists of:
- [`compiler.rs`](src/compiler.rs) - Main entry point for the compiler
- [`rules.rs`](src/rules.rs) - Syntax rules that are used by Heraclitus framework to correctly output tokens
- [`utils`](src/utils.rs) - Contains parsing environments, caches, contexts and Amber's implementations of metadata
- [`modules`](src/modules) - Syntax modules that parse Amber syntax and also handle the translation process
- [`translate`](src/translate) - Contains a definition of Translate Module trait that is used to translate modules the previously mentioned `modules`

`AmberCompiler` struct by itself is just a bootstrapper for all the syntax modules.

### 2.1. Parser & tokenizer
Thanks to [`heraclitus`](https://github.com/amber-lang/Heraclitus), we can use simple abstractions to go through tokens.

Please open any syntax module code file, and find a line that says: `impl SyntaxModule<ParserMetadata> for MODULE_NAME_HERE`

It will have a `parse()` function, where all the magic happens. You can either dig into the code yourself or look at the example below to understand how it works.

<details>
<summary>Example parser</summary>

**Important: this is pseudo code. Its purpose is to demonstrate how it should look like.**

```rs
// This code parses the following: `1 + 2`
fn parse(meta: &mut ParserMetadata) -> SyntaxResult {
    let digit_1 = meta.get_current_token();     // gets the text (as an Option)
    token(meta, "+")?;                          // matches that there is a "+" and skips it
    let digit_2 = meta.get_current_token();

    self.digit_1 = digit_1.unwrap();
    self.digit_2 = digit_2.unwrap();

    Ok(())
}
```
</details>

### 2.2. Translator
Same as parser open a syntax module, and find a line that says `impl TranslateModule for MODULE_NAME_HERE` and that should contain a `translate` function.

Same as before, you can either dig into the code you opened or look at the example below.

<details>
<summary>Example parser</summary>

**Important: this is pseudo code. Its purpose is to demonstrate how it should look like.**

```rs
// This will translate `1 + 2` into `(( 1 + 2 ))`
fn translate() -> String {

    // self.digit_1 and self.digit_2 is set earlier by the parser
    format!("(( {} + {} ))", self.digit_1, self.digit_2)
}
```
</details>

Basically, the `translate()` method should return a `String` for the compiler to construct a compiled file from all of them. If it translates to nothing, you should output an empty string, like `String::new()`

### 2.3. Creating built-ins

In this guide we will see how to create a basic built-in function that in Amber syntax presents like:
```sh
example "Hello World"
```
And compiles to:
```sh
echo "Hello World"
```

For a real example based on this guide you can check the [https://github.com/amber-lang/amber/blob/master/src/modules/builtin/cd.rs](`cd` builtin) that is also Failable.

<details>
<summary>Let's start!</summary>

Create a `src/modules/builtin/builtin.rs` file with the following content:


```rs
// This is the prelude that imports all necessary stuff of Heraclitus framework for parsing the syntax
use heraclitus_compiler::prelude::*;
// Expression module that can parse expressions
use crate::modules::expression::expr::Expr;
// Expression module to define if the builtin is failable
// use crate::modules::condition::failed::Failed;
// Translate module is not included in Heraclitus prelude as it's leaving the backend up to developer
use crate::translate::module::TranslateModule;
// Metadata is the object that is carried when iterating over syntax tree.
// - `ParserMetadata` - it carries the necessary information about the current parsing context such as variables and functions that were declared up to this point, warning messages aggregated up to this point, information whether this syntax is declared in a loop, function, main block, unsafe scope etc.
// `TranslateMetadata` - it carries the necessary information for translation such as wether we are in a silent scope, in an eval context or what indentation should be used.
use crate::utils::{ParserMetadata, TranslateMetadata};
// Documentation module tells compiler what markdown content should it generate for this syntax module. This is irrelevent to our simple module so we will just return empty string.
use crate::docs::module::DocumentationModule;

// This is a declaration of your built-in. Set the name accordingly.
#[derive(Debug, Clone)]
pub struct Example {
    // This particular built-in contains a single expression
    value: Expr,
    // failed: Failed // You need this if you want that is failable
}

// This is an implementation of a trait that creates a parser for this module
impl SyntaxModule<ParserMetadata> for Echo {
    // Here you can define the name of this built-in that will displayed when debugging the parser
    syntax_name!("Example");

    // This function should always contain the default state of this syntax module
    fn new() -> Self {
        Echo {
            value: Expr::new()
            // failed: Failed::new() // You need this if you want that is failable
        }
    }

    // This is a function that will parse this syntax module "Built-in". It returns SyntaxResult which is a `Result<(), Failure>` where the `Failure` is an Heraclitus primitive that returns an error. It can be either:
    - `Quiet` - which means that this is not the right syntax module to parse
    - `Loud` - which means that this is the correct syntax module but there is some critical error in the code that halts the entire compilation process
    fn parse(&mut self, meta: &mut ParserMetadata) -> SyntaxResult {
        // `token` parses a token `builtin` which is basically a command name for our built-in.
        // If we add `?` in the end of the heraclitus provided function - this function will return a quiet error.
        // Set the name accordingly.
        token(meta, "example")?;
        // `syntax` parses the `Expr` expression syntax module
        syntax(meta, &mut self.value)?;
        // syntax(meta, &mut self.failed)?; // You need this if you want that is failable
        // This terminates parsing process with success exit code
        Ok(())
    }
}

// Here we implement the translator for the syntax module. Here we return valid Bash or sh code. Set the name accordingly.
impl TranslateModule for Example {
    // Here we define the valid translate function. The String returns the current line.
    fn translate(&self, meta: &mut TranslateMetadata) -> String {
        // Here we run the translate function on the syntax module `Expr`
        let value = self.value.translate(meta);
        // Here we return the Bash code
        format!("echo {}", value)
    }
}

// Here we implement what should documentation generation render (in markdown format) when encounters this syntax module. Since this is just a simple built-in that does not need to be documented, we simply return an empty String.
impl DocumentationModule for Expr {
    fn document(&self, _meta: &ParserMetadata) -> String {
        String::new()
    }
}
```

Now let's import it in the main module for built-ins `src/modules/builtin/mod.rs`

```rs
pub mod echo;
pub mod nameof;
// ...
pub mod builtin;
```

Now we have to integrate this syntax module with either statement `Stmt` or expression `Expr`. Since this is a statement module, we'll add it to the list of statement syntax modules. Let's modify `src/modules/statement/stmt.rs`:

```rs
// Let's import it first
use crate::modules::builtin::builtin::Example;

// Let's add it to the statement type enum
pub enum StatementType {
    // ...
    Example(Example)
}

// Now, let's add it to the list of statement syntax modules, arranged in the order of parsing precedence:
impl Statement {
    handle_types!(StatementType, [
        // ...
        Example,
        // ...
    }

    // ...
}
```
</details>

Don't forget to add a test in the [https://github.com/amber-lang/amber/tree/master/src/tests/validity](`validity`) folder and to add the new builtin to the list of the [reserved keywords](https://github.com/amber-lang/amber/blob/master/src/modules/variable/mod.rs#L16).

## 3. Runtime libraries
### 3.1. `stdlib`

`stdlib` is written in Amber. See [`main.ab`](src/std/main) for the code. All `stdlib` functions must be covered by a [test](#4-tests)

## 4. Tests
Amber uses `cargo test` for tests. `stdlib` and `validity` tests usually work by executing amber code and checking its output.

We have [`validity tests`](src/tests/validity.rs) to check if the compiler outputs a valid bash code, [`stdlib tests`](src/tests/stdlib.rs) and [`CLI tests`](src/tests/cli.rs).

The majority of `stdlib` tests are written in pure Amber in the folder [`tests/stdlib`](src/tests/stdlib). 
For every test there are 3 ways to check the result following this order:

* if a `// Output` comment on top that include the output to match
* if there is a `*.output.txt` file that contains the expected output
* "Succeded" will used as default value if the previous cases are not satisfied

Tests will be executed without recompilation. Amber will load the scripts and verify the output in the designated file to determine if the test passes.
The `validity` tests are full in Amber in their folder the folder [`tests/validity`](src/tests/validity).

Some tests require additional setup, such as those for `download` that needs Rust to load a web server. These functions require special tests written in Rust that we can find in [`stdlib tests`](src/tests/stdlib.rs) file. The designated directory where to store the amber files is located in [`tests/stdlib/no_output`](src/tests/stdlib/no_output). These tests do not coexist with `.output.txt` files hence the name of this folder.

<details>
<summary>Let's write a simple test</summary>

```rs
#[test]
fn prints_hi() {
    let code = "
        echo \"hi!\"
    ";
    test_amber!(code, "hi!");
}
```
</details>