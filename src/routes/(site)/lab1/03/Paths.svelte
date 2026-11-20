<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="relative-and-absolute-path">
	<h3>Relative and Absolute Path</h3>

	<p>
		Your operating system uses <em>absolute paths</em> and <em>relative paths</em> to locate files
		and folders. An absolute path starts at the root directory <code><strong>/</strong></code>, such
		as the first <code>/</code> in
		<code><strong class="root-slash">/</strong>home/murat</code>
		(Linux) and <code><strong class="root-slash">/</strong>Users/murat</code> (macOS). A relative
		path starts from your current working directory, represented by <code>.</code>, and can use the
		shortcuts shown below.
	</p>

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
		Another shortcut is <code>~</code>, which the shell expands to your home directory's absolute
		path (<code>HOME</code>); it is not a relative path. For example, <code>~/Documents/</code>
		refers to the <code>Documents/</code> folder in your home directory.
	</p>

	<blockquote>
		<p>
			<strong>Windows / WSL:</strong> Use Linux paths inside WSL, such as
			<code>/home/murat</code>, rather than Windows paths such as <code>C:\Users\murat</code>.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="using-relative-and-absolute-paths">
	<h3>Where Do We Use Relative and Absolute Paths?</h3>

	<p>
		In Python code and terminal commands, you can use either relative or absolute paths. A relative
		path is resolved from the current working directory, so the same path can refer to different
		files after you change directories. An absolute path starts with <code>/</code> and does not depend
		on the current directory, but it may differ between machines or users.
	</p>

	<p>
		As an exercise, list the contents of your <em>home directory</em> using the
		<code>ls</code> command:
	</p>

	<Code lang="bash" code={String.raw`ls ~`} />

	<blockquote>
		<p>
			In the above, the shell expands <code>~</code> to your home directory's path before passing it
			to <code>ls</code>, which lists that directory's contents. Quoting it as
			<code>"~"</code> or <code>'~'</code> prevents this expansion: both pass a literal
			<code>~</code>, so <code>ls</code> looks for an entry named <code>~</code> in the current directory
			instead.
		</p>
	</blockquote>

	<p>To list the contents of your <em>current working directory</em>, use <code>.</code>:</p>

	<Code lang="bash" code={String.raw`ls .`} />

	<p>To list the contents of the <em>parent directory</em>, use <code>..</code>:</p>

	<Code lang="bash" code={String.raw`ls ..`} />

	<blockquote>
		<p>
			To browse your project's files in Zed, open the command palette with
			<kbd>Cmd+Shift+P</kbd> (macOS) or <kbd>Ctrl+Shift+P</kbd> (Linux/Windows), then search for
			<code>project panel: toggle focus</code>. The Project Panel shows your project's files and
			folders; click a folder to expand it or a file to open it.
		</p>
	</blockquote>

	<blockquote>
		<p>
			To open a different folder in Zed, choose <code>File &gt; Open</code> or press
			<kbd>Cmd+O</kbd> (macOS) or <kbd>Ctrl+O</kbd> (Linux/Windows), then select the folder and
			click <strong>Open</strong>. Its files and subfolders will appear in the Project Panel.
		</p>
	</blockquote>
</LessonSection>

<style>
	.root-slash {
		color: var(--link);
		font-weight: 700;
		text-decoration: underline;
	}
</style>
