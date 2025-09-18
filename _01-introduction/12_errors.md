---
layout : page
title: Errors
permalink: /introduction/12
---

### Exceptions

Errors in Python are called *exceptions*. For example, syntax error is a special
type of exception where the code's syntax is wrong, such as, forgetting
`:` after `if` statement. You might even get errors when your code is syntactically
correct. These are other types of *exceptions*.

|            Syntax Error             |      Exceptions          |
|:-----------------------------------:|:-------------------------:|
| No ":" after `if` statement         |  Division by zero `2 / 0` |
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

### Handling Exceptions

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
- You can also stack `except` blocks to handle multiple exceptions.

```python
try:
    # code that might raise an exception
except ExceptionType as e:
    # catch ExceptionType errors
except AnotherExceptionType as e:
    # catch AnotherExceptionType
```

> It is not necessary to call the error as `e` and you can use any valid name or
omit the `as e` part altogether. If you omit the name, you need to refer to the
exception using the class name of the exception (type, e.g., `ZeroDivisionError`).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
try:
    print(42 / 0)
except ZeroDivisionError as error:
    print(f'{type(error)}: {error}')
</script></pre></div>

### Raising Exceptions

Python also allows you to force a specified exception with the `raise` statement.

```python
raise ExceptionType
```

You can use `raise` with an exception with a custom message to force your own
exceptions.

> All exceptions accept an optional message string, `ExceptionType(msg)`. The
message is displayed when the error is encountered.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def check(x):
    if x < 42:
        raise ValueError("The value is too low!")

try:
    check(10)
except ZeroDivisionError as e:
    # this code is not triggered
    print(f'{type(e)}: {e}')
except Exception as e:
    print(f'{type(e)}: {e}')
</script></pre></div>

Forcing exception might seem counterintuitive. You might be wondering why would
anyone need a way to raise errors. You have to keep in mind that not all programs
run in isolation, and programs might interact with files, users, or communicate
with other machines. In this circumstances a program is expected to encounter
errors.

### Assertions

Catching errors to gracefully handle, or intentionally raising them provides
an additional way to control your program. This also can be used to explicitly
incorporate programmer's assumptions into the code. E.g., you might want to force
a function to accept only a certain image size or format.

For convenience, Python also provides an `assert` statement in addition to the
`raise`. Assertions are a convenient way to quickly include assumptions about a
program in a single line of code.

```python
assert condition
```

`AssertionError` is raised if the `condition` is `False`. You can also include a
message string after the condition to describe your error.

```python
assert condition, msg
```

E.g., in the below code cell `div(a, b)` runs only when `b` is non-zero.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def div(a, b):
    assert b != 0, "Divisor can't be zero!"
    print( a / b )

try:
    div(42, 0)
except Exception as e:
    print(f'{type(e)}: {e}')
</script></pre></div>

<div class="prevnextlinks">
    <a id="previous" href="11">Previous: Useful Tools</a>
    <a id="next" href="13">Next: Conclusion</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
