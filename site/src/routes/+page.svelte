<script lang="ts">
	import { page } from '../lib/index';

	let name = $state('svelte');
</script>

<input bind:value={name} />
{@render page(name)}
