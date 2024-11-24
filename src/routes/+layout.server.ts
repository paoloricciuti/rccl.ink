export function load({ request }) {
	const referer = request.headers.get('referer');
	console.log(request.headers);
	return {
		is_lol: !!referer?.includes('.lol'),
	};
}
