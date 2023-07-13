<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<h1 class="text-3xl font-bold underline">Form</h1>
<form method="post" action="?/get_image" use:enhance>
	<label for="prompt">
		Prompt
		<input type="text" name="prompt" id="prompt" />
	</label>
	<label for="negative-prompt">
		Negative Prompt
		<input type="text" name="negative-prompt" id="negative-prompt" />
	</label>
	<label for="steps">
		Steps
		<input type="number" name="steps" id="steps" />
	</label>
	<button type="submit">Get Image</button>
</form>
{#if form}
	{console.log(form.parameters)}
	<main />
{/if}
