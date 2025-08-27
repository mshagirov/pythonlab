---
layout : page
title: Functions
permalink: /introduction/05
---

Functions in programming allow reusing and logically organising code blocks.
We have already used `print`, `len`, `hasattr`, and `isinstance`, which are all
examples of built-in Python functions.

> See [*modularity and abstraction*](https://www.geeksforgeeks.org/software-engineering/modular-approach-in-programming/){:target="_blank"}
in programming.

We have also used *methods*, `str()`, `int()`, `float()`, and `type()`. Method is
a concept from object-oriented programming that refers to a function that belongs
to an object or a *class* (of objects).

> For now, just think of methods as "special functions". In Python everything is
an object, e.g., `str`, `int`, `float`, including the functions.
Thus, we can't avoid using objects in Python. But you can use Python to
write almost any program that can be written using object-oriented programming
model without ever knowing exactly what terms like objects, classes, or methods
mean.

#### Defining Functions

Python uses `def` keyword to *define* a function. You will need to provide a name,
and optionally input *parameters* (a.k.a *arguments*). A function also must have
a *body*, an indented block of code that runs each time you *call* the function.

```python
def FUNCTION_NAME(INPUT_ARGS):
    BODY
    return RESULTS
```

The optional `return` statement *stops* the execution, and returns the results of
the function's computations. If we didn't provide any variables to `return`, the
function stops at the return statement and returns `None`. If we completely omit
the return statement, entire function body is executed and once completed the function
returns `None` as well.

To define an empty (template) function, that you plan to implement later, use
`pass` keyword. You must *always* include `()` (and `:`) after the name of the function,
even when you don't need to provide any input.

```python
def FUNCTION_NAME():
    pass
```

#### Fix a Greeter Function

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def greeter(name):
print(f"Hello, {name}!")

name = 'World'
greeter(name)
</script></pre></div>

1. Run the code above. It should fail to run. Fix the code so that it prints
`Hello, World!`.
1. Set the `name` variable to your name as a `str` (using quotes
or double quotes) then run the code again to print a geeting.
1. Replace the last line with `print(greeter(name))` and run the code again.
Can you explain what happens when you run this code?

> It is conventional to use **two** or **four** space characters for indentation.
Many text editors and
[IDEs](https://en.wikipedia.org/wiki/Integrated_development_environment){:target="_blank"}
allow setting dafault identation. Be consistent with the
size and type (spaces or tabs) of indentation you use throughout your code. This
is mainly for readability but also to avoid bugs due to inconsistent indentation.

#### Multiparameter Functions

For many applications you would need more than just one or zero input parameters.
E.g., even simple addition function `add(a, b)` would require two inputs `a` and
`b`. To define a function that accepts multiple input parameters, simply list the
inputs in the function definition.

```python
def func(input1, input2, input3):
    pass
```

Complete the following multiparameter function:

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
import math

def vector_length(x, y, z):
    # Don't edit above
    l = math.sqrt( ? )

    # Don't edit below
    return l

x1, x2, x3 = 1, 4, 8
l = vector_length(x1, x2, x3)

print(f"length of [{x1}, {x2}, {x3}] is {l}")
</script></pre></div>

- Compute the
[Euclidean length or L2-norm](https://mathworld.wolfram.com/L2-Norm.html){:target="_blank"}
of a 3-dimensional vector by completing the above function. You may find
[`sqrt` function](https://docs.python.org/3/library/math.html#math.sqrt){:target="_blank"}
useful for this. I have already *imported* it for you as a part of built-in
`math` module. You can call it as `math.sqrt(...)`.

> [Modules](https://docs.python.org/3/tutorial/modules.html){:target="_blank"}
are files with reusable code. E.g., you can write
a Python file, text file ending with `.py`, with your functions and variables and
then import and reuse it in other parts of your code.

#### Returning Multiple Values

Similarly, a function also can return multiple values by specifying multiple
variables in the return statement.

```python
def func():
    ...
    return result1, result2, ...
```

- Complete function `compute_l1_l2` below.
- It should return two values. First value must be the
[Manhattan length](https://mathworld.wolfram.com/L1-Norm.html){:target="_blank"}
`l1` and the second returned value must be the Euclidean length. Use predefined
functions to compute L1 (Manhattan) and L2 (Euclidean) norms.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def compute_l1_l2(x, y, z):
    l1 = ? # l1-norm
    l2 = ? # l2-norm

    # Don't edit below
    return l1, l2

def l2_norm(x, y, z):
    """Computes Euclidean length (norm)"""
    import math
    return math.sqrt(x*x + y*y + z*z)

def l1_norm(x, y, z):
    """Computes Manhattan length"""
    return abs(x) + abs(y) + abs(z)

def test(x, y, z):
    l1, l2 = compute_l1_l2(x, y, z)
    print(f"[{x:2},{y:2},{z:2}] -> L1: {l1 :4.2f}; L2: {l2 :4.2f}")

def main():
    test(1, -4, 8)
    test(1, 4, 8)
    test(-3, 5, 9)

main()
</script></pre></div>

**Questions**

- You are including function calls for `l1_norm` and `l2_norm` before
Python is aware of them. Remembering that Python executes code sequentially,
why doesn't this lead to an error?
*Tip: function executes (runs) only when you call it.*
- What is the sequence of calls when you run the code above?

#### Default Parameter Values

For the *positional* arguments, the value is defined by its position
in the function definition. E.g., all the functions above used positional
parameters. Python also allows defining default values for function arguments as
key-value pairs. Key in this case refers to the variable name that your function
uses inside its body.

```python
def func(arg1, arg2, value = 10.5, status = "active", on = True):
    ... 
```

> In Python documentation, positional arguments are commonly called `args` and
keyword arguments are called as `kwargs`.

In the above, `arg1` and `arg2` are positional arguments and the rest are
*keyword arguments* with default values.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def decrease_val( curr, delta=5):
    return curr - delta

curr_T = 25
delta_T = 10

print(f"T : {curr_T}C")

print(f"new T={decrease_val(curr_T)}C (default)")

print(f"new T={decrease_val(curr_T, delta=delta_T)}C (kwarg)")

print(f"new T={decrease_val(curr_T, delta_T)} (args)")
</script></pre></div>

- Note that in the last `print` statement, we did not provide the key for the
argument. In this case, the argument is inferred from its position.
- You can also specify the name of the positional argument, .e.g.,

```python
new_T= decrease_value(delta=delta_T, current=current_T)
```

In this case, the position of the argument is not important as values are provided
together with their names.

> When defining and calling functions using both positional and keyword
arguments, positional arguments must be provided before keyword arguments.

<div class="prevnextlinks">
    <a id="previous" href="04">Previous: Variables</a>
    <a id="next" href="06">Next: Scope</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
