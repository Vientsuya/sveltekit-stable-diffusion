<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	import Container from '../components/Container.svelte';

	export let form;
	export let data: PageData;

	let stepsValue = 10;
</script>

<Container>
	<div class="flex justify-content">
		<div class="w-96">
			<form
				method="post"
				action="?/get_image"
				use:enhance={() => {
					return ({ update }) => {
						update({ reset: false });
					};
				}}
			>
				<div>
					{#if data}
						<label for="sd-model" class="block mb-2 text-md font-medium text-white">
							Select a model
						</label>
						<select
							id="sd-model"
							name="sd-model"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							{#each data.models as model}
								<option value={model.model_name}>{model.model_name}</option>
							{/each}
						</select>
					{/if}
				</div>

				<div class="mt-4">
					<label for="prompt" class="block mb-2 text-md font-medium text-white"> Prompt </label>
					<textarea
						required
						id="prompt"
						name="prompt"
						rows="4"
						class="block p-2.5 w-full text-sm rounded-lg resize-none border bg-gray-700 border-green-600 placeholder-gray-400 text-white focus:outline-none focus:border-green-400"
					/>
				</div>

				<div class="mt-4">
					<label for="negative-prompt" class="block mb-2 text-md font-medium text-white">
						Negative Prompt
					</label>
					<textarea
						required
						id="negative-prompt"
						name="negative-prompt"
						rows="4"
						class="block p-2.5 w-full text-sm rounded-lg resize-none border bg-gray-700 border-red-600 placeholder-gray-400 text-white focus:outline-none focus:border-red-400"
						placeholder="Enter your negative prompt here"
					/>
				</div>

				<div class="mt-4">
					<label for="steps" class="block"> Steps: {stepsValue}</label>
					<input
						id="steps"
						name="steps"
						type="range"
						bind:value={stepsValue}
						min="1"
						max="150"
						class="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
					/>
				</div>

				<button
					type="submit"
					class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
				>
					Get Image
				</button>
			</form>
		</div>

		<div class="w-[512px] h-[512px] ml-12">
			{#if form}
				<img src="data:image/png;base64,{form.images[0]}" alt="generated art" />
			{/if}
		</div>
	</div>
</Container>
