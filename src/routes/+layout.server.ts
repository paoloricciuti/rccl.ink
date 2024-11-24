export function load({ request }) {
	const host = request.headers.get('host');
	return {
		is_lol: !!host?.includes('.lol'),
	};
}
