<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
</script>

<LessonSection id="containers">
	<h3>Containers and Collections</h3>

	<p>
		Containers provide a convenient way to store and work on a collection of objects. For instance,
		a list of files in a folder, pixel values of an image, or properties of datasets like a
		description, sample size, creation dates, and author, are all examples of collections.
	</p>

	<p>
		Since you iterate to traverse over their contents, all such containers are called iterable
		objects, <em>iterables</em> for short. Below we will go through common iterables in Python and learn
		about their features.
	</p>
</LessonSection>
<LessonSection id="iterables">
	<h3>Iterables</h3>

	<ul>
		<li>
			<code>list</code> and <code>tuple</code> : lists and tuples represent <em>ordered</em>
			sequences. Both
			<code>list</code> and <code>tuple</code> are container object types that can store
			<em>any</em> Python object including other lists and tuples. The difference between the lists and
			tuples is that lists&#39; values can be updated and modified after they are created, whereas tuples
			are immutable and can&#39;t be updated once created.
		</li>
		<li>
			<code>str</code> : string is also an example of ordered <em>immutable</em> sequence of
			characters. Hence, a lot of methods and functions that work with <code>list</code> and
			<code>tuple</code>
			also work with <code>str</code>.
		</li>
	</ul>

	<blockquote>
		<p>
			Immutable objects can&#39;t be modified after they are created. <code>str</code> and
			<code>tuple</code>
			are examples of immutable sequence types.
		</p>
	</blockquote>

	<p>
		Dictionaries and sets are examples of Python containers with <em>unordered</em>
		collections. You can also store any type of Python object in dictionaries. Sets, on the other hand,
		are for storing only immutable objects.
	</p>

	<ul>
		<li>
			<code>dict</code>: dictionaries store objects as key-value pairs or key-value maps and do not
			guarantee the order of the collection unlike lists and tuples.
		</li>
		<li>
			<code>set</code> : sets are also not ordered. They are collections of <em>unique</em> objects and
			implement the concept of mathematical sets. Sets themselves are mutable but store immutable objects.
		</li>
	</ul>

	<p>
		Lists, tuples, dictionaries, sets, and strings are examples of most commonly used container
		types. Python also has other built-in iterable types. If you are interested, see
		<a
			href="https://docs.python.org/3/library/collections.html#module-collections"
			target="_blank"
			rel="noopener">the official documentation</a
		>
		for more information on the other container types.
	</p>
</LessonSection>
<LessonSection id="lists">
	<h3>Lists</h3>

	<p>
		To initialise an empty <code>list</code>, you can either use <code>[]</code> or call
		<code>list()</code>. You can also create a list by including your items (objects) in the square
		brackets,
		<code>[item1, item2, ...]</code>. You can add and remove items to and from a list, and modify
		items inside the list after the list&#39;s creation. The following are common functions and
		methods you would use with lists.
	</p>

	<ul>
		<li><code>list()</code> or <code>[]</code>: create an empty <code>list</code>.</li>
		<li><code>list(iterator)</code>: create a list from another iterator.</li>
		<li>
			<code>[item1, item2, item3, ...]</code>: create a list filled with objects <code>item1</code>,
			<code>item2</code>, <code>item3</code>, etc.
		</li>
		<li>
			<code>.append(item)</code>: this method adds a new object <code>item</code> to the list,
		</li>
		<li>
			<code>.extend(iterator)</code>: this method extends the list by adding another lists&#39; or
			iterator&#39;s items to a list,
		</li>
		<li>
			<code>LIST1 + LIST2 + ...</code>: adding lists with <code>+</code>
			<em>concatenates the lists</em> into a new (longer) list,
		</li>
		<li>
			<code>len(LIST)</code> : <code>len</code> takes in a list <code>LIST</code> as an input argument
			and returns the list&#39;s length, number of items in a list.
		</li>
	</ul>

	<blockquote>
		<p>
			I added a dot <code>.</code> in front of instance method names to differentiate them from
			regular function names like <code>len</code>.
		</p>
	</blockquote>

	<PyCell
		code={String.raw`fruits = []
print(fruits)

fruits.append('apple')
print(fruits)

fruits.extend(['banana', 'cherry'])
print(fruits)

fruits = fruits + ['durian', 'longan']
print(fruits)
print("Length:", len(fruits))`}
	/>

	<p>
		An <em>index</em> of an item in a list represents its position within the list. You can use the
		<em>indices</em> to access and update the list&#39;s items.
	</p>

	<ul>
		<li>
			<em>Indexes start at 0</em>. E.g., let&#39;s create and modify an array with these items:
		</li>
	</ul>

	<table>
		<thead>
			<tr>
				<th align="center">Index</th>
				<th align="center">0</th>
				<th align="center">1</th>
				<th align="center">2</th>
			</tr>
		</thead>
		<tbody
			><tr>
				<td align="center"><strong>Value</strong></td>
				<td align="center"><code>&#39;apple&#39;</code></td>
				<td align="center"><code>&#39;banana&#39;</code></td>
				<td align="center"><code>&#39;cherry&#39;</code></td>
			</tr>
		</tbody>
	</table>

	<PyCell
		code={String.raw`fruits = ["apple", "banana", "cherry"]
print(fruits)

fruits[1]  = "longan"
print(fruits)`}
	/>

	<ul>
		<li>
			You can also use negative indices to access and update items by counting from the end of the
			list. <code>-1</code> refers to the last item in the list:
		</li>
	</ul>

	<table>
		<thead>
			<tr>
				<th align="center">Index</th>
				<th align="center">-3</th>
				<th align="center">-2</th>
				<th align="center">-1</th>
			</tr>
		</thead>
		<tbody
			><tr>
				<td align="center"><strong>Value</strong></td>
				<td align="center"><code>&#39;apple&#39;</code></td>
				<td align="center"><code>&#39;banana&#39;</code></td>
				<td align="center"><code>&#39;cherry&#39;</code></td>
			</tr>
		</tbody>
	</table>

	<PyCell
		code={String.raw`fruits = ["apple", "banana", "cherry"]

print(fruits[-1])
print(fruits[-len(fruits)])`}
	/>

	<blockquote>
		<p>
			Remember that (positive) indexing starts with zero and <code>fruits[len(fruits)]</code>
			will results in an error as the last index is <code>len(fruits)-1</code>.
		</p>
	</blockquote>

	<ul>
		<li>
			<code>.pop()</code> method <em>removes and returns</em> the last element of the list, if an
			optional index argument is given <code>.pop(index)</code> will pop an element at the given index.
		</li>
	</ul>

	<PyCell
		code={String.raw`fruits = ["apple", "cherry", "banana", "durian"]
print(fruits)

last = fruits.pop()
print(last)
print("after pop:", fruits)

second = fruits.pop(1)
print(second)
print("after pop:", fruits)`}
	/>

	<blockquote>
		<p>
			<code>pop</code>, <code>append</code>, and <code>extend</code> are instance methods. This
			means that you call them on each instance of a list object. E.g., <code>fruits</code> is an
			instance of a <code>list</code>
			and you call its methods with <code>fruits.append(...)</code>, <code>fruits.pop(...)</code>,
			and
			<code>fruits.extend([...])</code>.
		</p>
	</blockquote>

	<p>
		Access, update, or copy a portion of a list by <em>slicing</em> the list with optional start (inclusive)
		and stop (exclusive) indices, and a step size.
	</p>

	<ul>
		<li><code>LIST[:]</code> refers to all items of the list <code>LIST</code>,</li>
		<li>
			<code>LIST[s:]</code> refers to all items starting from the <code>index=s</code> inclusive of
			<code>s</code>,
		</li>
		<li>
			<code>LIST[:e]</code> refers to all items before but not including <code>index=e</code>
			(excluding <code>e</code>),
		</li>
		<li>
			<code>LIST[::n]</code> refers to every item with <code>n</code> step size (default step size is
			1),
		</li>
		<li><code>LIST[s:e:n]</code> combines start, end, and step.</li>
	</ul>

	<PyCell
		code={String.raw`fruits = ["apple", "cherry", "banana", "durian"]
fruits[::2] = ["melon", "watermelon"]

print(fruits)`}
	/>

	<ul>
		<li>
			For slices with <code>[s:]</code>, <code>[:e]</code>, and <code>[:]</code>, lengths of two
			sides of the assignment do not need to be the same when you are using slices or iterables for
			assignment. The length of a list is automatically adjusted for the new values. E.g., below we
			can assign a 5-element list to a 2-element slice, the list is automatically expanded in this
			case.
		</li>
	</ul>

	<PyCell
		code={String.raw`fruits = ["apple", "cherry", "banana", "durian"]
fruits[2:] = 5*["melon"]

print(fruits)`}
	/>

	<blockquote>
		<p>
			<code>N*[...]</code> is equivalent to adding or concatenating a list to itself <code>N</code>
			times. E.g., <code>[&#39;melon&#39;]*5</code> results in
			<code
				>[&#39;melon&#39;, &#39;melon&#39;, &#39;melon&#39;, &#39;melon&#39;, &#39;melon&#39;]</code
			>.
		</p>
	</blockquote>

	<ul>
		<li>You can use <code>del</code> function with slices to delete contents of a list.</li>
	</ul>

	<PyCell
		code={String.raw`fruits = ["apple", "cherry", "banana", "durian"]
del fruits[-2:]

print(fruits)`}
	/>

	<blockquote>
		<p>
			To clear all elements of the list you can either use <code>del fruits[:]</code> or
			<code>fruits.clear()</code>. You can learn more about list methods from
			<a
				href="https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types"
				target="_blank"
				rel="noopener">the documentation</a
			>.
		</p>
	</blockquote>

	<ul>
		<li>
			For lists, slices return a copy of a portion of a list when slices are used as values for
			assignment.
		</li>
	</ul>

	<PyCell
		code={String.raw`fruits = ["apple", "cherry", "banana", "durian"]

other = fruits
print(fruits is other)

fruits_copy = fruits[:]
print('Identity:', fruits is fruits_copy)
print('Equality:', fruits == fruits_copy)`}
	/>

	<p>
		In Python, <code>is</code> checks the object identity. The identity statement returns
		<code>True</code>
		if two objects are the same objects, and <code>False</code> otherwise. Identity is different
		from
		<code>==</code> which checks for equality (of values).
	</p>

	<blockquote>
		<p>
			In the code above, we assigned a second name to the <code>fruits</code> list, both
			<code>other</code>
			and <code>fruits</code> refer to the same list. This is verified by running
			<code>print(fruits is other)</code>.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="tuples">
	<h3>Tuples</h3>

	<p>
		As mentioned above, tuples are also ordered sequences of objects similar to lists. Compared to
		lists, you can not modify a tuple after its creation. Hence, tuples don&#39;t have methods for
		appending or extending tuple instances.
	</p>

	<ul>
		<li>Use <code>( item1, item2, ...)</code> to create a new tuple with given items.</li>
		<li>
			To add a new item, extend, or concatenate tuples you need to create a new
			<code>tuple</code> object.
		</li>
		<li>
			You can also create a tuple with a single item by including a comma in
			<code>(item,)</code>, Python otherwise ignores the parentheses.
		</li>
		<li>
			You can omit the parentheses when creating tuples with multiple items, and use
			<code>item1, item2,...</code>. But, I suggest keeping the surrounding parentheses for
			readability and to avoid bugs. E.g., try removing parentheses around the
			<code>(&#39;cherry&#39;, &#39;durian&#39;)</code> below, you will get an error.
		</li>
	</ul>

	<PyCell
		code={String.raw`fruits = ('melon', 'apple', 'banana')
print(fruits)

new_fruits = fruits[1:] + ('cherry', 'durian')
print(new_fruits)`}
	/>

	<p>
		When you print a tuple, <code>print</code> shows items surrounded by parentheses <code>(</code>
		and <code>)</code>.
	</p>

	<blockquote>
		<p>
			To create an empty tuple, use <code>()</code> or <code>tuple()</code>. Also, you can use
			<code>tuple(ITERABLE)</code>
			to convert an input list or other iterable into a <code>tuple</code> object.
		</p>
	</blockquote>

	<ul>
		<li>
			You can get slices of a tuple using <code>[start:stop:step]</code> similar to the lists.
		</li>
	</ul>
</LessonSection>
<LessonSection id="strings">
	<h3>Strings</h3>

	<p>
		You can use indexing and slicing to access and obtain substrings of a string just like lists and
		tuples. <code>str</code> objects are immutable and you can&#39;t modify a string after creating it.
	</p>

	<p>
		For convenience, <code>str</code> objects have instance methods for spliting, joining, and modifying
		an existing string by creating new strings and lists of strings.
	</p>

	<ul>
		<li>
			<code>.replace(old, new)</code>: replaces a substring <code>old</code> with a new string
			<code>new</code>.
		</li>
		<li>
			<code>.split(sep)</code>: splits a string into a list of substrings using the separator
			<code>sep</code>. When used without an input, <code>split()</code>, or with
			<code>split(None)</code>, the method will split a string on any whitespace character, e.g.,
			new line, tab, spaces, etc.
		</li>
		<li>
			<code>.join([string1, string2, ...])</code>: concatenate strings stored as a list or any other
			iterable using a delimeter string, e.g., <code>&quot; &quot;.join(...)</code>
			will join input list of strings with space as a delimeter (separator).
		</li>
	</ul>

	<PyCell
		code={String.raw`sentence = 'A sentence is a set of words that is complete in itself.'
print(sentence)

replaced = sentence.replace('sentence', 'phrase')
print(replaced)

words = replaced.split(' ')
print(len(words), 'words')

new_s = ' '.join(words[:7])
print(new_s)`}
	/>

	<blockquote>
		<p>
			For more information on string methods, see
			<a
				href="https://docs.python.org/3/library/stdtypes.html#string-methods"
				target="_blank"
				rel="noopener">official documentation</a
			>.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="dictionaries">
	<h3>Dictionaries</h3>

	<p><code>dict</code> relies on unique keys to index, create, access, and update its values.</p>

	<ul>
		<li>
			Create a new dictionary using curly braces, e.g., <code>&#123;&#125;</code> (empty
			dictionary),
			<code>&#123;key1: item1, key2: item2, ...&#125;</code>, or use
			<code>dict(key1=value1, key2=value2, ...</code>). The latter requires all keys to be strings,
			see below for another method with <code>dict()</code>.
		</li>
		<li>
			<em>Keys must be hashable types</em>. This means keys&#39; types should be immutable and
			should support hashing methods. <code>int</code>, <code>tuple</code>, and <code>string</code> are
			commonly used types for dictionary keys as they are immutable and support hashing.
		</li>
	</ul>

	<table>
		<thead>
			<tr>
				<th align="center">Key</th>
				<th align="center"><code>&#39;name&#39;</code></th>
				<th align="center"><code>&#39;occupation&#39;</code></th>
			</tr>
		</thead>
		<tbody
			><tr>
				<td align="center"><strong>Value</strong></td>
				<td align="center"><code>&#39;Bob&#39;</code></td>
				<td align="center"><code>&#39;Builder&#39;</code></td>
			</tr>
		</tbody>
	</table>

	<PyCell
		code={String.raw`info = {'name': 'Bob', 'occupation': 'Builder'}
print(info)`}
	/>

	<ul>
		<li>
			If you have an iterator object with key-value pairs, e.g., a list of tuples
			<code>[(key1, value1), (key2, value2), ...]</code>, you can use the iterator as an argument to
			the <code>dict()</code> constructor to create a new dictionary.
		</li>
		<li>
			To add a new key-value pair to an existing <code>dict</code>, or modify a value of an already
			present key just assign the value to the key.
		</li>
	</ul>

	<PyCell
		code={String.raw`info = dict([('name', 'Hatta'), ('occupation', 'Hatter')])
info['nationality'] = 'Wonderland'

print(info)`}
	/>

	<ul>
		<li>
			To access the values, use the key as an index to a <code>dict</code> object. If the key is not
			in the dictionary, you will get <code>KeyError</code> error.
		</li>
		<li>
			Alternatively, use <code>.get(key)</code> instance method to get the value for a given key. If
			the key is not in a dictionary <code>.get(key)</code> returns <code>None</code>. Also,
			<code>.get</code>
			accepts an optional default value which is returned instead of <code>None</code> when the key is
			absent.
		</li>
	</ul>

	<PyCell
		code={String.raw`file_info = {"name": "image.tif", "created_at": "03-09-2025 17:13:34"}
print(file_info.get('owner', 'N/A'))`}
	/>

	<p><code>dict</code> also allows access to their keys and values via instance methods:</p>

	<ul>
		<li><code>.keys()</code>: returns iterator containing dictionary&#39;s keys,</li>
		<li><code>.values()</code>: returns iterator with the values, and</li>
		<li><code>.items()</code>: returns items iterator as key-value pairs.</li>
	</ul>

	<PyCell
		code={String.raw`d = {1: "item1", 2: "item2", 3: "item3"}
print("Values:", d.values())
print("Items:", d.items())`}
	/>

	<blockquote>
		<p>
			Keys, values, and items can be easily converted to other iterator types. E.g., If you need to
			use indices or slices on the keys, values, or items, <code>list(keys)</code>
			produces (indexed) <code>list</code> of keys.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="sets">
	<h3>Sets</h3>

	<p>
		Sets are convenient and highly efficient for removing duplicates, joining and finding unique or
		shared items using set operations like union, intersection, and difference. Sets are also
		efficient when checking membership, i.e., when checking if the item is in the set, especially
		when working with large lists of items.
	</p>

	<blockquote>
		<p>You may think of a set as a dictionary with only keys and no values.</p>
	</blockquote>

	<ul>
		<li>
			Create a set with <code>&#123;item1, item2, ...&#125;</code> inside the curly barces.
			Alternatively, use <code>set(iterable)</code> to convert an iterable object with immutable
			items to a <code>set</code>
			object.
		</li>
		<li><code>.add(item)</code> adds an item to an existing set.</li>
		<li><code>.update(iterable)</code> add items from an iterable to an existing set.</li>
		<li>
			<code>first.union(another)</code> concatenates (joins) two sets <code>first</code> and
			<code>another</code>. This creates a <em>new</em> set with unique items from the two sets.
		</li>
		<li><code>.remove(item)</code> deletes an item from a set.</li>
		<li>
			<code>.pop(item)</code> pops the item from the set, i.e., removes the item from the set and returns
			it.
		</li>
		<li><code>.clear()</code> deletes all items from a set.</li>
	</ul>

	<PyCell
		code={String.raw`fruits = set()
fruits.update(["apple", "banana", "banana", "cherry", "grape"])
print(fruits)

basket = {"banana", "grape", "potato"}
print(basket, "\n")

print('difference', fruits - basket)
print('union', fruits | basket)
print('intersection', fruits & basket)
print('w/o intersection', basket ^ fruits)`}
	/>
</LessonSection>
<LessonSection id="membership-testing">
	<h3>Membership Testing</h3>

	<p>You can test if a value or key is in (or not in) an iterable using <code>in</code>.</p>

	<ul>
		<li>
			For <code>str</code>, <code>list</code>, <code>tuple</code>, and <code>set</code>, the
			<code>in</code> keyword tests whether a value is present in a collection.
		</li>
	</ul>

	<PyCell
		code={String.raw`seq = (False, 1, 2, "three", 4.0)
print( 2 in seq)`}
	/>

	<ul>
		<li>For <code>dict</code>, <code>in</code> tests the keys in a dictionary.</li>
	</ul>

	<PyCell
		code={String.raw`d = {"name": "Alice", "location": "Wonderland"}
print( "Alice" in d)`}
	/>

	<ul>
		<li>
			To test dictionary values, you can use <code>in</code> together with <code>dict.values</code>
			or
			<code>dict.items()</code> methods.
		</li>
	</ul>

	<PyCell
		code={String.raw`d = {"name": "Alice", "location": "Wonderland"}

print( "Alice" in d.values())

print(("name", "Alice") in d.items())`}
	/>
</LessonSection>
<LessonSection id="slice-a-tuple">
	<h3>Slice a Tuple</h3>

	<p>
		Use slicing to obtain a new tuple with <em>with every 2nd item</em> of an original tuple
		<em>excluding the last item</em>. I.e., get a slice with
		<code>(&#39;apple&#39;, &#39;durian&#39;)</code>.
	</p>

	<PyCell
		code={String.raw`fruits = ('melon', 'apple', 'banana', 'durian', 'longan', 'cherry')
basket = fruits[?]

print(basket)
print('Length:', len(basket))`}
	/>
</LessonSection>
<LessonSection id="hide-a-word">
	<h3>Hide a Word</h3>

	<p>Fix this code to hide the &quot;word&quot;.</p>

	<ul>
		<li>
			In the below, <code>s_new</code> censors the word &quot;Password&quot; as well as the word &quot;word&quot;.
			Verify that by running the code.
		</li>
		<li>Modify the <code>replace</code> command to censor only the &quot;word&quot; part.</li>
	</ul>

	<PyCell
		code={String.raw`s = 'Password: word'
print(s)

s_new = s.replace('word', '****')
print(s_new)`}
	/>
</LessonSection>
