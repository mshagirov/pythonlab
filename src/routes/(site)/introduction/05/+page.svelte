<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
</script>

<LessonSection id="infinity">
	<h3>Infinity</h3>

	<p>
		For applications that require using <em>infinity</em>, Python allows creating <code>float</code>
		values that represent positive and negative infinity.
	</p>

	<ul>
		<li>Positive infinity: <code>float(&quot;inf&quot;)</code>,</li>
		<li>negative infinity: <code>float(&quot;-inf&quot;)</code>.</li>
	</ul>

	<PyCell code={String.raw`print(float("inf"))`} />

	<blockquote>
		<p>
			<code>inf</code> is used to initialise values or to handle special cases for various
			algorithms. E.g., to find a maximum value, you may start with <code>-inf</code>
			and compare your numbers to it. Starting with <code>-inf</code> ensures that your program updates
			the current maximum value.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="exponentials">
	<h3>Exponentials</h3>

	<p>
		Python also has a built-in operation <code>**</code> for computing exponentials. E.g.,
		<code>2**4</code> computes 2<sup>4</sup>.
	</p>

	<PyCell code={String.raw`print(2**4)`} />
</LessonSection>
<LessonSection id="augmented-assignments">
	<h3>Augmented Assignments</h3>

	<p>
		Python also provides a shorthand notation for updating values of numerical variables. These
		types of operations are called <em>in-place updates</em> or <em>augmented assignments</em>.
	</p>

	<ul>
		<li>
			<em>Increment</em>: <code>a += b</code> is equivalent to <code>a = a + b</code>, add then
			assign.
		</li>
		<li>
			<em>Decrement</em>: <code>a -= b</code> is equivalent to <code>a = a - b</code>, subtract then
			assign.
		</li>
	</ul>

	<p>
		These operations first evaluate an expression on the right side of <code>=</code> using the old
		value of a variable <code>a</code>, then assign the result to update <code>a</code> in-place.
	</p>

	<p>Additionally, Python also supports the following:</p>

	<ul>
		<li><code>a *= b</code> is equivalent to <code>a = a * b</code>,</li>
		<li><code>a /= b</code> is equivalent to <code>a = a / b</code>.</li>
	</ul>

	<p>
		These assignments are not limited to simple operations and can be used with more complex
		function calls.
	</p>

	<PyCell
		code={String.raw`x = 1
print(x)

x += (x + 1)**3
'''
Equivalent to
   temp_val = x + (x + 1)**3
   x = temp_val
'''
print(x)

x /= 2
print(x)`}
	/>
</LessonSection>
<LessonSection id="formatting-numbers">
	<h3>Formatting Numbers</h3>

	<p>
		For easier entry and readability, Python also allows entering numbers with an
		<code>_</code> separator. For instance, to enter 1,000,000 you could either use
		<code>1000000</code> or <code>1_000_000</code>, and the latter is easier to read. You can put
		<code>_</code> between any two numeric characters, including in <code>float</code> numbers.
	</p>

	<p>
		It is also common to use <em>scientific notation</em> for entering very large or very small numbers.
	</p>

	<PyCell
		code={String.raw`large = 1_000_000_000
print(f"large = {large}")

small = 1 / large
print(f"small = {small}") # automatically uses sci notation`}
	/>

	<p>
		When printing or reading numbers on the screen, we &quot;see&quot; the representation of the
		number, such as scientific notation for very small or very large numbers. You can also set your
		preferred representation using the <em>format specification</em>
		when formatting strings with f-strings and the <code>format</code> method.
	</p>

	<PyCell
		code={String.raw`large = 1_000_000_000
print(f"large = {large :1.2e}")

small = 1 / large
print(f"small = {small :.9f}")

print(f"small = {small :18.12f}")
print( "small = " + format(small, "018.12f"))`}
	/>

	<p>
		In the above, <code>f</code> and <code>e</code> in <code>1.2e</code> or in
		<code>018.12f</code> are types.
	</p>

	<ul>
		<li><code>f</code> and <code>F</code> refer to <code>float</code>, and</li>
		<li><code>e</code> and <code>E</code> to scientific notation.</li>
	</ul>

	<p>
		Another common type to use is the general type <code>g</code> which uses both scientific and
		floating point (<code>float</code>) representations depending on the value of the number.
	</p>

	<p>
		Formatting can also be used with other types, e.g., to specify the width of the resulting string
		representation of the value.
	</p>

	<PyCell code={String.raw`print(f"{' Hi! ':-^15}")`} />

	<p>
		Here we are formatting the value of the string <code>&#39; Hi! &#39;</code>. <code>^</code> is
		center alignment, <code>-</code> is the fill character (it can be any character), and
		<code>15</code> specifies the width.
	</p>

	<blockquote>
		<p>
			See the
			<a
				href="https://docs.python.org/3/library/string.html#format-specification-mini-language"
				target="_blank"
				rel="noopener">official format specification documentation</a
			>
			to see more examples and details about string formatting.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="comparison-and-logical-operations">
	<h3>Comparison and Logical Operations</h3>

	<p>
		<em>Comparison expressions</em> use comparison operators to test equality or compare values and
		result in <code>bool</code> values, <code>True</code> or <code>False</code>. These types of
		expressions are also known as <em>Boolean expressions</em>. Python defines the following
		comparison <em>operators</em> to be used in Boolean expressions:
	</p>

	<ul>
		<li><code>==</code> : equality test.</li>
		<li><code>!=</code> : not equal; returns <code>True</code> if values are not equal.</li>
		<li><code>&gt;</code>, <code>&lt;</code>: larger than and less than.</li>
		<li><code>&gt;=</code>: larger than or equal.</li>
		<li><code>&lt;=</code>: less than or equal.</li>
	</ul>

	<p>
		Additionally, built-in logical operators <code>and</code>, <code>or</code>, <code>not</code>,
		and
		<code>in</code> can be used to compute more complex Boolean expressions.
	</p>

	<ul>
		<li>
			<code>A and B</code> : <code>True</code> if both A and B are <code>True</code>,
			<code>False</code> otherwise.
		</li>
		<li>
			<code>A or B</code> : <code>True</code> if either A or B is <code>True</code>,
			<code>False</code> if both A and B are <code>False</code>.
		</li>
		<li>
			<code>not EXPRESSION</code>: negates a Boolean expression, e.g., <code>not True</code> is
			<code>False</code>.
		</li>
	</ul>

	<PyCell
		code={String.raw`x, y = 21, 42
print(x == y)
print(x < y)
print((x <= y) and (x != y))`}
	/>

	<blockquote>
		<p>
			<code>x &lt; y</code> is equivalent to <code>(x &lt;= y) and (x != y)</code>, with the latter
			using three operations instead of just one <code>&lt;</code>.
		</p>
	</blockquote>

	<ul>
		<li>
			<code>A in B</code> : <code>True</code> if A is in B (used in collections like sequences and strings).
		</li>
	</ul>

	<PyCell
		code={String.raw`is_member = "Tea" in "Team"
print(is_member)`}
	/>

	<p>
		The equality operators <code>==</code> and <code>!=</code> can be used with any data type. For
		instance, you can check whether a variable&#39;s <em>value</em> is equal to the string &quot;Python&quot;.
	</p>

	<PyCell
		code={String.raw`x = "Python"
y = "P" + "y" + "t" + "h" + "o" + "n"
print(x == y)
print(x == 42)
print(x == "abcdef")`}
	/>
</LessonSection>
