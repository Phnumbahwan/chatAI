import { OLLAMA_API_URL, OLLAMA_MODEL } from '@env';

export const makeChatRequest = async (messages) => {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            messages,
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message?.content || "";
};