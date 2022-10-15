<script>
	import { navigating } from '$app/stores';

	const currentlyNavigating = $navigating !== null ? true : false;
</script>

<nav>
	<a href="/" class="logo">SvelteKit</a>
	<ul>
		<li><a href="/" disabled={currentlyNavigating}>Home</a></li>
		<li><a href="/about" disabled={currentlyNavigating}>About</a></li>
	</ul>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1em;
		height: 4em;
		background: #ff3e00;
		color: #fff;
	}

	.logo {
		font-weight: 600;
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		margin: 0 0.5em;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
