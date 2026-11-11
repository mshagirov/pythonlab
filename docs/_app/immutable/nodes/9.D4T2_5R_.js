import{L as e,x as t,y as n,z as r}from"../chunks/BJyiuK88.js";import"../chunks/Ci6wYkGF.js";import{t as i}from"../chunks/BzAisrpb.js";import{t as a}from"../chunks/UsLUVTBu.js";var o=t(`<h3>Variable</h3> <p><em>Variable</em> in programming represents a named location in <a href="https://en.wikipedia.org/wiki/Computer_memory" target="_blank" rel="noopener">memory</a> that stores a value. The value of a variable represents a specific type of data such as a number or
	a text.</p> <p>It is very simple to define a varible in Python, all you need is to <em>assign</em> a value to the
	variable with <code>=</code>.</p> <!> <ul><li><code>variable_name</code>: <em>Variable name</em> can be any alphanumeric sequence of
		characters that starts with a letter or an underscore <code>_</code>, e.g., <code>abc</code>, <code>ABC123</code>, <code>_abc123</code>.</li> <li><code>value</code>: <em>Value</em> can be any value with a built-in or valid user defined <em>type</em>, where the type refers to the type of the data stored in the memory, e.g., a text.</li></ul> <p>For example, the following defines a variable <code>username</code>, uses it in a f-string, and
	prints the result.</p> <!> <p>Here, the variable <code>username</code> refers to a string <code>Kenobi</code>.</p> <table><thead><tr><th align="center">Name</th><th align="center">Value</th></tr></thead><tbody><tr><td align="center"><code>username</code></td><td align="center"><code>&quot;Kenobi&quot;</code></td></tr></tbody></table> <p>You can also define multiple variables on a single line.</p> <!> <blockquote><p>Don&#39;t overuse this feature. It might be hard to read code with <code>&gt;2-3</code> variables
		defined on a single line, especially when you have long variable names. The future you will thank
		you if you write a code that is easier to read.</p></blockquote> <h3>Naming Variables</h3> <p>By convention, Python programmers use <em>snake case</em> when naming their variables. In snake
	case, characters are written in lower case and for multi-word names, the words are separated by
	underscore <code>_</code>. E.g., <code>user_id</code>, <code>circle_diameter</code>, etc. This is
	a not enforced by the Python interpreter but it is a preferred convention for code readability.</p> <!> <p>You may stray away from this convention in some cases. For instance, to include units of
	measurement, e.g., <code>force_N</code> doesn&#39;t use snake case as it contains an upper case character.</p> <!> <p>Be careful to NOT name your variables <code>int</code>, <code>float</code>, <code>string</code> or
	any other Python <em>key words</em>. This will override the default objects&#39; names and will
	lead to bugs in your code.</p> <blockquote><p>Unfortunately, Python interpreter does not enforce this as a rule and you just have to remember
		to not use these as variable names. For instance, <code>int=&quot;integer&quot;</code>, <code>str=2</code>, or <code>float=3.14</code> are valid syntax for defining variables. Try it for
		yourself, by defining some &quot;forbidden variables&quot; in the above cell and print them out, Python
		will happily run the code for you.</p></blockquote> <h3>Updating Variable&#39;s Value</h3> <p>To update or change the value of a variable, you simply assign it a new value.</p> <!> <h3>Types</h3> <p>Computer stores everything in its memory as a binary data composed of zeros and ones. The <em>type</em> of the data determines what these zeros and ones actually represent. The Python standard library comes
	with a wide range of built-in types that you can use to represent your data.</p> <p>We have already seen the following:</p> <ul><li><code>int</code>: Signed integers, e.g., <code>-423</code>, <code>0</code>, <code>12897</code>.
		Python automatically adjusts the size of an <code>int</code> in the memory (number of bytes) depending
		on the value of the integer.</li> <li><code>float</code>: Floats or <a href="https://en.wikipedia.org/wiki/Floating-point_arithmetic" target="_blank" rel="noopener">floating-point numbers</a> are a subset of real numbers that can be approximated with binary fractions. They are stored as 64-bit
		or <em>double precision</em> numbers in most Python implementations.</li> <li><code>str</code>: Strings in Python represent textual data. E.g., <code>&quot;Kenobi&quot;</code>, <code>&quot;Hello there!&quot;</code>.</li></ul> <table><thead><tr><th align="center">Name</th><th align="center">Value</th><th align="center">Type</th></tr></thead><tbody><tr><td align="center"><code>username</code></td><td align="center"><code>&quot;Kenobi&quot;</code></td><td align="center"><code>str</code></td></tr><tr><td align="center"><code>x</code></td><td align="center"><code>2</code></td><td align="center"><code>int</code></td></tr><tr><td align="center"><code>y</code></td><td align="center"><code>3.14</code></td><td align="center"><code>float</code></td></tr></tbody></table> <p>Additionally, Python also implements types for working with bytes, dates and times, and sequences.
	We will learn about more complex types such as sequences in the following sections. For a complete
	list of data types in Python refer to <a href="https://docs.python.org/3/library/stdtypes.html#built-in-types" target="_blank" rel="noopener">the official documentation</a>.</p> <h3>Boolean Type</h3> <p>Another frequently used type in Python is a <code>bool</code>.</p> <ul><li><code>bool</code> : <em>Boolean</em> type has two possible values <code>True</code> and <code>False</code> that represent truth values.</li> <li>To get a <em>logical complement</em> of a <code>bool</code> variable use the <code>not</code> operator.</li></ul> <p>We will use <code>bool</code> when doing logical operations and writing conditional statements (<em>if-else</em> statements).</p> <!> <p>When used with mathematical operations, Python implicitly casts <code>bool</code> to <code>int</code> or <code>float</code> and treats it as a number, <code>True</code> is 1, and <code>False</code> is 0.</p> <h3>None Type</h3> <p>In Python, <code>NoneType</code> represents a null or absence of a value. <code>NoneType</code> only has a single value <code>None</code>. Compared to other programming langugages, <code>None</code> in Python is a distinct object and doesn&#39;t represent zero value, e.g., these are NOT null in Python,
	an empty string <code>&quot;&quot;</code>, numerical <code>0</code>, etc. Also, note that <code>str</code> <code>&quot;None&quot;</code> is not the same as <code>None</code>.</p> <!> <p>When you print the <code>None</code> and a string <code>&quot;None&quot;</code> they appear to be
	the same. To determine if the variable is <code>NoneType</code> or just a string you can use the following:</p> <ul><li><code>repr</code> function</li></ul> <!> <ul><li>Use <code>is</code> or <code>==</code> to compare the value with actual <code>None</code>:</li></ul> <!> <ul><li>Or use one of the type checking methods in the next section, e.g., <code>type</code> or <code>isinstance</code>.</li></ul> <h3>Determining and Verifying Types</h3> <p>You can determine the type of a varible using <code>type()</code> method.</p> <ul><li><code>type(object)</code> takes in an object, variable or value, and returns the type of the
		object, <code>int</code>, <code>str</code> etc. You can further compare the value of the type
		obtained from this function with an actual target type using <code>is</code> and <code>==</code>.</li></ul> <!> <p>Alternatively, you can also use <code>isinstance</code> to verify type of a given variable instead of
	a comparison.</p> <ul><li><code>isinstance(object, type)</code> takes in the object and a type, and returns a <code>bool</code> value. <code>True</code> if the types match and <code>False</code> otherwise.</li></ul> <!> <h3>Type Casting</h3> <p>Type casting in programming means converting one type to another. For example, when you do
	mathematical operations on variables with <code>float</code> and <code>int</code> types, the
	interpreter implicitly <em>type casts</em> <code>int</code> to <code>float</code> (the result will
	have decimal <code>.</code>).</p> <!> <p>The decimal point <code>.</code> is used to define a <code>float</code>. E.g., <code>2.</code> is
	a <code>float</code> equal to <code>2.0</code>. Using division <code>/</code> always produces <code>float</code>, and floor division <code>\\\\</code> produces <code>int</code> unless one of the numbers is a <code>float</code>.</p> <!> <p>Sometimes you may want to <em>explicitly</em> convert one type to another. For instance, <code>int</code> to a <code>str</code>, or <code>float</code> to <code>int</code> etc. For this
	you may use Python&#39;s type casting <em>methods</em> to convert between types.</p> <ul><li><code>int(object)</code> : convert any compatible object to <code>int</code>.</li> <li><code>float(object)</code>: convert a compatible object to <code>float</code>.</li> <li><code>str(object)</code>: convert any object to its string representation.</li></ul> <blockquote><p>Note that when casting higher precision type <code>float</code> to a lower precision type <code>int</code> data loss may occur. Also, some values might not be compatible for type
		conversion, e.g., <a href="https://docs.python.org/3/library/functions.html#int" target="_blank" rel="noopener">non-numeric string to a numeric <code>int</code> or <code>float</code></a>.</p></blockquote> <!> <p>Below is another example that uses type casting with <code>int()</code> and <code>float()</code> methods.</p> <!> <p>The last two lines convert an <code>int</code> object with value <code>x + y</code> to a <code>float</code> and print it.</p> <h3>Dynamic Typing</h3> <p>Python is a <strong>dynamically typed</strong> language where Python automatically infers a variable&#39;s
	type when you run the code. This leads to less boilerplate code when defining variables and functions,
	and allows quicker prototyping. The dynamic typing comes at a cost as a lower performance (slower running
	code), and potentially runtime type errors.</p> <p>The performance hit is due to type checking of the variables by the interpreter during the runtime
	which takes up the CPU time. We have to accept it as a cost for convenience.</p> <p>On the other hand, the effect of the type errors can be minimised. For instance, if your code
	expects a certain type of data and you accidentally change the type of a variable, the interpreter
	will not be aware of the error until you run the code. E.g., the following might lead to runtime
	type errors:</p> <!> <p>You can avoid this by creating a new type of variable instead of overriding the old value and its
	type.</p> <!> <h3>Exercises</h3> <hr/> <p><strong>E1:</strong> Calculate Sum and Average</p> <ul><li>Complete the following code so that it computes and prints a sum and average of the numbers <code>x1</code>, <code>x2</code>, <code>x3</code>, and <code>x4</code>.</li></ul> <!>`,1);function s(t){var s=o(),c=r(e(s),6);i(c,{lang:`python`,code:String.raw`variable_name = value`});var l=r(c,6);a(l,{code:String.raw`username = "Kenobi"
print(f"General {username}!")`});var u=r(l,8);a(u,{code:String.raw`x, y = 2, 3.14

print(f"x: {x}")
print(f"y: {y}")`});var d=r(u,8);a(d,{code:String.raw`user_id = "Ripley"
print(f"{user_id} is logged-in.")`});var f=r(d,4);a(f,{code:String.raw`force_N = 0.21
area_m2 = 0.05

stress_Pa = force_N / area_m2
print(f"Stress (Pa): {stress_Pa}")`});var p=r(f,10);a(p,{code:String.raw`length = 42
print("old value:", length)

length = 1
print("new value:", length)`});var m=r(p,22);a(m,{code:String.raw`is_mutant = True
likes_pizza = not False

print("Mutant turtle:", is_mutant)
print("Likes pizza:", likes_pizza)`});var h=r(m,8);a(h,{code:String.raw`n, s = None, "None"
print(n, "(NoneType)")
print(s, "(str)")`});var g=r(h,6);a(g,{code:String.raw`n, s = None, "None"
print(repr(n), "(NoneType)")
print(repr(s), "(str)")`});var _=r(g,4);a(_,{code:String.raw`n, s = None, "None"
print(n is None, "(NoneType)")
print(s is None, "(str)")`});var v=r(_,10);a(v,{code:String.raw`x = 42
print(f"Is {x} int? {type(x) is int}")
print(f"Is {x} float? {type(x) is float}")`});var y=r(v,6);a(y,{code:String.raw`x = 42
print(f"Is {x} int?", isinstance(x, int))`});var b=r(y,6);a(b,{code:String.raw`x = 2
print(x + 2)
print(x + 2.)`});var x=r(b,4);a(x,{code:String.raw`x, y = 6, 3

print(x / y)
print(x // y)
print(x // 3.)`});var S=r(x,8);a(S,{code:String.raw`my_number = 4.2
text = "My number is " + str(my_number)
print(text)`});var C=r(S,4);a(C,{code:String.raw`x = int(3.14)
print(x, type(x))

y = int(" 2 ")
print(y, type(y))

z = float(x + y)
print(z, type(z))`});var w=r(C,12);i(w,{lang:`python`,code:String.raw`delta_t = 1
...
delta_t = "one hour"`});var T=r(w,4);i(T,{lang:`python`,code:String.raw`delta_t = 1
...
delta_t_info = "one hour"`});var E=r(T,10);a(E,{code:String.raw`x1, x2, x3, x4 = 44, 37, 40, 47
# DO NOT edit above this line

s = ?
avg = ?

# DO NOT edit below this line
print(f"sum = {s}; average = {avg}")`}),n(t,s)}export{s as component};