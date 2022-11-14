<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="panel">
	<aside class="sidebar">
		<h3>Threads</h3>
		<div class="list">
			{#each data.threads as thread (thread)}
				<a href="/threads/{thread}">{thread}</a>
			{/each}
		</div>
		<div>
			<form method="POST" action="?/create">
				<!-- <input name="name" type="text"> -->
				<button>Create Thread</button>
			</form>
		</div>
	</aside>
	<div class="page">
		<slot />
	</div>
</div>

<style>
	.panel {
		display: flex;
		flex-direction: row;
	}

	.panel > aside {
		width: 20vw;
		margin-right: 1vw;
	}

	.panel > div {
		flex: 1;
	}

	.list {
		display: flex;
		flex-direction: column;
	}

	a {
		padding: 1rem;
		background-color: #f4a261;
		margin: 5px;
		widows: 100%;
		border-radius: 10px;
		color: black;
	}

	a:hover {
		background-color: #e9c46a;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		background-color: #546a7b;
		height: 150vh;
		color: black;
	}

	.page {
		display: flex;
		flex-direction: column;
		height: max-content;
		bottom: 0;
	}

	button {
		border-radius: 1em;
		border-color: #0d1f2d;
		background-color: #e76f51;
		padding: 5px;
		margin-left: 5px;
	}

	button:hover {
		background-color: #f4a261;
	}

	h3 {
		margin-left: 5px;
	}
</style>
