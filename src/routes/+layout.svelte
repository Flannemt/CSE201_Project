<script lang="ts">
	import Header from '$comp/header.svelte';
	import Footer from '$comp/footer.svelte';

	import './styles.css';
	import { page } from '$app/stores';

	$: loggedIn = $page.data?.user !== false;
</script>

<div class="app">
	<!-- Insert our header -->
	<Header {loggedIn} />

	<!-- Page data gets inserted here -->
	<slot />

	<!-- Insert our footer -->
	<div class="footer">
		<Footer />
	</div>
</div>

<style>
	.footer {
		height: 5vh;
		margin-top: auto;
	}
</style>
