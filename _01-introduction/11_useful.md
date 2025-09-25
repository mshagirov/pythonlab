---
layout : page
title: Useful Tools
permalink: /introduction/11
---

Python has many other additional features for working with various data types and
files, networking, cryptography, multithreading and more. We have seen only the
most commonly used Python features. To complete our knowledge of basic Python,
let's learn a few more features that you may find useful in your future projects.

### Iterable Unpacking

As you are already aware, you can assign multiple variables using multiple values
and variable names. For instance,

```python
x, y = 42, "abc"
```

assigns `x` and `y`. This type of assignment is called *tuple unpacking* as the
right-hand side of the assignment creates a tuple using comma-separated values,
`42, "abc"`.

Similarly, tuples and other iterables can be unpacked into other tuples using
the star (`*`) notation, where "*" groups the remaining values into a list.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
name, *location, population = 'Singapore', '1.35°N', '103.82°E', 6_037_000

print(name)
print(location)
print(f'{population:,}')
</script></pre></div>

You can also use `_` to ignore a value (or `*_` to ignore multiple values) during
assignment.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
name, *_ = "Singapore", "1.35°N", "103.82°E", 6_037_000
print(name)
</script></pre></div>

### Lambda Functions

*Lambda function* is a term used for anonymous functions in Python. Anonymous functions
do not have names like a usual function that you define with `def`. They are generally
short convenience functions, defined and used on the fly and then thrown away.

- `lambda var1, ...: code`: defines a lambda function. The function takes in
variables `var1`, ..., and executes a given single line of short code.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
add = lambda a, b: a + b
print(add(5, 10))
</script></pre></div>

> You may find lambda functions useful as inputs to other functions.
See below for more examples.

### Comprehensions

Python comprehensions are a concise and efficient method for creating new
sequences. For example, instead of writing a for loop to create a list:

```python
l = []
for i in items:
    l.append(i)
```

You could use a *list comprehension*:

- **List comprehension** : `[i for i in items]`

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
l = [c for c in "Hello there!"]
print(l)
</script></pre></div>

Similarly, Python also offers methods for building `dict` and `set` iterables.

- **Dictionary comprehension**: `{k: v for k, v in iterable}`
- **Set comprehension**: `{k for k in items}`

Comprehensions can be used with `if`clause to build filtered sequences.

- **Conditional filter**: `[i for i in items if condition]`

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
l = [c for c in "Hello there!" if c!="e"]
print(l)
</script></pre></div>

> You can create tuples by converting lists that you build using the list comprehension.

### Sorting

Python has two related functions for sorting, `list.sort` and `sorted`. The first
is a list instance method that sorts the values of a list and hence used only with
the list objects. The latter is a more general sorting function that takes in an
input iterable and outputs a sorted list of values.

- [`list.sort()`](https://docs.python.org/3/library/stdtypes.html#list.sort){:target="_blank"}:
sorts the items' values of the list in place. `sort` uses `<`
comparison, so the list items must support this operation. This is straightforward
when it comes to the numerical types.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
items = [4, 5, 3, 1, 2]
items.sort()
print(items)
</script></pre></div>

Strings also implement comparison based on order of the characters' alphabetical
(and numerical values).

- [`sorted(iterable)`](https://docs.python.org/3/library/functions.html#sorted){:target="_blank"}:
produces a list of sorted items taken from an iterable object.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
items = "Banana Apple Durian Cherry".split()
print(sorted(items))
</script></pre></div>

Both `.sort` and `sorted` accept two optional keyword arguments.

- `key`: a function with one input argument. Key is applied to each item before
comparing them. The default is `None`.
- `reverse`: a Boolean, reverses the sorting order if equal to `True`. The default
value is `False`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def last_char(s):
    return s[-1]

items = "Banana Apple Durian Cherry".split()
print(sorted(items, key=last_char, reverse=True))
</script></pre></div>

### Map and Filter

Python's built-in `map` and `filter` functions allow working with iterables without
using loops or if statements.

- [`map`](https://docs.python.org/3/library/functions.html#map){:target="_blank"}:
accepts a function and at least one iterable. `map` applies the input function
on each item of an iterable. The function's inputs must match the number of
input iterables, e.g., in `map(func, iterable)`, `func` must accept a single
argument, and for `map(func, iterable1, iterable2)`, `func` must accept two
inputs.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
nums = list(range(10))
nums_squared = map(lambda x: x**2, nums)

print( list(nums_squared) )
</script></pre></div>

> `map` returns a `map` object instead of the original iterable type and
uses a "lazy" evaluation. Use `list`, `tuple`, `dict`, etc. to convert the output
to your desired type of iterable. You can use any function with any number of
outputs.

- [`filter`](https://docs.python.org/3/library/functions.html#filter){:target="_blank"}:
accepts a function and an iterable. The `function`
should return either `True` or `False` (and `None`) and it works as a filter
over the items in the `iterable`. All the elements of the input iterable that
produce `False` are removed.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
items = "Banana Apple Durian Cherry".split()
six_letter_words = filter(lambda s: len(s) == 6, items)

print( list(six_letter_words) )
</script></pre></div>

### Getting Help

You will most likely forget about the commands you have learned so far. It
could be a name, or number or type of inputs, or usage of a command. This is
completely fine and you should expect it.

> I forget commands' inputs and usage details all the time.

So what do you do if you forget a command or its usage? You will need a way to
find commands that you need together with their usage details, a.k.a.
*documentation*. Below is my "method", feel free to modify and adapt it to your
own working style.

- *Somewhat familiar with the command*: use `help` function to lookup its documentation.
`help` is useful when you want to remind youself on the usage details.
- *Know the name but not familiar*: use the command and observe its outputs and errors.
Then, use `help` and search engine for the command's documentation and examples.
- *Forgot the command or not familiar with it*: use your preferred search engine
for command's name and documentation, usage examples, and tutorials. E.g.,
"format float in python".
- *You have defined a clear goal but don't know where to start*: use AI (chat) agent,
AI search, etc., to draft your code. Then, use `help` or Python documentation to
explore and edit your draft. Start small with a few lines of code and build on it.

> AI is very useful when you get stuck while coding. Be careful not to
generate very long code (e.g., `>>10-20` lines). Code with too many lines is
difficult to read and debug. Try to build your code line by line.

### Exercises

---
**E1:** Complete the code below so that it prints a string with sorted characters
`123ABCabc`. Use the list's `.sort()` method. You may find `list(...)` and
string's `"".join(...)` useful for this task.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
chars = "AaBbCc123"
#> Don't edit above
?

#> Don't edit below
print(chars)
</script></pre></div>

---

**E2:** Please write a key using a lambda function that returns the last letter
of an input word. The `sorted` function below should return sorted list of
words based on the last letter of each word.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def inspect(s):
    print(s)
    return s

items = "Banana Apple Durian Cherry".split()
print(sorted(items, key=lambda ?))
</script></pre></div>

> You may also find the included `inspect` function useful to check what
`sorted` "sees" when applying the `key` to the elements of the
list.

---
**E3:** Use `sorted`, `abs`, `map`, and `filter` to complete the code below.
The final `print` should print a *sorted* sequence of numbers that
*excludes* all numbers with absolute values (`abs(x)`) between 3-7,
including 3 and 7. For example, an original sequence

```sh
original: 8, -9, 3, 5, 8, -10, -4, 7, 5, -2
```

should look like this after processing it:

```sh
filtered: -10, -9, -2, 8, 8
```

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
import random
random.seed(0) # for reproducibility

def random_numbers(n):
    '''returns a list of `n` random numbers between [-10, +10]'''
    rand_nums = map(lambda x: random.randrange(-10, 11), range(n))
    return list(rand_nums)

nums = random_numbers(10)
print('original:', ", ".join(map(str,nums)))
#> Don't edit above

final = ?

#> Don't edit below 

print('filtered:', final)
</script></pre></div>

> Comment out the `random.seed(0)` to try out your code with random sequences.

---
**E4:** Use `help` to lookup help on `sum`, `max`, and `min`. Apply these commands
on `range(10)`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
help(sum)
</script></pre></div>

---

<div class="prevnextlinks">
    <a id="previous" href="10">Previous: Loops</a>
    <a id="next" href="12">Next: Errors</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
