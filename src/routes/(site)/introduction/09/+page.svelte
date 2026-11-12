<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
</script>

<LessonSection id="if-statements">
	<h3>If Statements</h3>

	<p>
		An <em>if statement</em> specifies the part of the code that runs <em>only</em> when a given condition
		is met. This allows a programmer to control the logical flow and execution of a computer programme.
		If statements consist of
	</p>

	<ul>
		<li><code>if</code> keyword,</li>
		<li>a Boolean condition followed by a colon (<code>:</code>), and</li>
		<li>an indented code block.</li>
	</ul>

	<p>The following is a definition of Python if statement.</p>

	<Code
		lang="python"
		code={String.raw`if condition:
    # code in this block runs only when "condition" is True

# code outside the block always gets executed`}
	/>

	<p>
		The indented code block under the <code>if condition:</code> executes <em>only</em> when the
		<code>condition</code>
		is equal to <code>True</code>. Let&#39;s see it in an example.
	</p>

	<PyCell
		code={String.raw`value = 10
if value > 42:
    print(f'{value} is larger than 42.')

if value == 42:
    print(f'{value} is equal to 42.')

if value < 42:
    print(f'{value} is less than 42.')`}
	/>

	<blockquote>
		<p>
			Run the code with different numbers (<code>int</code> or <code>float</code>) for the
			<code>value</code>.
		</p>
	</blockquote>

	<p>
		I used comparison operations as conditions for the statements above. You can use any <em
			>Boolean expression</em
		>
		that produces <code>True</code> or <code>False</code> as a condition of the statement.
	</p>

	<p>
		The code above uses multiple checks of the same value which is redundant. Once we check that a
		value is <em>not</em> larger than 42, we also know that the value must be either less than or
		equal to 42. You can use <code>else</code> statement when you have an alternative code that runs
		when the condition is <code>False</code>, as shown below.
	</p>

	<Code
		lang="python"
		code={String.raw`if condition:
    # runs when "condition" is True
else:
    # runs when "condition" is False`}
	/>

	<p>
		<code>if-else</code> uses two different code blocks. Only one block is executed depending on whether
		a condition is met or failed.
	</p>

	<PyCell
		code={String.raw`value = 10
if value > 42:
    print(f'{value} is larger than 42.')
else:
    print(f'{value} is less than or equal to 42.')

if value == 42:
    print(f'{value} is equal to 42.')`}
	/>

	<p>
		In the above, we are still checking the value twice using two separate if statements. These if
		statements potential print redundant information, e.g., when <code>value = 42</code>. Also, it
		is not immediately clear whether these <code>if</code> blocks are logically connected without carefully
		reading the code first.
	</p>

	<p>
		Python allows us further combine these statements into a single <code>if-elif-else</code>
		block as shown below.
	</p>

	<Code
		lang="python"
		code={String.raw`if condition1:
    # runs only when "condition1" is True
elif condition2:
    # runs only when
    #   "condition2" is True but "condition1" is False
else:
    # runs if
    #   both "condition2" and "condition1" are False`}
	/>

	<p><code>elif</code> stands for &quot;else if&quot;. E.g., see the following code.</p>

	<PyCell
		code={String.raw`value = 10
if value > 42:
    print(f'{value} is larger than 42.')
elif value < 42 :
    print(f'{value} is less than 42.')
else:
    print(f'{value} is equal to 42.')`}
	/>

	<p>
		Only one block, either <code>if</code>, <code>elif</code>, or <code>else</code> executes at a
		time. The condition of the <code>elif</code> block (<code>condition2</code>) is only checked
		when the first condition (<code>condition1</code>) is <code>False</code>, i.e., if the first
		condition
		<em>fails</em>. Also, we can instantly recognise that the code blocks of the
		<code>if-elif-else</code> are logically connected.
	</p>

	<blockquote>
		<p>
			The only required part of the <code>if</code> statement is the first <code>if</code> block.
			The
			<code>elif</code> and <code>else</code> blocks are optional.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="conditional-expressions">
	<h3>Conditional Expressions</h3>

	<p>
		Python provides another type of if statement in addition to the ones shown above. These are
		called <em>conditional expressions</em>
		or <em>ternary operators</em>. These expressions allow value assignment using an in-line if
		statement. The syntax of a conditional expression is as follows.
	</p>

	<Code lang="python" code={String.raw`output = value if condition else alternative_value`} />

	<ul>
		<li>
			<code>output</code> is set to <code>value</code> if the <code>condition</code> is
			<code>True</code>,
		</li>
		<li><code>output</code> is set to <code>alternative_value</code> otherwise.</li>
	</ul>

	<PyCell
		code={String.raw`value = 10
result = "larger than 42" if value > 42 else "less than or equal to 42"
print("Value", value)
print(result)`}
	/>

	<blockquote>
		<p>
			Ternary means that the operator consists of three parts. The parts of the above operator are a
			value if a condition is met, a condition, and an alternative value if the condition is false.
		</p>
	</blockquote>
</LessonSection>
