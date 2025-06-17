export function load({ request }) {
	const [domain, top_level] = request.headers.get('host')?.split(".") ?? ["rcc","im"];
	return {
		domain,
		top_level
	};
}
