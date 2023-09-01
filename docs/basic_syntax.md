# Basic Syntax

> This language documentation assumes that you understand the basics of programming

Since Amber was designed based on the ECMA script syntax some of the following parts of programming language may be familiar.

Here is a code that displays some features of Amber
```ab
// Define variables
let name = "John"
let age = 30

// Display a greeting
echo "Hello, my name is {name}"

// Perform conditional checks
if age < 18 {
	echo "I'm not an adult yet"
} else {
	echo "I'm an adult"
}

// Loop through an array
let fruits = ["apple", "banana", "cherry", "date"]
echo "My favorite fruits are:"
loop fruit in fruits {
	echo fruit
}
```