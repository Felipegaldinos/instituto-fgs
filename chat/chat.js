const apiKey = "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"; // Substitua pela sua chave
const apiUrl = "https://openrouter.ai/api/v1/chat/completions"; 

let chatHistory = JSON.parse(localStorage.getItem("chatConversations")) || {};
let currentChatId = null;

// Atualiza a interface com o histórico de conversas
function updateHistoryUI() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    for (let chatId in chatHistory) {
        let li = document.createElement("li");
        li.innerText = chatHistory[chatId].title;
        li.onclick = () => loadChat(chatId);
        historyList.appendChild(li);
    }
}

// Solicita ao usuário um título para a nova conversa
function promptNewChat() {
    let chatTitle = prompt("Digite um nome para a nova conversa:");

    if (!chatTitle || chatTitle.trim() === "") {
        alert("Você precisa definir um nome para a conversa!");
        return;
    }

    startNewChat(chatTitle);
}

// Inicia uma nova conversa
function startNewChat(title) {
    currentChatId = Date.now();
    chatHistory[currentChatId] = { title: title, messages: [] };
    saveChatHistory();
    loadChat(currentChatId);
}

// Carrega uma conversa salva
function loadChat(chatId) {
    currentChatId = chatId;
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    chatHistory[chatId].messages.forEach(msg => {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("message", msg.role === "user" ? "user-message" : "ai-message");
        messageDiv.innerText = msg.content;
        chatBox.appendChild(messageDiv);
    });

    document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
}

// Salva o histórico de conversas no localStorage
function saveChatHistory() {
    localStorage.setItem("chatConversations", JSON.stringify(chatHistory));
    updateHistoryUI();
}

// Envia a mensagem para a IA
async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");

    // Exibir a mensagem do usuário
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Salvar a mensagem no histórico
    chatHistory[currentChatId].messages.push({ role: "user", content: userInput });

    // Se for a primeira mensagem, definir o título da conversa automaticamente
    if (chatHistory[currentChatId].messages.length === 1) {
        chatHistory[currentChatId].title = userInput.slice(0, 20); // Usa os primeiros 20 caracteres
        saveChatHistory();
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: chatHistory[currentChatId].messages
            })
        });

        const data = await response.json();
        const aiMessageText = data.choices[0].message.content;

        // Exibir a resposta da IA
        let aiMessage = document.createElement("div");
        aiMessage.classList.add("message", "ai-message");
        aiMessage.innerText = aiMessageText;
        chatBox.appendChild(aiMessage);

        // Salvar resposta da IA no histórico
        chatHistory[currentChatId].messages.push({ role: "assistant", content: aiMessageText });

    } catch (error) {
        console.error("Erro na resposta da IA:", error);
    }

    saveChatHistory();
}

// Atualiza a interface ao carregar a página
window.onload = updateHistoryUI;
