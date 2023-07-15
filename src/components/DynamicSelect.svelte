<script lang="ts">
	export let selectOptions: string[];
	export let caption: string;
	export let selectName: string;

	let bindedValue: string;
</script>

<div class="mb-4">
	<label for={selectName} class="block mb-2 text-md font-medium text-white"> {caption} </label>
	<select
		bind:value={bindedValue}
		id={selectName}
		name={selectName}
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	>
		{#each selectOptions as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>
