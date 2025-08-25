---
layout : page
title: Variables and Types
permalink: /introduction/04
---

*Variable* in programming represents a named location in
[memory](https://en.wikipedia.org/wiki/Computer_memory){:target="_blank"}
that stores a value. The value of a variable represents a specific type of
data such as a number or a text.

The *type* (data type) of a variable determines what its value actually represents.
Python standard library comes with a wide range of
[built-in types](https://docs.python.org/3/library/stdtypes.html#built-in-types){:target="_blank"}.
We have already used *integers* (`int`), *floats* (`float`), and *strings*
(`str`) which respectfully represent, whole numbers, (approximate) real
numbers, and text objects. So far we have been using values directly without
*assigning* them (variable) names.

#### Difining, Updating and Using Variables

It is very simple to define a varible in Python, all you need is:

```python
variable_name = value
```

where `variable_name` is any alphanumeric sequence of characters that starts with
a letter or an underscore `_`. `value` could be any value with a built-in or
valid user defined type.

> You can look up built-in types from Python documentation. We will not cover
user defined data types in this workshop session. I plan to demonstrate custom types
in the coming workshops that cover more advanced topics.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
user_name = "Alice"
__file__ = "data.tif"
print(f"User: {user_name}")
print(f"File: {__file__}")
</script></pre></div>

By convention, Python programmers use *snake case* when naming their variables.
In snake case, characters are written in lower case and for multi-word names, the
words are separated by underscore `_`. E.g., `user_id`, `circle_diameter`, etc.
This is a not enforced by the Python interpreter but it is preferred convention
for code readability. You may stray away from this convention in some cases. For
instance, to include units of measurement, e.g., `force_N` this doesn't use snake
case as snake case must use lower case characters.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
force_N = 0.21
area_m2 = 0.05

stress_Pa = force_N / area_m2
print(f"Stress (Pa): {stress_Pa}")
</script></pre></div>

To update or change the value of a variable, you simply assign it a new value.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
length = 42
print("old value:", length)

length = 1
print("new value:", length)
</script></pre></div>

You can also define multiple variables on a single line. But don't overuse it.
As it might be hard to read such code if you define `>2-3` variables one a single
line, or when your variable names are very long.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
side_length, area_of_square = 2, 4
print(f"side_length: {side_length}\narea: {area_of_square}")
</script></pre></div>

#### Type Casting

Type casting in programming means converting one type to another. For example,
when you do mathematical operations on variables with mixed `float` and `int`
types interpreter *implicitly* type casts `int` to `float` (the result will have
decimal `.`). Also, note that using division `/` or `float` always produces `float`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
var_int, var_float = 2, 3.14

print('Multiplication', var_int * var_float)
print('Addition', var_int + var_float)
print('Division', var_int / var_int )
print('Floor division', var_int // var_int)
</script></pre></div>

> Use decimal `.` to define a `float`. E.g., in `x = 2.` the `x` is a `float`.

You should NOT use `int`, `float`, `string` or any other Python *key words* as variable
names as this will override the default Python object and this will lead to bugs
in your code. Unfortunately, Python interpreter does not enforce it as a rule and
you just have to remember that.

> E.g., `int="integer"`, `str=2`, or `float=3.14` are valid syntax for defining
variables. Try it for yourself, erase the contents of the above code cell and
define some **forbidden variables** and print them out, Python will happily run it
for you.

Sometimes you may want to *explicitly* convert one type to another. For instance,
`int` to a `str`, or `float` to `int` etc. Python provides type casting *methods*
to convert types.

> Note that when casting higher precision type (`float`) to a lower precision type
(`int`) data loss may occur. Also, some values might not be compatible for type
conversion, e.g., non-numeric string to a
[numeric `int` or `float`](https://docs.python.org/3/library/functions.html#int){:target="_blank"}.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
my_number = 4.2
text = "My number is " + str(my_number)
print(text)
</script></pre></div>

#### Boolean Type

Another frequently used type in programming is a `bool`. The `bool` or *Boolean*
type has two possible values `True` and `False` that represent truth values.
We will use `bool` when doing logical operations and writing conditional statements
(*if else* statements). When used with mathematical operations, Python implicitly
casts `bool` to `int` or `float` and treats it as a number (`True` is 1, and
`False` is 0).

To get a *logical complement* of a `bool` variable you can use `not` operator.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
name = "Michelangelo"
is_mutant = True
likes_pizza = True

print(f"Is {name} mutant?", is_mutant)
print(f"Does {name} like pizza?", likes_pizza)
</script></pre></div>

#### Determining and Verifying Types

You can determine the type of a varible using `type()` method. `type` takes in
an object, variable or value, and returns the type of the object, `int`, `str` etc.
To verify a varible's type, e.g., when you need to check if variable is `int`, use
`isinstance()`. The latter, takes in the object and a type, and returns a `bool`
value, `True` or `False`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = 42
print("What is the type of x:", type(x))
print("Is x integer:", isinstance(x, int))
</script></pre></div>

#### None Type

In Python, `NoneType` represents a null or absence of a value. `NoneType` only has
a single value `None`. Compared to other programming langugages, `None` in Python
is a distinct object and doesn't represent zero value, e.g., these are NOT null in
Python, an empty string `""`, numerical `0`, etc. Also, note that `str` `"None"` is
not the same as `None`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = None
print(f"What is the type of x: { type(x) }")
print(f"Is x int (numeric)? { isinstance(x, int) }")

x_as_str = str(x)
print(f'\nCasted to str: {x_as_str}')
print(
  "Is str(x) same type as None:", isinstance(x_as_str, type(x))
)
</script></pre></div>

> I separated the parentheses of `print` command into separate lines for readability.

#### Dynamic Typing

Python is a *dynamically typed* language which means that Python infers a
variable's type when you run the code. This also means that you can update the
varible's type at anywhere in your code. This leads to less boilerplate code when
defining variables and functions, simplifies writing more expressive code and
leads to quicker prototyping.

Like anything good in life, this comes at a cost. In case of dynamic typing, the
cost is the performance (slower running code), bugs and runtime type errors if the
types are not managed properly. Python interpreter checks the types of the variables
during the runtime which takes up the CPU time. Also, in Python you can accidentally
or intentially reassign a diffent type to a variable. But try to not do it, e.g.,
this might lead to unforseen errors in your code:

```python
duration = 1
...
duration = "one hour"
```

You can always create a new variable to assign your new value with a different type
instead of overriding the old value.

```python
duration = 1
...
duration_description = "one hour"
```

#### Commenting Your Code

Use `#` to comment your code. Although it is common to see `'''...'''` or
`""" ... """` as a multi-line comment, they are technically just strings.
The (true) comments that start with `#` are ignored by the Python interpreter,
whereas multiline strings are read and ran by the interpreter but since no variable
is assigned to these comment strings they are stored in a temporary variable
that is overwritten by the next command (even if the command returns nothing, i.e.
`None`).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
# This is single a comment
x = 1 # this also a comment

'''
This is
multi-line
comment
'''
print(x)
</script></pre></div>

### Calculate Sum and Average

Complete the following code so that it computes and prints a sum and and average
of given numbers. 

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x1, x2, x3, x4 = 44, 37, 40, 47
# DO NOT edit above this line

s = ?
avg = ?

# DO NOT edit below this line
print(f"sum = {s}; average = {avg}")
</script></pre></div>

<div class="prevnextlinks">
    <a id="previous" href="03">Previous: Strings</a>
    <a id="next" href="05">Next: Functions</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}"></script>
