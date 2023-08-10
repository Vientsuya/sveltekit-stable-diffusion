<script>
	import Container from '../components/Container.svelte';
</script>

<svelte:head>
	<title>SD Svelte</title>
</svelte:head>

<Container>
	<main>
		<div class="px-4 sm:px-6 lg:px-8 mt-8">
			<h2 class="text-white text-5xl font-bold tracking-wide text-center p-4">SD Svelte</h2>
			<p class="text-center tracking-wide mb-4">AI Image Generations with SvelteKit</p>
			<div class="relative">
				<input
					type="text"
					class="h-14 w-[42rem] bg-theme-light-black pr-8 pl-5 rounded z-0 focus:shadow outline outline-2 outline-gray-600 focus:outline-2 focus:outline-gray-500"
					placeholder="Search images..."
				/>
				<div class="absolute top-4 right-3">
					<i class="fa fa-search text-gray-400 z-20 hover:text-gray-500" />
				</div>
			</div>
		</div>

		<div />
	</main>
</Container>
