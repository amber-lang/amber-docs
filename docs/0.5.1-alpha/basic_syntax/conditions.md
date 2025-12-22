There are three ways to perform conditional logic:
- **If Statement** - This is a regular if statement that can be used anywhere
- **If Chain** - This is _syntactical sugar_ for pesky if-else chained together.
- **Ternary Expression** - This is a way to represent conditional logic within an expression.

## If Statement

The good old if statement that one may recognize from other modern programming languages:

```ab
if age >= 16 {
    echo "Welcome"
}
```

Let's add an `else` branch to the mix

```ab
if age >= 16 {
    echo "Welcome"
} else {
    echo "Entry not allowed"
}
```

In Amber, a simple if condition can often feel unnecessarily bulky. To address this, Amber allows the use of a `:` symbol to replace a full block when you only need to write a single statement. This feature is especially useful for handling multiple conditions with concise, single-statement actions.

```ab
if age >= 16: echo "Welcome"
else: echo "Entry not allowed"

// Or

if age >= 16:
    echo "Welcome"
else:
    echo "Entry not allowed"
```

## If Chain

The if-chain is a streamlined approach for handling a sequence of if-else conditions. Here’s an example to illustrate this concept:

```ab
if {
    drink == "water" {
        echo "Have a natural, mineralized water"
    }
    drink == "cola" {
        echo "Here is your fresh cola"
    }
    else {
        echo "Sorry, we have none of that"
    }
}

// Compact alternative:

if {
    drink == "water": echo "Have a natural, mineralized water"
    drink == "cola": echo "Here is your fresh cola"
    else: echo "Sorry, we have none of that"
}
```

Instead of using the traditional nested if-else structure:

```ab
if drink == "water" {
    echo "Have a natural, mineralized water"
} else {
    if drink == "cola" {
        echo "Here is your fresh cola"
    } else {
        echo "Sorry, we have none of that"
    }
}
```

The if-chain offers a cleaner, more concise, and readable way to handle multiple conditions.

## Ternary Expression {#then}

Ternary expressions are ideal for quickly assigning values based on simple conditions. They provide a compact and efficient alternative to traditional conditional statements. Here’s an example:

```ab
let candy = count > 1
    then "candies"
    else "candy"

echo "I have {count} {candy}"
```

To achieve an even more compact form, the ternary expression can be written inline when the expressions involved are concise.

```ab
let candy = count > 1 then "candies" else "candy"
```

This approach makes code concise and readable, especially for straightforward conditional assignments.
