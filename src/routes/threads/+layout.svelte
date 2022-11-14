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
	<!-- another div here for friends sidebar -->
	<aside class="sidebar">
		<h3>Friends</h3>
		<div class="list">
			<!-- Change to friends -->
			{#each data.friends as friend (friend)}
				<h3>{friend}</h3>
			{/each}
		</div>
	</aside>
</div>

<style>
	.panel {
		display: flex;
		flex-direction: row;
		gap: 1vw;
	}

	.panel > aside {
		width: 20vw;
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
		height: 90vh;
		color: black;
		overflow-y: scroll;
	}

	.page {
		display: flex;
		flex-direction: column;
		height: 90vh;
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
