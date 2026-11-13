export interface NavStep {
	id: string;
	title: string;
}

export interface NavPage {
	path: string;
	title: string;
	/** The sections of a lesson, shown one at a time. A page without steps scrolls as a whole. */
	steps?: NavStep[];
}

export interface NavSection {
	path: string;
	title: string;
	/** After the last step, "next" leads back to the section's contents page. */
	endsAtContents?: boolean;
	pages: NavPage[];
}

export interface NavLink {
	path: string;
	label: string;
}

/** Where a URL sits in the site, with everything the navigation around the page needs. */
export interface NavLocation {
	title: string;
	steps?: NavStep[];
	/** Position of the current step in `steps`. */
	active: number;
	previous?: NavLink;
	next?: NavLink;
	/** The section's contents page followed by its lesson pages, for the carousel. */
	sequence: NavLink[];
	/** Position of the current page in `sequence`. */
	index: number;
	/** Last step of the previous page, for the carousel's left side. */
	previousPage?: NavLink;
	/** First step of the next page, for the carousel's right side. */
	nextPage?: NavLink;
}

export const sections: NavSection[] = [
	{
		path: 'introduction/',
		title: 'Introduction to Python',
		// The last step leads back to the contents page.
		endsAtContents: true,
		pages: [
			{
				path: 'introduction/01',
				title: 'Python',
				steps: [
					{ id: 'python', title: 'Python' },
					{ id: 'workshop', title: 'About This Workshop' },
					{ id: 'code-example', title: 'A Code Example' },
					{ id: 'exercise', title: 'Exercises' },
					{ id: 'standard-library', title: 'The Python Standard Library' },
				],
			},
			{
				path: 'introduction/02',
				title: 'Syntax and Arithmetics',
				steps: [
					{ id: 'python-syntax', title: 'Python Syntax' },
					{ id: 'commenting-your-code', title: 'Commenting Your Code' },
					{ id: 'arithmetic-operators', title: 'Arithmetic Operators' },
					{
						id: 'floor-division-and-modulo-operators',
						title: 'Floor Division and Modulo Operators',
					},
					{ id: 'operator-precedence', title: 'Operator Precedence' },
					{ id: 'practice-with-python-shell', title: 'Practice with Python Shell' },
					{ id: 'fix-a-syntax-error', title: 'Fix a Syntax Error' },
					{
						id: 'floor-division-with-negative-numbers',
						title: 'Floor Division with Negative Numbers',
					},
				],
			},
			{
				path: 'introduction/03',
				title: 'Strings',
				steps: [
					{ id: 'strings', title: 'Strings' },
					{ id: 'multiline-strings', title: 'Multiline Strings' },
					{ id: 'raw-strings', title: 'Raw Strings' },
					{ id: 'string-concatenation-and-length', title: 'String Concatenation and Length' },
					{ id: 'f-strings', title: 'F-Strings' },
					{ id: 'debug-a-syntax-error', title: 'Debug a Syntax Error' },
					{ id: 'string-representation', title: 'String Representation' },
				],
			},
			{
				path: 'introduction/04',
				title: 'Variables and Types',
				steps: [
					{ id: 'variable', title: 'Variable' },
					{ id: 'naming-variables', title: 'Naming Variables' },
					{ id: 'updating-variables-value', title: "Updating Variable's Value" },
					{ id: 'types', title: 'Types' },
					{ id: 'boolean-type', title: 'Boolean Type' },
					{ id: 'none-type', title: 'None Type' },
					{ id: 'determining-and-verifying-types', title: 'Determining and Verifying Types' },
					{ id: 'type-casting', title: 'Type Casting' },
					{ id: 'dynamic-typing', title: 'Dynamic Typing' },
					{ id: 'calculate-sum-and-average', title: 'Calculate Sum and Average' },
				],
			},
			{
				path: 'introduction/05',
				title: 'Numerical and Logical Operations',
				steps: [
					{ id: 'infinity', title: 'Infinity' },
					{ id: 'exponentials', title: 'Exponentials' },
					{ id: 'augmented-assignments', title: 'Augmented Assignments' },
					{ id: 'formatting-numbers', title: 'Formatting Numbers' },
					{ id: 'comparison-and-logical-operations', title: 'Comparison and Logical Operations' },
				],
			},
			{
				path: 'introduction/06',
				title: 'Functions',
				steps: [
					{ id: 'functions', title: 'Functions' },
					{ id: 'defining-functions', title: 'Defining Functions' },
					{ id: 'return-statement', title: 'Return Statement' },
					{ id: 'multiparameter-functions', title: 'Multiparameter Functions' },
					{ id: 'returning-multiple-values', title: 'Returning Multiple Values' },
					{ id: 'args-and-kwargs', title: 'args and kwargs' },
					{ id: 'fix-a-greeter-function', title: 'Fix a Greeter Function' },
					{ id: 'compute-vector-length', title: 'Compute Vector Length' },
					{ id: 'compute-l1-and-l2-norms', title: 'Compute L1 and L2 Norms' },
					{ id: 'function-objects', title: 'Function Objects' },
				],
			},
			{
				path: 'introduction/07',
				title: 'Scope',
				steps: [
					{ id: 'scope', title: 'Scope' },
					{ id: 'global-vs-local-scope', title: 'Global vs Local Scope' },
					{ id: 'nested-functions', title: 'Nested Functions' },
					{
						id: 'updating-variables-outside-the-scope',
						title: 'Updating Variables Outside the Scope',
					},
					{ id: 'timer-with-customisable-step-size', title: 'Timer with Customisable Step Size' },
				],
			},
			{
				path: 'introduction/08',
				title: 'Containers',
				steps: [
					{ id: 'containers', title: 'Containers' },
					{ id: 'iterables', title: 'Iterables' },
					{ id: 'lists', title: 'Lists' },
					{ id: 'tuples', title: 'Tuples' },
					{ id: 'strings', title: 'Strings' },
					{ id: 'dictionaries', title: 'Dictionaries' },
					{ id: 'sets', title: 'Sets' },
					{ id: 'membership-testing', title: 'Membership Testing' },
					{ id: 'slice-a-tuple', title: 'Slice a Tuple' },
					{ id: 'hide-a-word', title: 'Hide a Word' },
				],
			},
			{
				path: 'introduction/09',
				title: 'Logical Flow',
				steps: [
					{ id: 'if-statements', title: 'If Statements' },
					{ id: 'conditional-expressions', title: 'Conditional Expressions' },
				],
			},
			{
				path: 'introduction/10',
				title: 'Loops',
				steps: [
					{ id: 'loops', title: 'Loops' },
					{ id: 'for-loops', title: 'For Loops' },
					{ id: 'range', title: 'Range' },
					{ id: 'dictionaries-enumerate-and-zip', title: 'Dictionaries, Enumerate, and Zip' },
					{ id: 'controlling-loops', title: 'Controlling Loops with continue and break Keywords' },
					{ id: 'while-loops', title: 'While Loops' },
					{ id: 'fix-a-loop-counter', title: 'Fix a Loop Counter' },
					{ id: 'infinite-while-loops', title: 'Infinite While Loops' },
				],
			},
			{
				path: 'introduction/11',
				title: 'Useful Tools',
				steps: [
					{ id: 'useful-tools', title: 'Useful Tools' },
					{ id: 'iterable-unpacking', title: 'Iterable Unpacking' },
					{ id: 'lambda-functions', title: 'Lambda Functions' },
					{ id: 'comprehensions', title: 'Comprehensions' },
					{ id: 'sorting', title: 'Sorting' },
					{ id: 'map-and-filter', title: 'Map and Filter' },
					{ id: 'getting-help', title: 'Getting Help' },
					{ id: 'sort-characters', title: 'Sort Characters' },
					{ id: 'sort-by-last-letter', title: 'Sort by Last Letter' },
					{ id: 'filter-and-sort-numbers', title: 'Filter and Sort Numbers' },
					{ id: 'explore-built-in-functions', title: 'Explore Built-in Functions' },
				],
			},
			{
				path: 'introduction/12',
				title: 'Handling Errors',
				steps: [
					{ id: 'exceptions', title: 'Exceptions' },
					{ id: 'memorising-errors', title: 'Do You Need to Memorise Errors?' },
					{ id: 'handling-exceptions', title: 'Handling Exceptions' },
					{ id: 'raising-exceptions', title: 'Raising Exceptions' },
					{ id: 'assertions', title: 'Assertions' },
				],
			},
			{
				path: 'introduction/13',
				title: 'Conclusion',
				steps: [
					{ id: 'workshop-recap', title: 'Workshop Recap' },
					{ id: 'next-steps', title: 'Next Steps' },
				],
			},
		],
	},
	{
		path: 'lab-01/',
		title: 'Prepare Python Environment',
		pages: [
			{
				path: 'lab-01/01',
				title: 'Prerequisites',
				steps: [
					{ id: 'prerequisites', title: 'Prerequisites' },
					{ id: 'setup-your-system', title: 'Setup Your System' },
				],
			},
			{
				path: 'lab-01/02',
				title: 'Project',
				steps: [
					{ id: 'dna-analyser', title: 'DNA Analyser' },
					{ id: 'goals-of-the-project', title: 'Goals of the Project' },
				],
			},
			{
				path: 'lab-01/03',
				title: 'Terminal',
				steps: [
					{ id: 'verify-your-system-in-the-terminal', title: 'Verify Your System in the Terminal' },
					{ id: 'relative-and-absolute-path', title: 'Relative and Absolute Path' },
				],
			},
			{
				path: 'lab-01/04',
				title: 'Relative Path',
				steps: [
					{ id: 'relative-and-absolute-path', title: 'Relative and Absolute Path' },
					{
						id: 'using-relative-and-absolute-paths',
						title: 'Where Do We Use Relative and Absolute Paths?',
					},
				],
			},
			{
				path: 'lab-01/05',
				title: 'Linux Commands (Optional)',
				steps: [
					{ id: 'linux-commands', title: 'Some Linux Commands (Optional)' },
					{
						id: 'terminal-or-gui',
						title: 'Should You Use the Terminal or Graphical User Interface?',
					},
					{ id: 'workspace-folder', title: 'Workspace Folder' },
				],
			},
			{
				path: 'lab-01/06',
				title: 'Part 2: DNA Analysis Tool',
				steps: [
					{ id: 'project-folder-organisation', title: 'Project Folder Organisation' },
					{ id: 'entry-point', title: 'Entry Point for Your Program: main.py' },
					{ id: 'shebang-line', title: 'Shebang Line' },
				],
			},
			{
				path: 'lab-01/07',
				title: 'Project: Part 3',
				steps: [{ id: 'write-and-test', title: 'Write and Test a Python Program' }],
			},
			{
				path: 'lab-01/99',
				title: 'Managing Python Environments',
				steps: [{ id: 'python-environments', title: 'Managing Python Environments' }],
			},
		],
	},
];

function link(item: { path: string; title: string }): NavLink {
	return { path: item.path, label: item.title };
}

/** Every stop on a page in reading order: its steps, or the page itself when it has none. */
function stops(page: NavPage): NavLink[] {
	return (
		page.steps?.map((step) => ({ path: `${page.path}#${step.id}`, label: step.title })) ?? [
			link(page),
		]
	);
}

/** Link to a page's first or last step, labelled with the page title. */
function pageLink(page: NavPage, at: 0 | -1): NavLink {
	return { path: stops(page).at(at)?.path ?? page.path, label: page.title };
}

/** The lesson page at a nav path such as `introduction/02`. */
export function findPage(path: string): NavPage | undefined {
	for (const section of sections) {
		const page = section.pages.find((page) => page.path === path);
		if (page) return page;
	}
}

/** Position of the step a URL hash points at; the first step when it matches none. */
export function activeStep(steps: NavStep[] | undefined, hash: string): number {
	return Math.max(0, steps?.findIndex((step) => `#${step.id}` === hash) ?? 0);
}

/** Describe the section contents page or lesson page at a nav path; undefined elsewhere. */
export function locate(path: string, hash = ''): NavLocation | undefined {
	for (const section of sections) {
		const { pages } = section;
		const contents = link(section);
		const sequence = [contents, ...pages.map(link)];

		if (section.path === path) {
			return {
				title: section.title,
				active: 0,
				previous: { path: '', label: 'Back to Workshops' },
				next: pages[0] && stops(pages[0])[0],
				sequence,
				index: 0,
				nextPage: pages[0] && pageLink(pages[0], 0),
			};
		}

		const pageIndex = pages.findIndex((page) => page.path === path);
		if (pageIndex === -1) continue;

		const page = pages[pageIndex];
		const active = activeStep(page.steps, hash);
		const before: NavPage | undefined = pages[pageIndex - 1];
		const after: NavPage | undefined = pages[pageIndex + 1];
		// Step through this page first, then cross into the neighbouring page.
		const here = stops(page);

		return {
			title: page.title,
			steps: page.steps,
			active,
			previous: here[active - 1] ?? (before ? stops(before).at(-1) : contents),
			next:
				here[active + 1] ??
				(after ? stops(after)[0] : section.endsAtContents ? contents : undefined),
			sequence,
			index: pageIndex + 1,
			previousPage: before ? pageLink(before, -1) : contents,
			nextPage: after && pageLink(after, 0),
		};
	}
}
