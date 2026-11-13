<script lang="ts">
	import { page } from '$app/state';
	import LessonSection from '#lib/components/LessonSection.svelte';
	import SnakeConfetti from '#lib/components/SnakeConfetti.svelte';
	import { href } from '#lib/href.ts';
</script>

{#if page.url.hash === '#next-steps'}
	<SnakeConfetti />
{/if}

<LessonSection id="workshop-recap">
	<h3>Workshop Recap</h3>

	<p>
		Congratulations on completing the Introduction to Python Workshop! Over the course of this
		workshop, you&#39;ve gained a solid foundation in Python programming by exploring key concepts
		and tools from the Python Standard Library. Let&#39;s recap the essential topics we covered:
	</p>

	<ul>
		<li>
			<p>
				<strong>Python Basics</strong>: You learned about Python&#39;s syntax and the importance of
				indentation for structuring code, along with performing basic arithmetic and numerical
				operations.
			</p>
		</li>
		<li>
			<p>
				<strong>Data Types and Structures</strong>: We explored basic data types (<code>int</code>,
				<code>str</code>, <code>float</code>) and container types (<code>list</code>,
				<code>tuple</code>, <code>dict</code>, <code>set</code>, <code>str</code>), which allow you
				to store and manipulate data efficiently.
			</p>
		</li>
		<li>
			<p>
				<strong>Variables and Functions</strong>: You practiced defining variables, creating
				functions, and understanding function objects, while also diving into variable scope to
				manage data within your programs.
			</p>
		</li>
		<li>
			<p>
				<strong>Control Flow</strong>: We covered logical operations, <code>if-else</code> and
				<code>elif</code>
				statements,
				<code>for</code> and <code>while</code> loops, and used <code>break</code> and
				<code>continue</code>
				to control program flow, alongside utilities like <code>range</code>, <code>zip</code>, and
				<code>enumerate</code>.
			</p>
		</li>
		<li>
			<p>
				<strong>Advanced Features</strong>: We also learned powerful tools such as lambda functions,
				<code>map</code>, <code>filter</code>, and comprehensions to write concise and efficient
				code.
			</p>
		</li>
		<li>
			<p>
				<strong>Error Handling</strong>: You learned to handle errors gracefully with
				<code>try-except</code>, raise custom errors with <code>raise</code>, and use assertions for
				defensive programming.
			</p>
		</li>
	</ul>

	<p>
		These skills form the backbone of Python programming and provide a strong foundation for further
		exploration. Whether you&#39;re automating tasks, analysing data, or building applications, the
		concepts covered in this workshop will serve as a stepping stone to more advanced topics like
		object-oriented programming, data science, and development of scientific applications.
	</p>
</LessonSection>
<LessonSection id="next-steps">
	<h3>Next Steps</h3>

	<ul>
		<li>
			Review the workshop&#39;s materials using the provided
			<a href={href('terminal/')} target="_blank" data-sveltekit-reload>Python shell</a> and code cells.
		</li>
		<li>
			In the next workshop, we will install Python on our laptops and practice by building small
			projects and exploring libraries like NumPy and pandas for data analysis.
		</li>
		<li>
			You can also try out other ways to use Python, e.g., using online tools like <a
				href="https://colab.google/"
				target="_blank"
				rel="noopener">Google Colab notebooks</a
			>.
		</li>
		<li>
			Engage with your local and online Python communities, e.g., your colleagues, forums,
			open-source projects, or X to deepen your knowledge.
		</li>
	</ul>

	<p>
		Thank you for your enthusiasm and dedication! Keep coding, experimenting, hacking, and exploring
		the endless possibilities with Python. Stay tuned for the announcement of the next workshop
		session!
	</p>
</LessonSection>
