---
layout : page
title: Strings
permalink: /introduction/03
---

In Python, *strings* represent text objects. Python uses single and double quotes,
`'...'` or `"..."`, to define a string. We have already used strings when
printing greeting text in the introduction page.

- `"..."` or `'...'`: a string object (text)

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print('special order')
print("special order")
</script></pre></div>

Strings can contain quotes and other special characters.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("single quotes '...'")
print('double quotes "..."')
print('or include quotes \" and \' by escaping with \\ character')
</script></pre></div>

For example, use `\n` to include the *new line* character. As its name suggests,
`\n` creates new lines in text files and in the printed output. These types of
characters that start with the backwards slash `\` are called *escape sequences*.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print('Priority One\nInsure the return of organism\nfor analysis.')
</script></pre></div>

> Learn more about special characters and *escape sequences* such as `\n`
(new line) from
[the official documention](https://docs.python.org/3/reference/lexical_analysis.html#escape-sequences){:target="_blank"}.

### Multiline Strings

You can define multi-line strings with `'''...'''` or `"""..."""`.
Multi-line strings defined in this way will retain their indentations and lines.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("""Priority One
Insure the return of organism
for analysis.""")
</script></pre></div>

### Raw Strings

Sometimes you want Python to *not* interpret an escape sequence. E.g., you
may want to keep `\n` as regular characters `\` and `n`. For this, create
a *raw* string by prefixing `r` to the string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(r"This characters \n are on the same line")
print(r'\t is a tab and \n is a new line sequences')
</script></pre></div>

- Raw strings produce regular strings but without a need to use the backwards slash
`\` (escape) when defining a string
- Run the print commands with and without
`r` prefix to see the differences between raw and regular Python strings.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(r"These are the same two strings\n")
print("These are the same two strings\\n")
</script></pre></div>

### String Concatenation and Length

You can concatenate (join) multiple strings together using `+`.

- `string1 + string2 + ...` : produces a new string that is composed of
the strings, `string1`, `string2`, etc. joined together

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("Weyland-" + "Yutani " + "Corporation")
</script></pre></div>

Use `len` function to get a string length, the number of characters in a string.

- `len(string)`: returns the length of the input string

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(len("cargo"))
</script></pre></div>

### F-Strings

> [Formatted string literals](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals){:target="_blank"}

Formatted strings, f-strings for short, allow you to include and format the value
of Python expression into strings. To define f-string, use `f` or `F` prefix and
insert Python expressions as placeholders in curly braces `{expression}`.

- `f'... {expression}'`: f-string evaluates the expression inside `{...}` first.
Then, the result is converted to its string representation.

For instance, the following evaluates an addition, formats, and prints the result
as a string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(f"The new route takes {8 + 10} months to reach Earth.")
</script></pre></div>

You are not limited to simple expressions like above, and you can use any valid
Python expression inside the placeholders. E.g., in the code below, we call `len`
function.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(f"Word 'Alien' is {len("Alien")} characters long.")
</script></pre></div>

### Exercises

---
**E1:** Debug a Syntax Error

- Oh no! I broke Python. Fix the following code so that it prints two lines.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("Neo: 'I know kung-fu'\nMorpheus: 'Show me'')
</script></pre></div>

---
**E2:** Inspect a String Object's Representation

- Run the following multiline string in the
[Python shell](/pythonlab/terminal/){:target="_blank"}.
- How does the *representation* of this string differ from what you've entered?

```python
"""Priority One
Insure the return of organism
for analysis."""
```

> You can also use built-in `repr` command with `print` to print the objects
representation in Python. E.g., `print(repr(...))`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(repr("""Priority One
Insure the return of organism
for analysis."""))
</script></pre></div>

---

<div class="prevnextlinks">
    <a id="previous" href="02">Previous: Arithmetics</a>
    <a id="next" href="04">Next: Variables</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}"></script>
