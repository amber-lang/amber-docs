# Nameof

Sometimes you may want to write some more advanced command that requires a mangled variable name. This value can be retrieved using the provided `nameof` keyword. For example this gives you the ability to do things like:

```ab
let variable = null

unsafe ${nameof variable}=12$
// Which is the same as:
let variable = 12
```