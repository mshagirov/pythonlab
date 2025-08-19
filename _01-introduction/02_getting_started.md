---
layout : page
title: Getting Started with Python
permalink: /introduction/02
---

## Strings

We saw strings when we were printing greeting text. In Python, strings represent
the *text* and defined with `' '` or `" "`. E.g., `'this is a string'` and
`"this is also a string"`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print('this is a string')
print("this is also a string")
</script></pre></div>

String can contain quotes and other special characters.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("You can also use 'quotes'")
print('and "double quotes"')
print('or include quotes \" and \' by escaping with \\ character')
</script></pre></div>

Here is an example of *new line* character `\n`:

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print('first line\nsecond line\nthird line')
</script></pre></div>

> You learn more about other special characters such as `\n` (new line) from
[the official documention](https://docs.python.org/3/reference/lexical_analysis.html#escape-sequences){:target="_blank"}

- Sequence of commands (serial execution).
- Syntax errors (will be helpful with debugging). Demo.
- Logical errors (unexpected behaviour)
- comments

### Variables

- updating/mutating variables (this is why it's called a variable)
- assignment: storing values
- naming variables: "snake_case", words are lowercase and separated by underscores

### Data Types

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

### Functions (basic) & Identation in Python

### Multiparameter Functions

### Return and Return None

E.g. when printing

### Declaration and Usage Sequence

Variable and func: declare before using/calling.

### Returning Multiple Values

### Default values for func args

## The Standard Library

Like many modern high-level programming languages Python comes with an assortment
of built-in functions and the standard library that provides a vast array of
out-of-the-box features to the "*default Python*".

> It is good to keep the official documentation of
[the python standard library](https://docs.python.org/3/library/index.html){:target="_blank"}
handy and to consult it when you are getting started with Python.

<div class="prevnextlinks">
    <a href="01"><h4>Previous: Syntax</h4></a>
    <a href="03"><h4>Next: ?</h4></a>
</div>
