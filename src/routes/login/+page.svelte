<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form method="post" action="?/login" use:enhance class="mx-auto max-w-md rounded-lg bg-[#2e86c7] p-8 shadow-lg mb-4 mt-32"> 
	<img src="/Logo.svg" alt="Pilot CX Logo" class="justify-self-center">
	<h4 class="text-center m-2 text-white">Sign In</h4>

	<div class="mb-6">
		<label class="block text-lg font-medium text-white mb-2">
			Username
			<input
				name="username"
				class="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				autocomplete="username"
			/>
		</label>
	</div>
	<div class="mb-6">
		<label class="block text-lg font-medium text-white mb-2">
			Password
			<input
				type="password"
				name="password"
				class="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				autocomplete="current-password"
			/>
		</label>
	</div>
	<div class="flex items-center justify-between">
		<button
			class="rounded-md bg-light-blue-4 px-4 py-2 text-white font-semibold font-Inter transition hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Login
		</button>
		<!-- <button
			formaction="?/register"
			class="rounded-md bg-dark-2 px-4 py-2 text-light-blue-4 font-semibold transition hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Register
		</button> -->
	</div>
</form>
<p style="color: red">{form?.message ?? ''}</p>
