<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	export let data;
	let currentPage: string;

	$: currentPage = $page.url.pathname;
</script>

<div class="text-white">
	<nav class="relative flex items-center justify-between p-5 shadow-sm shadow-[rgba(0,0,0,0.3)]">
		<img src="#" alt="logo" />
		<ul class="flex absolute left-1/2 translate-x-[-50%]">
			<li class="mx-10 active:text-[#00C6B7]">
				<a href="/" class={`${currentPage === '/' ? 'text-theme-light-pink' : 'text-white'}`}
					>Home</a
				>
			</li>
			<li class="mx-10">
				<a
					href="/create"
					class={`${currentPage === '/create' ? 'text-theme-light-pink' : 'text-white'}`}>Create</a
				>
			</li>
			<li class="mx-10 active:text-[#00C6B7]">
				<a
					href="/train"
					class={`${currentPage === '/train' ? 'text-theme-light-pink' : 'text-white'}`}>Train</a
				>
			</li>
		</ul>
		<div>
			{#if data.username}
				<span class="mr-3">Hello, {data.username}</span>
				<button
					><a
						href="/logout"
						data-sveltekit-preload-data="off"
						data-sveltekit-reload
						class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
						>Log out</a
					></button
				>
			{:else}
				<button
					><a
						href="/signin"
						class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
						>Sign in</a
					></button
				>
				<button
					><a
						href="/signup"
						class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
						>Sign up</a
					></button
				>
			{/if}
		</div>
	</nav>

	<slot />
</div>
