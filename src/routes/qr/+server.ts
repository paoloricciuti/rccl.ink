import { qr } from 'headless-qr';

export function GET({ url: { searchParams } }) {
	const url = searchParams.get('url');
	const modules = qr(url ?? '');
	let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${modules.length * 10} ${modules.length * 10}">`;
	for (let y = 0; y < modules.length; y++) {
		const row = modules[y];
		for (let x = 0; x < row.length; x++) {
			const cell = row[x];
			svg += `<rect width="10" height="10" x="${x * 10}" y="${y * 10}" fill="${cell ? 'black' : 'white'}" />`;
		}
	}
	svg += '</svg>';
	return new Response(svg, {
		headers: {
			'content-type': 'image/svg',
		},
	});
}
