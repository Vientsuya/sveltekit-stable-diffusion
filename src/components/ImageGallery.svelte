<script lang="ts">
	import Image from './Image.svelte';
	import ImageModal from './ImageModal.svelte';
	import { imageModalString } from '../stores/stores';

	export let form: any;

	function handleImageClick(image: string) {
		console.log(image);
		imageModalString.set(image);
	}
</script>

<div class="grid grid-cols-3 gap-4 p-12">
	{#if form}
		<Image
			generatedImage={form.images[0]}
			generatedImageAlt="Generated Image"
			on:click={() => handleImageClick(form.images[0])}
		/>
	{/if}
</div>

<ImageModal />
