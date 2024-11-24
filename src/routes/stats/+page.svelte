<script lang="ts">
	let { data } = $props();
</script>

<ul>
	{#each data.links as link}
		<li><a href={link.link}>/{link.slug}</a> {link.visits}</li>
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
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #777;
	}
</style>
