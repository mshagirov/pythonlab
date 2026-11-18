<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="linux-commands">
	<h3>Linux Commands</h3>

	<blockquote>
		<p>
			These are originally Unix (operating system) commands. Linux and macOS are heavily influenced
			by Unix and have reimplemented these commands.
		</p>
	</blockquote>

	<p>We will use the following command line interface (CLI) commands in the terminal:</p>

	<table>
		<thead>
			<tr>
				<th align="center">Command</th>
				<th align="center">Meaning</th>
				<th align="center">Usage</th>
			</tr>
		</thead>
		<tbody
			><tr>
				<td align="center"><code>cd</code></td>
				<td align="center">Change directory (i.e., go to some folder).</td>
				<td align="center"><code>cd PATH_TO_FOLDER</code></td>
			</tr>
			<tr>
				<td align="center"><code>ls</code></td>
				<td align="center">List directory content.</td>
				<td align="center"><code>ls PATH_TO_FOLDER</code></td>
			</tr>
			<tr>
				<td align="center"><code>mkdir</code></td>
				<td align="center">Make a new directory</td>
				<td align="center"><code>mkdir NEW_FOLDER</code></td>
			</tr>
			<tr>
				<td align="center"><code>pwd</code></td>
				<td align="center">Print working directory name</td>
				<td align="center"><code>pwd</code></td>
			</tr>
			<tr>
				<td align="center"><code>rm</code></td>
				<td align="center">Permanently removes (deletes) files</td>
				<td align="center"><code>rm PATH_TO_FILE</code></td>
			</tr>
			<tr>
				<td align="center"><code>touch</code></td>
				<td align="center">Create empty file</td>
				<td align="center"><code>touch FILE</code></td>
			</tr>
		</tbody>
	</table>

	<blockquote>
		<p>
			Conceptually, directory in Linux is the same as folder on macOS and Windows. Also, usage of <a
				href="https://man7.org/linux/man-pages/man1/touch.1.html"
				target="_blank"
				rel="noopener"><code>touch</code> command</a
			>
			is not limited to creating empty files and you can use it to set file access and modification times.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="workspace-folder">
	<blockquote>
		<p>
			<strong>Windows / WSL:</strong> Keep working in your WSL connection. When opening folders in Zed,
			choose folders from the remote Linux environment.
		</p>
	</blockquote>

	<blockquote>
		<p>
			<strong>VS Code:</strong> Follow the same terminal commands. Use
			<code>File &gt; Open Folder...</code> to open folders in Explorer; on Windows, use a WSL window.
		</p>
	</blockquote>

	<h3>Workspace Folder</h3>

	<p>
		Use Zed's terminal to navigate to your home folder and set up a workspace. Enter the commands
		below one at a time.
	</p>

	<ul>
		<li>
			<p>
				Go to your home folder using <code>cd</code> command. You may either enter <code>cd</code>
				(without any arguments) or <code>cd ~</code> (the shell expands <code>~</code> to your home folder).
			</p>
			<Code lang="bash" code={String.raw`cd ~`} />
		</li>
		<li>
			<p>
				Next, let&#39;s print our current path (location in the file system). This should print your
				home folder&#39;s location. E.g., <code>/Users/murat/</code> or <code>/home/murat</code>:
			</p>
			<Code lang="bash" code={String.raw`pwd`} />
		</li>
		<li>
			<p>
				List the contents of your home folder with <code>ls</code>. For convenience, use
				<code>ls -l</code>. The <code>-l</code> option shows each entry on a separate row, along
				with metadata such as permissions, owner, size, and modification time. Use
				<code>ls -al</code>
				to also include hidden files and folders by combining
				<code>-a</code> with <code>-l</code>.
			</p>
			<Code lang="bash" code={String.raw`ls -l`} />
			<blockquote>
				<p>
					Many Linux distributions configure <code>ll</code> as an alias for a long listing, such as
					<code>ls -al</code>
					(the exact options vary). To add this shortcut to Zsh on macOS, add
					<code>alias ll='ls -al'</code>
					to your <code>~/.zshrc</code> file, then open a new terminal or run
					<code>source ~/.zshrc</code> in the current terminal.
				</p>
			</blockquote>
		</li>
		<li>
			<p>Create a new directory named <code>workspace</code> and verify with <code>ls</code>.</p>
			<Code lang="bash" code={String.raw`mkdir workspace`} />
		</li>
		<li>
			<p>
				You should see the new <code>workspace</code> directory in the listing. Use <code>cd</code>
				to enter it, then verify your current path with <code>pwd</code>.
			</p>
			<Code
				lang="bash"
				code={String.raw`cd workspace
# check if you are in "workspace" directory
pwd`}
			/>
			<blockquote>
				<p>
					In shell commands, <code>#</code> starts a comment; the rest of that line is ignored.
				</p>
			</blockquote>
		</li>
		<li>
			<p>Create some test files and verify with <code>ls</code>:</p>
			<Code lang="bash" code={String.raw`touch file1 file2 file3`} />
			<blockquote>
				<p>
					In Bash and Zsh, you can also use <em>brace expansion</em>, such as
					<code>file&#123;1,2,3&#125;</code>. For example, in
					<code>touch file&#123;1,2,3&#125;</code>, the shell expands
					<code>file&#123;1,2,3&#125;</code> into
					<code>file1 file2 file3</code>
					before running <code>touch</code>. Not all shells support this shorthand, so you may need
					to use an alternative method in those shells.
				</p>
			</blockquote>
		</li>
		<li>
			<p>
				From <code>workspace</code>, go to its parent directory (your home directory), then list its
				contents with <code>ls -lF</code>. The <code>-F</code> option adds file-type indicators,
				such as <code>/</code> after directory names and <code>*</code> after executable files. The
				test files are inside <code>workspace</code>, so they will not appear in this listing:
			</p>
			<Code lang="bash" code={String.raw`cd ..`} />
		</li>
		<li>
			<p>
				Open <code>workspace</code> as a project in Zed, then open a terminal with
				<code>workspace: new terminal</code> from the command palette. Check its location with
				<code>pwd</code>. Zed's project panel and the terminal's current directory are not
				automatically kept in sync. Browsing folders in the panel does not change the terminal's
				location, and
				<code>cd</code> does not change the project folder. By default, opening a new terminal starts
				it in the project directory.
			</p>
		</li>
		<li>
			<p>
				Run <code>pwd</code> in both the old and new terminals and compare the results. The old
				terminal is still in your home directory, while the new terminal starts in
				<code>workspace</code>. Each terminal keeps its own current working directory. You can now
				close the old terminal by running the <code>exit</code> command in it.
			</p>
		</li>
	</ul>
</LessonSection>

<LessonSection id="prepare-project-folder">
	<h3>Prepare the Project Folder</h3>

	<ul>
		<li>
			<p>
				Go to <code>workspace</code> with <code>cd</code> if you are not in it. Then, remove
				(delete)
				<code>file1</code> with <code>rm</code> (use <code>pwd</code> and <code>ls</code> to verify location
				and contents of your current working directory).
			</p>
			<Code lang="bash" code={String.raw`rm file1`} />
		</li>
		<li>
			<p>
				Many Linux commands accept wildcard <code>*</code> to match patterns, e.g.,
				<code>file*</code>
				matches all file and folder names that start with <code>file</code>. Be careful to not
				delete your other files that match this pattern. Delete all files with names that start with
				<code>file</code> inside <code>workspace/</code>. But before, let&#39;s do a sanity check by
				listing these files (and folders):
			</p>
			<Code lang="bash" code={String.raw`ls -al file*`} />
		</li>
		<li>
			<p>If you are happy with what you see, go ahead and delete these files:</p>
			<Code lang="bash" code={String.raw`rm file*`} />
		</li>
		<li>
			<p>
				Create a new directory with path <code>~/workspace/pythonlab/lab1</code>. For this, you need
				to create multiple directories. In the terminal, this can be done with
				<code>mkdir -p NEW_DIR</code>, <code>-p</code> option allows you to automatically create parent
				directories for your path.
			</p>
			<Code lang="bash" code={String.raw`mkdir -p ~/workspace/pythonlab/lab1`} />
		</li>
		<li>
			<p>
				Open <code>~/workspace/pythonlab/lab1</code> as your project folder in Zed. Open a terminal,
				use <code>cd</code> to enter this directory if necessary, and confirm your location with
				<code>pwd</code>.
			</p>
			<Code
				lang="bash"
				code={String.raw`cd ~/workspace/pythonlab/lab1
pwd`}
			/>
		</li>
		<li>
			<p><strong>Keep this project open for the next part.</strong></p>
		</li>
	</ul>
</LessonSection>
