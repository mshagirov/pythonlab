---
layout : page
title: Functions
permalink: /introduction/05
---

Functions in programming allow reusing and logically organising code blocks.
We have already used `print`, `len`, `hasattr`, and `isinstance`, which are all
examples of built-in Python functions.

- See [*modularity and abstraction*](https://www.geeksforgeeks.org/software-engineering/modular-approach-in-programming/){:target="_blank"}
in programming.

We have also used *methods*, `str()`, `int()`, `float()`, and `type()`. Method is
a concept from object-oriented programming that refers to a function that belongs
to an object or a *class* (of objects).

> In Python everything is an object, e.g., `str`, `int`, `float`, including the
functions. You can use Python to write almost any program that can be written using
object-oriented programming model without ever knowing exactly what terms like
objects, classes, or methods mean. For now, just think of methods as "special
functions".

#### Defining Functions

Python uses `def` keyword to *define* a function. You will need to provide a name,
and optionally input *parameters* (a.k.a *arguments*). A function also must have
a *body*, an indented block of code that runs each time you *call* the function.

```python
def FUNCTION_NAME(INPUT_ARGS):
    BODY
```

To define an empty (template) function, that you indent to implement later, use
`pass` keyword. You must *always* include `(` and `)` after the name of the function,
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

- Run the code above. It should fail to run. Fix the code so that it prints
`Hello, World!`.
- Set the `name` variable to your name as a `str` (using quotes
or double quotes) then run the code again to print a geeting.

> It is conventional to use **two** or **four** space characters for indentation.
Many editors and IDEs allow setting dafault identation. Be consistent with the
size and type (spaces or tabs) of indentation you use troughout your code. This is
mainly for readability but also to avoid bugs due to inconsistent indentation.

#### Multiparameter Functions

For many applications you would need more than just one or zero input parameters.
E.g., even simple addition function `add(a, b)` would require two inputs `a` and
`b`. To define a function that accepts multiple input parameters, simply list the
inputs in the function definition.

```python
def func(input1, input2, input3):
    pass
```

- complete a multiparameter function:

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def add_numbers(x, y, z):
    s = ?

    # don't edit below this line
    print(f"sum = {s}")

add_numbers(2, 8, 32)
</script></pre></div>

#### Return Statement

So far we have been printing the results of our computations.

#### Declaration and Usage Sequence

Variable and func: declare before using/calling.

#### Returning Multiple Values

#### Default values for func args

<div class="prevnextlinks">
    <a id="previous" href="04">Previous: Variables</a>
    <a id="next" href="06">Next: Scope</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
