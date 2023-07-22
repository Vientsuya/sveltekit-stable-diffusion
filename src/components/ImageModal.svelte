<script lang="ts">
	export let generatedImage: string;
	export let generatedImageAlt: string;
</script>

<img
	class="h-auto max-w-full rounded-lg"
	src="data:image/png;base64,{generatedImage}"
	alt={generatedImageAlt}
/>
