<script lang="ts">
	export let message: string = 'Default message';
</script>

<div class="w-full flex justify-center mt-24">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-white">{message}</h1>
		<slot />
	</div>
</div>
