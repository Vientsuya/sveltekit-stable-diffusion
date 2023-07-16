<script>
	import '../app.css';
</script>

<div class="w-screen h-screen text-white">
	<nav class="flex items-center justify-between p-5">
		<img src="#" alt="logo" />
		<ul class="flex">
			<li class="mx-10"><a href="/">Home</a></li>
			<li class="mx-10"><a href="/create">Create</a></li>
			<li class="mx-10"><a href="/train">Train</a></li>
		</ul>
		<button>Sign up</button>
	</nav>

	<slot />
</div>
