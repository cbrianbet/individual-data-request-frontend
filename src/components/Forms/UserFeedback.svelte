<script>
    import { onMount } from 'svelte';

    const env = process.env.config;

    export let request_id;
    export let sender_id;
    let message = '';
    let chatMessages = [];

    async function fetchChatMessages() {
        const response = await fetch(`${env.API_ENDPOINT}/chat/${request_id}`);
        let response_data = await response.json();
        chatMessages = response_data.data;
    }

    async function sendMessage() {
        const newMessage = {
            request_id: request_id,
            sender_id: sender_id,
            message: message
        };

        chatMessages = [...chatMessages, {
            Message: newMessage.message,
            ID: 1,
            CreatedAt: new Date(),
            SenderID: sender_id
        }];
        message = '';

        const response = await fetch(`${env.API_ENDPOINT}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        });

        if (!response.ok) {
            // If the server response is not OK, remove the optimistically added message
            chatMessages = chatMessages.filter(msg => msg.ID !== newMessage.ID);
        } else {
            // Fetch the latest messages to ensure the UI is in sync with the server
            fetchChatMessages();
        }
    }

    onMount(() => {
        fetchChatMessages();
    });
</script>

<div class="flex-auto px-4 lg:px-10 py-10 pt-0 p-4 my-2 border border-gray-300 rounded-lg overflow-auto">
    <div class="max-h-96 overflow-y-auto mb-4">
        {#each chatMessages as chatMessage (chatMessage.ID)}
            {#if chatMessage.SenderID === sender_id}
                <div class="flex justify-end cursor-pointer gap-2.5 mb-2 transition-transform duration-300 ease-in-out transform">
                    <div class="flex flex-col max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3 max-w-sm border-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(chatMessage.CreatedAt).toLocaleString('en-UK', {timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', hour12: true, year: 'numeric', month: '2-digit', day: '2-digit'})}</span>
                        </div>
                        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chatMessage?.Message}</p>
                    </div>
                    <i class="w-8 h-8 rounded-full leading-1.5 fas fa-user text-lg text-black flex items-center justify-center ml-2"></i>
                </div>
            {:else}
                <div class="flex items-start gap-2.5 mb-2 transition-transform duration-300 ease-in-out transform">
                    <i class="w-8 h-8 rounded-full fas fa-user text-lg text-black"></i>
                    <div class="flex flex-col max-w-sm p-4 border-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700 max-w-96 bg-gray-100 rounded-lg gap-3">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(chatMessage.CreatedAt).toLocaleString('en-UK', {timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', hour12: true, year: 'numeric', month: '2-digit', day: '2-digit'})}</span>
                        </div>
                        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chatMessage?.Message}</p>
                    </div>
                </div>
            {/if}

        {/each}
    </div>

    <div class="flex">
        <input type="text" bind:value={message} placeholder="Type your message..."
               class="flex-1 p-2 border border-gray-300 rounded-l-lg"/>
        <button on:click={sendMessage} class="p-2 bg-blue-500 text-white rounded-r-lg">Send</button>
    </div>
</div>

