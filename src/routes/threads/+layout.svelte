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
		background-color: gray;
		margin: 5px;
		widows: 100%;
		border-radius: 10px;
		color: whitesmoke;
	}

	a:hover {
		background-color: darkgray;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		background-color: azure;
		height: 90vh;
	}

	.page {
		display: flex;
		flex-direction: column;
		height: max-content;
		bottom: 0;
	}

	button {
		padding: 5px;
	}
</style>
