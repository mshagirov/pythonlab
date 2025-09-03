---
layout : page
title: Containers
permalink: /introduction/08
---

Containers provide a convenient way to store and work on a collection of objects.
For instance, a list of files in a folder, lines of text in a text file, and an
array of numbers (vector) are all examples of collections.

Since you *iterate* to traverse over their contents, all such containers are
called *iterable* objects. Below we will go through these iterables and learn
about their features.

### Iterables

- `list` and `tuple` : lists and tuples represent *ordered* sequences. Both
`list` and `tuple` are container object types that can store *any* Python object
including other lists and tuples. The difference between the lists and tuples is
that lists' values can be updated and modified after they are created, whereas
tuples are immutable and can't be updated once created.
- `str` : string is also an example of ordered *immutable* sequence of characters.
Hence, a lot of methods and functions that work with `list` and `tuple` also work
with `str`.

> Immutable objects can't be modified after they are created. `str` and `tuple`
are examples of immutable sequence types.

Examples of Python containers with *unordered* collections are dictionaries and sets.
You can also store any type of Python object in dictionaries and sets.

- `dict`: dictionaries store objects as key-value pairs or key-value maps and
do not guarantee the order of the collection unlike lists and tuples.
- `set` : sets are also not ordered. They are collections of  *unique* immutable
objects and implement the concept of mathematical sets.

Lists, tuples, dictionaries, sets, and strings are examples of most commonly used
container types. Python also has other built-in iterable types.
If you are interested, see
[the official documentation](https://docs.python.org/3/library/collections.html#module-collections){:target="_blank"}
for more information on other container types.

### Lists

To initialise a `list` you can use either an empty list `[]` or call `list()`.
You can add and remove list elements, and modify elements after you create the
list.

- `append` method adds a new element,
- `extend` extends the list by adding another lists' elements to a list,
- *concatenate two or more lists* using `+` operator (add lists together), and
- `len` with a list as an input argument returns the number of list elements
(list's length).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = []
print(fruits)

fruits.append('apple')
print(fruits)

fruits.extend(['banana', 'cherry'])
print(fruits)

fruits = fruits + ['durian', 'longan']
print(fruits)
print("Length:", len(fruits))
</script></pre></div>

Access and update list's elements using their *indices*. An index of an element
represents its position within a list.

- *Indexes start at 0*. E.g., let's create and modify an array with these items:

|Index |    0   |    1    |    2    |
|:----:|:------:|:-------:|:-------:|
| Item | `apple`|`banana` | `cherry`|

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "banana", "cherry"]
print(fruits)

fruits[1]  = "longan"
print(fruits)
</script></pre></div>

- You can also use negative indexes to access and update items by counting from
the end of the list. `-1` refers to the last element, and the first element (index=0)
can be accessed with index `-len(...)`:

|Index |   -3   |   -2    |    -1   |
|:----:|:------:|:-------:|:-------:|
| Item | `apple`| `banana`| `cherry`|

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "banana", "cherry"]

print(fruits[-1])
print(fruits[-len(fruits)])
</script></pre></div>

> Remember that (positive) indexing starts with zero and `fruits[len(fruits)]`
will results in an error as the last index is `len(fruits)-1`.

- `pop` method *removes and returns* the last element of the list, if an
optional index argument is given `pop(index)` will pop an element at the given index.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "cherry", "banana", "durian"]
print(fruits)

last = fruits.pop()
print(last)
print("after pop:", fruits)

second = fruits.pop(1)
print(second)
print("after pop:", fruits)
</script></pre></div>

> `pop`, `append`, and `extend` are instance methods which means that you call
them on each instance of a list object. E.g., `fruits` is an instance of a `list`
and you call its methods with `fruits.append(...)`, `fruits.pop(...)`, and
`fruits.extend([...])`.

Access, update, or copy a portion of a list using list *slicing* with optinal
start index, stop index (exclusive) and step size.

- `[:]` refers to all items of the list,
- `[s:]` refers to all items starting from the `index=s` inclusive of `s`,
- `[:e]` refers to all items before but not including `index=e`
(excluding `e`),
- `[::n]` refers to every item with `n` step size (default step size is 1),
- `[s:e:n]` combines start, end, and step.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "cherry", "banana", "durian"]
fruits[::2] = ["melon", "watermelon"]

print(fruits)
</script></pre></div>

- When using slices without either start or stop, i.e., `[:]`, `[s:]`, and
`[:e]`, length of left and right sides of the assignment do not need to be the
same.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "cherry", "banana", "durian"]
fruits[2:] = 5*["melon"]

print(fruits)
</script></pre></div>

> `N*[...]` is equivalent to adding or concatenating a list to itself `N` times.
E.g., `['melon']*5` results in `['melon', 'melon', 'melon', 'melon', 'melon']`.

- You can use `del` function with slices to delete contents of a list.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "cherry", "banana", "durian"]
del fruits[-2:]

print(fruits)
</script></pre></div>

> To clear all elements of the list you can either use `del fruits[:]` or
`fruits.clear()`. You can learn more about list methods from
[the documentation](https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types){:target="_blank"}.

- For lists, slices return a copy of a portion of a list when slices are used as
values for assignment.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "cherry", "banana", "durian"]

other = fruits
print(fruits is other)

fruits_copy = fruits[:]
print('Identity:', fruits is fruits_copy)
print('Equality:', fruits == fruits_copy)
</script></pre></div>

In Python, `is` checks the object identity. If two objects are the same objects,
`is` statement returns `True` and returns `False` otherwise. Identity is different
from `==` which checks for equality (of values).

> In the code above, we assigned a second name to the `fruits` list, both `other`
and `fruits` refer to the same list. This can be verified by running
`print(fruits is other)`.

### Tuples

As mentioned above, tuples are also ordered sequences of objects similar to
lists. Compared to lists, you can not modify a tuple after its creation. Hence,
tuples don't have methods for appending or extending tuple instances.

- Use `( item1, item2, ...)` to create a new tuple with given items.
- To add a new item, extend, or concatenate tuples you need to create a new
`tuple` object.
- You can also create a tuple with a single item by including a comma in
`(item,)`, Python otherwise ignores the parentheses.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ('melon', 'apple', 'banana')
print(fruits)

new_fruits = fruits[1:] + ('cherry',)
print(new_fruits)
</script></pre></div>

When you print a tuple, `print` shows items surrounded by parentheses `(` and `)`.

> To create an empty tuple, use `tuple()`. `tuple(LIST)` converts an input list
or other iterable `LIST` into a `tuple` object.

- You can get slices of a tuple using `[start:stop:step]` similar to the lists.

Use slicing to obtain a new tuple with *with every 2nd item* of an original tuple
*excluding the last item* (i.e., we need `('apple', 'durian')`).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ('melon', 'apple', 'banana', 'durian', 'longan')
last_two = fruits[?]
print(last_two)
</script></pre></div>

### Strings

You can use indexing and slicing to access and obtain sub-strings of a string
just like lists and tuples. `str` objects are immutable and you can't modify
a string after creating it.

For convenience, `str` objects have instance methods for spliting, joining,
and modifying an existing string by creating new strings and lists of strings.

- `replace`

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>

</script></pre></div>

- `split`
- `join`

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>

</script></pre></div>

> For more information on string methods, see
[official documentation](https://docs.python.org/3/library/stdtypes.html#string-methods).

### Dictionaries

- creating, appending, deleting
- key must be hashable ...
- looping and indexing
- `.get()`

sets,

- `.add(item)` and `.remove(item)`

### Membership Testing

`in` and `not in` keywords

<div class="prevnextlinks">
    <a id="previous" href="07">Previous: Scope</a>
    <a id="next" href="09">Next: Logical Flow</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
