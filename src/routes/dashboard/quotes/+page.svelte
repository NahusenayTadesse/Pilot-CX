<script>
  let { data } = $props();

  let searchQuery = $state('');
  let allQuotes     = data.allquotes;   // keep the original list

  // reactive filtered list
  let filteredQuotes = $derived(
    searchQuery.trim()
      ? allQuotes.filter(q => {
          const term = searchQuery.toLowerCase();
          return (
            (q.id        && q.id.toString().toLowerCase().includes(term)) ||
            (q.firstName && q.firstName.toLowerCase().includes(term)) ||
            (q.lastName  && q.lastName.toLowerCase().includes(term)) ||
            (q.email     && q.email.toLowerCase().includes(term)) ||
            (q.phone     && q.phone.toLowerCase().includes(term))
          );
        })
      : allQuotes
  );
</script>

<input
  type="text"
  placeholder="Search Quotes"
  class="fixed top-4 right-4 px-4 py-2 w-64 text-gray-800 bg-white rounded-md shadow-lg
         focus:outline-none focus:ring-2 focus:ring-light-blue-4 focus:bg-light-blue-1 focus:ring-opacity-75
         transition-shadow duration-300"
  bind:value={searchQuery}
/>


<div class="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-center items-center overflow-y-auto">
  {#each filteredQuotes as quote}
    <div class="flex flex-col p-4 rounded-lg shadow-md gap-2 bg-light-blue-1">
      <p>Name: {quote.firstName} {quote.lastName}</p>
      <a href="mailto:{quote.email}">Email: {quote.email}</a>
      <a href="tel:{quote.phone}">Phone: {quote.phone}</a>
      <p>Submission Date: {new Date(quote.submittedAt).toLocaleDateString()}</p>
      <a href="/dashboard/quotes/{quote.id}" class="text-light-blue-4">Reply to Quote</a>
    </div>
  {/each}
</div>