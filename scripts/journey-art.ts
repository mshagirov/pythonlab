// Source artwork for the generated PNGs; no character rendering is shipped to the browser.
// A small pixel alphabet keeps even the map labels within the artwork's symbol palette.
const alphabet: Record<string, string[]> = {
	A: ['010', '101', '111', '101', '101'],
	B: ['110', '101', '110', '101', '110'],
	C: ['111', '100', '100', '100', '111'],
	E: ['111', '100', '110', '100', '111'],
	F: ['111', '100', '110', '100', '100'],
	G: ['111', '100', '101', '101', '111'],
	H: ['101', '101', '111', '101', '101'],
	I: ['111', '010', '010', '010', '111'],
	L: ['100', '100', '100', '100', '111'],
	N: ['1001', '1101', '1101', '1011', '1001'],
	O: ['111', '101', '101', '101', '111'],
	P: ['110', '101', '110', '100', '100'],
	R: ['110', '101', '110', '101', '101'],
	S: ['111', '100', '111', '001', '111'],
	T: ['111', '010', '010', '010', '010'],
	U: ['101', '101', '101', '101', '111'],
	V: ['101', '101', '101', '101', '010'],
	X: ['101', '101', '010', '101', '101'],
	Y: ['101', '101', '010', '010', '010'],
};

interface Stop {
	x: number;
	label: string;
}

export function journeyArt(compact = false): string[] {
	const width = compact ? 80 : 192;
	const grid = Array.from({ length: 32 }, () => Array<string>(width).fill(' '));
	const stops: Stop[] = compact
		? [
				{ x: 14, label: 'PYTHON' },
				{ x: 36, label: 'SYNTAX' },
				{ x: 56, label: 'ERRORS' },
				{ x: 68, label: 'FINISH' },
			]
		: [
				{ x: 18, label: 'PYTHON' },
				{ x: 40, label: 'SYNTAX' },
				{ x: 62, label: 'STRINGS' },
				{ x: 84, label: 'VARIABLES' },
				{ x: 106, label: 'FUNCTIONS' },
				{ x: 128, label: 'LOOPS' },
				{ x: 150, label: 'ERRORS' },
				{ x: 177, label: 'FINISH' },
			];
	const put = (x: number, y: number, symbol: string) => {
		if (grid[y]?.[x] !== undefined) grid[y][x] = symbol;
	};
	const label = (text: string, center: number, top: number) => {
		const textWidth = [...text].reduce((sum, letter) => sum + alphabet[letter][0].length + 1, -1);
		let left = Math.max(0, Math.min(center - Math.floor(textWidth / 2), width - textWidth));
		for (const letter of text) {
			for (const [y, row] of alphabet[letter].entries()) {
				for (const [x, pixel] of [...row].entries()) {
					if (pixel === '1') put(left + x, top + y, '▪');
				}
			}
			left += alphabet[letter][0].length + 1;
		}
	};
	const level = (index: number) => (index % 2 === 0 ? 13 : 20);

	// A gently winding dotted trail connects the lesson landmarks.
	for (let index = 1; index < stops.length; index++) {
		const from = stops[index - 1];
		const to = stops[index];
		for (let x = from.x + 1; x < to.x; x++) {
			const progress = (x - from.x) / (to.x - from.x);
			const eased = (1 - Math.cos(progress * Math.PI)) / 2;
			put(x, Math.round(level(index - 1) + (level(index) - level(index - 1)) * eased), '⋅');
		}
	}

	for (const [index, stop] of stops.entries()) {
		const y = level(index);
		label(stop.label, stop.x, index % 2 === 0 ? 2 : 26);
		for (let stem = index % 2 === 0 ? 8 : 22; stem <= (index % 2 === 0 ? 11 : 24); stem++) {
			put(stop.x, stem, '⋅');
		}
		put(stop.x - 1, y, '○');
		put(stop.x, y, index === 0 ? '●' : '□');
		put(stop.x + 1, y, '○');
	}

	// A chequered finish flag, using squares rather than emoji.
	const finishFlag = (x: number, y: number) => {
		for (let row = 0; row < 6; row++) put(x, y + row, '▪');
		for (let row = 0; row < 3; row++) {
			for (let col = 1; col < 6; col++) {
				put(x + col, y + row, (row + col) % 2 ? '□' : '■');
			}
		}
	};
	finishFlag(stops.at(-1)!.x + 2, 14);

	// A long, slender python trails behind the start and heads towards Syntax.
	const tail = 2;
	const head = stops[1].x - 6;
	for (let x = tail; x <= head; x++) {
		const progress = (x - tail) / (head - tail);
		const y = Math.round(16 + progress * 3 + Math.sin(progress * Math.PI * 3) * 2);
		put(x, y, '●');
		if (progress > 0.2) put(x, y - 1, '●');
	}
	for (let y = 18; y <= 19; y++) {
		for (let x = head; x <= head + 3; x++) put(x, y, '●');
	}
	put(head + 2, 18, '○');
	put(head + 4, 19, '⋅');
	put(head + 5, 19, '⋅');

	return grid.map((row) => row.join(''));
}
