---
layout : page
title: Variables and Types
permalink: /introduction/04
---

*Variables* in programming represent named values with a location in
[memory](https://en.wikipedia.org/wiki/Computer_memory){:target="_blank"}
that stores its value. The value of a variable represents a specific type of
data such as a number or a text.

The *type* (data type) of a variable determines what its value actually represents.
Python standard library comes with a wide range of
[built-in types](https://docs.python.org/3/library/stdtypes.html#built-in-types){:target="_blank"}.
We already have seen *integers* (`int`), *floats* (`float`), and *strings*
(`str`) which respectfully represent, whole numbers, (approximate) real
numbers, and text objects. So far we have been using values directly without
*assigning* them (variable) names.

## Difining, Updating and Using Variables

It is very simple to define a varible in Python, all you need is:

```python
variable_name = value
```

where `variable_name` is any alphanumeric sequence of characters that start with
a letter or an underscore (`_`). `value` could be any value with a built-in or
valid user defined type.

> You can look up built-in types from Python documentation. We will not cover
user defined data types in this workshop session. I plan to demonstrate custom types
in the comming workshops that cover more advanced topics.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
my_name = "Alice"
__password__ = "p@sword123"
print("My name is", my_name)
print("My password:", __password__)
</script></pre></div>

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
force_N = 0.21
area_m2 = 0.05

stress_Pa = force_N / area_m2
print("Stress:", stress_Pa, "Pa")
</script></pre></div>

To update or change the value of a variable, you simply assign it a new value.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
length = 42
print("old value:", length)

length = 1
print("new value:", length)
</script></pre></div>



- assignment: storing values
- naming variables: "snake_case", words are lowercase and separated by underscores
- Logical errors (unexpected behaviour)
- comments

> Another frequently used type is a `bool`. The `bool` or *Boolean* type has two
possible values `True` and `False` that represent truth values.

- variable types: string, integer, float, boolean
- "type()" command
- None type
- Dynamic Typing: be carefull and updating values.
- Strings :
  - F-Strings examples
  - string concatination
- multivariable declaration/assignment

Exercise by computing mean (int/float), concat and format (strings/numbers),
examining variable types and updating variables (int, float, string, None,
boolean).  

<div class="prevnextlinks">
    <a href="03">Previous: Strings</a>
    <a href="05">Next: Functions</a>
</div>
