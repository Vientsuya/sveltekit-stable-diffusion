<script lang="ts">
	import Image from './Image.svelte';
	import ImageModal from './ImageModal.svelte';
	import { imageModal } from '../stores/stores';

	export let images: any;
	export let gridCols: string = 'grid-cols-3';
	export let canDelete: boolean = false;

	function handleImageClick(image: any) {
		imageModal.set(image);
	}
</script>

<div class={`grid ${gridCols} gap-4 p-10`}>
	{#if images}
		{#each images as image}
			<Image
				id={image.id}
				generatedImage={image.image_url}
				generatedImageAlt="Generated Image"
				{canDelete}
				on:click={() => handleImageClick(image)}
			/>
		{/each}
	{/if}
</div>

<ImageModal />
