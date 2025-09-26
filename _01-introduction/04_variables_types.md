---
layout : page
title: Variables and Types
permalink: /introduction/04
---

### Variable

*Variable* in programming represents a named location in
[memory](https://en.wikipedia.org/wiki/Computer_memory){:target="_blank"}
that stores a value. The value of a variable represents a specific type of
data such as a number or a text.

It is very simple to define a varible in Python, all you need is to *assign* a
value to the variable with `=`.

```python
variable_name = value
```

- `variable_name`: *Variable name* can be any alphanumeric sequence of characters
that starts with a letter or an underscore `_`, e.g., `abc`, `ABC123`, `_abc123`.
- `value`: *Value* can be any value with a built-in or valid user defined *type*,
where the type refers to the type of the data stored in the memory, e.g., a text.

For example, the following defines a variable `username`, uses it in a f-string,
and prints the result.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
username = "Kenobi"
print(f"General {username}!")
</script></pre></div>

Here, the variable `username` refers to a string `Kenobi`.

|   Name   | Value  |
|:--------:|:------:|
|`username`|`"Kenobi"`|

You can also define multiple variables on a single line.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x, y = 2, 3.14

print(f"x: {x}")
print(f"y: {y}")
</script></pre></div>

> Don't overuse this feature. It might be hard to read code with `>2-3` variables
defined on a single line, especially when you have long variable names. The
future you will thank you if you write a code that is easier to read.

### Naming Variables

By convention, Python programmers use *snake case* when naming their variables.
In snake case, characters are written in lower case and for multi-word names, the
words are separated by underscore `_`.
E.g., `user_id`, `circle_diameter`, etc. This is a not enforced by the Python
interpreter but it is a preferred convention for code readability.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
user_id = "Ripley"
print(f"{user_id} is logged-in.")
</script></pre></div>

You may stray away from this convention in some cases. For
instance, to include units of measurement, e.g., `force_N` doesn't use snake
case as it contains an upper case character.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
force_N = 0.21
area_m2 = 0.05

stress_Pa = force_N / area_m2
print(f"Stress (Pa): {stress_Pa}")
</script></pre></div>

Be careful to NOT name your variables `int`, `float`, `string` or any other
Python *key words*. This will override the default objects' names and will lead to
bugs in your code.

> Unfortunately, Python interpreter does not enforce this as a
rule and you just have to remember to not use these as variable names.
For instance, `int="integer"`, `str=2`, or `float=3.14` are valid syntax for
defining variables. Try it for yourself, by defining some "forbidden variables"
in the above cell and print them out, Python will happily run the code for you.

### Updating Variable's Value

To update or change the value of a variable, you simply assign it a new value.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
length = 42
print("old value:", length)

length = 1
print("new value:", length)
</script></pre></div>

### Types

Computer stores everything in its memory as a binary data composed of zeros and
ones. The *type* of the data determines what these zeros and ones actually represent.
The Python standard library comes with a wide range of built-in types that you
can use to represent your data.

We have already seen the following:

- `int`: Signed integers, e.g., `-423`, `0`, `12897`. Python automatically adjusts
the size of an `int` in the memory (number of bytes) depending on the value of
the integer.
- `float`: Floats or
[floating-point numbers](https://en.wikipedia.org/wiki/Floating-point_arithmetic){:target="_blank"}
are a subset of real numbers that can be approximated with binary fractions. They
are stored as 64-bit or *double precision* numbers in most Python implementations.
- `str`: Strings in Python represent textual data. E.g., `"Kenobi"`, `"Hello there!"`.

|   Name   | Value  |  Type |
|:--------:|:------:|:-----:|
|`username`|`"Kenobi"`| `str` |
|    `x`   |  `2`   | `int` |
|    `y`   | `3.14` |`float`|

Additionally, Python also implements types for working with bytes, dates and
times, and sequences. We will learn about more complex types such as sequences
in the following sections. For a complete list of data types in Python refer
to
[the official documentation](https://docs.python.org/3/library/stdtypes.html#built-in-types){:target="_blank"}.

### Boolean Type

Another frequently used type in Python is a `bool`.

- `bool` : *Boolean* type has two possible values `True` and `False` that represent
truth values.
- To get a *logical complement* of a `bool` variable use the `not` operator.

We will use `bool` when doing logical operations and writing conditional statements
(*if-else* statements).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
is_mutant = True
likes_pizza = not False

print("Mutant turtle:", is_mutant)
print("Likes pizza:", likes_pizza)
</script></pre></div>

When used with mathematical operations, Python implicitly
casts `bool` to `int` or `float` and treats it as a number, `True` is 1, and
`False` is 0.

### None Type

In Python, `NoneType` represents a null or absence of a value. `NoneType` only has
a single value `None`. Compared to other programming langugages, `None` in Python
is a distinct object and doesn't represent zero value, e.g., these are NOT null in
Python, an empty string `""`, numerical `0`, etc. Also, note that `str` `"None"`
is not the same as `None`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
n, s = None, "None"
print(n, "(NoneType)")
print(s, "(str)")
</script></pre></div>

When you print the `None` and a string `"None"` they appear to be the same. To
determine if the variable is `NoneType` or just a string you can use the following:

- `repr` function

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
n, s = None, "None"
print(repr(n), "(NoneType)")
print(repr(s), "(str)")
</script></pre></div>

- Use `is` or `==` to compare the value with actual `None`:

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
n, s = None, "None"
print(n is None, "(NoneType)")
print(s is None, "(str)")
</script></pre></div>

- Or use one of the type checking methods in the next section, e.g., `type` or
`isinstance`.

### Determining and Verifying Types

You can determine the type of a varible using `type()` method.

- `type(object)` takes in an object, variable or value, and returns the type of
the object, `int`, `str` etc. You can further compare the value of the type
obtained from this function with an actual target type using `is` and `==`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = 42
print(f"Is {x} int? {type(x) is int}")
print(f"Is {x} float? {type(x) is float}")
</script></pre></div>

Alternatively, you can also use `isinstance` to verify type of a given variable
instead of a comparison.

- `isinstance(object, type)` takes in the object and a type, and returns a `bool`
value. `True` if the types match and `False` otherwise.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = 42
print(f"Is {x} int?", isinstance(x, int))
</script></pre></div>

### Type Casting

Type casting in programming means converting one type to another. For example,
when you do mathematical operations on variables with `float` and `int` types,
the interpreter implicitly *type casts* `int` to `float` (the result will have
decimal `.`).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = 2
print(x + 2)
print(x + 2.)
</script></pre></div>

The decimal point `.` is used to define a `float`. E.g., `2.` is a `float` equal
to `2.0`. Using division `/` always produces `float`, and floor division `\\`
produces `int` unless one of the numbers is a `float`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x, y = 6, 3

print(x / y)
print(x // y)
print(x // 3.)
</script></pre></div>

Sometimes you may want to *explicitly* convert one type to another. For instance,
`int` to a `str`, or `float` to `int` etc. For this you may use Python's type
casting *methods* to convert between types.

- `int(object)` : convert any compatible object to `int`.
- `float(object)`: convert a compatible object to `float`.
- `str(object)`: convert any object to its string representation.

> Note that when casting higher precision type `float` to a lower precision type
`int` data loss may occur. Also, some values might not be compatible for type
conversion, e.g.,
[non-numeric string to a numeric `int` or `float`](https://docs.python.org/3/library/functions.html#int){:target="_blank"}.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
my_number = 4.2
text = "My number is " + str(my_number)
print(text)
</script></pre></div>

Below is another example that uses type casting with `int()` and `float()` methods.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = int(3.14)
print(x, type(x))

y = int(" 2 ")
print(y, type(y))

z = float(x + y)
print(z, type(z))
</script></pre></div>

The last two lines convert an `int` object with value `x + y` to a `float` and
print it.

### Dynamic Typing

Python is a **dynamically typed** language where Python automatically infers a
variable's type when you run the code. This leads to less boilerplate code when
defining variables and functions, and allows quicker prototyping. The dynamic
typing comes at a cost as a lower performance (slower running code),
and potentially runtime type errors.

The performance hit is due to type checking of the variables by the interpreter
during the runtime which takes up the CPU time. We have to accept it as a cost for
convenience.

On the other hand, the effect of the type errors can be minimised. For instance,
if your code expects a certain type of data and you accidentally change the type
of a variable, the interpreter will not be aware of the error until you run the
code. E.g., the following might lead to runtime type errors:

```python
delta_t = 1
...
delta_t = "one hour"
```

You can avoid this by creating a new type of variable instead of overriding the
old value and its type.

```python
delta_t = 1
...
delta_t_info = "one hour"
```

### Exercises

---
**E1:** Calculate Sum and Average

- Complete the following code so that it computes and prints a sum and average
of the numbers `x1`, `x2`, `x3`, and `x4`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x1, x2, x3, x4 = 44, 37, 40, 47
# DO NOT edit above this line

s = ?
avg = ?

# DO NOT edit below this line
print(f"sum = {s}; average = {avg}")
</script></pre></div>

---

<div class="prevnextlinks">
    <a id="previous" href="03">Previous: Strings</a>
    <a id="next" href="05">Next: Numerical Operations</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}"></script>
