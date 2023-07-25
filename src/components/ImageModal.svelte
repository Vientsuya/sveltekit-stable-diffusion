<script lang="ts">
	import { imageModalString } from '../stores/stores.js';

	function handleBgClick() {
		imageModalString.set('');
	}
</script>

{#if $imageModalString !== ''}
	<div
		role="button"
		tabindex="0"
		on:click={handleBgClick}
		on:keydown={(e) => {
			if (e.key === 'Escape') {
				handleBgClick();
			}
		}}
		class="flex cursor-default justify-center items-center fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.75)] w-screen h-screen"
	>
		<div on:click|stopPropagation class="cursor-default">
			<img src="data:image/png;base64,{$imageModalString}" alt="modal-generated-img" />
		</div>
	</div>
{/if}
