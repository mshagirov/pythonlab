# Python Introduction

## Applications

[Python](https://www.python.org/) is a general-purpose programming language
designed to be used for a wide range of domains. In addition to its versatility,
Python's intuitive syntax is relatively easy to read, and makes it perfect for
beginners as well as efficient for experienced code maintainers.

Most importantly, due to its wide adoption, Python boasts a vast ecosystem of
libraries, frameworks, and packages that extend its capabilities for diverse
tasks. These tasks or domains include, but not limited to,

- Server-side web development,
- Automation (a.k.a., scripting),
- Machine learning,
- Data analysis,
- "Scientific computing".

This workshop will mainly focus on the applications of Python using the
*science stack*. Science stack is a loosely defined term for a collection of packages
and libraries generally used for scientific computing. We will learn more about
science stack after we learn basic Python and practice writing some Python code.

## Getting Started with Python

### Language

Language:

- What is syntax?
- Python syntax: basic arithmetics, strings, printing instructions.
- Sequence of commands (serial execution).
- Syntax errors (will be helpful with debugging). Demo.
- Logical errors (unexpected behaviour)
- comments

#### Variables

- updating/mutating variables (this is why it's called a variable)
- assignment: storing values
- naming variables: "snake_case", words are lowercase and separated by underscores

#### Data Types

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

#### Functions (basic) & Identation in Python

#### Multiparameter Functions

#### Return and Return None

E.g. when printing

#### Declaration and Usage Sequence

Variable and func: declare before using/calling.

#### Returning Multiple Values

#### Default values for func args

### Whats in the Box?

> [Python standard library](https://docs.python.org/3/library/index.html)

Python comes with its standard library

Don't forget about "help"

### Scope: Variable and Function scopes

Scope, and global scope

### Working with Numb3rs

More on arithmetics and types.

Float and Integer operations.

Exponentials

Modulo operator `%`

`float("inf")`

In-place updates and `+=`, `-=`, `*=`, `/=`. Formatting numbers, scientific
notation, readability `1_000 is 1000`.

Logical operations and True/False keywords. `==`, `and`, `or`.

Side note: Binary numbers, bitwise operations `&`, `|`. Converting binary to decimal

### Logical Flow

Comparison operators: `<,>, <=, >=, ==, !=`.

If statements. Else, elif.

### Loops

For loops. Remember about identation. Range.

While loops.

### Collections

Lists,

- indexing (starts from 0!)
- access and mutate values stored in a list
- len()
- append, extend, pop
- looping over list elem-s, direct vs using indices
- slicing, negative indices, and `[:]`.
- list concat
- elem `in` or `not in` list
- `del` (delete list or its contents)

Tuples

dictionaries,

- creating, appending, deleting
- key must be hashable ...
- looping and indexing
- `.get()`

sets,

- `.add(item)` and `.remove(item)`

Strings

- string methods: split, join, replace.

### Dealing with Errors

Errors happen. Good to know error types, also helps with debugging. Exceptions
and try-except

Raising custom exceptions with `raise`
