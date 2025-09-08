---
layout : page
title: Logical Flow
permalink: /introduction/09
---

### If Statements

An *if statement* specifies the part of the code that runs *only* when a given condition
is met. This allows a programmer to control the logical flow and execution of a
computer programme. If statements consist of `if` keyword, a condition that needs
to be fulfilled, and an indented block of code. The following is the definition of
if statement in Python.

```python
if CONDITION:
    # code in this block runs only when CONDITION is True

# code outside the block always gets executed
```

The indented code block under the `if CONDITION:` executes *only* when the `CONDITION`
is equal to `True`. Let's see it in an example.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
value = 10
if value > 42:
    print(f'{value} is larger than 42.')

if value == 42:
    print(f'{value} is equal to 42.')

if value < 42:
    print(f'{value} is less than 42.')
</script></pre></div>

> Run the code with different numbers (`int` or `float`) for the `value`.

I used comparison operations as conditions for the statements above. You can use
any Boolean operation that produces `True` or `False` as a condition of the
statement.

The code above uses multiple checks of the same value which is
redundant. Once we check that a value is *not* larger than 42, we also know that
the value must be either less than or equal to 42. You can use `else` statement
when you have an alternative code that runs when the condition is `False`, as
shown below.

```python
if CONDITION:
    # runs when CONDITION is True
else:
    # runs when CONDITION is False
```

`if-else` uses two different code blocks. Only one block is executed
depending on whether a condition is met or failed.

Complete the following code to reimplement the previous code with three `if`
statements using `if-else`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
value = 10
if value > 42:
    print(f'{value} is larger than 42.')

if ? :
    print(?)
else:
    print(?)
</script></pre></div>

In the above, we are still checking the value twice using two separate if
statements. It might not be immediately clear whether these `if` blocks are
logically connected without carefully reading the code first. Python allows us
further combine these statements into a single `if-elif-else` block as shown below.

```python
if CONDITION1:
    # runs only when CONDITION1 is True
elif CONDITION2:
    # runs only when
    #   (CONDITION2 is True) and (CONDITION1 is False)
else:
    # runs if
    #   (CONDITION2 is False) and (CONDITION1 is False)
```

`elif` stands for "else if". Complete the following code using `if-elif-else`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
value = 10
if value > 42:
    print(f'{value} is larger than 42.')
elif ? :
    print( ? )
else:
    print( ? )
</script></pre></div>

Only one, either `if` block, or `elif` block, or `else` block executes at a time.
The condition of the `elif` block (`CONDITION2`) is only checked when the first
condition (`CONDITION1`) is `False`, i.e., if the first condition *fails*. Also,
we can instantly recognise that the code blocks of the `if-elif-else` are
logically connected.

> The only required part of the `if` statement is the first `if` block, and the
`elif` and `else` parts are optional.

### Conditional Expressions

Python provides another type of if statement in addition to the ones shown above.
These are called *conditional expressions* or *ternary operators*. These expressions
allow value assignment using an in-line if statement. The syntax of a conditional
expression is as follows.

```python
output = value if CONDITION else alternative_value
```

- `output` is set to `value` if the `CONDITION` is `True`,
- `output` is set to `alternative_value` otherwise.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
value = 10
result = "larger than 42" if value > 42 else "less than or equal to 42"
print("Value", value)
print(result)
</script></pre></div>

> Ternary means that the operator consists of three parts, a value if a condition
is met, a condition, and an alternative value if the condition is false.

<div class="prevnextlinks">
    <a id="previous" href="08">Previous: Containers</a>
    <a id="next" href="10">Next: Loops</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
