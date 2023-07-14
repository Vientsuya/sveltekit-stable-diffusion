<script>
	import '../app.css';
</script>

<div class="w-screen h-screen bg-theme-light-black text-white">
	<nav class="flex items-center justify-between p-5">
		<img src="#" alt="logo" />
		<ul class="flex">
			<li class="mx-10">Home</li>
			<li class="mx-10">Create</li>
			<li class="mx-10">Train</li>
		</ul>
		<button>Sign up</button>
	</nav>

	<slot />
</div>
