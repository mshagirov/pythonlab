<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="verify-your-system-in-the-terminal">
	<h3>Verify Your System in the Terminal</h3>

	<blockquote>
		<p>
			Terminal is a type of a command line interface (CLI) and people use these terms
			interchangeably.
		</p>
	</blockquote>

	<ol>
		<li><p>Open <strong>VS Code</strong>.</p></li>
		<li>
			<p>Open VS Code terminal:</p>
			<ul>
				<li>
					In VS Code, use keyboard shortcut <code>^`</code> ( press <code>Control</code> and
					<code>`</code>
					keys together) or from the menu toolbar go to <code>View &gt; Terminal</code>.
				</li>
			</ul>
		</li>
		<li>
			<p>Inside the terminal, enter the following:</p>
			<Code lang="bash" code={String.raw`uname`} />
		</li>
	</ol>

	<p>
		You should see the above print either <code>Linux</code> (WSL and Linux) or <code>Darwin</code>
		(macOS). E.g., your terminal should look like this (the exact prompt, <code>$</code> and everything
		in front of it may differ from the example below):
	</p>

	<Code
		lang="bash"
		code={String.raw`$ uname
Linux`}
	/>

	<p>For macOS:</p>

	<Code
		lang="bash"
		code={String.raw`$ uname
Darwin`}
	/>

	<blockquote>
		<p>
			If you would rather use a different IDE or editor to VS Code, please feel free to run these
			commands in your preferred terminal or IDE.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="relative-and-absolute-path">
	<h3>Relative and Absolute Path</h3>

	<p>
		Your operating system uses two types of paths to locate files and folders, <em>absolute path</em
		>
		and <em>relative path</em>. E.g., <code>~</code> is a relative path (shortcut) that refers to
		the home folder in Unix-based system like Linux and MacOS. An absolute path for home folder
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

	<p>
		Inside our code you may use either of the relative or the absolute paths to refer to files and
		folders on your machine. The relative path, as its name suggests, may depend on your current
		working directory and change when you change your working directory or the environment. The
		absolute path always starts with the root directory <code>/</code> and does not depend on your current
		working directory or the environment (e.g., your username).
	</p>
</LessonSection>
