---
layout : page
title: Logical Flow
permalink: /introduction/09
---

### If Statements

*If statements* are the most common way to control the program's flow and
execution. The following is the definition of if statements in Python.

```python
if CONDITION:
    # Runs only if CONDITION is True
    # code block
```

The indented code block under the `if CONDITION:` executes *only* if the `CONDITION`
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

I used comparison operations as conditions for the if statements above. The
condition can be any Boolean operation that produces `True` or `False` values.

As you can see above, I have used multiple if condition to check the value. As
for the code above, it might be redundant to check the same value multiple times.
E.g., once we know that value is *not* larger than 42 we know that the value must
be either less than or equal to 42.

For cases when you have an alternative code that runs when the condition is false.
You can use `else` statement, as shown below.

```python
if CONDITION:
    # runs if CONDITION is True
else:
    # runs if CONDITION is False
```

For instance, run the following code.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
value = 10
if value > 42:
    print(f'{value} is larger than 42.')

if value < 42:
    print(f'{value} is less than 42.')
else:
    print(f'{value} is equal to 42.')
</script></pre></div>

In the above, we check the value twice because we two separate `if` statements.
Python allows us combine these statements further into one `if-elif-else`
statement that executes either two or one if statement depending on the first
condition.

```python
if CONDITION1:
    # runs only if CONDITION1 is True
    # else checks CONDITION2
elif CONDITION2:
    # runs only if
    #   (CONDITION2 is True) and (CONDITION1 is False)
else:
    # runs if
    #   (CONDITION2 is False) and (CONDITION1 is False)
```

`elif` stands for "else if" and is used as follows.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
value = 10
if value > 42:
    print(f'{value} is larger than 42.')
elif value < 42:
    print(f'{value} is less than 42.')
else:
    print(f'{value} is equal to 42.')
</script></pre></div>

The second `elif` statement only evaluated only if the first condition is false,
i.e., if the first condition *fails*. It is similar to having two `if` statements
but it is more readable, as you can see that the `elif` logically follows `if`
and not a separate `if` statement.

> `elif` also could be faster in some rare cases where the Boolean expression is
costly to compute.

<div class="prevnextlinks">
    <a id="previous" href="08">Previous: Containers</a>
    <a id="next" href="10">Next: Loops</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
