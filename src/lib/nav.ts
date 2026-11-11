export interface NavPage {
	path: string;
	title: string;
}

export interface NavSection {
	path: string;
	title: string;
	pages: NavPage[];
}

export const sections: NavSection[] = [
	{
		path: 'introduction/',
		title: 'Introduction to Python',
		pages: [
			{ path: 'introduction/00', title: 'Python' },
			{ path: 'introduction/01', title: 'The Python Standard Library' },
			{ path: 'introduction/02', title: 'Syntax and Arithmetics' },
			{ path: 'introduction/03', title: 'Strings' },
			{ path: 'introduction/04', title: 'Variables and Types' },
			{ path: 'introduction/05', title: 'Numerical and Logical Operations' },
			{ path: 'introduction/06', title: 'Functions' },
			{ path: 'introduction/07', title: 'Scope' },
			{ path: 'introduction/08', title: 'Containers' },
			{ path: 'introduction/09', title: 'Logical Flow' },
			{ path: 'introduction/10', title: 'Loops' },
			{ path: 'introduction/11', title: 'Useful Tools' },
			{ path: 'introduction/12', title: 'Errors' },
			{ path: 'introduction/13', title: 'Conclusion' },
		],
	},
	{
		path: 'lab-01/',
		title: 'Lab 1: Setting Up Python Environment',
		pages: [
			{ path: 'lab-01/01', title: 'Prerequisites' },
			{ path: 'lab-01/02', title: 'Project' },
			{ path: 'lab-01/03', title: 'Terminal' },
			{ path: 'lab-01/04', title: 'Relative Path' },
			{ path: 'lab-01/05', title: 'Linux Commands (Optional)' },
			{ path: 'lab-01/06', title: 'Part 2: DNA Analysis Tool' },
			{ path: 'lab-01/07', title: 'Project: Part 3' },
			{ path: 'lab-01/99', title: 'Managing Python Environments' },
		],
	},
];

export interface NavLink {
	path: string;
	label: string;
}

export function neighbours(
	path: string,
): { title: string; previous?: NavLink; next?: NavLink } | undefined {
	for (const section of sections) {
		if (section.path === path) {
			const first: NavPage | undefined = section.pages[0];
			return {
				title: section.title,
				previous: { path: '', label: 'Back to Workshops' },
				next: first ? { path: first.path, label: `Next: ${first.title}` } : undefined,
			};
		}

		const index = section.pages.findIndex((page) => page.path === path);
		if (index === -1) continue;

		const page = section.pages[index];
		const before: NavPage | undefined = section.pages[index - 1];
		const after: NavPage | undefined = section.pages[index + 1];

		return {
			title: page.title,
			previous: before
				? { path: before.path, label: `Previous: ${before.title}` }
				: { path: section.path, label: `Previous: ${section.title}` },
			next: after ? { path: after.path, label: `Next: ${after.title}` } : undefined,
		};
	}

	return undefined;
}
