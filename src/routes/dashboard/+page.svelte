
<script>
    let {data} = $props();


</script>

<div class="bg-white shadow-lg rounded-xl p-6 max-w-md w-full animate-bounce mt-8">
    <h4 class="font-bold text-gray-800 mb-4">Dashboard Analytics</h4>
    
    <div class="flex flex-col gap-4">
        <a href="/dashboard/quotes">
      <div class="flex justify-between items-center bg-red-50 p-4 rounded-lg border border-red-200 hover:scale-110 ease-in-out transition-all duration-300">
        <span class="text-red-700 font-medium ">Unreplied Quotes</span>
        <span class="text-2xl font-bold text-red-700">{data?.unrepliedCount.length - data?.replyCount.length}</span>
      </div>
      </a>
      <a href="/dashboard/quotes">
      <div class="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-200 hover:scale-110 ease-in-out transition-all duration-300">
        <span class="text-green-700 font-medium">Replies Made </span>
        <span class="text-2xl font-bold text-green-700">{data.replyCount.length}</span>
      </div>
      </a>
    </div>
    </div>