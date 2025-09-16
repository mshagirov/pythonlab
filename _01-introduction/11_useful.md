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
name, *location, mass =  "Alice", 10, 42, 60

print(name)
print(location)
print(mass)
</script></pre></div>

You can also use `_` to ignore a value (or `*_` to ignore multiple values) during
assignment.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
name, *_ =  "Alice", 10, 42, 60

print(name)
</script></pre></div>

### Lambda Functions

*Lambda function* is a term for anonymous functions in Python. Anonymous functions
do not have names like the usual function defined using `def`. They are generally
short convenience functions defined and used on the fly and then thrown away.

- `lambda var1, ...: code`: defines a lambda function that takes in variables
`var1`, ..., and executes a given code. The code is usually a single line of
short code.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
add = lambda a, b: a + b
print(add(5, 10))
</script></pre></div>

> You may find lambda functions useful as inputs to other functions and to apply
simple operations on its inputs. See below for more examples.

### Sorting

Python has two related functions for sorting, `list.sort` and `sorted`. The first
is a list instance method that sorts the values of a list and hence used only with
the list objects. The latter is a more general sorting function that takes in an
input iterable and outputs a sorted list of values.

- `list.sort()`: sorts the items' values of the list in place. `sort` uses `<`
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

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
chars = list("AaBbCc123")
chars.sort()
print(chars)
</script></pre></div>

- `sorted(iterable)`: produces a list of sorted items taken from an iterable object.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
items = "Banana Apple Durian Cherry".split()
print(sorted(items))
</script></pre></div>

Both `.sort` and `sorted` accept two optional keyword arguments.

- `key`: a function with one input argument. Key is applied to each item before
comparing them. The default is `None`.

Let's use lambda function as a key to sort words based on the last letter of each
word.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
items = "Banana Apple Durian Cherry".split()
print(sorted(items, key=lambda s: s[-1]))
</script></pre></div>

- `reverse`: a Boolean, reverses the sorting order if equal to `True`. The default
value is `False`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
items = "Banana Apple Durian Cherry".split()
print(sorted(items, reverse=True))
</script></pre></div>

### Map and Filter

<div class="prevnextlinks">
    <a id="previous" href="10">Previous: Loops</a>
    <a id="next" href="12">Next: Errors</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
