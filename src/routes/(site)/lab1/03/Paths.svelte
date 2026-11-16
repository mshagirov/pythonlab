<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="relative-and-absolute-path">
	<h3>Relative and Absolute Path</h3>

	<p>
		Your operating system uses <em>absolute paths</em> and <em>relative paths</em> to locate files
		and folders. An absolute path starts at the root directory, such as <code>/home/murat</code>
		on Linux or <code>/Users/murat</code> on macOS. A relative path starts from your current working directory.
	</p>

	<blockquote>
		<p>
			<strong>Windows / WSL:</strong> Use Linux paths inside WSL, such as
			<code>/home/murat</code>, rather than Windows paths such as <code>C:\Users\murat</code>.
		</p>
	</blockquote>

	<p>These shortcuts are useful in Zed's terminal:</p>

	<table>
		<thead>
			<tr>
				<th align="center">Shortcut</th>
				<th align="center">Meaning</th>
				<th align="center">Usage</th>
			</tr>
		</thead>
		<tbody
			><tr>
				<td align="center"><code>~</code></td>
				<td align="center">User&#39;s home directory</td>
				<td align="center"
					><code>~/Documents/</code> refers to <code>Documents/</code> in my home directory</td
				>
			</tr>
			<tr>
				<td align="center"><code>.</code></td>
				<td align="center">The current directory</td>
				<td align="center"
					><code>./file1</code> is same as just <code>file1</code> but the first one is more specific</td
				>
			</tr>
			<tr>
				<td align="center"><code>..</code></td>
				<td align="center">The parent directory (of the current one)</td>
				<td align="center"
					><code>../..</code> refers to a &quot;grandparent&quot; directory of the current
					<code>.</code></td
				>
			</tr>
		</tbody>
	</table>

	<p>
		The shell expands <code>~</code> to your home directory's absolute path; it is not a relative path.
	</p>
</LessonSection>
<LessonSection id="using-relative-and-absolute-paths">
	<h3>Where Do We Use Relative and Absolute Paths?</h3>

	<p>
		In Python code and terminal commands, you can use either relative or absolute paths. A relative
		path is resolved from the current working directory, so the same path can refer to different
		files after you change directories. An absolute path starts with <code>/</code> and does not depend
		on the current directory, but it may differ between machines or users.
	</p>

	<p>As an exercise, list the contents of your home directory using <code>ls</code> command:</p>

	<Code lang="bash" code={String.raw`ls ~`} />

	<blockquote>
		<p>
			In the above, <code>ls</code> is a command that takes the input &quot;<code>~</code>&quot;
			(path to your home directory) and lists its contents on the terminal.
		</p>
	</blockquote>
</LessonSection>
