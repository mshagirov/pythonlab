<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
</script>

<p>
	Python has many other additional features for working with various data types and files,
	networking, cryptography, multithreading and more. We have seen only the most commonly used Python
	features. To complete our knowledge of basic Python, let&#39;s learn a few more features that you
	may find useful in your future projects.
</p>

<h3>Iterable Unpacking</h3>

<p>
	As you are already aware, you can assign multiple variables using multiple values and variable
	names. For instance,
</p>

<Code lang="python" code={String.raw`x, y = 42, "abc"`} />

<p>
	assigns <code>x</code> and <code>y</code>. This type of assignment is called
	<em>tuple unpacking</em>
	as the right-hand side of the assignment creates a tuple using comma-separated values,
	<code>42, &quot;abc&quot;</code>.
</p>

<p>
	Similarly, tuples and other iterables can be unpacked into other tuples using the star (<code
		>*</code
	>) notation, where &quot;*&quot; groups the remaining values into a list.
</p>

<PyCell
	code={String.raw`name, *location, population = 'Singapore', '1.35°N', '103.82°E', 6_037_000

print(name)
print(location)
print(f'{population:,}')`}
/>

<p>
	You can also use <code>_</code> to ignore a value (or <code>*_</code> to ignore multiple values) during
	assignment.
</p>

<PyCell
	code={String.raw`name, *_ = "Singapore", "1.35°N", "103.82°E", 6_037_000
print(name)`}
/>

<h3>Lambda Functions</h3>

<p>
	<em>Lambda function</em> is a term used for anonymous functions in Python. Anonymous functions do
	not have names like a usual function that you define with <code>def</code>. They are generally
	short convenience functions, defined and used on the fly and then thrown away.
</p>

<ul>
	<li>
		<code>lambda var1, ...: code</code>: defines a lambda function. The function takes in variables
		<code>var1</code>, ..., and executes a given single line of short code.
	</li>
</ul>

<PyCell
	code={String.raw`add = lambda a, b: a + b
print(add(5, 10))`}
/>

<blockquote>
	<p>
		You may find lambda functions useful as inputs to other functions. See below for more examples.
	</p>
</blockquote>

<h3>Comprehensions</h3>

<p>
	Python comprehensions are a concise and efficient method for creating new sequences. For example,
	instead of writing a for loop to create a list:
</p>

<Code
	lang="python"
	code={String.raw`l = []
for i in items:
    l.append(i)`}
/>

<p>You could use a <em>list comprehension</em>:</p>

<ul>
	<li><strong>List comprehension</strong> : <code>[i for i in items]</code></li>
</ul>

<PyCell
	code={String.raw`l = [c for c in "Hello there!"]
print(l)`}
/>

<p>
	Similarly, Python also offers methods for building <code>dict</code> and <code>set</code> iterables.
</p>

<ul>
	<li>
		<strong>Dictionary comprehension</strong>: <code>&#123;k: v for k, v in iterable&#125;</code>
	</li>
	<li><strong>Set comprehension</strong>: <code>&#123;k for k in items&#125;</code></li>
</ul>

<p>Comprehensions can be used with <code>if</code>clause to build filtered sequences.</p>

<ul>
	<li><strong>Conditional filter</strong>: <code>[i for i in items if condition]</code></li>
</ul>

<PyCell
	code={String.raw`l = [c for c in "Hello there!" if c!="e"]
print(l)`}
/>

<blockquote>
	<p>You can create tuples by converting lists that you build using the list comprehension.</p>
</blockquote>

<h3>Sorting</h3>

<p>
	Python has two related functions for sorting, <code>list.sort</code> and <code>sorted</code>. The
	first is a list instance method that sorts the values of a list and hence used only with the list
	objects. The latter is a more general sorting function that takes in an input iterable and outputs
	a sorted list of values.
</p>

<ul>
	<li>
		<a
			href="https://docs.python.org/3/library/stdtypes.html#list.sort"
			target="_blank"
			rel="noopener"><code>list.sort()</code></a
		>: sorts the items&#39; values of the list in place. <code>sort</code> uses <code>&lt;</code>
		comparison, so the list items must support this operation. This is straightforward when it comes to
		the numerical types.
	</li>
</ul>

<PyCell
	code={String.raw`items = [4, 5, 3, 1, 2]
items.sort()
print(items)`}
/>

<p>
	Strings also implement comparison based on order of the characters&#39; alphabetical (and
	numerical values).
</p>

<ul>
	<li>
		<a href="https://docs.python.org/3/library/functions.html#sorted" target="_blank" rel="noopener"
			><code>sorted(iterable)</code></a
		>: produces a list of sorted items taken from an iterable object.
	</li>
</ul>

<PyCell
	code={String.raw`items = "Banana Apple Durian Cherry".split()
print(sorted(items))`}
/>

<p>Both <code>.sort</code> and <code>sorted</code> accept two optional keyword arguments.</p>

<ul>
	<li>
		<code>key</code>: a function with one input argument. Key is applied to each item before
		comparing them. The default is <code>None</code>.
	</li>
	<li>
		<code>reverse</code>: a Boolean, reverses the sorting order if equal to <code>True</code>. The
		default value is <code>False</code>.
	</li>
</ul>

<PyCell
	code={String.raw`def last_char(s):
    return s[-1]

items = "Banana Apple Durian Cherry".split()
print(sorted(items, key=last_char, reverse=True))`}
/>

<h3>Map and Filter</h3>

<p>
	Python&#39;s built-in <code>map</code> and <code>filter</code> functions allow working with iterables
	without using loops or if statements.
</p>

<ul>
	<li>
		<a href="https://docs.python.org/3/library/functions.html#map" target="_blank" rel="noopener"
			><code>map</code></a
		>: accepts a function and at least one iterable. <code>map</code> applies the input function on
		each item of an iterable. The function&#39;s inputs must match the number of input iterables,
		e.g., in <code>map(func, iterable)</code>, <code>func</code> must accept a single argument, and
		for <code>map(func, iterable1, iterable2)</code>, <code>func</code> must accept two inputs.
	</li>
</ul>

<PyCell
	code={String.raw`nums = list(range(10))
nums_squared = map(lambda x: x**2, nums)

print( list(nums_squared) )`}
/>

<blockquote>
	<p>
		<code>map</code> returns a <code>map</code> object instead of the original iterable type and
		uses a &quot;lazy&quot; evaluation. Use <code>list</code>, <code>tuple</code>,
		<code>dict</code>, etc. to convert the output to your desired type of iterable. You can use any
		function with any number of outputs.
	</p>
</blockquote>

<ul>
	<li>
		<a href="https://docs.python.org/3/library/functions.html#filter" target="_blank" rel="noopener"
			><code>filter</code></a
		>: accepts a function and an iterable. The <code>function</code>
		should return either <code>True</code> or <code>False</code> (and <code>None</code>) and it
		works as a filter over the items in the <code>iterable</code>. All the elements of the input
		iterable that produce <code>False</code> are removed.
	</li>
</ul>

<PyCell
	code={String.raw`items = "Banana Apple Durian Cherry".split()
six_letter_words = filter(lambda s: len(s) == 6, items)

print( list(six_letter_words) )`}
/>

<h3>Getting Help</h3>

<p>
	You will most likely forget about the commands you have learned so far. It could be a name, or
	number or type of inputs, or usage of a command. This is completely fine and you should expect it.
</p>

<blockquote>
	<p>I forget commands&#39; inputs and usage details all the time.</p>
</blockquote>

<p>
	So what do you do if you forget a command or its usage? You will need a way to find commands that
	you need together with their usage details, a.k.a.
	<em>documentation</em>. Below is my &quot;method&quot;, feel free to modify and adapt it to your
	own working style.
</p>

<ul>
	<li>
		<em>Somewhat familiar with the command</em>: use <code>help</code> function to lookup its
		documentation.
		<code>help</code> is useful when you want to remind youself on the usage details.
	</li>
	<li>
		<em>Know the name but not familiar</em>: use the command and observe its outputs and errors.
		Then, use <code>help</code> and search engine for the command&#39;s documentation and examples.
	</li>
	<li>
		<em>Forgot the command or not familiar with it</em>: use your preferred search engine for
		command&#39;s name and documentation, usage examples, and tutorials. E.g., &quot;format float in
		python&quot;.
	</li>
	<li>
		<em>You have defined a clear goal but don&#39;t know where to start</em>: use AI (chat) agent,
		AI search, etc., to draft your code. Then, use <code>help</code> or Python documentation to explore
		and edit your draft. Start small with a few lines of code and build on it.
	</li>
</ul>

<blockquote>
	<p>
		AI is very useful when you get stuck while coding. Be careful not to generate very long code
		(e.g., <code>&gt;&gt;10-20</code> lines). Code with too many lines is difficult to read and debug.
		Try to build your code line by line.
	</p>
</blockquote>

<h3>Exercises</h3>

<hr />

<p>
	<strong>E1:</strong> Complete the code below so that it prints a string with sorted characters
	<code>123ABCabc</code>. Use the list&#39;s <code>.sort()</code> method. You may find
	<code>list(...)</code>
	and string&#39;s <code>&quot;&quot;.join(...)</code> useful for this task.
</p>

<PyCell
	code={String.raw`chars = "AaBbCc123"
#> Don't edit above
?

#> Don't edit below
print(chars)`}
/>

<hr />

<p>
	<strong>E2:</strong> Please write a key using a lambda function that returns the last letter of an
	input word. The <code>sorted</code> function below should return sorted list of words based on the last
	letter of each word.
</p>

<PyCell
	code={String.raw`def inspect(s):
    print(s)
    return s

items = "Banana Apple Durian Cherry".split()
print(sorted(items, key=lambda ?))`}
/>

<blockquote>
	<p>
		You may also find the included <code>inspect</code> function useful to check what
		<code>sorted</code> &quot;sees&quot; when applying the <code>key</code> to the elements of the list.
	</p>
</blockquote>

<hr />

<p>
	<strong>E3:</strong> Use <code>sorted</code>, <code>abs</code>, <code>map</code>, and
	<code>filter</code>
	to complete the code below. The final <code>print</code> should print a <em>sorted</em> sequence
	of numbers that
	<em>excludes</em> all numbers with absolute values (<code>abs(x)</code>) between 3-7, including 3
	and 7. For example, an original sequence
</p>

<Code lang="bash" code={String.raw`original: 8, -9, 3, 5, 8, -10, -4, 7, 5, -2`} />

<p>should look like this after processing it:</p>

<Code lang="bash" code={String.raw`filtered: -10, -9, -2, 8, 8`} />

<PyCell
	code={String.raw`import random
random.seed(0) # for reproducibility

def random_numbers(n):
    '''returns a list of ${'`'}n${'`'} random numbers between [-10, +10]'''
    rand_nums = map(lambda x: random.randrange(-10, 11), range(n))
    return list(rand_nums)

nums = random_numbers(10)
print('original:', ", ".join(map(str,nums)))
#> Don't edit above

final = ?

#> Don't edit below 

print('filtered:', final)`}
/>

<blockquote>
	<p>Comment out the <code>random.seed(0)</code> to try out your code with random sequences.</p>
</blockquote>

<hr />

<p>
	<strong>E4:</strong> Use <code>help</code> to lookup help on <code>sum</code>, <code>max</code>,
	and <code>min</code>. Apply these commands on <code>range(10)</code>.
</p>

<PyCell code={String.raw`help(sum)`} />
