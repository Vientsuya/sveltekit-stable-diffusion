<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';

	let currentPage: string;

	$: currentPage = $page.url.pathname;
</script>

<div class="w-screen h-screen text-white">
	<nav class="flex items-center justify-between p-5 shadow-md shadow-[rgba(0,0,0,.2)]">
		<img src="#" alt="logo" />
		<ul class="flex">
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
		<button
			><a
				href="/signup"
				class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
				>Sign up</a
			></button
		>
	</nav>

	<slot />
</div>
