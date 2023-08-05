// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user_id?: number;
			username?: string;
			roles?: string[];
		}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
