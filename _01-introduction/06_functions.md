---
layout : page
title: Functions
permalink: /introduction/06
---

Functions in programming allow reusing and logically organising programs into
blocks of code or *modules*. We have already used `print`, `len`, `hasattr`, and
`isinstance`, which are all examples of built-in Python functions.

We have also used *methods*, `str`, `int`, `float`, and `type`. Method is
a concept from object-oriented programming that refers to "special" functions
that belong to specific objects or *classes* (of objects).

In Python everything is an object (e.g., `str`, `int`, and `float` objects),
including the functions. The functions have their own type, `function`.

> We can't avoid using objects in Python. That said, object-oriented programming
is optional in Python.

### Defining Functions

Python uses `def` keyword to *define* a function. You will need to provide a name,
and optionally input *parameters* (a.k.a *arguments*). A function also must have
a *body*, an indented block of code that runs each time you *call* the function.

```python
def FUNCTION_NAME(INPUT_ARGS):
    BODY
    return RESULTS
```

To define an empty (template) function, that you plan to implement later, use
`pass` keyword. You must *always* include `()` and `:` after the name of the function,
even when you don't need to provide any input.

```python
def FUNCTION_NAME():
    pass
```

It is conventional to use *four spaces* or *one tab* for each
level of indentation. Many text editors and
[IDEs](https://en.wikipedia.org/wiki/Integrated_development_environment){:target="_blank"}
allow setting dafault identation. Be consistent with the
size and type (spaces or tabs) of indentation you use throughout your code. This
is mainly for readability but also to avoid bugs due to inconsistent indentation.

### Return Statement

The optional `return` statement *stops* the execution and returns the results of
the function's computations up to that point.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def add_five(number):
    return number + 5

result = add_five(10)
print(result)
</script></pre></div>

- If we completely omit the return statement, entire function body is executed,
and once completed, the function returns `None`.
- If we don't provide any variables to `return`, the function stops at the return
statement and returns `None`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def func1():
    x = 1
    return
    print(f'fun1 : x= {x}') # never executed

print(func1())
</script></pre></div>

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def func2():
    x = 1
    print(f'fun2 : x= {x}')

print(func2())
</script></pre></div>

### Multiparameter Functions

For many applications you would need more than one input parameter.
E.g., a function `add(a, b)` with two inputs `a` and
`b`. To define a function that accepts multiple input parameters, simply list the
inputs in the function definition as a comma separated sequence.

```python
def func(input1, input2, input3):
    pass
```

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def add(a, b):
    res = a + b
    return res

result = add(5, 10)
print(result)
</script></pre></div>

### Returning Multiple Values

Similarly, a function also can return multiple values by specifying multiple
variables in the return statement.

```python
def func():
    ...
    return result1, result2, ...
```

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def numbers():
    return 1, 2, 3

a, b, c = numbers()

print(a)
print(b)
print(c)
</script></pre></div>

### args and kwargs

For the *positional* arguments, the value is defined by its position
in the function definition. E.g., all the functions above used positional
parameters. Python also allows defining default values for function arguments as
key-value pairs. Key in this case refers to the variable name that your function
uses inside its body.

```python
def func(arg1, arg2, value = 10.5, status = "active", on = True):
    ... 
```

In the above, `arg1` and `arg2` are positional arguments (*args*) and the rest
are keyword arguments (*kwargs*) with default values.

> In Python documentation, positional arguments are commonly called `args` and
keyword arguments are called as `kwargs`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def decrease_val( curr, delta=5):
    return curr - delta

curr_T = 25
delta_T = 10

print(f"T : {curr_T}C")

print(f"new T={decrease_val(curr_T)}C (default)")

print(f"new T={decrease_val(curr_T, delta=delta_T)}C (kwarg)")
</script></pre></div>

- The argument's value is inferred from its position if we don't provide the key
for the argument.

```python
new_T = decrease_val(25, 10)
```

- You can also specify the name of the positional argument to provide values with
their names inside the function.

```python
new_T = decrease_value(delta=10, current=25)
```

> Positional arguments must be provided before keyword arguments when defining
and calling functions that use both positional and keyword arguments.

### Exercises

---
**E1:** Fix a Greeter Function.

- Run the code. It should fail to run.
- Fix the code so that it prints `Hello, World!`.
- Set the `name` variable to your name as a `str` (using quotes
or double quotes) then run the code again to print a geeting.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def greeter(name):
print(f"Hello, {name}!")

name = 'World'
greeter(name)
</script></pre></div>

---
**E2:** Complete the `vector_length` function.

- Compute the
[Euclidean length or L2-norm](https://mathworld.wolfram.com/L2-Norm.html){:target="_blank"}
of a 3-dimensional vector by completing the function.
- You may find
[`sqrt` function](https://docs.python.org/3/library/math.html#math.sqrt){:target="_blank"}
useful for this. I have already *imported* it for you as a part of built-in
`math` module. You can call it with `math.sqrt(...)` as shown below.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
import math

def vector_length(x, y, z):
    # Don't edit above

    # math.sqrt( ? )

    #> Don't edit below
    return l

x1, x2, x3 = 4, 1, 8
l = vector_length(x1, x2, x3)

print(f"length of [{x1}, {x2}, {x3}] is {l}")
</script></pre></div>

> [Modules](https://docs.python.org/3/tutorial/modules.html){:target="_blank"}
are files with reusable code. E.g., you can write your own module as text file
ending with `.py` with your functions and variables (a.k.a. Python file) and then
import and reuse it in other parts of your code.

---
**E3:** Complete function `compute_l1_l2` below.

- The function should return two values. First value must be the
[Manhattan length](https://mathworld.wolfram.com/L1-Norm.html){:target="_blank"}
`l1` and the second returned value must be the Euclidean length. Use predefined
functions to compute L1 (Manhattan) and L2 (Euclidean) norms.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def compute_l1_l2(x, y, z):
    l1 = ? # l1-norm
    l2 = ? # l2-norm

    #> Don't edit below
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

- You are including function calls for `l1_norm` and `l2_norm` before
Python is aware of them. Remembering that Python executes code sequentially,
why doesn't this lead to an error?
*Tip: function executes (runs) only when you call it.*
- What is the sequence of calls when you run the code above?

---
**E4:** Function Objects

As noted earlier on this page, Python treats functions as objects. You can check
this using `type` method. Keeping this in mind, answer following question by
running the code cell below.

- What is the difference between `hi` and `hi()` below? Print statements are
there to examine these objects by printing them to the console.
 
<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def hi():
    print("Hi!")

print(hi)
print(hi())
</script></pre></div>

> You don't need to use `print` to examine these commands in the
[Python shell](/pythonlab/terminal/){:target="_blank"}.

---

<div class="prevnextlinks">
    <a id="previous" href="05">Previous: Numerical Operations</a>
    <a id="next" href="07">Next: Scope</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
