---
layout : page
title: Dealing with Errors
permalink: /introduction/12
---

### Exceptions

Errors in Python are called *exceptions*. For example, syntax error is a special
type of exception where the code's syntax is wrong, such as, forgetting
`:` after `if` statement. You might even get errors when your code is syntactically
correct. These are other types of *exceptions*.

|            Syntax Error             |      Exceptions          |
|:-----------------------------------:|:-------------------------:|
|Missing ":" in `while`               |  Division by zero `2 / 0` |
|Mismatched brackets `[ ... )`        | Type errors `2 + "Hello"` |
| Incorrect indentation               |Using an undefined object  |
| ... | ... |

You have likely already seen some of these errors in the Python shell
or in the code cells if your browser supports error messages.

E.g., entering `print(2/0)` in the [Python shell](/pythonlab/terminal/){:target="_blank"}
will produce

```python
>>> print(2 / 0)
Traceback (most recent call last):
  File "<console>", line 1, in <module>
ZeroDivisionError: division by zero
```

All error messages follow a similar format. Error message lists the location
and a code snipped where the error happened together with the type of
the error (e.g., `ZeroDivisionError`).

### Do You Need to Memorise Errors?

You don't have to memorise the exceptions and syntax errors. However,
conceptual understanding of syntax rules, and common errors, and their messages will
help you resolve most of the issues you face when writing code. *You will
naturally encounter and learn to recognise common errors as you gain more
experience in Python.*

### Handling and Raising Exceptions

Errors disrupt the normal flow of the running program. When they occur
the interpreter *raises an exception*. Python provides exception handling with
`try-except` block. This allows managing the errors to prevent the program from crashing.

```python
try:
    # code that might raise an exception
except ExceptionType as e:
    # catch ExceptionType errors
    # `e` represents the error
```

- `try` block encloses the code that might raise exceptions, e.g., a code that reads
files or a user input.

- `except` block catches the exception that matches a given
`ExceptionType` exception (error) type, e.g., `ValueError`, `ZeroDivisionError`,
`KeyError`, etc.

- You can use `Exception` type to cover *all* built-in exceptions except `SystemExit`.

> `SystemExit` exception signals the Python interpreter to terminate. See the
[exceptions documentation](https://docs.python.org/3/library/exceptions.html){:target="_blank"}
to find out more about exceptions.

- `as` keyword assigns the caught exception to the variable `e`.
- You stack multiple `except` blocks to handle different exceptions.

> It is not necessary to call the error as `e` and you can use any valid name or
omit the `as e` part altogether. If you omit the name, you need to refer to the
exception using the class name of the exception (type, e.g., `ZeroDivisionError`).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def inspect(a):
    print(a)
    return a

x = [2, 1, 0]

try:
    list(map( lambda i: 42/inspect(i) , x))
except Exception as error:
    print(f'{type(error)}: {error}')</script></pre></div>

Raising custom exceptions with `raise`

### Defensive Programming

`assert`

<div class="prevnextlinks">
    <a id="previous" href="11">Previous: Useful Tools</a>
    <a id="next" href="13">Next: Conclusion</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
