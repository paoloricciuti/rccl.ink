<script lang="ts">
	import { page } from '$app/stores';
	import { set_notifications } from '$lib/notifications.svelte';
	import './app.css';
	let { children, data } = $props();

	const notifications = set_notifications();
</script>

{#snippet website({ domain, top_level }: { domain: string; top_level: string })}
	<a style:text-decoration="none" href="/"
		><h1>{domain}<span class="dim">.</span><span class="accent">{top_level}</span></h1></a
	>
{/snippet}

<div class="container">
	<div class="wrapper">
		<header>
			<div class="title-group">
				<div class="code-tag">&lt;URLShortener&gt;</div>
				{@render website(
					data.is_lol ? { domain: 'rcc', top_level: 'lol' } : { domain: 'rccl', top_level: 'ink' },
				)}
				<div class="code-tag end-tag">&lt;/URLShortener&gt;</div>
			</div>
			<div class="subtitle">
				<span class="comment"
					>// <a href="https://bsky.app/profile/@paolo.ricciuti.me">@paolo.ricciuti.me</a> personal url
					management tool</span
				>
			</div>
		</header>
		<div class="terminal">
			<div class="terminal-header">
				<span class="terminal-dot"></span>
				<span class="terminal-dot"></span>
				<span class="terminal-dot"></span>
				<span class="terminal-title">{$page.data.terminal_title ?? 'shorten'}</span>
			</div>

			<div class="terminal-body">
				{@render children()}
			</div>
		</div>
		<a class="accent stats" href="/stats">stats</a>
	</div>
</div>

<div class="notifications">
	{#each notifications.list as notification (notification.id)}
		<div>{notification.text}</div>
	{/each}
</div>

<style>
	.container {
		min-height: 100vh;
		background: #1a1a1a;
		color: #e1e1e1;
		display: flex;
		justify-content: center;
		padding: 2rem;
		font-family: 'Fira Code', monospace;
	}

	.stats {
		text-decoration: none;
		position: fixed;
		top: 1rem;
		right: 1rem;
	}

	.dim {
		color: #4a4a4a;
	}

	.accent {
		color: #ff3e00;
	}

	.wrapper {
		width: 100%;
		max-width: 38rem;
	}

	header {
		margin-bottom: 2rem;
	}

	.title-group {
		text-align: center;
	}

	.code-tag {
		color: #4a4a4a;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	.end-tag {
		margin-top: 0.5rem;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #ffffff;
		letter-spacing: -1px;
	}

	.subtitle {
		text-align: center;
		margin-top: 1rem;
	}

	.comment {
		color: #6a6a6a;
		font-style: italic;
	}

	.terminal {
		background: #2a2a2a;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.terminal-header {
		background: #363636;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 1px solid #404040;
	}

	.terminal-dot {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: #ff5f56;
	}

	.terminal-dot:nth-child(2) {
		background: #ffbd2e;
	}

	.terminal-dot:nth-child(3) {
		background: #27c93f;
	}

	.terminal-title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		color: #6a6a6a;
		font-size: 0.9rem;
	}

	.notifications {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		display: grid;
		gap: 0.5rem;
	}

	.notifications > div {
		background-color: #2a2a2a;
		padding: 1rem;
		max-width: 50%;
		font-family: monospace;
		color: white;
	}

	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		.terminal-body {
			padding: 1rem;
		}
	}
</style>
