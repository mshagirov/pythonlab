import{J as e,L as t,x as n,y as r,z as i}from"../chunks/BJyiuK88.js";import"../chunks/Ci6wYkGF.js";import{t as a}from"../chunks/BzAisrpb.js";import{t as o}from"../chunks/UsLUVTBu.js";var s=n(`<p>Loops in programming allow executing a block of code multiple times over and over until a certain
	condition is met. They are essential in automating repetitive tasks, like creating, reading, and
	processing lists and other iterable objects. Python has two primary types of loops, <em>for loops</em> and <em>while loops</em>. Furthermore, Python also provides mechanisms like <code>break</code> and <code>continue</code> keywords for controlling the loop behaviours.</p> <p>Let&#39;s see how to define and use loops with the <code>break</code> and <code>continue</code> keywords.</p> <h3>For Loops</h3> <p>You need the following to define a <em>for loop</em> in Python:</p> <ul><li>a variable,</li> <li><code>in</code> keyword, and</li> <li>an <em>iterable</em> object, like a list or tuple.</li></ul> <!> <p>The number of <em>iterations</em> of a for loop, the number of times the loop is executed, is
	determined by the length of the iterable. The loop automatically assigns a value for the <code>variable</code> using the next value from the <code>iterable</code> starting with the first item at the first
	iteration. The <code>variable</code> then can be used in the <em>indented</em> block of code. The indented code is repeatedly executed during each execution of the
	loop.</p> <p>E.g., the code below iterates over the items in a shopping basket and prints them.</p> <!> <blockquote><p>Generally, we don&#39;t need to keep track of the index or count the length of the iterable when
		using loops since the for loop keeps track of the items in an iterable for us.</p></blockquote> <h3>Range</h3> <p>Sometimes you may need to explicitly control a loop to run it for a certain number of iterations
	or you may just need a sequence of integers in your loop. Python&#39;s <code>range</code> allows
	us to do just that. <code>range</code> is a type of iterable that defines a range of numbers as
	its name suggests. For example, <code>range(10)</code> defines a range of numbers 0--9 with length 10.</p> <ul><li><code>range(stop)</code>: a range of <code>int</code> numbers from 0 to <code>stop-1</code>.</li> <li><code>range(start, stop)</code>: a range of integers from <code>start</code> to <code>stop-1</code>, where <code>stop</code> must be larger than or equal to <code>start</code>.</li> <li><code>range(start, stop, step)</code>: same as the above, but with a custom <code>step</code> size (default step is 1). For a negative <code>step</code> size, <code>stop</code> should be
		less than <code>start</code>.</li></ul> <!> <blockquote><p>Ranges can be easily converted to lists and tuples by calling the <code>list()</code> and <code>tuple()</code> constructors. E.g., <code>list(range(5))</code> creates a list of numbers 0 to
		4.</p></blockquote> <h3>Dictionaries, Enumerate, and Zip</h3> <p>Iterating over <code>list</code> and <code>tuple</code> objects gives us their items&#39; values.
	When you iterate over <code>dict</code> objects you iterate over their keys.</p> <!> <p>To access the values, you can use the keys as indices with <code>info[key]</code>. Alternatively,
	you can use <code>.values()</code> or <code>.items()</code> methods to access the values, or key-value
	pairs, respectively.</p> <!> <blockquote><p><code>for value1, value2, ... in iterable</code> allows iterating over nested iterables, like
		list of lists, tuple of tuples, etc. In the above, <code>dict</code> items is a nested iterable
		of key-value pairs, <code>[(key1, value1), (key2, value2), ...]</code>.</p></blockquote> <p>You can use the latter feature of the for loop together with Python&#39;s <code>enumerate</code> and <code>zip</code> functions to iterate over multiple iterables.</p> <ul><li><code>enumerate(iterable)</code> : enumerates the iterable by adding a counter for each item in an
		iterable.</li></ul> <p>Let&#39;s enumerate the items in the shopping basket from the first example.</p> <!> <ul><li><code>zip(iterable1, iterable2, ...)</code>: combines multiple interables into a single iterable
		with items from multiple input iterables <code>iterable1</code>, <code>iterable2</code>, etc.
		The length of the <em>zipped</em> iterable object is determined by the input with the shorted length.</li></ul> <!> <blockquote><p>You can also use <code>zip</code> together with <code>enumerate</code> to simultaneously count
		and zip items during iteration, <code>for id, (val1, val2, ...) in enumerate(zip(...)):</code>.</p></blockquote> <h3>Controlling Loops with continue and break Keywords</h3> <p>Python provides control over the loop using <code>continue</code> and <code>break</code> keywords.</p> <ul><li><code>continue</code>: continues to the next iteration and ignores the rest of the code block
		below.</li></ul> <!> <ul><li><code>break</code> : breaks out of the loop. Stops the loop and continues to the code outside the
		loop.</li></ul> <!> <h3>While Loops</h3> <p>A <em>while loop</em> is similar to the for loop above. Instead of executing for a given number of
	iterations like the for loop, the while loop executes while a given <code>condition</code> is true.</p> <!> <p>Similar to the for loop, you can use <code>break</code> and <code>continue</code> to control the while
	loop&#39;s execution.</p> <!> <h3>Exercises</h3> <hr/> <p><strong>E1:</strong> Help me fix the code below.</p> <ul><li>Run the code and see what it does.</li> <li>Fix the code so that it prints the name of the item with its index in the basket.</li> <li>The code should print the total number of items in a list in last line.</li></ul> <!> <hr/> <p><strong>E2:</strong> What happens when you comment out or remove one of the lines that increments
	the counter <code>counter += 1</code> inside the while loop below?</p> <ul><li>Run the code.</li> <li><strong>Reload this webpage to stop the execution of the code cell if gets stuck</strong>.</li></ul> <!> <ul><li>Uncomment the first line with the counter and comment out the second <code>counter += 1</code>. Run the code again.</li></ul> <p>As you may have noticed, the while loop never terminates and continues on until you reload the
	page and stop the Python interpreter. This is an example of an <em>infinite while loop</em>. We
	get it when the while loop does not terminate.</p> <blockquote><p>Usually you want to terminate your loops, but in some cases infinite loops may be useful. E.g.,
		this website is served using an infinite loop. The same is true for your browser. It is running
		continuously in an infinite loop while waiting for your input actions!</p></blockquote>`,1);function c(n){var c=s(),l=i(t(c),10);a(l,{lang:`python`,code:String.raw`for variable in iterable:
    # code block to execute`});var u=i(l,6);o(u,{code:String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for k in basket:
    print(k)`});var d=i(u,10);o(d,{code:String.raw`for i in range(5):
    print(i)`});var f=i(d,8);o(f,{code:String.raw`info = {'name': 'Hatta', 'occupation': 'Hatter', 'nationality': 'Wonderland'}

for key in info:
    print(key)`});var p=i(f,4);o(p,{code:String.raw`info = {'name': 'Hatta', 'occupation': 'Hatter', 'nationality': 'Wonderland'}

for key, val in info.items():
    print(key, ':', val)`});var m=i(p,10);o(m,{code:String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    print(f"{id} {val}")`});var h=i(m,4);o(h,{code:String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

for char, val in zip(letters, basket):
    print(f"{char}) {val}")`});var g=i(h,10);o(g,{code:String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    if id%2 == 0:
        print(id)
        continue
    print(id, val)`});var _=i(g,4);o(_,{code:String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']

for id, val in enumerate(basket):
    if id == 2:
        break
    print(id, val)`});var v=i(_,6);o(v,{code:String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
counter = 0

while counter < len(basket):
    print(basket[counter])
    counter += 1`});var y=i(v,4);o(y,{code:String.raw`counter = 0

while counter < 10:
    if counter%2 != 0:
        counter += 1
        continue
    print(counter)
    counter += 1`});var b=i(y,10);o(b,{code:String.raw`basket = ['apple', 'bread', 'cheese', 'durian', 'eggs']
count = 0

for k in basket:
    print(count, ':', k)
count += 1

print(f'\n{count} items')`});var x=i(b,8);o(x,{code:String.raw`counter = 0

while counter < 10:
    if counter%2 != 0:
        # counter += 1
        print(counter)
        continue
    print(counter)
    counter += 1`}),e(6),r(n,c)}export{c as component};