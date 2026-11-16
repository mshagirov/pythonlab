<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import Paths from './Paths.svelte';
	import Commands from './Commands.svelte';
</script>

<LessonSection id="terminal">
	<h3>Terminal</h3>

	<p>
		A terminal provides a text-based interface to a shell, which interprets and runs your commands.
	</p>

	<blockquote>
		<p>
			<strong>Windows / WSL:</strong> In Zed, connect to your WSL environment first using
			<a href="https://zed.dev/docs/remote-development#wsl-support" target="_blank" rel="noopener"
				>Zed's WSL support</a
			>, so the commands below run in Linux.
		</p>
	</blockquote>

	<blockquote>
		<p>
			<strong>VS Code:</strong> Use <code>View &gt; Terminal</code> to open the integrated terminal. On
			Windows, connect to WSL first.
		</p>
	</blockquote>

	<ol>
		<li>
			<p>
				Open <strong>Zed</strong> and show its integrated terminal. You can use an existing terminal
				or open one from the command palette by searching for <code>terminal</code>. Use
				<code>:term</code> or press <kbd>Ctrl+`</kbd> to toggle the terminal panel.
			</p>
		</li>
		<li>
			<p>Inside the terminal, enter the following:</p>
			<Code lang="bash" code={String.raw`uname`} />
			<p>
				You should see the above print either <code>Linux</code> or <code>Darwin</code>
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

			<p>You can also run these commands in a separate terminal.</p>
		</li>
	</ol>
</LessonSection>
<Paths />
<Commands />
