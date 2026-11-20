<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="entry-point">
	<h3><code>main.py</code></h3>

	<ol>
		<li>Open <code>~/workspace/pythonlab/lab1/</code> as a project folder in Zed.</li>
		<li>
			Create a new directory <code>test-project</code> inside
			<code>~/workspace/pythonlab/lab1/</code> using either Zed's project panel or
			<code>mkdir</code> in the terminal.
		</li>
		<li>
			Create a new file named <code>main.py</code> in <code>test-project</code> using either Zed's
			project panel or <code>touch</code> in the terminal, then open it.
		</li>
		<li>
			Open the <code>test-project</code> directory as your workspace in Zed, then open
			<code>main.py</code>.
		</li>
	</ol>

	<blockquote>
		<p>
			<code>main.py</code> will be an <em>entry point</em> for our program. The name
			<code>main.py</code>
			is a conventional name given to the &quot;main&quot; file in your program that you run to use your
			program. Naming your main file <code>main.py</code> is not a requirement. Nevertheless, it is more
			convenient for organising our code by giving us a clear place to start reading our code in the future.
		</p>
	</blockquote>

	<p>Copy the following into <code>main.py</code>:</p>

	<Code
		lang="python"
		code={String.raw`print("Hello there!")
print("General Kenobi")`}
	/>

	<p>
		In Zed's terminal, make sure your current working directory is
		<code>~/workspace/pythonlab/lab1/test-project/</code>, where <code>main.py</code> is saved, then run:
	</p>

	<Code lang="bash" code={String.raw`python3 main.py`} />

	<blockquote>
		<p>
			The command above tells the Python interpreter to run the code in <code>main.py</code>.
		</p>
	</blockquote>

	<p>Congratulations, you have written your first Python program on your machine!🐍</p>
</LessonSection>
<LessonSection id="shebang-line">
	<h3>Shebang Line</h3>

	<p>
		Another convenient way to run Python programs in Unix-like systems (Linux, MacOS) is by adding a <em
			>shebang</em
		>
		(<code>#!</code>) line on top of the file as shown below.
	</p>

	<Code
		lang="python"
		code={String.raw`#!/usr/bin/env python3

print("Hello there!")
print("General Kenobi")`}
	/>

	<ul>
		<li><p>Add the Python shebang as the very first line to <code>main.py</code>.</p></li>
		<li>
			<p>
				Change <code>main.py</code> to be executable using <code>chmod +x</code> (this modifies file permissions
				to executable or &quot;runnable&quot; file):
			</p>
			<Code lang="bash" code={String.raw`chmod +x main.py`} />
		</li>
		<li>
			<p>Then run the following in the terminal:</p>
			<Code lang="bash" code={String.raw`./main.py`} />
		</li>
	</ul>

	<p>
		The <code>./</code> prefix tells the shell to run <code>main.py</code> from the current
		directory, which is not normally included in the shell's command search path (<code>PATH</code
		>). Your program should run as usual, but this time you don't need to call the Python
		interpreter explicitly. The shebang line (<code>#!</code>) specifies which interpreter to use.
	</p>

	<blockquote>
		<p>
			To run commands without specifying their path, you need to add its directory (location) to the <a
				href="https://en.wikipedia.org/wiki/PATH_(variable)"
				target="_blank"
				rel="noopener"><code>PATH</code> environment variable</a
			>.
		</p>
	</blockquote>

	<p>
		Going forward you may run <code>main.py</code> either by directly <em>calling</em> it or using
		<code>python3 main.py</code>.
	</p>
</LessonSection>

<LessonSection id="virtual-environment">
	<h3>Virtual Environment</h3>

	<p>
		A virtual environment keeps a project's Python packages separate from other projects. It uses
		your installed <code>python3</code>; <code>venv</code> does not install Python. Open Zed's
		terminal in <code>test-project</code> and run these commands (use WSL on Windows):
	</p>

	<Code
		lang="bash"
		code={String.raw`python3 -m venv .venv
source .venv/bin/activate`}
	/>

	<p>
		This creates a <code>.venv</code> folder and activates it in this terminal. Now
		<code>python</code>
		and <code>python -m pip</code> use this environment in the terminal.
	</p>

	<blockquote>
		<p>
			Run <code>deactivate</code> when finished. In a new terminal, run
			<code>source .venv/bin/activate</code> from <code>test-project</code> to use the environment
			again. Do not commit <code>.venv</code> to Git; recreate it from your dependency file.
		</p>
	</blockquote>

	<p>
		<strong>
			There are two common ways to list packages for a virtual environment,
			<code>requirements.txt</code> and <code>pyproject.toml</code>. Choose one approach; you don't
			need to maintain both files. The modern <code>pyproject.toml</code> approach is preferred.
		</strong>
	</p>

	<details open>
		<summary>Modern approach: pyproject.toml (preferred)</summary>

		<p>
			<code>pyproject.toml</code> is the preferred modern standard for Python project metadata and dependencies.
			It can also hold settings for development tools.
		</p>

		<ul>
			<li>
				<p>Create <code>pyproject.toml</code> in <code>test-project</code>:</p>
				<Code
					lang="text"
					code={String.raw`[project]
name = "test-project"
version = "0.1.0"
dependencies = [
    "numpy",
    "matplotlib",
]`}
				/>
			</li>
		</ul>

		<p>Install the project and its dependencies from the current directory:</p>

		<Code lang="bash" code={String.raw`python -m pip install .`} />
	</details>

	<details>
		<summary>Classic approach: requirements.txt</summary>

		<p>
			Create <code>requirements.txt</code> in <code>test-project</code> with the following contents. Without
			version pins, pip selects releases compatible with your Python version:
		</p>

		<Code
			lang="text"
			code={String.raw`numpy
matplotlib`}
		/>

		<p>Install the packages into the active environment:</p>

		<Code lang="bash" code={String.raw`python -m pip install -r requirements.txt`} />
	</details>

	<details open>
		<summary>Verify the Environment</summary>

		<p>
			Run this command from <code>test-project</code> to check that both packages are available in your
			environment:
		</p>

		<Code
			lang="bash"
			code={String.raw`python -c "import numpy, matplotlib; print(numpy.__version__, matplotlib.__version__)"`}
		/>
	</details>
</LessonSection>

<LessonSection id="run-main-py-in-venv">
	<h3>Run main.py in venv</h3>

	<p>
		Keep <code>test-project</code> open as your project in Zed. We will use the
		<code>.venv</code> and packages from the previous section.
	</p>

	<details open>
		<summary>Select the environment in Zed</summary>

		<ol>
			<li>Open <code>main.py</code>.</li>
			<li>
				Open the command palette with <kbd>Cmd+Shift+P</kbd> (macOS) or
				<kbd>Ctrl+Shift+P</kbd> (Linux/Windows), then run <code>toolchain: select</code>. You can
				also click the Python toolchain in the status bar.
			</li>
			<li>
				Choose the Python interpreter inside <code>test-project/.venv</code>. If it is missing,
				click
				<strong>Add toolchain</strong>
				and enter the full path to
				<code>~/workspace/pythonlab/lab1/test-project/.venv/bin/python</code>, replacing
				<code>~</code> with your home directory.
			</li>
		</ol>
	</details>

	<details open>
		<summary>New main.py</summary>

		<p>Replace the contents of <code>main.py</code> with this code and save the file:</p>

		<Code
			lang="python"
			code={String.raw`#!/usr/bin/env python3

import numpy as np
import matplotlib.pyplot as plt

x = np.arange(-2,2.1,0.1)
y = x**2

plt.plot(x, y, label="$y=x^2$")
plt.legend()
plt.xlabel('$x$')
plt.ylabel('$y$')
plt.show()`}
		/>
	</details>

	<details open>
		<summary>Run from Zed's UI</summary>

		<ol>
			<li>Save <code>main.py</code> and keep it open in the editor.</li>
			<li>Open the command palette and run <code>task: spawn</code>.</li>
			<li>
				Choose the <strong>Run module …</strong> task for <code>main</code> and press
				<kbd>Enter</kbd>. Zed uses the Python environment selected earlier.
			</li>
			<li>
				A window should open with a plot of <code>y = x²</code>. Close it before running again.
			</li>
			<li>
				To rerun the task, press <kbd>Cmd+Option+R</kbd> on macOS or
				<kbd>Ctrl+Shift+R</kbd> on Linux and Windows (including when connected to WSL).
			</li>
		</ol>
	</details>

	<details open>
		<summary>Run from Zed's terminal</summary>

		<p>
			In Zed's terminal, with your environment active and <code>test-project</code> as the current
			directory, run the command below. If you open a new terminal, Zed activates the selected
			environment automatically by default. If you are using an older terminal, activate the
			environment there first with
			<code>source .venv/bin/activate</code>. You should see the same plot.
		</p>

		<Code lang="bash" code={String.raw`python main.py`} />

		<blockquote>
			<p>
				With the environment active, you can also run <code>./main.py</code> if you made it executable
				in the shebang section. Showing the plot requires a graphical desktop and a Matplotlib GUI backend.
				On Windows, run in a Zed window connected to WSL; WSL needs GUI support (WSLg).
			</p>
		</blockquote>
	</details>
</LessonSection>

<LessonSection id="managing-with-uv">
	<h3>Managing with uv</h3>

	<details open>
		<summary>What is uv?</summary>

		<p>
			<a href="https://docs.astral.sh/uv/" target="_blank" rel="noopener">uv</a> is a modern, fast Python
			package and project manager by Astral. It provides an all-in-one replacement for tools such as pip,
			pip-tools, pipx, and virtualenv. It can manage Python versions, virtual environments, dependencies,
			and project commands.
		</p>

		<blockquote>
			<p>
				From uv's website: &quot;An extremely fast Python package and project manager, written in
				Rust.&quot;
			</p>
		</blockquote>
	</details>

	<details open>
		<summary>Install uv</summary>

		<p>
			On macOS, Linux, or WSL, run Astral's installer in Zed's terminal. On Windows, make sure Zed
			is connected to WSL so its terminal runs in WSL, not PowerShell:
		</p>

		<Code lang="bash" code={String.raw`curl -LsSf https://astral.sh/uv/install.sh | sh`} />

		<p>Open a new terminal after installation, then check that uv is available:</p>

		<Code lang="bash" code={String.raw`uv --version`} />

		<p>
			If the command is not found, follow the installer's instructions to update your
			<code>PATH</code>. See
			<a
				href="https://docs.astral.sh/uv/getting-started/installation/"
				target="_blank"
				rel="noopener">Astral's installation guide</a
			> for other installation methods.
		</p>
	</details>

	<details open>
		<summary>Manage project with uv</summary>

		<p>
			Before starting, remove the <code>pyproject.toml</code> from the previous steps, or rename it
			to <code>pyproject-venv.toml</code> if you want to keep a backup. <code>uv init</code> needs a
			directory without an existing <code>pyproject.toml</code>.
		</p>

		<ol>
			<li>
				<p>
					In Zed's terminal, make sure you are in <code>test-project</code>. If the previous
					environment is still active, run <code>deactivate</code> first.
				</p>
			</li>
			<li>
				<p>Initialise the current project with Python 3.15:</p>
				<Code lang="bash" code={String.raw`uv init --no-package --python 3.15`} />
				<p>
					Unlike <code>venv</code>, uv can download Python if the requested version is missing. It
					records the selected version in <code>.python-version</code>.
				</p>
			</li>
			<li>
				<p>Add the project's dependencies:</p>
				<Code lang="bash" code={String.raw`uv add numpy matplotlib`} />
				<p>
					uv updates <code>pyproject.toml</code>, saves exact dependency versions in
					<code>uv.lock</code>, and installs them into <code>.venv</code>. It recreates the
					environment if the old Python version is incompatible.
				</p>
			</li>
			<li>
				<p>Run the plotting program from the previous section:</p>
				<Code lang="bash" code={String.raw`uv run main.py`} />
				<p>
					<code>uv run main.py</code> is equivalent to <code>uv run python main.py</code>. Both use
					the project's environment without manual activation and should show the same plot. You can
					also activate it with <code>source .venv/bin/activate</code> and use it in the terminal as
					before. With <code>main.py</code> open, Zed should automatically detect
					<code>.venv</code> and show Python 3.15 in the toolchain selector. If it still shows the
					previous interpreter, run <code>toolchain: select</code> and choose the updated environment.
				</p>
			</li>
		</ol>
	</details>
</LessonSection>

<LessonSection id="python-repl">
	<h3>Python REPL</h3>

	<blockquote>
		<p>a.k.a. Python shell</p>
	</blockquote>

	<p>
		The Python REPL (Read–Eval–Print Loop) is an interactive prompt. It reads a line of code, runs
		it, prints the result and waits for the next line. Use it to try a small piece of code before
		you put it in a file.
	</p>

	<details open>
		<summary>Start the REPL with uv</summary>

		<p>In Zed's terminal, make sure you are in <code>test-project</code> and run:</p>

		<Code lang="bash" code={String.raw`uv run python`} />

		<p>
			uv starts the Python from the project's <code>.venv</code>, so the REPL can import the
			project's packages and the modules in the current folder. The prompt changes to
			<code>&gt;&gt;&gt;</code>. Type a line of Python and press <kbd>Enter</kbd> to run it:
		</p>

		<Code
			lang="python"
			code={String.raw`>>> 2 + 3
5
>>> import sys
>>> sys.executable
'/home/user/workspace/pythonlab/lab1/test-project/.venv/bin/python'
>>> import numpy as np
>>> np.arange(5) ** 2
array([ 0,  1,  4,  9, 16])`}
		/>

		<p>
			<code>sys.executable</code> shows the path of the running Python. It should be inside
			<code>test-project/.venv</code>; your home folder may differ.
		</p>
	</details>

	<details open>
		<summary>Exit the REPL</summary>

		<p>
			Type <code>exit()</code> and press <kbd>Enter</kbd>, or press <kbd>Ctrl+D</kbd>, to return to
			the terminal. Since Python 3.13 you can also type just <code>exit</code>.
		</p>

		<Code lang="python" code={String.raw`>>> exit()`} />

		<p>
			Variables and imports are lost when you exit. If you change a module, exit and restart the
			REPL to load the new version.
		</p>
	</details>

	<blockquote>
		<p>
			<strong>System Python:</strong> to try the Python installed on your system instead, make sure
			no environment is active (run <code>deactivate</code> if needed) and run
			<code>python3</code>. Exit it the same way. The system Python does not see the packages in
			<code>.venv</code>, so <code>import numpy</code> may fail with a
			<code>ModuleNotFoundError</code>.
		</p>

		<Code
			lang="text"
			code={String.raw`python3
>>> import sys
>>> sys.executable
'/usr/bin/python3'
>>> exit()`}
		/>
	</blockquote>
</LessonSection>

<LessonSection id="summary">
	<h3>Why Use Virtual Environments?</h3>

	<ul>
		<li>
			<strong>Keep projects separate.</strong> Give each project its own virtual environment in
			<code>.venv</code>, with a Python interpreter, activation scripts, and third-party packages,
			so its dependencies do not interfere with other projects.
		</li>
		<li>
			<strong>Keep system Python clean.</strong> Install project packages in <code>.venv</code>
			instead of modifying global packages that system tools may rely on.
		</li>
		<li>
			<strong>Make environments reproducible.</strong> Save dependency versions in a lockfile and record
			the Python version so you can recreate a consistent setup.
		</li>
		<li>
			<strong>Experiment and clean up easily.</strong> Try packages in an isolated environment, then
			delete <code>.venv</code> to remove its installed packages without affecting other projects.
		</li>
		<li>
			<strong>Avoid permission issues.</strong> Installing packages in an environment you own usually
			requires no administrator privileges.
		</li>
	</ul>

	<details open>
		<summary>Working with uv</summary>

		<p>
			uv manages Python environments quickly and records exact dependency versions in a lockfile for
			reproducible setups. Run the commands below from your project directory.
			<code>uv run ...</code> uses the project's environment without manual activation.
		</p>

		<ul>
			<li>
				Add packages with <code>uv add ...</code>. This installs them, updates
				<code>pyproject.toml</code>, and records resolved versions in <code>uv.lock</code>.
			</li>
			<li>
				Create or update the environment from the project's dependency files with
				<code>uv sync</code>.
			</li>
			<li>
				Check for missing or incompatible package dependencies with <code>uv pip check</code>.
			</li>
			<li>Run your program with <code>uv run main.py</code>.</li>
			<li>
				Commit or share <code>pyproject.toml</code> and <code>uv.lock</code> so others can recreate the
				environment.
			</li>
			<li>Do not track or commit the <code>.venv</code> directory in Git.</li>
		</ul>
	</details>

	<details>
		<summary>When not to use environments (optional)</summary>

		<p>
			A dedicated environment is usually best for projects with third-party dependencies, rather
			than installing packages into your operating system's Python. However, you may not need a
			separate virtual environment in these cases:
		</p>

		<ul>
			<li>
				<strong>Standard-library-only scripts.</strong> Quick calculations or small scripts that use only
				Python's built-in modules need no third-party packages to isolate.
			</li>
			<li>
				<strong>An environment is already provided.</strong> Managed containers and notebook platforms,
				such as Google Colab or Kubeflow, may already provide Python and the packages you need. Follow
				the platform's setup instructions rather than creating another environment inside it.
			</li>
			<li>
				<strong>Standalone command-line tools.</strong> Use <code>uv tool install</code> or
				<code>pipx</code> for tools you run across projects. These manage isolated environments for you
				instead of adding the tools to each project's dependencies.
			</li>
			<li>
				<strong>uv not available.</strong> If uv is unavailable or you prefer fewer tools, Python's
				built-in <code>venv</code> with <code>pip</code> is a valid alternative for managing a virtual
				environment.
			</li>
		</ul>
	</details>
</LessonSection>

<style>
	details {
		border-color: transparent;
	}
</style>
