// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		access_token?: string;
		refresh_token?: string;
		user?: import('$db/models/users').User | false;
	}

	interface Session {
		user: import('$db/models/users').User | false;
	}
}
