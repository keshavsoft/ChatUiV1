let ws;

function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
}

function closeSidebar() {
    document.body.classList.remove('sidebar-open');
}

function clearConversation() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = '';
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');

    if (input.value.trim() !== "") {
        const currentText = input.value;

        const userDiv = document.createElement('div');
        userDiv.className = 'msg msg-user';
        userDiv.textContent = currentText;
        chatBox.appendChild(userDiv);

        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(currentText);
        } else {
            console.error('WebSocket not connected');
        }

        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    }
}

function initWebSocket() {
    ws = new WebSocket('wss://keshavsoft.com/');

    ws.onopen = () => {
        console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
        console.log('Received:', event.data);
        addBotMessage(event.data);
    };

    ws.onerror = (err) => {
        console.error('WebSocket Error:', err);
    };

    ws.onclose = () => {
        console.warn('WebSocket Closed');
    };
}

function addBotMessage(text) {
    const chatBox = document.getElementById('chatBox');

    const botDiv = document.createElement('div');
    botDiv.className = 'msg msg-bot shadow-sm';
    botDiv.innerHTML = text;

    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

initWebSocket();
