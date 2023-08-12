<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	import Container from '../../components/Container.svelte';
	import DynamicSelect from '../../components/DynamicSelect.svelte';
	import ImageGallery from '../../components/ImageGallery.svelte';
	import MessageBox from '../../components/MessageBox.svelte';

	export let data: PageData;

	function loadExamplePrompt() {
		const prompt = document.getElementById('prompt') as HTMLTextAreaElement;
		const negativePrompt = document.getElementById('negative-prompt') as HTMLTextAreaElement;
		prompt.value =
			'photo, raw image, highres, intricate detailing, (masterpiece:1.2), fujifilm xt3,';
		negativePrompt.value =
			'(fat:1.3), 3d, cartoon, anime, sketches, (worst quality, bad quality, cropped:1.4) ((monochrome)), ((grayscale)), (negative_hands:1.0), (easynegative:0.8), (bad-artist-anime:0.8), (bad-artist:0.8), (bad-picture-chill-75v:0.8), (bad_prompt_version2:0.8), (bad_quality:0.8), nude, nsfw';
	}

	let stepsValue = 10;
	let cfgScaleValue = 7;
</script>

<svelte:head>
	<title>Create | SD Svelte</title>
</svelte:head>

{#if data.userLoggedIn}
	<Container>
		<div class="flex justify-content">
			<form
				class="w-[30rem] shadow-md shadow-[rgba(0,0,0,.25)] rounded-3xl"
				method="POST"
				action="?/get_image"
				use:enhance={() => {
					return ({ update }) => {
						update({ reset: false });
					};
				}}
			>
				<div class="p-5">
					{#if data}
						<DynamicSelect caption="Model" selectOptions={data.models} selectName="sd-model" />
					{/if}

					{#if data}
						<DynamicSelect
							caption="Vae"
							selectOptions={data.vaes}
							selectName="sd-vae"
							extraOptions={['Automatic', 'None']}
						/>
					{/if}

					{#if data}
						<DynamicSelect caption="Sampler" selectOptions={data.samplers} selectName="sampler" />
					{/if}

					<div class="mt-4">
						<label for="prompt" class="block mb-2 text-md font-medium text-white"> Prompt </label>
						<textarea
							required
							id="prompt"
							name="prompt"
							rows="4"
							class="block p-2.5 w-full text-sm rounded-lg resize-none border bg-gray-700 border-green-600 placeholder-gray-400 text-white focus:outline-none focus:border-green-400"
							placeholder="Enter your prompt here"
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

					<div class="mt-4">
						<label for="cfg-scale" class="block"> CFG Scale: {cfgScaleValue}</label>
						<input
							id="cfg-scale"
							name="cfg-scale"
							type="range"
							bind:value={cfgScaleValue}
							min="1"
							max="30"
							step="0.5"
							class="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
						/>
					</div>

					<button
						class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
						on:click|preventDefault={loadExamplePrompt}>Load Prompt</button
					>
				</div>

				<button
					type="submit"
					class="w-full rounded-b-3xl px-6 py-3 leading-5 text-white transition-colors duration-200 transform bg-pink-500 hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
				>
					Get Image
				</button>
			</form>

			<div class="w-[512px] h-[512px] ml-12">
				<ImageGallery images={data.images.images} canDelete={true} />
			</div>
		</div>
	</Container>
{:else}
	<MessageBox message="Log in to view this site.">
		<a href="/signin" class="inline-block text-2xl text-white bg-pink-600 rounded-md px-4 py-1 mt-4"
			>Login</a
		>
	</MessageBox>
{/if}
