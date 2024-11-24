<script lang="ts" module>
	export const FIELDS = {
		url: 'url',
		slug: 'slug',
		password: 'password',
	};
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	const { data, form } = $props();
</script>

<form autocomplete="off" method="post" action="?/create" use:enhance>
	<pre>{JSON.stringify($page.url.search, null, '\t')}</pre>
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
</form>

<style>
	.error {
		background-color: tomato;
		font-family: monospace;
		padding: 0.5rem;
		color: black;
	}
	.accent {
		color: #ff3e00;
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

	form {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
