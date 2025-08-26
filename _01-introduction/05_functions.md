---
layout : page
title: Functions
permalink: /introduction/05
---

#### How to Define a Function

Python uses `def` keyword to define a function. You will need to provide a name,
and optionally input parameter (arguments). A function must also have an
*indented body*, where you include your block of code that runs each time you run
(or *call*) the function.

```python
def FUNCTION_NAME(ARGS):
    BODY
```

To define an empty (template) function, that you indent to implement later, use
`pass` keyword. You must *always* include `(` and `)` after the name of the function,
even when you don't need to provide any input.

```python
def FUNCTION_NAME():
    pass
```

Run the code below. It should fail to run. Fix the code so that it prints
`Hello, World!`. Try setting `name` variable to your name (as a `str` in quotes
or double quotes).

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def greeter(name):
print(f"Hello, {name}!")

name = 'World'
greeter(name)
</script></pre></div>

> It is conventional to use **two space characters** for indentation.

#### Multiparameter Functions

#### Return Statement

E.g. when printing

#### Declaration and Usage Sequence

Variable and func: declare before using/calling.

#### Returning Multiple Values

#### Default values for func args

<div class="prevnextlinks">
    <a id="previous" href="04">Previous: Variables</a>
    <a id="next" href="06">Next: Scope</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
