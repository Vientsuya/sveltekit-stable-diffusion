<script lang="ts">
	import Image from './Image.svelte';

	export let form: any;
</script>

<div class="w-[512px] h-[512px] ml-12">
	<div class="grid grid-cols-3 gap-4 p-12">
		{#if form}
			<Image generatedImage={form.images[0]} generatedImageAlt="Generated Image" />
		{/if}
	</div>
</div>
