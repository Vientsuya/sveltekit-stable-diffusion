<script lang="ts">
	import Image from './Image.svelte';
	import ImageModal from './ImageModal.svelte';
	import { imageModalString } from '../stores/stores';

	export let images: any;

	function handleImageClick(image: string) {
		imageModalString.set(image);
	}
</script>

<div class="grid grid-cols-3 gap-4 p-12">
	{#if images}
		{#each images as image}
			<Image
				generatedImage={image}
				generatedImageAlt="Generated Image"
				on:click={() => handleImageClick(image)}
			/>
		{/each}
	{/if}
</div>

<ImageModal />
