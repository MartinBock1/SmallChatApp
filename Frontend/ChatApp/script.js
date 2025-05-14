

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:8000/small_chat_app/api/chats/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Netzwerkfehler");
            }
            return response.json();
        })
        .then(data => {
            let chatList = document.getElementById("chat-list");

            data.forEach(chat => {
                const li = document.createElement("li");
                li.textContent = `${chat.name}: ${chat.message} (${chat.created_at})`;
                chatList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Fehler beim Laden der Chats:", error);
        });
});