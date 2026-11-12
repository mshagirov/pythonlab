<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="relative-and-absolute-path">
	<h3>Relative and Absolute Path</h3>

	<p>
		Your operating system uses two types of paths to locate files and folders, <em>absolute path</em
		>
		and <em>relative path</em>. E.g., <code>~</code> is a relative path (shortcut) that refers to
		the home folder on Unix-based system like Linux and MacOS. An absolute path for home folder
		could look something like <code>/home/murat</code> (Linux and WSL) or <code>/Users/murat</code> (macOS).
	</p>

	<p>Below are most commonly used relative path locations:</p>

	<table>
		<thead>
			<tr>
				<th align="center">Relative path</th>
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
					><code>../..</code> refers to a &quot;grandparent&quot; directory of the curent
					<code>.</code></td
				>
			</tr>
		</tbody>
	</table>
</LessonSection>
<LessonSection id="using-relative-and-absolute-paths">
	<h3>Where Do We Use Relative and Absolute Paths?</h3>

	<p>
		Inside our code you may use either of the relative or the absolute paths to refer to files and
		folders on your machine. The relative path, as its name suggests, may depend on your current
		working directory and change when you change your working directory or the environment. The
		absolute path always starts with the root directory <code>/</code> and does not depend on your current
		working directory or the environment (e.g., your username).
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
