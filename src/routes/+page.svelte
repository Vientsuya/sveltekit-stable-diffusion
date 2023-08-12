<script lang="ts">
	import Container from '../components/Container.svelte';
	import ImageGallery from '../components/ImageGallery.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let searchParam = '';
	$: images = data.images.images.filter((image: any) => image.prompt.includes(searchParam));
</script>

<svelte:head>
	<title>SD Svelte</title>
</svelte:head>

<Container>
	<main class="w-4/5">
		<div class="px-4 sm:px-6 lg:px-8 my-8 flex flex-col items-center">
			<h2 class="text-white text-5xl font-bold tracking-wide text-center p-4">SD Svelte</h2>
			<p class="text-center tracking-wide mb-4">
				AI Image Generations with SvelteKit and <a
					href="https://github.com/vladmandic/automatic"
					target="_blank"
					class="font-bold">SD.<span class="text-orange-600">Next</span></a
				>
			</p>
			<div class="relative">
				<input
					type="text"
					class="h-14 w-[42rem] bg-theme-light-black pr-8 pl-5 rounded z-0 focus:shadow outline outline-2 outline-gray-600 focus:outline-2 focus:outline-gray-500"
					placeholder="Search images..."
					bind:value={searchParam}
				/>
				<div class="absolute top-4 right-3">
					<i class="fa fa-search text-gray-400 z-20 hover:text-gray-500" />
				</div>
			</div>
		</div>

		<ImageGallery {images} cols={5} />
	</main>
</Container>
