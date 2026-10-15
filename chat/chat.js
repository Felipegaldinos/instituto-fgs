// Integração de IA suspensa: credenciais privadas nunca devem ficar no navegador.

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
function sendMessage() {
    alert("O envio para a IA está temporariamente desativado. O histórico salvo neste navegador continua disponível.");
}

// Atualiza a interface ao carregar a página
window.onload = updateHistoryUI;
