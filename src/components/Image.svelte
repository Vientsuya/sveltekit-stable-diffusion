<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';

	export let generatedImage: string;
	export let generatedImageAlt: string;
	export let id: number;
	export let canDelete: boolean;

	async function deleteImage(id: number) {
		const payload = {
			id: id
		};

		await fetch('http://[::1]:5173/api/image', {
			method: 'DELETE',
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json; charset=UTF-8',
				'Access-Control-Request-Method': 'DELETE',
				'Access-Control-Request-Headers': 'Content-Type',
				Origin: 'http://localhost:5173'
			}
		});

		invalidateAll();
	}
</script>

<button on:click class="relative group">
	<img class="rounded-lg cursor-pointer" src={generatedImage} alt={generatedImageAlt} />
	{#if canDelete}
		<button
			on:click|stopPropagation={() => deleteImage(id)}
			class="absolute hidden w-6 h-6 bg-[url(/close.png)] bg-cover right-1 top-1 bg-[rgba(0,0,0,0.1)] opacity-75 group-hover:block hover:opacity-100 hover:bg-[rgba(37,36,36,0.25)]"
		/>
	{/if}
</button>
