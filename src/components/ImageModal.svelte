<script lang="ts">
	import { imageModal } from '../stores/stores.js';

	function handleBgClick() {
		imageModal.set(null);
	}
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
		<div class="flex p-6 rounded-xl bg-theme-light-black">
			<div on:click|stopPropagation class="cursor-default">
				<img src={$imageModal.image_url} alt="modal-generated-img" />
			</div>

			<div />
		</div>
	</div>
{/if}
