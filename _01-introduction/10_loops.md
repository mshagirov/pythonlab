---
layout : page
title: Loops
permalink: /introduction/10
---

Loops in programming allow executing a block of code multiple times over and over
until a certain condition is met. They are essential in automating repetitive tasks,
like creating, reading, and processing lists and other iterable objects. Python
has two primary types of loops, *for loops* and *while loops*. Furthermore,
Python also provides mechanisms like `break` and `continue` keywords for controlling
the loop behaviours.

Let's see how to define and use loops with the `break` and `continue` keywords.

### For Loops

You need the following to define a *for loop* in Python:

- a variable,
- `in` keyword, and
- an *iterable* object, like a list or tuple.

```python
for variable in iterable:
    # code block to execute
```

The number of *iterations* of a for loop, the number of times the loop is executed,
is determined by the length of the iterable. The loop automatically assigns a
value for the `variable` using the next value from the `iterable` starting with
the first item at the first iteration. The `variable` then can be used in the
*indented* block of code. The indented code is repeatedly executed during
each execution of the loop.

### Help Me Fix This Code

Run the code below to see what it does. It should

- iterate over the items in a shopping basket, and
- print the name of the item and its index in the basket.

In the end, we need to print the total number of items in a list.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
count = 0

for k in basket:
    print(count, ':', k)
count += 1

print(f'\n{count} items')
</script></pre></div>

> In the above, we are manually tracking the index number. This is not the usual
practice as we are mostly interested about the value itself and not its index.
We generally don't need to keep track of the index or count the length of the
iterable when using loops since the for loop keeps track of the items in an iterable
for us.

### Range

Sometimes you may need to explicitly control a loop to run it for a certain
number of iterations or you may just need a sequence of integers in your loop.
Python's `range` allows us to do just that. `range` is a
type of iterable that defines a range of numbers as its name suggests. For example,
`range(10)` defines a range of numbers 0--9 with length 10.

- `range(stop)`: a range of `int` numbers from 0 to `stop-1`.
- `range(start, stop)`: a range of integers from `start` to `stop-1`, where `stop`
must be larger than or equal to `start`.
- `range(start, stop, step)`: same as the above, but with a custom `step` size
(default step is 1). For a negative `step` size, `stop` should be less than `start`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
for i in range(5):
    print(i)
</script></pre></div>

> Ranges can be easily converted to lists and tuples by calling the `list()` and
`tuple()` constructors. E.g., `list(range(5))` creates a list of numbers
0 to 4.

### Dictionaries, Enumerate, and Zip

Iterating over `list` and `tuple` objects gives us their items' values. When you
iterate over `dict` objects you iterate over their keys.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
info = {'name': 'Hatta', 'occupation': 'Hatter', 'nationality': 'Wonderland'}

for key in info:
    print(key)
</script></pre></div>

To access the values, you can use the keys as indices with `info[key]`. Alternatively,
you can use `.values()` or `.items()` methods to access the values, or key-value
pairs, respectively.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
info = {'name': 'Hatta', 'occupation': 'Hatter', 'nationality': 'Wonderland'}

for key, val in info.items():
    print(key, ':', val)
</script></pre></div>

> `for value1, value2, ... in iterable` allows iterating over nested iterables,
like list of lists, tuple of tuples, etc. In the above, `dict` items is a nested
iterable of key-value pairs, `[(key1, value1), (key2, value2), ...]`.

You can use the latter feature of the for loop together with Python's
`enumerate` and `zip` functions to iterate over multiple iterables.

- `enumerate(iterable)` : enumerates the iterable by adding a counter for each
item in an iterable.

Let's enumerate the items in the shopping basket from the first example.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    print(f"{id} {val}")
</script></pre></div>

- `zip(iterable1, iterable2, ...)`: combines multiple interables into a
single iterable with items from multiple input iterables `iterable1`, `iterable2`,
etc. The length of the *zipped* iterable object is determined by the input with
the shorted length.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

for char, val in zip(letters, basket):
    print(f"{char}) {val}")
</script></pre></div>

> You can also use `zip` together with `enumerate` to simultaneously count and
zip items during iteration, `for id, (val1, val2, ...) in enumerate(zip(...)):`.

### Controlling Loops with continue and break Keywords

Python provides control over the loop using `continue` and `break` keywords.

- `continue`: continues to the next iteration and ignores the rest of the code
block below.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    if id%2 == 0:
        print(id)
        continue
    print(id, val)
</script></pre></div>

- `break` : breaks out of the loop. Stops the loop and continues to the code
outside the loop.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    if id == 2:
        break
    print(id, val)
</script></pre></div>

### While Loops

A *while loop* is similar to the for loop above. Instead of executing for
a given number of iterations like the for loop, the while loop executes
while a given `condition` is true.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
counter = 0

while counter < 5:
    print(counter)
    counter += 1
</script></pre></div>

Similar to the for loop, you can use `break` and `continue` to control the
while loop's execution.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
counter = 0

while counter < 10:
    if counter%2 != 0:
        counter += 1
        continue
    print(counter)
    counter += 1
</script></pre></div>

### Terminating While Loops

What happens when you comment out or remove one of the lines that increments the
counter `counter += 1` inside the while loop above?

- Comment out the first line with the counter increment. Run the code.
- Keep the first counter and comment out the second line with the counter increment.
Run the code again.
- **Reload this webpage to stop the execution of the while loop**.

As you may have noticed, the while loop never terminates and continues on
until you reload the page and stop the Python interpreter. This is an example of
an *infinite while loop*. We get it when the while loop does not terminate.

> Usually you want to terminate your loops, but in some cases infinite loops may
be useful. This website is served using an infinite loop. The same is true
for your browser. It is running continuously in an infinite loop while waiting
for your input actions!

<div class="prevnextlinks">
    <a id="previous" href="09">Previous: Logical Flow</a>
    <a id="next" href="11">Next: Useful Tools</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
