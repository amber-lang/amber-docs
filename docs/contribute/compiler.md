## Compiler informations

Here you will find out how the compiler is structured, how the Amber's parser works and how to write new syntax modules. Let's begin!

# Lexer

Beforehand the code is transformed into an array of tokens that contain information about:
- `word` - the token content
- `pos` - the token location in the document (row, column)
- `start` - the index in the code string where the token starts

```rs
struct Token {
	word: String,
	pos: (usize, usize),
	start: usize
}
```

Tokens are created with lexical rules that are contained in the [src/rules.rs](https://github.com/amber-lang/amber/blob/master/src/rules.rs) file.

Here is the example of how an array of Amber tokens can look like, where strings represent instances of `Token`:
```js
[Token<"let">, Token<"is_alive">, Token<"=">, Token<"true">, ...]
```

# Parser

Parser takes in Tokens and forms an Abstract Syntax Tree that represents the code written in Amber.

## Syntax Module

What transforms tokens into the AST (Abstract Syntax Tree) is a `SyntaxModule`. It can be a `Text` literal, `echo` builtin or `Add` operator. The `SyntaxModule` is a trait that implements:
- `parse` method that parses the module and determines whether or not the corresponding token string represents this sytax module. If otherwise, then a `Failure::Quiet` is returned that means that this is not the correct module to parse the tokens. However if this is the correct module but an error is encountered, then `Failure::Loud` is returned with an error (or warning / info) is returned.
- `new` method that instantiates a new SyntaxModule.
- `syntax_name!("<name of this module>")` that identifies this syntax module with it's name.

The most important method here is `parse` that is defined with the following signature:

```rs
fn parse(&mut self, meta: &mut M) where M: Metadata -> SyntaxResult;
```

Parsing returns a `SyntaxResult` that under the hood is represented as `Result<(), Failure>` . It means that parsing can be finished successfully or it can fail returning a `Failure` object.

Here is an example `SyntaxModule` that parses `Bool` literal:
```rs
impl SyntaxModule<ParserMetadata> for Bool {
    syntax_name!("Bool");

    fn new() -> Self {
        Bool {
            value: false
        }
    }

    fn parse(&mut self, meta: &mut ParserMetadata) -> SyntaxResult {
        let value = token_by(meta, |value| ["true", "false"].contains(&value.as_str()))?;
        self.value = value == "true";
        Ok(())
    }
}
```

## Metadata

You can see that in the `parse` method mentioned above we pass some object called `meta`. This is a metadata parameter of type `ParserMetadata` that inherits from `Metadata` provided by Heraclitus. The structure instance is carried through the parsing process to keep a track of current state. It holds information such as declared variables, functions, boolean parameters telling if current context is within a loop or a function etc. `ParserMetadata` is represented as:

```rs
struct ParserMetadata {
	// Parsing contenxt
	pub context: Context
	// Error / Warning messages
	pub messages: Vec<Message>
	// ...
}
```

You can find out more about this structure in [src/utils/metadata/parser.rs](https://github.com/amber-lang/amber/blob/master/src/utils/metadata/parser.rs) file.

## Parsing flow

The journey starts with parsing the global `Block` that can be located in [src/modules/block.rs](https://github.com/amber-lang/amber/blob/master/src/modules/block.rs) file. The `Block` parses a sequence of statements (`Statement` located in [src/modules/statement/stmt.rs](https://github.com/amber-lang/amber/blob/master/src/modules/statement/stmt.rs)).

### Statement

Statement (`Statement`) is a structure that can represent any `SyntaxModule` that is of statement type. In other words Statement is a wrapper for syntax modules that represents a statement type such as loop, if condition, variable declaration etc.

```rs
struct Statement {
    value: Option<StatementType>
}
```

Here we can see that the `value` field accepts `StatementType` enum that is declared above and represents a syntax module.

```rs
enum StatementType {
    Expr(Expr),
    VariableInit(VariableInit),
    VariableSet(VariableSet),
    IfCondition(IfCondition),
    // ...
}
```

Statement is built of a macro `handle_types!` that can be located in [src/modules/mod.rs](https://github.com/amber-lang/amber/blob/master/src/modules/mod.rs). The syntax modules provided to the macro are parsed sequentially in the order from top to bottom. This means that the parser will first try to match `Import` and then `FunctionDeclaration`. The expression  (`Expr` located in [src/modules/expression/expr.rs](https://github.com/amber-lang/amber/blob/master/src/modules/expression/expr.rs)) is passed as the final parameter to the `handle_types!` macro so that it's parsed at the very end.

```rs
handle_types!(StatementType, [
    Import,
    FunctionDeclaration,
    // ...
    Expr
]);
```

This macro generates a couple of methods for the implementation of Stmt. This macro generates the following functions:
- `fn get_modules(&self) -> Vec<StatementType>` - returns a vector of statements that can later be matched by `parse_match`
- `fn parse_match(&mut self, meta: &mut ParserMetadata, module: StatementType) -> SyntaxResult` - parses and runs `get` method specified later in `Statement` to retrieve the `SyntaxResult`.
- `fn translate_match(&self, meta: &mut TranslateMetadata, module: &StatementType) -> String` - calls `translate` method on each of the syntax modules to translate them into Bash code.
- `fn document_match(&self, meta: &ParserMetadata, module: &StatementType) -> String` - calls `document` method on each of the syntax modules to retrieve a documentation string.'

### Expr

Expression (`Expr` located in [src/modules/expression/expr.rs](https://github.com/amber-lang/amber/blob/master/src/modules/expression/expr.rs)) represents a syntax that is a value of certain type (also referred to as _kind_ because of the Rust's type keyword). For example `1 + 1` is an addition of type `Num`.

```rs
struct Expr {
    value: Option<ExprType>,
    kind: Type
}
```

Analogically to `Statement`, expression also is a wrapper for syntax modules that are of expression type. Instead of `StatementType` enum `ExprType` is declared.

```rs
enum ExprType {
    Bool(Bool),
    Number(Number),
    Text(Text),
    Add(Add),
    Sub(Sub),
    // ...
}
```

Since certain expressions require different approaches to parsing, there is a different macro used here to automate the process. There are a couple of different types of expressions:
- `TernOp` - a ternary operator that is parsed from right to left. It's used for conditional ternary operator.
- `BinOp` - a binary operator that is parsed from left to right.
- `UnOp` - a unary operator that is parsed from left to right, where the symbol expression is on the left side.
- `TypeOp` - a binary expression that is represented as expression followed by operator and then a type. Example of such operator is a cast operator: `12 as Bool`.
- `Literal` - a Literal that doesn't have any directional precedence. Literal is the final group of expression precedence.

The hierarchy of the groups is represented within the `parse_expr!` macro (defined in [src/modules/expression/macros.rs](https://github.com/amber-lang/amber/blob/master/src/modules/expression/macros.rs)). It returns an Expr` that has been parsed. Here is an example usage of this macro:

```rs
let result = parse_expr!(meta, [
    ternary @ TernOp => [ Ternary ],
    range @ BinOp => [ Range ],
    addition @ BinOp => [ Add, Sub ],
    multiplication @ BinOp => [ Mul, Div, Modulo ],
    types @ TypeOp => [ Is, Cast ],
    unops @ UnOp => [ Neg, Not ],
    literals @ Literal => [ Bool, Number, Text ]
]);
```

The pattern that the macro follows can be represented as `<function_group_name> @ <group_type> => [<syntax_modules>]`. The macro is declared as a recurrent relation of functions (groups) that are calling each other (inside of an internal macro `parse_expr_group!`).

```rs
let result = {
	fn _terminal(...) {
		panic!("Please end the recurrence in the group before");
	}
	
	fn literal(...) {
		parse_expr_group!(... {literal, _terminal} ...);
	}
	
	// ...
	
	fn range(...) {
		parse_expr_group!(... {range, addition} ...);
	}
	
	fn ternary(...) {
		parse_expr_group!(... {ternary, range} ...);
	}
	
	return ternary(...);
};
```

The main objective of `parse_expr_group!` is to implement given function's body with appropriate parsing mechanism. If it's a `BinOp` that parses from left to right, then first we parse left expression by calling the lower order group, then we parse the operator, and then the right expression. You can read more on how parsing groups works in the macros file.

