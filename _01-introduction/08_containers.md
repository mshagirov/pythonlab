---
layout : page
title: Containers
permalink: /introduction/08
---

### Iterable Objects

You can use `list` and `tuple` to represent *ordered* sequences in Python. Both
`list` and `tuple` are container objects. They can store *any* Python object
including other lists and tuples.

String `str` is an example of ordered *immutable* sequence of characters in Python.
So, you might find a lot of methods and functions that work with `list` and `tuple`
also work with `str`.

Another example of containers in Python are `dict` and `set`. Dictionary or `dict`
objects also can store any type of Python object. Compared to `list` and `tuple`,
dictionaries store objects as key-value pairs or (key-value) maps and do not
guarantee the order of the collection. Sets , `set` objects, are an unordered
collection or *unique* and immutable elements.

All object types such as `list`, `tuple`, `str` and `dict` are called
*iterable* objects because you can *iterate* or traverse over their contents.

> Python also comes with other types of built-in collection types. See
[the official documentation](https://docs.python.org/3/library/collections.html#module-collections){:target="_blank"}
for more information.

### Lists

To initialise a `list` you can use either an empty list `[]` or call `list()`.
You can add and remove list elements, and modify elements after you create the
list.

- Use list instance methods `append` to add new elements, and `extend` to add
another lists' elements to a list.
- Use `len` to get the number of list elements (list's length).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = [] # create an empty list
print(fruits)

fruits.append('apple') # add str 'apple' to fruits list
print(fruits)

fruits.extend(['banana', 'cherry']) # extend
print(fruits)

fruits = fruits + ['durian'] # extend using "+"
print(fruits)
print("Length:", len(fruits))
</script></pre></div>

- Access list's elements using their indices. An index of an element represents
its position within a list. Indexes start at 0. You can update
(mutate) lists elements using these indices.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "cherry"] # new list
print(fruits[1]) # get the 2nd element (index=1)

fruits[0]  = "durian" # update the 1st element (index=0)
print(fruits)
</script></pre></div>

- `pop` instance method *removes and returns* the last element of the list, if an
optional index argument is given `pop` will pop an element at the given index.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
fruits = ["apple", "cherry", "banana", "durian"]
print(fruits)

last = fruits.pop()
print(last)
print("after pop:", fruits)

second = fruits.pop(1) # pop index=1
print(second)
print("after pop:", fruits)
</script></pre></div>

- slicing, negative indices, and `[:]`.
- list concat
- elem `in` or `not in` list
- `del` (delete list or its contents)

### Tuples

### Strings

- string methods: split, join, replace.

### Dictionaries

- creating, appending, deleting
- key must be hashable ...
- looping and indexing
- `.get()`

sets,

- `.add(item)` and `.remove(item)`

<div class="prevnextlinks">
    <a id="previous" href="07">Previous: Scope</a>
    <a id="next" href="09">Next: Logical Flow</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
