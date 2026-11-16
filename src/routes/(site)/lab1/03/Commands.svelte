<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="linux-commands">
	<h3>Some Linux Commands (Optional)</h3>

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
<LessonSection id="terminal-or-gui">
	<h3>Should You Use the Terminal or Graphical User Interface?</h3>

	<p>
		You can manage files and folders in Zed's terminal or project panel. You can also use your
		operating system's file manager, such as Finder or File Explorer. Choose whichever is most
		comfortable for the task.
	</p>

	<p>
		Terminal commands are especially useful for repeatable tasks and remote environments. Practise
		the commands below so you can navigate folders and run your Python program.
	</p>

	<blockquote>
		<p>
			<strong>VS Code:</strong> The Explorer panel serves the same purpose as Zed's project panel.
		</p>
	</blockquote>
</LessonSection>
<LessonSection id="workspace-folder">
	<h3>Workspace Folder</h3>

	<p>
		Use Zed's terminal to navigate to your home folder and set up a workspace. Enter the commands
		below one at a time.
	</p>

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

	<ol>
		<li>
			<p>
				Go to your home folder using <code>cd</code> command. You may either enter <code>cd</code>
				(without any arguments) or <code>cd ~</code> (the shell expands <code>~</code> to your home folder).
			</p>
			<Code lang="bash" code={String.raw`cd ~`} />
			<p>
				That is <code>cd</code> space and <code>~</code>. The <em>command signature</em> is the same
				for all other commands <code>COMMAND [OPTIONS] [ARGUMENTS]</code>, where square brackets
				represent optional inputs.
			</p>
		</li>
		<li>
			<p>
				Next, let&#39;s print our current path (location in the file system). This should print your
				home folder&#39;s location. E.g., <code>/Users/murat/</code> or <code>/home/murat</code>:
			</p>
			<Code lang="bash" code={String.raw`pwd`} />
		</li>
		<li>
			<p>List the contents of your home folder with <code>ls</code>.</p>
			<Code lang="bash" code={String.raw`ls`} />
			<ul>
				<li><code>ls</code> accepts <em>options</em>, e.g.,</li>
				<li><code>ls -l</code>: lists contents line-by-line,</li>
				<li>
					<code>ls -a</code>: lists <em>all</em> content including <em>hidden</em> files and folders.
				</li>
				<li>
					<code>ls -la</code> or <code>ls -al</code>: combines <code>-l</code> and <code>-a</code> options.
				</li>
			</ul>
			<Code lang="bash" code={String.raw`ls -al`} />
		</li>
		<li>
			<p>Create a new directory named <code>workspace</code>.</p>
			<Code lang="bash" code={String.raw`mkdir workspace`} />
			<ul>
				<li>
					Verify that <code>workspace</code> was properly created with <code>ls -alF</code>. The
					<code>-F</code>
					option shows
					<code>/</code> after directory names.
				</li>
				<li>
					Open your home folder in Zed using <code>File &gt; Open...</code>.
				</li>
				<li>
					Compare the output from <code>ls -a</code> with Zed's project panel. Hidden or ignored files
					may be filtered out in the panel.
				</li>
			</ul>
		</li>
		<li>
			<p><code>cd</code> to <code>workspace</code>. You may verify this with <code>pwd</code></p>
			<Code
				lang="bash"
				code={String.raw`cd workspace
# check if you are in "workspace" directory
pwd`}
			/>
		</li>
		<li>
			<p>Create some test files:</p>
			<Code lang="bash" code={String.raw`touch file1 file2 file3`} />
			<ul>
				<li>
					Verify that the files exist by listing them with <code>ls -l</code>. Can you see these
					files in Zed's project panel?
				</li>
			</ul>
		</li>
		<li>
			<p>From the <code>workspace</code>, go to its parent directory (your home directory):</p>
			<Code lang="bash" code={String.raw`cd ..`} />
			<ul>
				<li>
					Open <code>workspace</code> as a project in Zed, then open a terminal with
					<code>terminal: new</code> from the command palette. Check its location with
					<code>pwd</code>; if needed, run <code>cd ~/workspace</code>.
				</li>
			</ul>
		</li>
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
				delete your other files that match this pattern.
			</p>
			<ul>
				<li>
					Delete all files with names that start with <code>file</code> inside
					<code>workspace/</code>. But before, let&#39;s do a sanity check by listing these files
					(and folders):
				</li>
			</ul>
			<Code lang="bash" code={String.raw`ls -al file*`} />
			<ul>
				<li>If you are happy with what you see, go ahead and delete these files:</li>
			</ul>
			<Code lang="bash" code={String.raw`rm file*`} />
		</li>
		<li>
			<p>
				Create a new directory with path <code>~/workspace/pythonlab/lab1/dna-analyser</code>. For
				this, you need to create multiple directories. In the terminal, this can be done with
				<code>mkdir -p NEW_DIR</code>, <code>-p</code> option allows you to automatically create parent
				directories for your path.
			</p>
			<Code lang="bash" code={String.raw`mkdir -p ~/workspace/pythonlab/lab1/dna-analyser`} />
		</li>
		<li>
			<p>
				Open <code>~/workspace/pythonlab/lab1/dna-analyser</code> as your project folder in Zed. Open
				a terminal and run the commands below to confirm its working directory. Keep this project open
				for the next part.
			</p>
			<Code
				lang="bash"
				code={String.raw`cd ~/workspace/pythonlab/lab1/dna-analyser
pwd`}
			/>
		</li>
	</ol>
</LessonSection>
