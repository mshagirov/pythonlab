---
layout : page
title: Numerical and Logical Operations 
permalink: /introduction/05
---

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript">
</script>

### Infinity

For applications that require using *infinity*, Python allows creating `float`
values that represent positive and negative infinity.

- Positive infinity: `float("inf")`,
- negative infinity: `float("-inf")`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(float("inf"))
</script></pre></div>

> `inf` is usually used to initialise values or to handle special cases for
various algorithms. E.g., to find a maximum value, you may start with `-inf`
and compare you numbers to it. Using `-inf` in the initial step will ensure
that your program will update the current maximum value since any number
is larger than `-inf`.

### Exponentials

Python also has a built-in operation `**` for computing exponentials. E.g.,
`2**4` computes $$2^4$$.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(2**4)
</script></pre></div>

### In-place Updates (Augmented Assignments)

Python also provides shorthand notation for updating values of numerical variables.
These type of operations are called *in-place updates* or *augmented assignments*.

- *Increment*: `a += b` is equivalent to `a = a + b`, add then assign.
- *Decrement*: `a -= b` is equivalent to `a = a - b`, substract then assign.

These operations, first evaluate an expression on the right side of `=` using the
old value of a variable `a`, then assign the result to update `a` in-place.

Additionally, Python also supports the following:

- `a *= b` is equivalent to `a = a * b`,
- `a /= b` is equivalent to `a = a / b`.

These assignments are not limited to simple operations and can be used with more
complex function calls.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = 1
print(x)

x += (x + 1)**3
'''
Equivalent to
   temp_val = x + (x + 1)**3
   x = temp_val
'''
print(x)

x /= 2
print(x)
</script></pre></div>

### Formatting Numbers

For easier entry and readability, Python also allows entering numbers with
`_` separator. For instance, to enter 1,000,000 you could either use
`1000000` or `1_000_000`, and the latter is easier to read. You can put `_` between
any two numeric characters including `float` numbers.

It is also common to use *scientific notation* for entering very large or
very small numbers.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
large = 1_000_000_000
print(f"large = {large}")

small = 1 / large
print(f"small = {small}") # automatically uses sci notation
</script></pre></div>

When printing or reading numbers on the screen we "see" the representation of
the number, such as using scientific notation for very small or large numbers.
You can also set your preferred representation using the *format specification*
when formatting strings with f-strings and `format` method.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
large = 1_000_000_000
print(f"large = {large :1.2e}")

small = 1 / large
print(f"small = {small :.9f}")

print(f"small = {small :18.12f}")
print( "small = " + format(small, "018.12f"))
</script></pre></div>

In the above, `f` and `e`, in `1.2e` or in `018.12f`, are types.

- `f` and `F` refer to `float`, and
- `e` and `E` to scientific notation.

Another common type to use is the general type `g` which
uses both scientific and floating point (`float`) representations depending on
the value of the number.

Formatting can also be used with other types, e.g., to specify the width of
the resulting string representation of the value.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(f"{' Hi! ':-^15}")
</script></pre></div>

Here we are formatting value of a string `' Hi! '`, `^` is center alignment, and
`-` is the filler and can be any character, `15` specifies the width.

> See the
[official format specification documentation](https://docs.python.org/3/library/string.html#format-specification-mini-language){:target="_blank"}
to see more examples and details about string formatting.

### Comparison and Logical Operations

*Comparison expressions* use logical operators to test equality or compare
values and result in `bool` values, `True` or `False`. These types of expressions
are also known as *Boolean expressions*. Python defines the following
comparison *operators* to be used in Boolean expressions,

- `==` : equality test.
- `!=` : not equal, returns `True` if values are not equal.
- `>`, `<`: larger than, and less than.
- `>=`: larger than or equal, and
- `<=`: less than or equal.

Additionally, built-in logical operators `and`, `or`, `not`, and `in` can be
used to compute more complex Boolean expressions.

- `A and B` : `True` if both A and B are `True`, `False` otherwise.
- `A or B` : `True` if either A or B are `True`, `False` if both A and B `False`.
- `not EXPRESSION`: negates a Boolean expression, e.g., `not True` is `False`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x, y = 21, 42
print(x == y)
print(x < y)
print((x <= y) and (x != y))
</script></pre></div>

> `x < y` is equvalent to  `(x <= y) and (x != y)` with the latter using three
operations instead of just one `<`.

- `A in B` : `True` if A is in B (used in collections like sequences and
strings).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
is_member = "Tea" in "Team"
print(is_member)
</script></pre></div>

Equality operations, `==` and `!=` can be used with any data type. For instance,
you can check if a variable's *value* is equal to a string "Python".

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = "Python"
y = "P" + "y" + "t" + "h" + "o" + "n"
print(x == y)
print(x == 42)
print(x == "abcdef")
</script></pre></div>

<div class="prevnextlinks">
    <a id="previous" href="04">Previous: Variables</a>
    <a id="next" href="06">Next: Functions</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
