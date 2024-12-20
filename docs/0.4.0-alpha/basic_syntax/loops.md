Amber supports two types of loop:
- **Infinite** loop that can only be broken with a `break` keyword
- **Iterator** loop that iterates over an array

Within loops, the `break` and `continue` keywords can be used to control the flow of execution effectively.

## Infinite Loop

An infinite loop executes its code repeatedly without end until a `break` statement is used to exit the loop.

```ab
let i = 0
let sum = 0
loop {
	if i == 5:
		break
	i += 1
	sum += i
}
echo sum
// Outputs: 15
```

## Iterator Loop

It's the most encouraged way to iterate over an array. The example in the previous chapter can be rewritten to a more concise version:

```ab
let sum = 0
for i in 0..5 {
	sum += i
}
echo sum
// Outputs: 10
```

Here is another example showing iterator loop in action:

```ab
let files = ["config.json", "file.txt", "audio.mp3"]

for index, file in files {
	$ mv {file} {index}{file} $ failed {
		echo "Failed to rename {file}"
	}
}
```

The above example will iterate through all the files in the array and index them according to their order in the array. As a result, these files will be renamed to `0config.json`, `1file.txt`, and `2audio.mp3`.
