---
layout : page
title: Strings
permalink: /introduction/03
---

We now know that Python executes your code sequentially line-by-line, and how
you can do basic arithmetics in it. Next, let's see how Python represents text.
We actually used strings when we were printing greeting text.

In Python, *strings* represent text and you define them with `' '` or `" "`. E.g.,
`'this is a string'` and `"this is also a string"`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print('this is a string')
print("this is also a string")
</script></pre></div>

Strings can contain quotes and other special characters.

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

> Learn more about special characters or *escape sequences* such as `\n` (new line) from
[the official documention](https://docs.python.org/3/reference/lexical_analysis.html#escape-sequences){:target="_blank"}

#### Raw Strings

If you want Python to *not* interpret an escape sequence, you may prefix a string
with `r` to create a *raw* string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(r"This characters \n are on the same line")
print(r'\t is a tab and \n is a new line sequences')
</script></pre></div>

Run the above print commands with and without `r` prefix to see the differences
between raw and regular Python strings. Raw strings produce regular strings but
without the need to use of escape backwards slash `\` when defining a string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(r"These two strings are the same \n")
print("These two strings are the same \\n")
</script></pre></div>

#### String Concatenation and Length

You can concatenate (join) multiple strings together using `+`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("First" + "Second" + "Third" + "...")
</script></pre></div>

To get the length of a string, the number of charachters in a string, use `len` function.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(len("Hello"))
</script></pre></div>

#### F-Strings

> [Formatted string literals](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals){:target="_blank"}

F-strings allows you to include and format the value of Python expression into
a string. To define a formatted string, use `f` or `F` prefix and insert the expression
in curly braces `{expression}` when writing a string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(f"Length is {len("Hello")} characters.")
</script></pre></div>

### Debug a Syntax Error

Oh no! I broke the Python grammar rule. Fix the following code so that it prints
two lines.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("Neo: 'I know kung-fu'\nMorpheus: 'Show me'')
</script></pre></div>
<div class="prevnextlinks">
    <a href="02">Previous: Arithmetics</a>
    <a href="04">Next: Variables</a>
</div>
