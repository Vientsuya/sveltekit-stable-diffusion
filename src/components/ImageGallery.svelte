<script lang="ts">
	import Image from './Image.svelte';
	import ImageModal from './ImageModal.svelte';
	import { imageModalUrl } from '../stores/stores';

	export let images: any;

	function handleImageClick(imageUrl: string) {
		imageModalUrl.set(imageUrl);
	}
</script>

<div class="grid grid-cols-3 gap-4 p-12">
	{#if images}
		{#each images as image}
			<Image
				generatedImage={image.image_url}
				generatedImageAlt="Generated Image"
				on:click={() => handleImageClick(image.image_url)}
			/>
		{/each}
	{/if}
</div>

<ImageModal />
