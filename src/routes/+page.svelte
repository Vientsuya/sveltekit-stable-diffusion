<script lang="ts">
	import { enhance } from '$app/forms';

	import Container from '../components/Container.svelte';

	export let form;
</script>

<Container>
	<div class="flex flex-col items-center">
		<form method="post" action="?/get_image" use:enhance>
			<input
				required
				class="w-full p-3 border border-[rgba(255,255,255,0.25)] rounded-md outline-none bg-theme-light-black"
				type="text"
				name="prompt"
				id="prompt"
			/>
			<label class="" for="prompt"> Prompt </label>

			<label for="negative-prompt">
				Negative Prompt
				<input class="bg-theme-black" type="text" name="negative-prompt" id="negative-prompt" />
			</label>
			<label for="steps">
				Steps
				<input class="bg-theme-black" type="number" name="steps" id="steps" />
			</label>
			<button type="submit">Get Image</button>
		</form>
		{#if form}
			<img src="data:image/png;base64,{form.images[0]}" alt="generated art" />
		{/if}
	</div>
</Container>
