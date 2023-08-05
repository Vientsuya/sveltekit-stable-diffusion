<script lang="ts">
	import Container from '../../components/Container.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign up | SD Svelte</title>
</svelte:head>

<Container>
	<div
		class="flex items-center justify-center h-full w-96 mt-44 shadow-md shadow-[rgba(0,0,0,.25)] rounded-3xl p-8"
	>
		<form action="?/auth_user" method="POST" class="w-full">
			<div class="flex flex-col items-center justify-center w-full h-full">
				<h1 class="mb-5 text-3xl font-bold text-white">Sign in</h1>
				<div class="flex flex-col w-full">
					<label for="username" class="mb-2 text-md font-medium text-white">Username</label>
					<input
						required
						id="username"
						name="username"
						type="text"
						class="block p-2.5 w-full text-sm rounded-lg resize-none border bg-gray-700 border-gray-500 placeholder-gray-400 text-white focus:outline-none focus:border-green-400"
						placeholder="Enter your username here"
					/>
				</div>

				<div class="flex flex-col w-full mt-4">
					<label for="password" class="mb-2 text-md font-medium text-white">Password</label>
					<input
						required
						id="password"
						name="password"
						type="password"
						class="block p-2.5 w-full text-sm rounded-lg resize-none border bg-gray-700 border-gray-500 placeholder-gray-400 text-white focus:outline-none focus:border-green-400"
						placeholder="Enter your password here"
					/>
				</div>
				<button
					type="submit"
					class="rounded-md px-6 py-2 mt-6 leading-5 text-white transition-colors duration-200 transform bg-pink-500 hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
				>
					Sing in
				</button>
			</div>
		</form>
	</div>
</Container>
