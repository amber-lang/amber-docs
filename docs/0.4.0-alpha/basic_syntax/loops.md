Amber supports two types of loop:

- **Infinite** loop that can only be broken with a `break` keyword
- **Iterator** loop that iterates over an array

In the context of loops, you can use the break and continue keywords to help you control the flow.

## Infinite loop

Whatever you put into the infinite loop it will be executed infinitely until you `break` the loop.

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

## Iterator loop

It's the most encouraged way to iterate over an array. The example in the previous chapter can be rewritten to a more concise version:

```ab
let sum = 0
loop i in 0..5 {
	sum += i
}
echo sum
// Outputs: 10
```

Here is another example showing iterator loop in action:

```ab
let files = ["config.json", "file.txt", "audio.mp3"]

loop index, file in files {
	$mv {file} {index}{file}$ failed {
		echo "Failed to rename {file}"
	}
}
```

The above example will iterate through all the files in the array and index them according to their order in the array. As a result, these files will be renamed to `0config.json`, `1file.txt`, and `2audio.mp3`.
