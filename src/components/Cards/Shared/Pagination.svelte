<script>
    export let handler
    $: pageNumber = handler.getPageNumber()
    $: pageCount = handler.getPageCount()
    $: pages = handler.getPages({ ellipsis: true })
</script>


<div class="py-2">
    <nav class="block">
        <ul class="flex pl-0 rounded list-none flex-wrap">
            <li>
                <button
                        on:click={() => handler.setPage(1)}
                        class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid {$pageNumber === 1 ? 'border-red-200 text-white bg-red-200': 'border-red-500 bg-white text-red-500'}">
                    <i class="fas fa-chevron-left -ml-px"></i>
                    <i class="fas fa-chevron-left -ml-px"></i>
                </button>
            </li>
            <li>
                <button
                        class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid {$pageNumber === 1 ? 'border-red-200 text-white bg-red-200': 'border-red-500 bg-white text-red-500'}"
                        type="button"
                        disabled={$pageNumber === 1}
                        on:click={() => handler.setPage('previous')}
                >
                    <i class="fas fa-chevron-left -ml-px"></i>
                </button>
            </li>
            {#each $pages as page}
                <li>
                    <button
                            class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500 {$pageNumber === page ? 'text-white bg-red-500':'bg-white text-red-500'}"
                            type="button"
                            class:active={$pageNumber === page}
                            class:ellipse={page === null}
                            on:click={() => handler.setPage(page)}
                    >
                        {page ?? '...'}
                    </button>
                </li>
            {/each}
            <li>
                <button
                        class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid {$pageNumber === $pageCount ? 'border-red-200 text-white bg-red-200': 'border-red-500 bg-white text-red-500'}"
                        type="button"
                        class:disabled={$pageNumber === $pageCount}
                        on:click={() => handler.setPage('next')}
                >
                    <i class="fas fa-chevron-right -mr-px"></i>
                </button>
            </li>
            <li>
                <button
                        on:click={() => handler.setPage($pageCount)}
                        class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid {$pageNumber === $pageCount ? 'border-red-200 text-white bg-red-200': 'border-red-500 bg-white text-red-500'}">
                    <i class="fas fa-chevron-right -mr-px"></i>
                    <i class="fas fa-chevron-right -mr-px"></i>
                </button>
            </li>
        </ul>
    </nav>
</div>

