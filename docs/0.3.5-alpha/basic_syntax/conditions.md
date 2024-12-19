There are three ways to perform conditional logic:
- **If Statement** - This is a regular if statement that can be used anywhere
- **If Chain** - This is _syntactical sugar_ for pesky if-else chained together.
- **Ternary Expression** - This is a way to represent conditional logic within an expression.

## If Statement

The good ol' if statement that you may recognize from other modern programming languages:

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

Well... you may notice that this short and simple "if" condition takes up a lot of space. In Amber, there is a rule that allows you to use a `:` symbol where you intend to write only one statement, wherever you can write a block of code. This can be handy when you want to perform multiple conditions with a single statement each.

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

The if-chain is a simplification technique for a sequence of if-else blocks. Allow me to illustrate this concept.

You can express it as follows:

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

// Alternatively, as previously mentioned:

if {
	drink == "water": echo "Have a natural, mineralized water"
	drink == "cola": echo "Here is your fresh cola"
	else: echo "Sorry, we have none of that"
}
```

Instead of the nested if-else structure:

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

This approach provides a more concise and readable structure for handling multiple conditions.

## Ternary Expression

Imagine needing to swiftly determine a value to assign based on a straightforward condition. This is precisely where ternary expressions prove invaluable. Here's a concise example:

```ab
let candy = count > 1
	then "candies"
	else "candy"

echo "I have {count} {candy}"
```

The ternary expression can of course be inlined when the expressions inside are short.

```ab
let candy = count > 1 then "candies" else "candy"
```
