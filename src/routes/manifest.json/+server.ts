import { json } from '@sveltejs/kit';

export function GET({ request }) {
	const host = request.headers.get('host') ?? 'rcc.im';

	const manifest = {
		theme_color: '#ff3e00',
		background_color: '#1a1a1a',
		icons: [
			{
				purpose: 'maskable',
				sizes: '512x512',
				src: `icon512_maskable.${host}.png`,
				type: 'image/png',
			},
			{ purpose: 'any', sizes: '512x512', src: `icon512_rounded.${host}.png`, type: 'image/png' },
		],
		share_target: {
			action: '/',
			method: 'GET',
			enctype: 'application/x-www-form-urlencoded',
			params: {
				text: 'url',
			},
		},
		orientation: 'any',
		display: 'standalone',
		dir: 'auto',
		lang: 'en-US',
		name: host,
		short_name: host,
		start_url: '/',
		scope: '/',
		description: 'Personal URL shortener',
		id: host.replace('.', '-'),
	};
	return json(manifest);
}
