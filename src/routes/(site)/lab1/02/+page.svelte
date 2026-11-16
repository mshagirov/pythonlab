<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import { href } from '#lib/href.ts';
</script>

<LessonSection id="prerequisites">
	<h3>Prerequisites</h3>

	<p>We need a code editor to write Python programs and a Python interpreter to run them.</p>

	<p>
		Look for code completion, syntax highlighting, error checking, and customisation. Popular
		editors and integrated development environments (IDEs) include:
	</p>

	<ul>
		<li><strong>Graphical IDEs</strong>: VS Code, PyCharm</li>
		<li><strong>Keyboard-centric editors</strong>: Neovim, Vim, Emacs</li>
		<li><strong>Specialised IDEs</strong>: Android Studio, Xcode</li>
	</ul>

	<p>
		In this lab, we will use <a href="https://zed.dev/download" target="_blank" rel="noopener"
			>Zed</a
		>, a fast, efficient code editor with a graphical user interface (GUI). Zed provides IDE
		features such as syntax highlighting, code completion, and an integrated terminal to help us
		write and run Python programs. If you are already comfortable with another IDE or editor, you
		may use your preferred tool instead.
	</p>

	<p>
		You will also need a Python interpreter. If you don't have one, we'll install a current stable
		version in the next section. If Python is already installed, you can skip installation; the
		exact version is not important for this lab.
	</p>

	<blockquote>
		<p>
			Throughout this lab, we will run Python in a Unix-like environment: WSL on Windows, macOS, or
			Linux. This gives us several advantages:
		</p>

		<ul>
			<li>
				A consistent set of Unix commands for working in the command line interface (CLI) across
				these environments.
			</li>
			<li>Windows users can apply the terminal skills they learn in WSL to Linux and macOS.</li>
			<li>
				A shared environment for following the lab's examples and using Python development tools.
			</li>
		</ul>
	</blockquote>
</LessonSection>
<LessonSection id="check-and-install-python">
	<h3>Check and Install Python</h3>

	<p>
		Check whether Python is installed, then follow the installation instructions for
		<em><u>your</u></em> operating system if needed.
	</p>

	<details name="os-type">
		<summary>Windows</summary>

		<p>
			<em>For Windows machines, we will run Python in WSL and connect to it from our editor.</em>
		</p>

		<h3>Install WSL</h3>

		<p>
			For Windows, we will follow
			<a href="https://code.visualstudio.com/docs/remote/wsl" target="_blank" rel="noopener"
				>VS Code instructions for developing in WSL</a
			>:
		</p>

		<ol>
			<li>
				<p>
					<em>Optional</em>: Update your Windows and install
					<a href="https://aka.ms/terminal" target="_blank" rel="noopener">Windows Terminal</a>.
				</p>
			</li>
			<li>
				<p>
					Open PowerShell in <strong>administrator</strong> mode and run the following command. Set your
					Linux (Ubuntu) password and username. You may use the same credentials as your Windows OS.
				</p>
				<Code lang="bash" code={String.raw`wsl --install`} />
			</li>
			<li><p>Restart your machine.</p></li>
		</ol>

		<h3>Install Python</h3>

		<p>
			Your WSL Linux should come with Python installed. To check your Python installation start your
			WSL Ubuntu in PowerShell or Windows Terminal.
		</p>

		<Code lang="bash" code={String.raw`wsl`} />

		<p>
			Alternatively, you can start the WSL system with <code>ubuntu</code> command which is the name
			of the default Linux distribution that gets installed with <code>wsl</code>.
		</p>

		<p>Inside WSL Ubuntu, run the following to check the version of installed Python:</p>

		<Code lang="bash" code={String.raw`python3 --version`} />

		<p>
			If you get <code>command not found</code> errors, install Python by following the steps below:
		</p>

		<ol>
			<li>
				<p>Update your Ubuntu packages. Use your Linux/Ubuntu password when prompted.</p>
				<Code
					lang="bash"
					code={String.raw`sudo apt update
sudo apt upgrade`}
				/>
			</li>
			<li>
				<p>Install Python.</p>
				<Code lang="bash" code={String.raw`sudo apt install python3`} />
			</li>
		</ol>

		<p>
			You can exit or stop Ubuntu by entering <code>exit</code> in the Ubuntu shell (CLI). This
			exits the current shell (CLI). To restart and/or stop WSL you can use
			<code>wsl.exe --shutdown</code> command in PowerShell or Ubuntu CLI.
		</p>
	</details>

	<details name="os-type">
		<summary>macOS</summary>

		<p>
			<em
				>Homebrew allows us to install and manage Python versions without interfering with any
				system-provided Python.</em
			>
		</p>

		<p>Open Terminal and check whether Python is already installed:</p>

		<Code lang="bash" code={String.raw`python3 --version`} />

		<p>If a Python version is displayed, you can skip installation.</p>

		<h3>Install Homebrew and Python</h3>

		<p>
			We will use <a href="https://brew.sh" target="_blank" rel="noopener">Homebrew</a> to manage the
			Python on macOS. If Python is missing, follow the steps below, skipping Homebrew installation if
			you already have it:
		</p>

		<ol>
			<li><p>Open terminal app. (You can also use spotlight to find Terminal)</p></li>
			<li>
				<p>Install Xcode command line tools by running the following command in the terminal.</p>
				<Code lang="bash" code={String.raw`xcode-select --install`} />
			</li>
			<li>
				<p>
					Copy and run the following command to install Homebrew (<code>brew</code> command). Enter your
					macOS password if prompted.
				</p>
				<Code
					lang="bash"
					code={String.raw`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
				/>
			</li>
			<li>
				<p>Test the installation.</p>
				<Code lang="bash" code={String.raw`brew`} />
			</li>
			<li>
				<p>Install Python.</p>
				<Code lang="bash" code={String.raw`brew install python`} />
			</li>
			<li>
				<p>Test Python installation.</p>
				<Code lang="bash" code={String.raw`python3 --version`} />
			</li>
		</ol>
	</details>

	<details name="os-type">
		<summary>Linux</summary>

		<p>
			<em
				>For most Linux distributions, we will initially use system Python and use uv or conda to
				install newer versions of Python in later parts of this lab. Omarchy also provides a Python
				development environment managed by mise.</em
			>
		</p>

		<p>
			Most Linux distributions come with Python installed. To check this, open your terminal and run
			the Python version check.
		</p>

		<Code lang="bash" code={String.raw`python3 --version`} />

		<p>
			If Python cannot be found, update your repository indices using the system's package manager.
			Upgrade your libraries, then use the package manager to install Python 3.
		</p>

		<p><strong>Ubuntu:</strong></p>

		<Code
			lang="bash"
			code={String.raw`sudo apt update
sudo apt upgrade
sudo apt install python3`}
		/>

		<p><strong>RHEL / Rocky Linux:</strong></p>

		<Code
			lang="bash"
			code={String.raw`sudo dnf upgrade --refresh
sudo dnf install python3`}
		/>

		<p>After installation, run <code>python3 --version</code> again to confirm it worked.</p>

		<p><strong>Omarchy:</strong></p>

		<p>
			To set up Python through Omarchy, open the Omarchy menu with <kbd>Super + Space</kbd> and
			select <strong>Install &gt; Development &gt; Python</strong>. This sets up Python using mise
			and also installs uv. See the
			<a href="https://omarchy.org/manual/development-tools/" target="_blank" rel="noopener"
				>Omarchy development tools manual</a
			> for details. Then check Python in your terminal:
		</p>

		<Code lang="bash" code={String.raw`python --version`} />
	</details>
</LessonSection>

<LessonSection id="install-zed">
	<h3>Install Zed</h3>

	<p>
		Go to <a href="https://zed.dev/download" target="_blank" rel="noopener">zed.dev/download</a>
		and follow the download and installation instructions for your operating system.
	</p>

	<p>
		Prefer VS Code? Follow the
		<a href={href('lab1/02#install-vscode')}>optional VS Code installation instructions</a>
		instead.
	</p>

	<blockquote>
		<p>
			<strong>Windows users:</strong> Install the native Windows version of Zed and run Python in
			WSL. Follow Zed's
			<a href="https://zed.dev/docs/remote-development#wsl-support" target="_blank" rel="noopener"
				>WSL support instructions</a
			> to connect Zed to your WSL environment.
		</p>
	</blockquote>
</LessonSection>

<LessonSection id="install-vscode">
	<h3>Install VS Code</h3>

	<p>
		With Python installed, set up your editor by following the instructions for
		<em><u>your</u></em> operating system below.
	</p>

	<details name="os-type">
		<summary>Windows</summary>

		<h3>Install VS Code and Extensions</h3>

		<ol>
			<li>
				<p>
					Download and install VS Code for Windows from <a
						href="https://code.visualstudio.com/"
						target="_blank"
						rel="noopener">code.visualstudio.com</a
					>. Keep the default installation options.
				</p>
			</li>
			<li>
				<p>
					Install the <a
						href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl"
						target="_blank"
						rel="noopener">WSL extension for VS Code</a
					> from the site or the VS Code extensions menu.
				</p>
			</li>
			<li>
				<p>
					Connect VS Code to WSL, then install the <a
						href="https://marketplace.visualstudio.com/items?itemName=ms-python.python"
						target="_blank"
						rel="noopener">Microsoft Python extension</a
					> in WSL.
				</p>
			</li>
		</ol>

		<p>
			You may find the
			<a
				href="https://code.visualstudio.com/docs/getstarted/getting-started#getstarted-articles"
				target="_blank"
				rel="noopener">VS Code tutorial</a
			>
			and instructions on setting up and using
			<a
				href="https://code.visualstudio.com/docs/remote/wsl#_from-vs-code"
				target="_blank"
				rel="noopener">WSL with VS Code</a
			>
			helpful when getting started with VS Code and WSL.
		</p>

		<h3>Managing Files in WSL</h3>

		<p>
			Please read the notes on the
			<a
				href="https://learn.microsoft.com/en-us/windows/wsl/setup/environment#file-storage"
				target="_blank"
				rel="noopener">file storage in WSL and Windows</a
			>.
		</p>
	</details>

	<details name="os-type">
		<summary>macOS</summary>

		<h3>Install VS Code</h3>

		<ul>
			<li>
				Install VS Code from <a href="https://code.visualstudio.com/" target="_blank" rel="noopener"
					>code.visualstudio.com</a
				>.
			</li>
			<li>
				Install <a
					href="https://marketplace.visualstudio.com/items?itemName=ms-python.python"
					target="_blank"
					rel="noopener">Microsoft Python extension</a
				>
				for VS Code. Alternatively, you can find and install the Python extension from VS Code extensions
				panel.
			</li>
			<li>
				You may find the <a
					href="https://code.visualstudio.com/docs/getstarted/getting-started#getstarted-articles"
					target="_blank"
					rel="noopener">VS Code tutorial</a
				>
				helpful when getting started with VS Code.
			</li>
		</ul>
	</details>

	<details name="os-type">
		<summary>Linux</summary>

		<h3>Install VS Code (Optional)</h3>

		<p>
			Follow the Linux installation steps to install VS Code from the
			<a href="https://code.visualstudio.com/docs/setup/linux" target="_blank" rel="noopener"
				>VS Code documentation</a
			>.
		</p>
	</details>
</LessonSection>
