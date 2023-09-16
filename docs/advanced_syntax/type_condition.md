# Type condition

Sometimes when building generic functions one could find it very convenient to additionally validate if passed value is one of the data types that are supported.

```ab
fun getObject(value) {
	if {
		value is Text: getByName(value)
		value is Num: getById(value)
	}
}
```