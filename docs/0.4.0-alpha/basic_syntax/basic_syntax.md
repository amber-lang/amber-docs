> This documentation assumes a foundational understanding of programming concepts.

Since Amber is designed with a syntax inspired by ECMAScript, some aspects of the programming language may appear familiar.

> We suggest to take a look on [the examples](https://docs.amber-lang.com/by_example/examples) we provide to see real use cases written in Amber.

Here, we may notice an echo built-in function, which performs the same operation as Bash’s echo command.

Here is a code snippet that illustrates certain features of Amber. We will provide detailed explanations for each of these features and cover additional content in the forthcoming chapters.

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
for fruit in fruits {
    echo fruit
}
```
