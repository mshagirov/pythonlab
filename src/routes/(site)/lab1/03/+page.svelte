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
		A shell is a program that lets you interact with the operating system (OS) by typing commands
		instead of clicking buttons. Navigating folders, managing files, and launching programs can be
		faster than clicking through a graphical interface (GUI), and scripts make repetitive tasks
		easier to automate.
	</p>

	<p>Common shells and defaults include:</p>
	<ul>
		<li>
			<strong
				><a href="https://www.gnu.org/software/bash/" target="_blank" rel="noopener">Bash</a
				>:</strong
			>
			The default interactive shell on many Linux distributions, including Ubuntu, the default distribution
			installed by <code>wsl --install</code>.
		</li>
		<li>
			<strong><a href="https://www.zsh.org/" target="_blank" rel="noopener">Zsh</a>:</strong>
			The default shell for new user accounts on modern macOS.
		</li>
		<li>
			<strong>Python shell:</strong> Yes! Python also has a shell interpreter. Like Bash or Zsh, it reads
			your input, runs it, and shows results, but instead of Bash or Zsh it uses Python language.
		</li>
	</ul>
</LessonSection>

<LessonSection id="terminal-or-gui">
	<h3>Should You Use the Terminal or Graphical User Interface?</h3>

	<blockquote>
		<p>
			<strong>VS Code:</strong> The Explorer panel serves the same purpose as Zed's project panel.
		</p>
	</blockquote>

	<p>
		You can manage files and folders in Zed's terminal or project panel, or use your operating
		system's file manager (Finder or File Explorer). You should use whichever is most comfortable
		for the task.
	</p>

	<p>Then why do we need the command line or terminal? It offers several advantages:</p>

	<ul>
		<li>
			<strong>Speed and efficiency:</strong> A short command can replace many clicks, especially when
			repeating a task or working with many files.
		</li>
		<li>
			<strong>Lower resource usage:</strong> Text-based tools often use less memory and processing power
			than graphical applications, which can also help reduce energy use.
		</li>
		<li>
			<strong>Automation and scripting:</strong> Combine commands into a script to automate repetitive
			work or build your own custom tool on the fly.
		</li>
		<li>
			<strong>Remote access:</strong> Work on another computer over a text-based connection, even when
			a remote desktop would be slow.
		</li>
		<li>
			<strong>AI agents:</strong> Commands and text output give LLM-based agents a natural interface for
			running tools, checking results, and helping with programming tasks.
		</li>
		<li>
			<strong>Focus:</strong> Keeping commands, results, and code close together can reduce window-switching
			and help you stay focused.
		</li>
	</ul>

	<p>Let's use the command line to navigate the filesystem and work with files.</p>
</LessonSection>

<LessonSection id="using-the-terminal">
	<h3>Open Terminal in Zed</h3>

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
			<strong>VS Code:</strong> Use <code>View &gt; Terminal</code> or press <kbd>Ctrl+`</kbd> to open
			the integrated terminal. On Windows, connect to WSL first.
		</p>
	</blockquote>

	<ol>
		<li>
			<p>
				Open <strong>Zed</strong> and press <kbd>Ctrl+`</kbd> to toggle the terminal panel, or open
				the command palette with <kbd>Cmd+Shift+P</kbd> (macOS) or <kbd>Ctrl+Shift+P</kbd>
				(Linux/Windows) and search for <code>terminal</code>.
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

<LessonSection id="project-folder-organisation">
	<h3>Project Folder Organisation</h3>

	<blockquote>
		<p>
			I saw this structure from <a
				href="https://blog.boot.dev/misc/how-i-organize-my-local-development-environment/"
				target="_blank"
				rel="noopener">Lane Wagner (boot.dev)</a
			>
			and have adopted it in my own workflow.
		</p>
	</blockquote>

	<p>
		<code>workspace/pythonlab/</code> will house all the projects that you will write in this and
		future labs. Inside it, we will create directories for each lab, and each lab folder will
		contain all the projects for that given lab. You are welcome to continue using
		<code>workspace</code> for your future projects.
	</p>

	<blockquote>
		<p>
			Please create <code>~/workspace/pythonlab/lab1</code> if you haven&#39;t already done so.
		</p>
	</blockquote>
</LessonSection>
