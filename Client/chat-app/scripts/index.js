import { ChatMessage } from "./chat-message.js";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    let chatMessage = new ChatMessage(
      document.querySelector("input[name='nickname']").value,
      document.querySelector("input[name='message']").value);
    await fetch("/api/chat", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chatMessage)
    });
    document.querySelector("input[name='message']").value = "";
  } catch (error) {
    console.error(error);
  }
});

  
// Berichten ophalen
async function getMessages() {
    let response = await fetch("/api/chat");
    let chatMessages = await response.json();
    let chatHistory = "";
    for (let i = 0; i < chatMessages.length; i++) {
      // De array bevat object literals en dus geen objecten van de class ChatMessage
      // Vandaar wordt er eerst een object van die class aangemaakt.
      let chatMessage = new ChatMessage(chatMessages[i].nickname, chatMessages[i].message);
      chatHistory += `${chatMessage.nickname}: ${chatMessage.message}\n`; // \n = new line
    }
    document.querySelector("textarea").value = chatHistory;
  }
  
  // Een eerste maal de message ophalen
  await getMessages();
  
  // En vervolgens elke 1 seconde getMessages aanroepen (= polling).
  setInterval(getMessages, 1000);
  