## `date_posix`

```ab
import { date_posix } from "std/date.ab"
```

```ab
pub fun date_posix(format: Text = "", date: Text = "", utc: Bool = false): Text ? 
```

EXPERIMENTAL
Format a date with a special format
If no date is specified, the current date is used
If no format is specified, "%FT%T%Z" format is used
For more info about format type "man date" on your shell or go to https://www.gnu.org/software/coreutils/date
Format :
%%     a literal %
%a     locale's abbreviated weekday name (e.g., Sun)
%A     locale's full weekday name (e.g., Sunday)
%b     locale's abbreviated month name (e.g., Jan)
%B     locale's full month name (e.g., January)
%c     locale's date and time (e.g., Thu Mar  3 23:05:25 2005)
%C     century; like %Y, except omit last two digits (e.g., 20)
%d     day of month (e.g., 01)
%D     date; same as %m/%d/%y
%e     day of month, space padded; same as %_d
%F     full date; like %+4Y-%m-%d
%g     last two digits of year of ISO week number (see %G)
%G     year of ISO week number (see %V); normally useful only with %V
%h     same as %b
%H     hour (00..23)
%I     hour (01..12)
%j     day of year (001..366)
%k     hour, space padded ( 0..23); same as %_H
%l     hour, space padded ( 1..12); same as %_I
%m     month (01..12)
%M     minute (00..59)
%n     a newline
%N     nanoseconds (000000000..999999999)
%p     locale's equivalent of either AM or PM; blank if not known
%P     like %p, but lower case
%q     quarter of year (1..4)
%r     locale's 12-hour clock time (e.g., 11:11:04 PM)
%R     24-hour hour and minute; same as %H:%M
%s     seconds since the Epoch (1970-01-01 00:00 UTC)
%S     second (00..60)
%t     a tab
%T     time; same as %H:%M:%S
%u     day of week (1..7); 1 is Monday
%U     week number of year, with Sunday as first day of week (00..53)
%V     ISO week number, with Monday as first day of week (01..53)
%w     day of week (0..6); 0 is Sunday
%W     week number of year, with Monday as first day of week (00..53)
%x     locale's date representation (e.g., 12/31/99)
%X     locale's time representation (e.g., 23:13:48)
%y     last two digits of year (00..99)
%Y     year
%z     +hhmm numeric time zone (e.g., -0400)
%:z    +hh:mm numeric time zone (e.g., -04:00)
%::z   +hh:mm:ss numeric time zone (e.g., -04:00:00)
%:::z  numeric time zone with : to necessary precision (e.g., -04, +05:30)
%Z     alphabetic time zone abbreviation (e.g., EDT)

By default, date pads numeric fields with zeroes.  The following optional flags may follow '%':

-      (hyphen) do not pad the field
_      (underscore) pad with spaces
0      (zero) pad with zeros
+      pad with zeros, and put '+' before future years with >4 digits
^      use upper case if possible
#      use opposite case if possible



You can check the original tests for code examples:
* [date_posix.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/date_posix.ab)

## `now`

```ab
import { now } from "std/date.ab"
```

```ab
pub fun now(): Num 
```

Return current timestamp (seconds since the Epoch (1970-01-01 00:00 UTC))



You can check the original tests for code examples:
* [now.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/now.ab)

## `date_add`

```ab
import { date_add } from "std/date.ab"
```

```ab
pub fun date_add(add: Text, date: Text = "", utc: Bool = false): Text ? 
```

EXPERIMENTAL
Add value to date.
If no date is specified, the current date is used
Ex : date_add("+3 days")
You can use :
(+/-)
years
months
days
hours
minutes
seconds



You can check the original tests for code examples:
* [date_add.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/date_add.ab)

EXPERIMENTAL


Compare 2 date

Return 1 if date_a is after date_b

Return 0 if date_a and date_b is the same

Return -1 if date_b is after date_a

If date_b is not provided, current date will be used

## `date_compare`

```ab
import { date_compare } from "std/date.ab"
```

```ab
pub fun date_compare(date_a: Text, date_b: Text = "", utc: Bool = false): Num ? 
```

You can check the original tests for code examples:
* [date_compare.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/date_compare.ab)

