<script lang="ts">
	import { get_notifications } from '$lib/notifications.svelte.js';
	import { qr } from 'headless-qr';

	let { data } = $props();

	let notifications = get_notifications();
</script>

<ul>
	{#each data.links as link}
		<li>
			<a
				href={link.link}
				target="_blank"
				onclick={async (e) => {
					e.preventDefault();
					try {
						await navigator.clipboard.writeText(
							`https://${data.domain}.${data.top_level}/${link.slug}`,
						);
						notifications.add('Copied to the clipboard');
					} catch {
						notifications.add('Impossible to copy');
					}
				}}>/{link.slug}</a
			>
			<div class="stats-and-actions">
				{link.visits}
				<form
					method="get"
					action="/qr"
					target="_blank"
					onsubmit={(e) => {
						e.preventDefault();
						const canvas = document.createElement('canvas');
						const ctx = canvas.getContext('2d')!;
						const modules = qr(link.link);
						const scale = 20;
						const padding = 50;
						canvas.width = canvas.height = modules.length * scale + padding * 2;

						ctx.fillStyle = 'white';

						ctx.fillRect(0, 0, canvas.width, canvas.width);

						ctx.fillStyle = 'black';

						for (let y = 0; y < modules.length; y++) {
							const row = modules[y];
							for (let x = 0; x < row.length; x++) {
								const cell = row[x];
								if (cell) {
									ctx.fillRect(x * scale + padding, y * scale + padding, scale, scale);
								}
							}
						}

						canvas.toBlob(async (blob) => {
							if (!blob) {
								notifications.add('Impossible to copy');
								return;
							}
							try {
								await navigator.clipboard.write([
									new ClipboardItem({
										'image/png': blob,
									}),
								]);
								notifications.add('Copied to the clipboard');
							} catch {
								notifications.add('Impossible to copy');
							}
						}, 'image/png');
					}}
				>
					<button name="url" value={link.link} aria-label="copy qrcode"
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								d="M3 9h6V3H3zm1-5h4v4H4zm1 1h2v2H5zm10 4h6V3h-6zm1-5h4v4h-4zm1 1h2v2h-2zM3 21h6v-6H3zm1-5h4v4H4zm1 1h2v2H5zm15 2h1v2h-2v-3h1zm0-3h1v1h-1zm0-1v1h-1v-1zm-10 2h1v4h-1v-4zm-4-7v2H4v-1H3v-1h3zm4-3h1v1h-1zm3-3v2h-1V3h2v1zm-3 0h1v1h-1zm10 8h1v2h-2v-1h1zm-1-2v1h-2v2h-2v-1h1v-2h3zm-7 4h-1v-1h-1v-1h2v2zm6 2h1v1h-1zm2-5v1h-1v-1zm-9 3v1h-1v-1zm6 5h1v2h-2v-2zm-3 0h1v1h-1v1h-2v-1h1v-1zm0-1v-1h2v1zm0-5h1v3h-1v1h-1v1h-1v-2h-1v-1h3v-1h-1v-1zm-9 0v1H4v-1zm12 4h-1v-1h1zm1-2h-2v-1h2zM8 10h1v1H8v1h1v2H8v-1H7v1H6v-2h1v-2zm3 0V8h3v3h-2v-1h1V9h-1v1zm0-4h1v1h-1zm-1 4h1v1h-1zm3-3V6h1v1z"
							/><path fill="none" d="M0 0h24v24H0z" /></svg
						></button
					>
				</form>
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 1rem;
		display: grid;
		gap: 0.5rem;
	}
	li {
		padding: 0.5rem;
		border-bottom: 1px solid #777;
		display: flex;
	}
	.stats-and-actions {
		margin-left: auto;
		display: inline-flex;
		gap: 1rem;
		align-items: center;
		line-height: 0;
	}
	.stats-and-actions button {
		all: unset;
		cursor: pointer;
		background-color: white;
	}
</style>
