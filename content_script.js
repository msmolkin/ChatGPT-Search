// Save content from one chat
// Select all elements with the class names that contain the messages
const messageElements = document.querySelectorAll(".prose"); // ".border-b, .prose"
// Later: might need to check whether this only provides assistant responses

// Initialize the chat object
var current_chat = {};
current_chat.url = window.location.href;
current_chat.chat_id = current_chat.url.substring(current_chat.url.indexOf("c/")).substring(2);
let paid = document.body.innerHTML.match(/Model: (Default|GPT-4|Legacy)( \(?GPT-3.5\)?)?/g);
current_chat.model = paid ? paid[0] : "Model: Free (Legacy GPT-3.5)";

// Initialize an empty array to store the messages
current_chat.messages = [];

// Loop through the selected elements and extract their text content
messageElements.forEach(element => {
  const message = element.textContent.trim();
  if (message !== '') {
    current_chat.messages.push(message);
  }
});

console.log(current_chat.messages);
// Expected output: ["User: `test prompt`", "Assistant: `example response`"]