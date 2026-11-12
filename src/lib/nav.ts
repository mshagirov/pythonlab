export interface NavPage {
	path: string;
	title: string;
	steps?: { id: string; title: string }[];
}

export interface NavSection {
	path: string;
	title: string;
	pages: NavPage[];
}

export const introductionSteps = [
	{ id: 'python', title: 'Python' },
	{ id: 'workshop', title: 'About This Workshop' },
	{ id: 'code-example', title: 'A Code Example' },
	{ id: 'exercise', title: 'Exercises' },
	{ id: 'standard-library', title: 'The Python Standard Library' },
];

export const syntaxSteps = [
	{ id: 'python-syntax', title: 'Python Syntax' },
	{ id: 'commenting-your-code', title: 'Commenting Your Code' },
	{ id: 'arithmetic-operators', title: 'Arithmetic Operators' },
	{ id: 'floor-division-and-modulo-operators', title: 'Floor Division and Modulo Operators' },
	{ id: 'operator-precedence', title: 'Operator Precedence' },
	{ id: 'practice-with-python-shell', title: 'Practice with Python Shell' },
	{ id: 'fix-a-syntax-error', title: 'Fix a Syntax Error' },
	{ id: 'floor-division-with-negative-numbers', title: 'Floor Division with Negative Numbers' },
];

export const stringSteps = [
	{ id: 'strings', title: 'Strings' },
	{ id: 'multiline-strings', title: 'Multiline Strings' },
	{ id: 'raw-strings', title: 'Raw Strings' },
	{ id: 'string-concatenation-and-length', title: 'String Concatenation and Length' },
	{ id: 'f-strings', title: 'F-Strings' },
	{ id: 'debug-a-syntax-error', title: 'Debug a Syntax Error' },
	{ id: 'string-representation', title: 'String Representation' },
];

export const variableSteps = [
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
];

export const lessonSteps: Record<string, NonNullable<NavPage['steps']>> = {
	'introduction/05': [
		{ id: 'infinity', title: 'Infinity' },
		{ id: 'exponentials', title: 'Exponentials' },
		{ id: 'augmented-assignments', title: 'Augmented Assignments' },
		{ id: 'formatting-numbers', title: 'Formatting Numbers' },
		{ id: 'comparison-and-logical-operations', title: 'Comparison and Logical Operations' },
	],
	'introduction/06': [
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
	'introduction/07': [
		{ id: 'scope', title: 'Scope' },
		{ id: 'global-vs-local-scope', title: 'Global vs Local Scope' },
		{ id: 'nested-functions', title: 'Nested Functions' },
		{ id: 'updating-variables-outside-the-scope', title: 'Updating Variables Outside the Scope' },
		{ id: 'timer-with-customisable-step-size', title: 'Timer with Customisable Step Size' },
	],
	'introduction/08': [
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
	'introduction/09': [
		{ id: 'if-statements', title: 'If Statements' },
		{ id: 'conditional-expressions', title: 'Conditional Expressions' },
	],
	'introduction/10': [
		{ id: 'loops', title: 'Loops' },
		{ id: 'for-loops', title: 'For Loops' },
		{ id: 'range', title: 'Range' },
		{ id: 'dictionaries-enumerate-and-zip', title: 'Dictionaries, Enumerate, and Zip' },
		{ id: 'controlling-loops', title: 'Controlling Loops with continue and break Keywords' },
		{ id: 'while-loops', title: 'While Loops' },
		{ id: 'fix-a-loop-counter', title: 'Fix a Loop Counter' },
		{ id: 'infinite-while-loops', title: 'Infinite While Loops' },
	],
	'introduction/11': [
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
	'introduction/12': [
		{ id: 'exceptions', title: 'Exceptions' },
		{ id: 'memorising-errors', title: 'Do You Need to Memorise Errors?' },
		{ id: 'handling-exceptions', title: 'Handling Exceptions' },
		{ id: 'raising-exceptions', title: 'Raising Exceptions' },
		{ id: 'assertions', title: 'Assertions' },
	],
	'introduction/13': [
		{ id: 'workshop-recap', title: 'Workshop Recap' },
		{ id: 'next-steps', title: 'Next Steps' },
	],
	'lab-01/01': [
		{ id: 'prerequisites', title: 'Prerequisites' },
		{ id: 'setup-your-system', title: 'Setup Your System' },
	],
	'lab-01/02': [
		{ id: 'dna-analyser', title: 'DNA Analyser' },
		{ id: 'goals-of-the-project', title: 'Goals of the Project' },
	],
	'lab-01/03': [
		{ id: 'verify-your-system-in-the-terminal', title: 'Verify Your System in the Terminal' },
		{ id: 'relative-and-absolute-path', title: 'Relative and Absolute Path' },
	],
	'lab-01/04': [
		{ id: 'relative-and-absolute-path', title: 'Relative and Absolute Path' },
		{
			id: 'using-relative-and-absolute-paths',
			title: 'Where Do We Use Relative and Absolute Paths?',
		},
	],
	'lab-01/05': [
		{ id: 'linux-commands', title: 'Some Linux Commands (Optional)' },
		{ id: 'terminal-or-gui', title: 'Should You Use the Terminal or Graphical User Interface?' },
		{ id: 'workspace-folder', title: 'Workspace Folder' },
	],
	'lab-01/06': [
		{ id: 'project-folder-organisation', title: 'Project Folder Organisation' },
		{ id: 'entry-point', title: 'Entry Point for Your Program: main.py' },
		{ id: 'shebang-line', title: 'Shebang Line' },
	],
	'lab-01/07': [{ id: 'write-and-test', title: 'Write and Test a Python Program' }],
	'lab-01/99': [{ id: 'python-environments', title: 'Managing Python Environments' }],
};

export const sections: NavSection[] = [
	{
		path: 'introduction/',
		title: 'Introduction to Python',
		pages: [
			{ path: 'introduction/01', title: 'Python', steps: introductionSteps },
			{ path: 'introduction/02', title: 'Syntax and Arithmetics', steps: syntaxSteps },
			{ path: 'introduction/03', title: 'Strings', steps: stringSteps },
			{ path: 'introduction/04', title: 'Variables and Types', steps: variableSteps },
			{
				path: 'introduction/05',
				title: 'Numerical and Logical Operations',
				steps: lessonSteps['introduction/05'],
			},
			{ path: 'introduction/06', title: 'Functions', steps: lessonSteps['introduction/06'] },
			{ path: 'introduction/07', title: 'Scope', steps: lessonSteps['introduction/07'] },
			{ path: 'introduction/08', title: 'Containers', steps: lessonSteps['introduction/08'] },
			{ path: 'introduction/09', title: 'Logical Flow', steps: lessonSteps['introduction/09'] },
			{ path: 'introduction/10', title: 'Loops', steps: lessonSteps['introduction/10'] },
			{ path: 'introduction/11', title: 'Useful Tools', steps: lessonSteps['introduction/11'] },
			{ path: 'introduction/12', title: 'Handling Errors', steps: lessonSteps['introduction/12'] },
			{ path: 'introduction/13', title: 'Conclusion', steps: lessonSteps['introduction/13'] },
		],
	},
	{
		path: 'lab-01/',
		title: 'Lab 1: Setting Up Python Environment',
		pages: [
			{ path: 'lab-01/01', title: 'Prerequisites', steps: lessonSteps['lab-01/01'] },
			{ path: 'lab-01/02', title: 'Project', steps: lessonSteps['lab-01/02'] },
			{ path: 'lab-01/03', title: 'Terminal', steps: lessonSteps['lab-01/03'] },
			{ path: 'lab-01/04', title: 'Relative Path', steps: lessonSteps['lab-01/04'] },
			{ path: 'lab-01/05', title: 'Linux Commands (Optional)', steps: lessonSteps['lab-01/05'] },
			{ path: 'lab-01/06', title: 'Part 2: DNA Analysis Tool', steps: lessonSteps['lab-01/06'] },
			{ path: 'lab-01/07', title: 'Project: Part 3', steps: lessonSteps['lab-01/07'] },
			{ path: 'lab-01/99', title: 'Managing Python Environments', steps: lessonSteps['lab-01/99'] },
		],
	},
];

export interface NavLink {
	path: string;
	label: string;
}

export function neighbours(
	path: string,
	hash = '',
): { title: string; steps?: NavPage['steps']; previous?: NavLink; next?: NavLink } | undefined {
	for (const section of sections) {
		const pages: NavPage[] = section.pages.flatMap((page) =>
			page.steps
				? page.steps.map((step) => ({ path: `${page.path}#${step.id}`, title: step.title }))
				: [page],
		);
		if (section.path === path) {
			const first: NavPage | undefined = pages[0];
			return {
				title: section.title,
				previous: { path: '', label: 'Back to Workshops' },
				next: first ? { path: first.path, label: `Next: ${first.title}` } : undefined,
			};
		}

		const page = section.pages.find((page) => page.path === path);
		if (!page) continue;

		const step = page.steps?.find((step) => `#${step.id}` === hash) ?? page.steps?.[0];
		const currentPath = step ? `${path}#${step.id}` : path;
		const index = pages.findIndex((page) => page.path === currentPath);
		const before: NavPage | undefined = pages[index - 1];
		const after: NavPage | undefined = pages[index + 1];

		return {
			title: page.title,
			steps: page.steps,
			previous: before
				? { path: before.path, label: `Previous: ${before.title}` }
				: { path: section.path, label: `Previous: ${section.title}` },
			next: after
				? { path: after.path, label: `Next: ${after.title}` }
				: currentPath === 'introduction/13#next-steps'
					? { path: section.path, label: `Next: ${section.title}` }
					: undefined,
		};
	}

	return undefined;
}
