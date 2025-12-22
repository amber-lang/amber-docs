In this guidebook we will learn how the compiler works and how to contribute to it by adding new features or fixing bugs. We will cover the CLI interface, the compiler architecture, how to create builtins, the standard library and tests.

# CLI Interface

The entire CLI interface is defined in [`main.rs`](src/main.rs), using [`clap`](https://crates.io/crates/clap) for argument parsing. The `main` function initializes the `AmberCompiler` struct (defined in [`src/compiler.rs`](src/compiler.rs)), which serves as the main driver for the compilation process.

Available subcommands include:
*   `Run`: Compiles and executes an Amber script immediately.
*   `Build`: Compiles an Amber script to a Bash script.
*   `Eval`: Executes a snippet of Amber code passed as a string.
*   `Check`: parses and type-checks the code without generating output.
*   `Docs`: parsing the code and generating documentation for it.
*   `Test`: Runs tests defined in the Amber project.
*   `Completion`: Generates shell completion scripts.

When a command is executed, `main.rs` configures the `AmberCompiler` with the appropriate options and calls its methods (e.g., `compile()`, `execute()`, `generate_docs()`) to perform the requested task.

## Compiler

Compiler consists of:
- `src/compiler.rs` - Main entry point for the compiler
- `src/rules.rs` - Syntax rules that are used by Heraclitus framework to correctly output tokens
- `src/utils` - Contains parsing environments, caches, contexts and Amber's implementations of metadata
- `src/modules` - Syntax modules that parse Amber syntax and also handle the translation process
- `src/translate` - Contains a definition of `TranslateModule` trait that is used to translate modules the previously mentioned `modules`

`AmberCompiler` struct by itself is just a bootstrapper for all the syntax modules. Here we will learn some practical facts about compiler. For a more in-depth guide, visit [our compiler guide](/contribute/compiler).

## Parser & Tokenizer

Thanks to [`heraclitus`](https://github.com/amber-lang/Heraclitus), we can use simple abstractions to go through tokens.

Please open any syntax module code file, and find a line that says: 
```rs
impl SyntaxModule<ParserMetadata> for MODULE_NAME_HERE
```

It will have a `parse()` function, where all the magic happens. You can either dig into the code yourself or look at the example below to understand how it works.

begin[details] Example parser

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

end[details]

## Parsing Logic & Failures

The parsing process in Heraclitus revolves around the `SyntaxResult` type, which is an alias for `Result<(), Failure>`. The `Failure` type is critical for control flow and offers two distinct error modes:

*   **Quiet Error**: which means "This is not the syntax validation you are looking for."
    *   Returned when a syntax module doesn't match the current code (e.g., looking for a `let` keyword but finding `if`).
    *   The compiler catches this error and backtracks to try the next available syntax module.
*   **Loud Error**: which means "This IS the correct module, but the code is wrong."
    *   Returned when the compiler is certain it's parsing the correct construct but encounters invalid syntax (e.g., missing semicolon after variable declaration).
    *   This error halts the entire compilation process and reports a failure to the user.

## Heraclitus Functions

Heraclitus provides a set of helper functions and macros to streamline parsing and error reporting:

*   `token(meta, "keyword")`: Attempts to consume a specific text token. Returns a **Quiet** error if the token doesn't match.
*   `token_by(meta, pattern)`: Matches a token based on a boolean predicate function. Returns a **Quiet** error failure.
*   `syntax(meta, &mut submodule)`: Recursively parses a nested syntax module. It propagates whatever error the submodule returns (Quiet or Loud).
*   `error!(meta, tok, ...)`: A macro that halts compilation with a **Loud** error at the position of provided token.
*   `error_pos!(meta, pos => ...)`: A macro that halts compilation with a **Loud** error at a *specific* position which can be more complex than single token, allowing for detailed error messages with context.

## Translator

Same as parser open a syntax module, and find a line that says `impl TranslateModule for MODULE_NAME_HERE` and that should contain a `translate` function.

Same as before, you can either dig into the code you opened or look at the example below.

begin[details] Example translator

**Important: this is pseudo code. Its purpose is to demonstrate how it should look like.**

```rs
// This will translate `1 + 2` into `(( 1 + 2 ))`
fn translate() -> String {

    // self.digit_1 and self.digit_2 is set earlier by the parser
    format!("(( {} + {} ))", self.digit_1, self.digit_2)
}
```

end[details]

Basically, the `translate()` method should return a `FragmentKind` which represents a piece of the compiled shell script.

## Fragments

Amber compiles to shell script fragments. The `FragmentKind` enum encapsulates these different types of output. You can find available fragment modules in `src/translate/fragments/`. Common ones include:

*   `RawFragment` (`raw`): Represents a raw string of shell code (e.g., `echo "hello"`).
*   `BlockFragment` (`block`): Represents a block of code, often used for bodies of functions or loops.
*   `ListFragment` (`list`): A list of fragments properly joined together.
*   `SubprocessFragment` (`subprocess`): For command substitutions `$(...)`.
*   `VarExprFragment` / `VarStmtFragment`: For handling variable usage and definition.

To construct these fragments easily, Amber provides helper macros:

*   `raw_fragment!("echo {}", value)`: Creates a `RawFragment` with formatted text.
*   `fragments!(a, b, c)`: joins multiple fragments into a `ListFragment`.

# Creating Builtins

In this guide we will see how to create a basic built-in function that in Amber syntax presents like:

```ab
example "Hello World"
```

And compiles to:

```sh
echo "Hello World"
```

For a real example based on this guide you can check the [`cd` builtin](https://github.com/amber-lang/amber/blob/master/src/modules/builtin/cd.rs) that is also Failable.

begin[details] Let's start!

Create a `src/modules/builtin/builtin.rs` file with the following content:


```rs
// Import the core Heraclitus framework traits and types required for defining syntax modules
use heraclitus_compiler::prelude::*;
// Import the Expression module to parse arguments as expressions
use crate::modules::expression::expr::Expr;
// Import the TranslateModule trait to define how this syntax translates to shell code
use crate::translate::module::TranslateModule;
// Import metadata structures:
// - `ParserMetadata`: Tracks parsing state (declared variables, functions, warnings, current scope).
// - `TranslateMetadata`: Tracks translation state (indentation level, silent/eval modes).
use crate::utils::{ParserMetadata, TranslateMetadata};
// Import DocumentationModule (required trait, even if unused for internal builtins)
use crate::docs::module::DocumentationModule;
// Import the `raw_fragment` macro for easy construction of shell script fragments
use crate::raw_fragment;

// This struct represents the parsed state of our builtin.
// It holds the data extracted during parsing.
#[derive(Debug, Clone)]
pub struct Example {
    // We expect this builtin to take one argument, which is an expression.
    value: Expr,
}

// Implement the SyntaxModule trait to define how to parse this construct.
impl SyntaxModule<ParserMetadata> for Example {
    // Defines the name used for this module in compiler debug logs and traces.
    syntax_name!("Example");

    // Returns a default instance of the struct.
    fn new() -> Self {
        Example {
            value: Expr::new()
        }
    }

    // The core parsing logic.
    // Returns `SyntaxResult`, which is `Result<(), Failure>`.
    // See "2.1.1. Parsing Logic & Failures" for details on Quiet vs Loud errors.
    fn parse(&mut self, meta: &mut ParserMetadata) -> SyntaxResult {
        // 1. Match the keyword "example".
        // `token(...)` attempts to consume the specific token. If it fails, it returns a `Quiet` error.
        // The `?` operator propagates this error, allowing the compiler to try other modules.
        token(meta, "example")?;

        // 2. Parse the argument.
        // Once we've matched the keyword "example", we are committed to this syntax.
        // `syntax(...)` will return either a `Loud` or `Quiet` error from the submodule.
        syntax(meta, &mut self.value)?;
        Ok(())
    }
}

// Implement TypeCheckModule to validate types before translation.
impl TypeCheckModule for Example {
    fn typecheck(&mut self, meta: &mut ParserMetadata) -> SyntaxResult {
        // 1. Recursively typecheck the argument expression first.
        self.value.typecheck(meta)?;
        
        // 2. Validate that the argument is of the expected type (Text).
        if self.value.get_type() != Type::Text {
            let pos = self.value.get_position();
            // `error_pos!` creates a formatted `Loud` error message pointing to the specific
            // location in the user's code.
            return error_pos!(meta, pos => {
                message: "Builtin function `example` can only be used with values of type Text"
            });
        }
        Ok(())
    }
}

// Implement TranslateModule to convert the AST into the target shell script.
impl TranslateModule for Example {
    fn translate(&self, meta: &mut TranslateMetadata) -> FragmentKind {
        // 1. Translate the argument expression into a shell string.
        let value = self.value.translate(meta);
        
        // 2. Construct the final shell command.
        // `raw_fragment!` creates a code fragment that is inserted directly into the output script.
        raw_fragment!("echo {}", value)
    }
}

// Implement DocumentationModule.
// For internal builtins not exposed in standard docs, we return an empty string.
impl DocumentationModule for Example {
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
// 1. Import your new module
use crate::modules::builtin::builtin::Example;

// 2. Add it to the StmtType enum
// This allows the AST (Abstract Syntax Tree) to hold your new construct.
pub enum StmtType {
    // ...
    Example(Example)
}

// 3. Register it in the parsing loop
impl SyntaxModule<ParserMetadata> for Statement {
    // ...
    fn parse(&mut self, meta: &mut ParserMetadata) -> SyntaxResult {
        // `parse_statement!` iterates through the provided modules in order.
        // The order determines precedence (though keywords usually disambiguate).
        parse_statement!([
            // ...
            Example,
            // ...
        ], |module, cons| {
            // ...
        })
    }
}
```

end[details]

Don't forget to add a test in the [`validity`](https://github.com/amber-lang/amber/tree/master/src/tests/validity) folder and to add the new builtin to the list of the [reserved keywords](https://github.com/amber-lang/amber/blob/master/src/modules/variable/mod.rs#L16).

# Standard Library

The Amber Standard Library (stdlib) is a collection of essential modules written in Amber itself, located in the `src/std` directory. It provides foundational capabilities that are available to every Amber program.

Modules include:
*   **Text** (`text.ab`): String manipulation functions (splitting, joining, trimming).
*   **Math** (`math.ab`): Mathematical constants and functions.
*   **Array** (`array.ab`): Utilities for handling arrays and lists.
*   **FS** (`fs.ab`): File system operations (reading, writing, checking existence).
*   **Env** (`env.ab`): Environment variable access and manipulation.
*   **Date** (`date.ab`): Date and time utilities.
*   **Http** (`http.ab`): Basic HTTP request capabilities.
and more...

Every function in the standard library is rigorously tested. You can find these tests in `src/tests/stdlib/`. When adding new standard library features, you must add corresponding tests to ensure correctness and prevent regressions.

# Tests

Amber uses `cargo test` for testing:
- `validity` - the validity of the compiler output (`src/tests/validity/`)
- `erroring` - the error handling of the compiler (`src/tests/erroring/`)
- `stdlib` - the standard library functions (`src/tests/stdlib/`)

For every test written in Amber there are 3 ways to check the result following this order:

* if a `// Output` comment on top that include the output to match
* `Succeeded` word will be matched against the test output

Tests will be executed without recompilation. Amber will load the scripts and verify the output in the designated file to determine if the test passes.

Some tests require additional setup, such as those for `download` that needs Rust to load a web server. These functions require special tests written in Rust that we can find in `src/tests/stdlib.rs` file.

begin[details] Let's write a simple test

```rs
#[test]
fn prints_hi() {
    let code = "
        echo \"hi!\"
    ";
    test_amber(code, "hi!", TestOutcomeTarget::Success);
}
```

end[details]
