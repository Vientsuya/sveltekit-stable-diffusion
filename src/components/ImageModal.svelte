<script lang="ts">
	import { imageModal } from '../stores/stores.js';

	let date: Date | null;

	function handleBgClick() {
		imageModal.set(null);
	}

	$: date = $imageModal !== null ? new Date($imageModal.created_at) : null;
</script>

{#if $imageModal !== null}
	<div
		role="button"
		tabindex="0"
		on:click={handleBgClick}
		on:keydown={(e) => {
			if (e.key === 'Escape') {
				handleBgClick();
			}
		}}
		class="flex cursor-default justify-center items-center fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.6)] w-screen h-screen"
	>
		<div on:click|stopPropagation class="flex p-6 rounded-xl bg-theme-light-black">
			<div class="cursor-default">
				<img src={$imageModal.image_url} alt="modal-generated-img" />
			</div>

			<div class="w-[24rem] ml-10">
				<h3 class="text-center">Generation Data</h3>

				<div class="mb-3">
					<p class="mb-1">Prompt</p>
					<div class="bg-theme-dark-black p-3 rounded-md">
						<span
							class="text-sm inline-block overflow-y-auto scrollbar-thin scrollbar-thumb-theme-lighter-black scrollbar-thumb-rounded-sm scrollbar-track-theme-dark-black h-20"
							>{$imageModal.prompt}</span
						>
					</div>
				</div>

				<div class="mb-3">
					<p class="mb-1">Negative Prompt</p>
					<div class="bg-theme-dark-black p-3 rounded-md">
						<span
							class="text-sm inline-block overflow-y-auto scrollbar-thin scrollbar-thumb-theme-lighter-black scrollbar-thumb-rounded-sm scrollbar-track-theme-dark-black h-20"
							>{$imageModal.negative_prompt}</span
						>
					</div>
				</div>

				<div class="text-sm">
					<p class="mb-1">
						<span class="font-bold">Model:</span>
						{$imageModal.sd_model_checkpoint}
					</p>

					<p class="mb-1">
						<span class="font-bold">Vae:</span>
						{$imageModal.sd_vae}
					</p>

					<p class="mb-1">
						<span class="mr-5">
							<span class="font-bold">Sampler:</span>
							{$imageModal.sampler_name}
						</span>

						<span>
							<span class="font-bold">Seed: </span>
							{$imageModal.seed}
						</span>
					</p>

					<p class="mb-1">
						<span class="mr-5">
							<span class="font-bold">Steps:</span>
							{$imageModal.steps}
						</span>

						<span>
							<span class="font-bold">CFG Scale:</span>
							{$imageModal.cfg_scale}
						</span>
					</p>

					<p>
						<span class="font-bold">Creation time: </span>
						{date
							? `${date.getHours()}:${date.getMinutes()}  
							${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
							: 'N/A'}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
