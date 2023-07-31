<script lang="ts">
	import Image from './Image.svelte';
	import ImageModal from './ImageModal.svelte';
	import { imageModal } from '../stores/stores';
	import type { generatedImage } from '../ambient';

	export let images: any;

	function handleImageClick(image: generatedImage) {
		imageModal.set(image);
	}
</script>

<div class="grid grid-cols-3 gap-4 p-12">
	{#if images}
		{#each images as image}
			<Image
				id={image.id}
				generatedImage={image.image_url}
				generatedImageAlt="Generated Image"
				on:click={() => handleImageClick(image)}
			/>
		{/each}
	{/if}
</div>

<ImageModal />
