<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
</script>

<LessonSection id="loops">
	<h3>Loops</h3>

	<p>
		Loops in programming allow executing a block of code multiple times over and over until a
		certain condition is met. They are essential in automating repetitive tasks, like creating,
		reading, and processing lists and other iterable objects. Python has two primary types of loops, <em
			>for loops</em
		>
		and <em>while loops</em>. Furthermore, Python also provides mechanisms like <code>break</code>
		and
		<code>continue</code> keywords for controlling the loop behaviours.
	</p>

	<p>
		Let&#39;s see how to define and use loops with the <code>break</code> and <code>continue</code> keywords.
	</p>
</LessonSection>
<LessonSection id="for-loops">
	<h3>For Loops</h3>

	<p>You need the following to define a <em>for loop</em> in Python:</p>

	<ul>
		<li>a variable,</li>
		<li><code>in</code> keyword, and</li>
		<li>an <em>iterable</em> object, like a list or tuple.</li>
	</ul>

	<Code
		lang="python"
		code={String.raw`for variable in iterable:
    # code block to execute`}
	/>

	<p>
		The number of <em>iterations</em> of a for loop, the number of times the loop is executed, is
		determined by the length of the iterable. The loop automatically assigns a value for the
		<code>variable</code>
		using the next value from the <code>iterable</code> starting with the first item at the first
		iteration. The <code>variable</code> then can be used in the
		<em>indented</em> block of code. The indented code is repeatedly executed during each execution of
		the loop.
	</p>

	<p>E.g., the code below iterates over the items in a shopping basket and prints them.</p>

	<PyCell
		code={String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for k in basket:
    print(k)`}
	/>

	<blockquote>
		<p>
			Generally, we don&#39;t need to keep track of the index or count the length of the iterable
			when using loops since the for loop keeps track of the items in an iterable for us.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="range">
	<h3>Range</h3>

	<p>
		Sometimes you may need to explicitly control a loop to run it for a certain number of iterations
		or you may just need a sequence of integers in your loop. Python&#39;s <code>range</code> allows
		us to do just that. <code>range</code> is a type of iterable that defines a range of numbers as
		its name suggests. For example,
		<code>range(10)</code> defines a range of numbers 0--9 with length 10.
	</p>

	<ul>
		<li>
			<code>range(stop)</code>: a range of <code>int</code> numbers from 0 to <code>stop-1</code>.
		</li>
		<li>
			<code>range(start, stop)</code>: a range of integers from <code>start</code> to
			<code>stop-1</code>, where <code>stop</code>
			must be larger than or equal to <code>start</code>.
		</li>
		<li>
			<code>range(start, stop, step)</code>: same as the above, but with a custom <code>step</code>
			size (default step is 1). For a negative <code>step</code> size, <code>stop</code> should be
			less than <code>start</code>.
		</li>
	</ul>

	<PyCell
		code={String.raw`for i in range(5):
    print(i)`}
	/>

	<blockquote>
		<p>
			Ranges can be easily converted to lists and tuples by calling the <code>list()</code> and
			<code>tuple()</code> constructors. E.g., <code>list(range(5))</code> creates a list of numbers 0
			to 4.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="dictionaries-enumerate-and-zip">
	<h3>Dictionaries, Enumerate, and Zip</h3>

	<p>
		Iterating over <code>list</code> and <code>tuple</code> objects gives us their items&#39;
		values. When you iterate over <code>dict</code> objects you iterate over their keys.
	</p>

	<PyCell
		code={String.raw`info = {'name': 'Hatta', 'occupation': 'Hatter', 'nationality': 'Wonderland'}

for key in info:
    print(key)`}
	/>

	<p>
		To access the values, you can use the keys as indices with <code>info[key]</code>.
		Alternatively, you can use <code>.values()</code> or <code>.items()</code> methods to access the values,
		or key-value pairs, respectively.
	</p>

	<PyCell
		code={String.raw`info = {'name': 'Hatta', 'occupation': 'Hatter', 'nationality': 'Wonderland'}

for key, val in info.items():
    print(key, ':', val)`}
	/>

	<blockquote>
		<p>
			<code>for value1, value2, ... in iterable</code> allows iterating over nested iterables, like
			list of lists, tuple of tuples, etc. In the above, <code>dict</code> items is a nested
			iterable of key-value pairs, <code>[(key1, value1), (key2, value2), ...]</code>.
		</p>
	</blockquote>

	<p>
		You can use the latter feature of the for loop together with Python&#39;s
		<code>enumerate</code> and <code>zip</code> functions to iterate over multiple iterables.
	</p>

	<ul>
		<li>
			<code>enumerate(iterable)</code> : enumerates the iterable by adding a counter for each item in
			an iterable.
		</li>
	</ul>

	<p>Let&#39;s enumerate the items in the shopping basket from the first example.</p>

	<PyCell
		code={String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    print(f"{id} {val}")`}
	/>

	<ul>
		<li>
			<code>zip(iterable1, iterable2, ...)</code>: combines multiple interables into a single
			iterable with items from multiple input iterables <code>iterable1</code>,
			<code>iterable2</code>, etc. The length of the <em>zipped</em> iterable object is determined by
			the input with the shorted length.
		</li>
	</ul>

	<PyCell
		code={String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

for char, val in zip(letters, basket):
    print(f"{char}) {val}")`}
	/>

	<blockquote>
		<p>
			You can also use <code>zip</code> together with <code>enumerate</code> to simultaneously count
			and zip items during iteration,
			<code>for id, (val1, val2, ...) in enumerate(zip(...)):</code>.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="controlling-loops">
	<h3>Controlling Loops with continue and break Keywords</h3>

	<p>
		Python provides control over the loop using <code>continue</code> and <code>break</code> keywords.
	</p>

	<ul>
		<li>
			<code>continue</code>: continues to the next iteration and ignores the rest of the code block
			below.
		</li>
	</ul>

	<PyCell
		code={String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    if id%2 == 0:
        print(id)
        continue
    print(id, val)`}
	/>

	<ul>
		<li>
			<code>break</code> : breaks out of the loop. Stops the loop and continues to the code outside the
			loop.
		</li>
	</ul>

	<PyCell
		code={String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    if id == 2:
        break
    print(id, val)`}
	/>
</LessonSection>
<LessonSection id="while-loops">
	<h3>While Loops</h3>

	<p>
		A <em>while loop</em> is similar to the for loop above. Instead of executing for a given number
		of iterations like the for loop, the while loop executes while a given <code>condition</code> is true.
	</p>

	<PyCell
		code={String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
counter = 0

while counter < len(basket):
    print(basket[counter])
    counter += 1`}
	/>

	<p>
		Similar to the for loop, you can use <code>break</code> and <code>continue</code> to control the while
		loop&#39;s execution.
	</p>

	<PyCell
		code={String.raw`counter = 0

while counter < 10:
    if counter%2 != 0:
        counter += 1
        continue
    print(counter)
    counter += 1`}
	/>
</LessonSection>
<LessonSection id="fix-a-loop-counter">
	<h3>Fix a Loop Counter</h3>

	<p>Help me fix the code below.</p>

	<ul>
		<li>Run the code and see what it does.</li>
		<li>Fix the code so that it prints the name of the item with its index in the basket.</li>
		<li>The code should print the total number of items in a list in last line.</li>
	</ul>

	<PyCell
		code={String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
count = 0

for k in basket:
    print(count, ':', k)
count += 1

print(f'\n{count} items')`}
	/>
</LessonSection>
<LessonSection id="infinite-while-loops">
	<h3>Infinite While Loops</h3>

	<p>
		What happens when you comment out or remove one of the lines that increments the counter <code
			>counter += 1</code
		> inside the while loop below?
	</p>

	<ul>
		<li>Run the code.</li>
		<li>
			<strong>Reload this webpage to stop the execution of the code cell if gets stuck</strong>.
		</li>
	</ul>

	<ul>
		<li>
			Uncomment the first line with the counter and comment out the second
			<code>counter += 1</code>. Run the code again.
		</li>
	</ul>

	<p>
		Without a limit, this while loop would keep running until you stopped the Python interpreter.
		This is an example of an <em>infinite while loop</em>: its condition stays true, so the loop
		never terminates on its own. Below, we have set a limit of 100 iterations for the interpreter,
		after which it stops the loop with an error. You can safely run this example without worrying
		about it running forever.
	</p>

	<blockquote>
		<p>
			Usually you want to terminate your loops, but in some cases infinite loops may be useful.
			E.g., this website is served using an infinite loop. The same is true for your browser. It is
			running continuously in an infinite loop while waiting for your input actions!
		</p>
	</blockquote>

	<PyCell
		maxLoopIterations={100}
		code={String.raw`counter = 0

while counter < 10:
    if counter%2 != 0:
        # counter += 1
        print(counter)
        continue
    print(counter)
    counter += 1`}
	/>
</LessonSection>
