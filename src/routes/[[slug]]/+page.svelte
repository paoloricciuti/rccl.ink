<script lang="ts" module>
	export const FIELDS = {
		url: 'url',
		slug: 'slug',
		password: 'password',
	};
</script>

<script lang="ts">
	import { enhance } from '$app/forms';

	const { data, form } = $props();
</script>

{#snippet website({ domain, top_level }: { domain: string; top_level: string })}
	<h1>{domain}<span class="dim">.</span><span class="accent">{top_level}</span></h1>
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

		<form autocomplete="off" method="post" action="?/create" use:enhance>
			<div class="terminal">
				<div class="terminal-header">
					<span class="terminal-dot"></span>
					<span class="terminal-dot"></span>
					<span class="terminal-dot"></span>
					<span class="terminal-title">shorten</span>
				</div>

				<div class="terminal-body">
					{#if form?.error}
						<div class="error">{form.error}</div>
					{/if}
					<div class="input-group">
						<span class="prompt">$</span>
						<div class="input-wrapper">
							<span class="command">url</span>
							<input
								value={data.to_short}
								name={FIELDS.url}
								autocomplete="off"
								type="url"
								placeholder="https://your-long-url.dev"
								required
							/>
						</div>
					</div>

					<div class="input-group">
						<span class="prompt">$</span>
						<div class="input-wrapper">
							<span class="command">slug</span>
							<input
								value={data.slug}
								name={FIELDS.slug}
								autocomplete="off"
								type="text"
								placeholder="custom-route"
							/>
						</div>
					</div>

					<div class="input-group">
						<span class="prompt">$</span>
						<div class="input-wrapper">
							<span class="command">auth</span>
							<input
								name={FIELDS.password}
								autocomplete="current-password"
								type="password"
								placeholder="secret-key"
							/>
						</div>
					</div>

					<button type="submit">
						<span class="command">npm</span>
						<span class="accent">run</span>
						<span>shorten</span>
					</button>
				</div>
			</div>
		</form>
	</div>
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

	.error {
		background-color: tomato;
		font-family: monospace;
		padding: 0.5rem;
		color: black;
	}

	.dim {
		color: #4a4a4a;
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

	.accent {
		color: #ff3e00;
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

	.terminal-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.input-group {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.prompt {
		color: #ff3e00;
		font-weight: bold;
	}

	.input-wrapper {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.command {
		color: #4ec9b0;
		font-weight: 500;
	}

	input {
		flex: 1;
		background: transparent;
		border: none;
		color: #e1e1e1;
		font-family: 'Fira Code', monospace;
		font-size: 1rem;
		padding: 0.5rem 0;
		outline: none;
		border-bottom: 1px solid #404040;
		transition: border-color 0.2s;
	}

	input::placeholder {
		color: #4a4a4a;
	}

	input:focus {
		border-color: #ff3e00;
	}

	button {
		margin-top: 1rem;
		background: #363636;
		border: 1px solid #404040;
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		color: #e1e1e1;
		font-family: 'Fira Code', monospace;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.2s;
	}

	button:hover {
		background: #404040;
		border-color: #ff3e00;
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
