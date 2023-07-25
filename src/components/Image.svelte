<script lang="ts">
	export let generatedImage: string;
	export let generatedImageAlt: string;
</script>

<button on:click>
	<img
		class="h-auto max-w-full rounded-lg cursor-pointer"
		src={generatedImage}
		alt={generatedImageAlt}
	/>
</button>
