<script lang="ts">
	import { enhance } from '$app/forms';
	import { btnFilled } from '$lib/global.svelte';
	import { ExternalLink } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form method="post" action="?/login" use:enhance class="relative pt-24 mx-auto max-w-md rounded-lg bg-[#2e86c7] p-8 shadow-lg mb-4 mt-32"> 
	<img src="/Logo.svg" alt="Pilot CX Logo" class="justify-self-center">

	<h5 class="text-center m-2 text-white">Sign In</h5>
		<p class="text-red-500 p-1 rounded-lg m-4 bg-white text-center">{form?.message ?? ''}</p>


	<div class="mb-6">
		<label class="block text-lg font-medium text-white mb-2">
			Username
			<input
				name="username"
				class="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm focus:border-light-blue-4 focus:ring-2 focus:ring-light-blue-4 focus:outline-none"
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
				class="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm focus:border-light-blue-4 focus:ring-2 focus:ring-light-blue-4 focus:outline-none"
				autocomplete="current-password"
			/>
		</label>
	</div>
	<div class="flex items-center justify-between">
		<button
			class=" {btnFilled} w-full !p-2 !text-lg"
		>
			Login
		</button> 
        <a href="/" class="{btnFilled} !p-2 !text-sm absolute right-0 top-0 flex flex-row gap-2 items-center justify-center"><ExternalLink size="16" /> Home</a>
		
		<!-- <button
			formaction="?/register"
			class="rounded-md bg-dark-2 px-4 py-2 text-light-blue-4 font-semibold transition hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Register
		</button> -->
	</div>
</form>
