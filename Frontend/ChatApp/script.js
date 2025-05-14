
function addNote() {
    let chatNameInputRef = document.getElementById('chat_name');
    let chatNameInput = chatNameInputRef.value;

    let chatContentInputRef = document.getElementById('chat_content');
    let chatContentInput = chatContentInputRef.value;

    // Senden der POST-Anfrage an die API
    fetch('http://127.0.0.1:8000/small_chat_app/api/chats/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: chatNameInput,
            message: chatContentInput
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Chat gespeichert:', data);
            renderAllNotes();  // Optional: Eine Funktion, um die Chatliste zu rendern
        })
        .catch(error => {
            console.error('Fehler beim Speichern des Chats:', error);
        });

    // Eingabefelder leeren
    chatNameInputRef.value = "";
    chatContentInputRef.value = "";
}

// Hier kannst du eine Funktion hinzufügen, um alle Nachrichten beim Laden anzuzeigen
function renderAllNotes() {
    let chatList = document.getElementById("chat-list");
    chatList.innerHTML = '';  // Liste leeren

    fetch("http://127.0.0.1:8000/small_chat_app/api/chats/")  // Die GET-Anfrage, um alle Nachrichten abzurufen
        .then(response => response.json())
        .then(data => {
            data.forEach(chat => {
                const li = document.createElement("p");

                // Umwandeln des Datumsstrings in ein JavaScript Date-Objekt
                const createdAt = new Date(chat.created_at);

                // Formatieren des Datums im gewünschten Format: TT.MM.JJJJ - Std.Min
                const day = String(createdAt.getDate()).padStart(2, '0');  // Tag (2-stellig)
                const month = String(createdAt.getMonth() + 1).padStart(2, '0');  // Monat (2-stellig, +1 weil Monate von 0 an zählen)
                const year = createdAt.getFullYear();  // Jahr (4-stellig)
                const hours = String(createdAt.getHours()).padStart(2, '0');  // Stunde (2-stellig)
                const minutes = String(createdAt.getMinutes()).padStart(2, '0');  // Minute (2-stellig)

                const formattedDate = `${day}.${month}.${year} - ${hours}:${minutes}`;

                li.innerHTML = `<u>(${formattedDate})</u> <br><br> <b>${chat.name}:</b> <br> ${chat.message} `;
                chatList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Fehler beim Laden der Chats:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    renderAllNotes();  // Beim Laden der Seite alle Nachrichten anzeigen
});